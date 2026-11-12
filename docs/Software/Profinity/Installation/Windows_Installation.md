---
title: Install Profinity on Windows
description: "Run the Setup Wizard, start Profinity from the Start menu, and find out when a Server licence is needed for browser or remote access."
type: task
owner: Documentation
last_reviewed: 2026-11-12
---

# Install Profinity on Windows

The Profinity Setup Wizard installs Profinity as a Windows desktop application.
The application signs in automatically and runs without a licence or a web browser.
For Linux and macOS, refer to [Install Profinity on Linux and macOS](./Linux_and_macOS_Installation.md), and for containers, refer to [Install Profinity with Docker](./Docker/index.md).
To upgrade from Profinity 2.2, refer to [Upgrade from Profinity 2.2](./Upgrading/Upgrade_From_2_2.md) before installing.

The installer requires an account with administrator rights, because it installs Profinity for all users of the computer.

1. Download `Profinity.Install.msi` from the [latest Profinity release on GitHub](https://github.com/Prohelion/Profinity/releases/latest).
2. Open `Profinity.Install.msi` and follow the prompts in the Setup Wizard.
3. Start Profinity from the Start menu.

Profinity opens its homepage in the desktop window.

<figure markdown>
![The Profinity welcome page, headed "Welcome to Profinity Version 2.3", with Documentation, Add Component and Help shortcuts.](../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

The installer places the program files in `C:\Program Files (x86)\Prohelion\Profinity`.
Profinity stores configuration, profiles, and logs in the [artefacts directory](./Artifacts_Directory.md), `%LOCALAPPDATA%\Prohelion\Profinity` by default.
To stop Profinity, select **Close** at the top right of the window.

## Open Profinity in a web browser

A Windows installation is normally used through the desktop window.
A browser is needed for other users to sign in with their own accounts, or to open Profinity from another computer.
Both require a Server licence: user accounts are a Server feature, and the desktop application serves its web interface to the local machine only until a Server licence is applied.

1. Apply a Server licence and restart Profinity, as described in [Apply a licence](./Applying_a_Licence.md).
2. In a browser, open `http://localhost:18080`.
   This is the default address. The current address is shown in the Profinity Web panel of [System configuration](../Administration/System_Configuration/Profinity_Web.md), under **ADMIN** in the side menu.
   The Profinity sign-in page appears.
3. Sign in as `admin` with the password `password`.
   Profinity requires a new password at first sign-in.

<figure markdown>
![The Profinity sign-in page](../images/login_page.png)
<figcaption>Profinity sign-in page</figcaption>
</figure>

To create accounts for other users, refer to [Create a user](../Getting_Started/Create_User.md).
For the accounts available with and without a Server licence, refer to [Who can sign in, by installation type](./Applying_a_Licence.md#who-can-sign-in).

| What you see | Cause | What to do |
|--------------|-------|------------|
| The sign-in page opens, but there is no account to sign in with | No Server licence is applied, so the `admin` account does not exist | Use the desktop window, or apply a Server licence as described in [Apply a licence](./Applying_a_Licence.md) |
| The browser cannot reach the address | Profinity is not running, or another program is using port 18080 | Start Profinity from the Start menu. If Profinity is running, change the port in the Profinity Web panel of [System configuration](../Administration/System_Configuration/Profinity_Web.md), then select **ADMIN > Restart Profinity** |

## Next steps

Work through the [Quick start guide](../Getting_Started/Quick_Start.md) in the desktop window.
Review the [Security guide](./Security.md) before production use.
To run Profinity in the background, refer to [Run Profinity as a Windows service](./Run_as_a_Service/Run_as_a_Windows_Service.md).
