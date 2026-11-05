---
title: Run Profinity as a Windows service
description: "Run Profinity as a Windows service with ProfinityService.cmd, choose the account it runs under, set the data folder, and remove the service."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Run Profinity as a Windows service

Run Profinity as a Windows service to start it automatically on boot and restart it if it fails.
Install Profinity first, as described in [Install Profinity on Windows](../Windows_Installation.md).
For what a service is and the licence it needs for remote access, refer to [Run Profinity as a service](./index.md).

The installation directory contains `ProfinityService.cmd`, which is at `C:\Program Files (x86)\Prohelion\Profinity\ProfinityService.cmd` with the default options.
It registers `Profinity.exe`, the Windows desktop application, as the service.
You need administrator privileges to run it.

A default installation installs the service under the LocalSystem user.
Prohelion recommends a dedicated user account instead, because it holds fewer privileges than LocalSystem and keeps the artefacts directory out of the Windows directory.

The service resolves its [artefacts directory](../Artifacts_Directory.md) in the same way as the desktop application, as `%LOCALAPPDATA%\Prohelion\Profinity` of the account it runs under.
For LocalSystem that folder is inside the system profile, which is difficult to work with.
On 64-bit Windows it is `C:\Windows\SysWOW64\config\systemprofile\AppData\Local\Prohelion\Profinity`, because `Profinity.exe` is a 32-bit application.

1. Search for cmd, right-click it, and select **Run as administrator**.
2. Run the install command.
    To install under a user account, give the account name:

    ```bat
    ProfinityService.cmd install [Username to install under]
    ```

    The script prompts for that account's password.

    To install under LocalSystem, run it without a name:

    ```bat
    ProfinityService.cmd install
    ```

3. Open the Services app, find Profinity in the list, and start it like any other service.

To place the artefacts directory at a path of your choosing, set the `PROFINITY_HOME` system environment variable before the service starts.
Profinity does not move existing data when `PROFINITY_HOME` is set, so move it yourself:

1. Stop the service.
2. Copy the folders listed in [Back up and restore](../Artifacts_Directory.md#back-up-and-restore) from the current artefacts directory into the new folder.
3. Run `setx PROFINITY_HOME "D:\ProfinityData" /M` from an administrator command prompt, as an example.
   If PROFINITY_HOME names an empty folder, Profinity creates a new security.yaml with the default `admin` account, which must change its password at the first sign-in.
   Profinity does not copy existing data, so copy the folders first.
4. Start the service so that it reads the new value.

The current folder stays as it is, so removing the variable returns Profinity to it.

Until a Server licence is applied, the service serves its web interface to the local machine only, on `127.0.0.1`.
With a Server licence applied under **ADMIN > License**, it uses the address set under [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md), so other machines can sign in.

A service has no application window, so open a browser on the same machine and apply the licence file from **ADMIN > License**, or copy the file into the artefacts directory, before you rely on remote access.
Both routes are described in [Apply a licence](../Applying_a_Licence.md).
Expect Profinity to restart when you apply the licence.
For the accounts that can sign in, refer to [Who can sign in, by installation type](../Applying_a_Licence.md#who-can-sign-in).

Starting a second instance with the same configuration on the same machine causes a port conflict on the API or web content ports.
To serve content and develop on the same machine at the same time, install Profinity under a separate user account.
Then change **IP Port for Http** and **IP Port for Https** for one of the instances, as described in [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md).

To remove the service, run this command as an administrator:

```bat
ProfinityService.cmd uninstall
```

## Check that the service is running

Open the Services app, find Profinity in the list, and confirm that its status is **Running**.

## Troubleshooting

If the service does not start, open **Event Viewer**, select **Windows Logs** > **Application**, and filter for the source `Profinity`.

| What you see | Cause | What to do |
|--------------|-------|------------|
| A "file not found" error | The installation directory does not match where Profinity is installed | Run `ProfinityService.cmd uninstall`, then run `ProfinityService.cmd install` from the new folder |

Next, review the [Security guide](../Security.md).
