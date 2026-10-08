---
title: Windows Installation
description: "Install Profinity on Windows using the Setup Wizard MSI installer for desktop application or web browser access."
---

# Installing Profinity on Windows

!!! info "Available Profinity Releases"
    Profinity is available as a standard desktop application on Windows machines, for selected [Unix platforms (including macOS and Linux)](./Zip_Installation.md) and as a [Docker container](./Docker_Installation.md) for Docker-enabled environments and cloud setups.

## Installation on Windows

The Profinity Setup Wizard installs Profinity on a Windows machine. The installer places Profinity in `C:\Program Files (x86)\Prohelion\Profinity` and stores configuration, profiles and logs in the [artefacts directory](./Artifacts_Directory.md), which is `%LOCALAPPDATA%\Prohelion\Profinity` by default. To upgrade a 2.2 installation, back up the artefacts directory first and follow [Upgrading From 2.2](../Release_Notes/2.3.1.md#upgrading-from-22).

!!! info "Profinity 2.3 Download Information"
    Profinity 2.3 is currently available for Early Adopters only. Contact Prohelion at the [Prohelion Website](https://www.prohelion.com) to register for the programme and to receive the installation files.

1. Open the downloaded file `Profinity.Install.msi` from your downloads directory.
2. Follow the prompts in the Profinity Setup Wizard.

Launching the Profinity desktop client opens the Profinity homepage directly.

<figure markdown>
![Profinity Homepage](../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

!!! info "The Windows Desktop Application Accepts Local Connections Only"
    Without a **Profinity Server** licence, the Windows desktop application binds its web interface to the local machine (127.0.0.1) on TCP port 18080 by default, whatever address is set in the [System Configuration](../Administration/System_Configuration/Profinity_Web.md), so the web interface cannot be opened from another machine. With a Server licence applied, Profinity uses the address that is set there, so other machines can open the web interface and sign in with their own accounts. The built-in desktop sign-in used by the application window works from the same computer only. The installer adds Windows Firewall exceptions for ports 4876 (TCP and UDP) and 42000 (UDP).

!!! info "Licence Required for User Accounts"
    Creating user accounts and roles needs the **Profinity Server** licensed feature, which the Server and Enterprise editions include; without it the **Users & Groups** screen is unavailable and Profinity Desktop runs as a single built-in administrator user. A Desktop host does not start the 14-day local trial, so apply a Server licence file under **ADMIN > License**. When a Server licence is active, Profinity creates the default `admin` account, which must change its password at first sign-in, so that people on other machines have an account to sign in with. See [Licensing](../Administration/Licensing.md).

### Starting and Stopping Profinity

As a Windows desktop application, Profinity is started by running the application from the Start Menu.

To stop Profinity, shut down the application.

### Accessing a Desktop Application Instance via a Web Browser

With Profinity Desktop running, you can also open the user interface in a web browser on the same machine. Open the URL defined in the Profinity Web panel of [System Configuration](../Administration/System_Configuration/Profinity_Web.md) (reached from **ADMIN** in the side menu). For installations that followed the default setup procedure, the default URL is `http://localhost:18080`.

Connecting to the Profinity web client directs the browser to the Profinity login page. The desktop application signs in without a password, and the installer does not create an administrator account for the login page, so a fresh install has no account that can be used to sign in from a browser, and an account can only be created with a Server licence applied, as the licence note above describes. Without one, use the desktop application window. If the browser cannot reach the address, check that Profinity is running and that another program is not using port 18080.

<figure markdown>
![Profinity login page](../images/login_page.png)
<figcaption>Profinity login page</figcaption>
</figure>

### Next Steps

If a Server licence is applied, create the first account with [Create User](../Getting_Started/Create_User.md), then work through the [Quick Start](../Getting_Started/Quick_Start.md), review the [Security Guide](./Security.md), and run Profinity in the background with [Running as a Service](./Running_As_Service.md).
