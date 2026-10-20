---
title: Install Profinity on Windows
description: "Install Profinity on Windows with the Setup Wizard, open the web interface in a browser, and see what needs a Server licence."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Install Profinity on Windows

The Profinity Setup Wizard installs Profinity as a desktop application on Windows.
For Linux and macOS, refer to [Linux and macOS installation](./Linux_and_macOS_Installation.md), and for containers, refer to [Docker installation](./Docker_Installation.md).

The installer places Profinity in `C:\Program Files (x86)\Prohelion\Profinity`, and keeps configuration, profiles, and logs in the [artefacts directory](./Artifacts_Directory.md), which is `%LOCALAPPDATA%\Prohelion\Profinity` by default.
To upgrade a 2.2 installation, read [Upgrade from Profinity 2.2](./Upgrade_From_2_2.md) first.

## Install Profinity

1. Obtain the installer, `Profinity.Install.msi`, from Prohelion.
2. Open `Profinity.Install.msi` and follow the prompts in the Setup Wizard.
3. Start Profinity from the Start menu.

Profinity opens its homepage in the desktop window.
To stop Profinity, shut down the application.

<figure markdown>
![The Profinity welcome page, headed "Welcome to Profinity Version 2.3", with Documentation, Add Component and Help shortcuts.](../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

## Open Profinity in a web browser

!!! info "Web access needs a Server licence"
    The sign-in page opens on an unlicensed or Desktop installation, and signing in from the web needs a username and password.
    User accounts need a Server licence, so the page opens and sign-in fails until that licence is applied.

With Profinity running, open the URL set in the Profinity Web panel of [System configuration](../Administration/System_Configuration/Profinity_Web.md), which you reach from **ADMIN** in the side menu.
The default URL is `http://localhost:18080`, and the browser opens the Profinity sign-in page.

<figure markdown>
![The Profinity sign-in page](../images/login_page.png)
<figcaption>Profinity sign-in page</figcaption>
</figure>

The desktop application signs in without a password.
A fresh installation without a Server licence has no account for the sign-in page, so use the desktop application window.
If the browser cannot reach the address, check that Profinity is running and that no other program is using port 18080.

## Remote access and user accounts

Without a **Profinity Server** licence, the desktop application binds its web interface to the local machine (127.0.0.1) on TCP port 18080 by default, whatever address is set in System configuration.
Other machines cannot open the web interface, and the installer adds Windows Firewall exceptions for ports 4876 (TCP and UDP) and 42000 (UDP).

A Server licence changes this.
Profinity then uses the address set in System configuration, so other machines can open the web interface and sign in with their own accounts.
A Desktop licence does not provide this, because signing in from a browser on another machine always needs a Server licence.

User accounts and roles need the Server licensed feature, which the Server and Enterprise editions include.
Without it, **Users & Groups** is unavailable and Profinity runs as a single built-in administrator.
A Desktop host does not start the 14-day local trial, so apply a Server licence file under **ADMIN > License**, as described in [Apply a licence](./Applying_a_Licence.md), and restart Profinity so the new address takes effect.
With a Server licence active, Profinity creates the default `admin` account, which must change its password at first sign-in.
Refer to [Licensing](../Licensing.md) for what each edition includes.

## Next steps

With a Server licence applied, sign in as `admin`, change the password, and create your own accounts with [Create a user](../Getting_Started/Create_User.md).
Then work through the [Quick start guide](../Getting_Started/Quick_Start.md), review the [Security guide](./Security.md), and run Profinity in the background with [Run Profinity as a Windows service](./Run_as_a_Service/Run_as_a_Windows_Service.md).
