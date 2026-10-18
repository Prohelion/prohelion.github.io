---
title: Trial licence, Desktop use and machine fingerprint
description: "Understand the automatic 14-day local trial, the Desktop free-use policy and the machine fingerprint that ties a licence file to one installation."
type: concept
owner: Documentation
last_reviewed: 2026-10-15
---

# Trial licence, Desktop use and machine fingerprint

A Profinity instance that has never had a licence applied issues itself a one-time, 14-day, server-tier trial on first startup, provided the installer build has trial issuance enabled.
Some OEM-customised builds do not offer this local trial, and a Desktop host also has a free-use policy.
For what each edition includes, refer to [Licensing](Licensing.md), and to apply a file, refer to [Apply a licence](../Installation/Applying_a_Licence.md).

## The 14-day local trial

A Profinity instance that has never had a licence applied issues itself a one-time, 14-day, server-tier trial automatically on first startup, provided the installer build has trial issuance enabled; some OEM-customised builds may not offer this local trial.
This local trial:

- Requires no network access and no request to Prohelion.
- Runs for a maximum of 14 days from first startup.
- Grants server-tier entitlements (the same feature set as a standard `Commercial` server licence), not enterprise-only features.
- Is issued once per installation.
  Reinstalling or resetting the instance does not restart the trial, because the trial is recorded against the instance fingerprint.
- Reports the state `Trial` while more than 7 days remain, and `Expiring` for the last 7 days.
  A signed trial licence file is reported as `Trial` while more than 30 days remain.
- Is not available on Desktop hosts, which have a separate free-use policy ([Desktop free-use policy](#desktop-free-use-policy)).

When the 14-day trial ends, Profinity drops the instance to the same unlicensed entitlement set a Desktop installation uses, and shows an expiry notice on the Home screen linking to the **License** pill on the **ADMIN** page.
Profinity does not stop, lock users out, or switch to a read-only mode: the engine keeps running, and features and components outside the unlicensed set become unavailable until a suitable commercial or extended evaluation licence is uploaded.

## Desktop free-use policy

An unlicensed Desktop installation is provided for personal, non-commercial use only and must not be used for commercial purposes.
Commercial use requires a purchased Desktop licence from Prohelion.
A Desktop installation does not need a licence for personal use, and does not issue or consume the automatic local trial described in [The 14-day local trial](#the-14-day-local-trial).
It keeps the unlicensed entitlement set indefinitely and shows a notice on the Home screen explaining the non-commercial-use restriction and directing commercial users to contact Prohelion to purchase a Desktop licence.
If a trial or commercial `license.yaml` is installed on a Desktop host manually, Profinity validates and applies it in the same way as on a server host.
A Desktop host that holds a Server licence also accepts connections from other machines and creates the default `admin` account, as a server host does; the built-in desktop sign-in used by the application window still works from the same computer only.
Do not put a reverse proxy on the same computer in front of a Desktop host, because requests that come through it look as if they came from the computer itself. Profinity refuses the desktop sign-in on a request that carries forwarding headers, but the safe set-up is to run Profinity as a server host behind the proxy instead.

## The machine fingerprint

The fingerprint is a value computed from the installation itself, unique to that machine and Profinity install.
It has two purposes:

- It ties a signed `license.yaml` to one specific installation, so a licence file cannot be copied to another machine and reused.
- It is the only piece of information an administrator needs to send to Prohelion to request a licence or evaluation, which keeps the process usable for edge machines with no internet access.

A licence is signed for one machine's fingerprint.
A licence issued for one instance does not apply to another, and Profinity rejects an upload of a licence issued for a different machine, reporting the state `WrongInstance` if such a file is placed directly in the licence folder.
The fingerprint is shown on the [License page](License_Page.md), with a button to copy it.
