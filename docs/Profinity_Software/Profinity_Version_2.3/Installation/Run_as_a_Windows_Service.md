---
title: Run Profinity as a Windows service
description: "Run Profinity as a Windows service with ProfinityService.cmd, choose the account it runs under, set the data folder, and remove the service."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Run Profinity as a Windows service

Run Profinity as a Windows service to start it automatically on boot and restart it if it fails.
Install Profinity first, as described in [Install Profinity on Windows](./Windows_Installation.md).
For what a service is and the licence it needs for remote access, refer to [Run Profinity as a service](./Running_As_Service.md).

The installation directory contains `ProfinityService.cmd`, which is at `C:\Program Files (x86)\Prohelion\Profinity\ProfinityService.cmd` with the default options.
It registers `Profinity.exe`, the Windows desktop application, as the service.
You need administrator privileges to run it.

A default installation installs the service under the LocalSystem user.
Prohelion recommends a dedicated user account instead, because it holds fewer privileges than LocalSystem and keeps the artefacts directory out of the Windows directory.
The service resolves its [artefacts directory](./Artifacts_Directory.md) in the same way as the desktop application, as `%LOCALAPPDATA%\Prohelion\Profinity` of the account it runs under.
For LocalSystem that folder is inside the system profile, which is difficult to work with and is beneath `C:\Windows\SysWOW64\config\systemprofile\AppData\Local\Prohelion\Profinity` on 64-bit Windows, because `Profinity.exe` is a 32-bit application.

1. Search for cmd, right-click it, and select **Run as administrator**.
2. Run the install command.
   To install under a user account, give the account name:

    ```bat
    ProfinityService.cmd install [Username to install under]
    ```

   To install under LocalSystem, run it without a name:

    ```bat
    ProfinityService.cmd install
    ```

3. Open the Services app, find Profinity in the list, and start it like any other service.

To place the artefacts directory at a path of your choosing, set the `PROFINITY_HOME` system environment variable before the service starts, for example with `setx PROFINITY_HOME "D:\ProfinityData" /M` from an administrator command prompt, and restart the service so that it reads the new value.

Without a Server licence the service serves its web interface to the local machine only, on 127.0.0.1.
With a Server licence applied under **ADMIN > License**, it uses the address set under [Profinity Web](../Administration/System_Configuration/Profinity_Web.md) and creates the default `admin` account, which must change its password at first sign-in, so other machines can sign in.
A service has no application window, so apply the licence file before you rely on remote access, and expect the engine to restart when you apply it.

Starting a second instance with the same configuration on the same machine causes a port conflict on the API or web content ports.
To serve content and develop on the same machine at the same time, install Profinity under a separate user account, and change the port in the config file for one of the instances.

To remove the service, run this command as an administrator:

```bat
ProfinityService.cmd uninstall
```

## Check that the service is running

Open the Services app, find Profinity in the list, and confirm that its status is **Running**.

## Troubleshooting

If the service does not start, read the log in the Event Viewer.
A "file not found" error means the installation directory does not match where Profinity is installed, so correct the path in the service configuration and start the service again.
