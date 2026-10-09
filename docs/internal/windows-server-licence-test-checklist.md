---
title: Windows install with a Server licence, test checklist
---

# Windows install with a Server licence: test checklist

**Not published:** this page is under `docs/internal/` and is excluded from the built site.

**Why it exists.** In 2.3 a Windows install (the MSI, which installs the desktop application as `Profinity.exe`) with a **Server licence** serves other computers and creates the default `admin` account. Before this change a desktop host listened on `127.0.0.1` only, whatever the licence. This could not be tested on the Mac that built it. These checks close the four Windows items on the [engineering open questions](2.3-engineering-open-questions.md) page.

**What changed in code (for the tester).**

- `LicenseNetworkPolicy` no longer special-cases a desktop host, so the Server licence alone decides whether the web server may listen beyond `127.0.0.1`.
- `ValidUserChecker` refuses the built-in `desktop` sign-in (HTTP 401) from any non-loopback address. The application window still works.
- With a Server licence a desktop host seeds the default `admin` user (password `password`, change required at first sign-in).
- An engine restart (for example after applying a licence) now keeps the desktop-host settings from the first start.

## What you need

- A Windows machine with the MSI from this branch installed, and administrator rights.
- A **Server** licence file for that machine (the machine fingerprint is on **ADMIN > License**).
- A second computer on the same network with a browser, and the first computer's IP address.
- A way to read the log (**ADMIN > Logs**, or the Windows Event Log source `Profinity` when it runs as a service).

Record the Windows version, the Profinity build number from the about box, and the licence edition.

## A. Before a licence

| # | Do | Expect | Result |
|---|---|---|---|
| A1 | Start the desktop application and open the web address shown (default `http://localhost:18080`). | The application window shows Profinity and signs in without a password. | |
| A2 | Set **IP Address for Http** to `0.0.0.0` under **ADMIN > System Configuration > Profinity Web** and restart. | The log says "Remote web access requires a Server license (a desktop host listens on loopback only without one)." The address stays `127.0.0.1`. | |
| A3 | From the second computer, browse to `http://<first computer IP>:18080`. | The connection fails. | |

## B. Apply the Server licence

| # | Do | Expect | Result |
|---|---|---|---|
| B1 | On **ADMIN > License**, upload the Server licence file. | The licence shows as valid Server. The engine restarts by itself, and the application window comes back without being closed. | |
| B2 | Open `http://localhost:18080/api/v2/SystemInfo` in the application, or read the About page. | `isDesktopHost` is `true`. It must still be true after the restart. | |
| B3 | Check **ADMIN > Users & Groups**. | The screen is available and lists an `admin` user (and the built-in desktop access still works in the window). | |
| B4 | Check the log. | No "Desktop host binds to loopback only" message appears. | |

## C. Remote access on the desktop application

Open Windows Defender Firewall and allow inbound TCP 18080 for `Profinity.exe` if it is not already allowed. The installer adds exceptions for ports 4876 and 42000 only, so a missing 18080 rule is a likely finding.

| # | Do | Expect | Result |
|---|---|---|---|
| C1 | On the second computer, browse to `http://<first computer IP>:18080`. | The Profinity sign-in page appears. | |
| C2 | Sign in as `admin` with the password `password`. | You are asked to change the password, then reach the dashboard. | |
| C3 | Create a user with a read-only role and sign in as that user from the second computer. | It signs in and sees only what its role allows. | |
| C4 | From the second computer, call the API with a stolen desktop token if you can obtain one (for example copied from the application window's network traffic). | HTTP 401, "The desktop sign-in is only valid on the computer running Profinity." The audit log records `TokenRejected` with reason `DesktopTokenFromRemoteAddress`. | |

## D. As a Windows service

Run these in an administrator command prompt from the folder that holds `ProfinityService.cmd` (by default `C:\Program Files (x86)\Prohelion\Profinity`). Close the desktop application first, because only one instance can hold the ports.

| # | Do | Expect | Result |
|---|---|---|---|
| D1 | `ProfinityService.cmd install`, then start the **Profinity** service in the Services app. | The service reaches Running. Note whether it stays running, because this program is a desktop application. | |
| D2 | Browse to `http://localhost:18080` on the same computer. | The sign-in page appears and `admin` can sign in. | |
| D3 | Repeat C1 to C3 from the second computer. | They behave as in section C. | |
| D4 | Read the Windows Event Log source `Profinity`. | Start-up messages appear, with no repeating errors. | |
| D5 | With the service running, upload a different valid licence (or the same one) on **ADMIN > License**. | The engine restarts, the service stays Running, and the web interface returns. | |
| D6 | Stop the service, then `ProfinityService.cmd uninstall`. | The service is removed. | |

If D1 fails or the service stops, record the exact message and the Event Log entry. A WPF application started by the service manager has no desktop session, so this is the main uncertainty.

## E. Restart keeps the host identity

| # | Do | Expect | Result |
|---|---|---|---|
| E1 | In the application, choose the action that restarts Profinity (or apply any change that restarts the engine). | The application window stays open and works. `isDesktopHost` is still `true`. No second admin seeding message appears. | |
| E2 | Remove the Server licence (delete it under **ADMIN > License** if offered, or move `license.yaml` aside) and restart. | The web server returns to `127.0.0.1` only, and the remote browser can no longer connect. The `admin` user remains in `security.yaml` but only the application window can be used until a licence returns. | |

## F. Report

For each failed row, note the row number, what happened, the log lines, and a screenshot. Send the results to engineering, who will tick the four Windows items on the open questions page:

1. The service installs, starts, binds the configured address, and a remote browser signs in as `admin` (A to D).
2. The WPF application behaves under the service manager, and applying a licence restarts the engine cleanly (B1, D1, D5).
3. A separate Console host is not needed on Windows (decided 2026-10-10).
4. The security review of the loopback-only desktop sign-in (C4) is done by a reviewer, including the case of a reverse proxy on the same computer, which looks like loopback.
