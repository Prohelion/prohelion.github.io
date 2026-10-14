---
title: Run Profinity as a service
description: "Run Profinity as a service on Linux, macOS, or Windows so it starts automatically on boot and restarts if it fails."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Run Profinity as a service

Run Profinity as a service to start it automatically on boot and restart it if it fails, which suits production environments where uptime matters.
Install Profinity first, using the page for your platform: [Windows](./Windows_Installation.md), [Linux and macOS](./Zip_Installation.md), or [Docker](./Docker_Installation.md).
In Docker, configure Docker to start the container on boot instead.

As of Profinity V2, Profinity runs in server mode on Docker, macOS, and Linux (x86-64 and 64-bit ARM, plus 32-bit ARM on Linux).
On Windows the service runs the desktop application, and becomes a server when a Server licence is applied.
In server mode the user interface is available only through a browser, and it is served by REST APIs that are also available to [custom applications](../Customising_Profinity/Hosting/index.md) hosted on the Profinity Server.

A service serves the web interface to other machines.
Opening the web interface from another machine, and creating user accounts and roles, need the **Profinity Server** licensed feature, which the Server and Enterprise editions include.
A new installation that is not a Desktop host starts a one-time 14-day local trial with the Server features, so apply a licence file under **ADMIN > License** before the trial ends, as described in [Apply a licence](./Applying_a_Licence.md).

## Linux setup

On Linux, Profinity runs as a systemd service through the `profinity.sh` launcher in the install root, `/opt/profinity` by default.
The [bootstrap installer](./Zip_Installation.md#install-with-the-bootstrap-installer) creates the `profinity` service user and the unit file.
These steps cover systemd, which the installer supports, and on a distribution without systemd you follow that distribution's documentation for running a daemon.

`profinity.sh` supports two ways to start Profinity, selected by the `-s` (`--service`) flag.
Running `/opt/profinity/profinity.sh` in a terminal starts Profinity in the foreground, which suits testing a configuration before you enable the service, and Ctrl+C stops it.
Running `systemctl start profinity` starts the service, whose unit runs `profinity.sh -s`, and the `-s` flag does not select the account that Profinity runs under.
Always start Profinity through `profinity.sh` and never by calling `dotnet Profinity.dll`, because the launcher resolves the installed edition and runs preflight checks.

The installer writes `/etc/systemd/system/profinity.service` with these contents:

```ini
[Unit]
Description=Profinity
After=syslog.target network.target

[Service]
Type=notify
User=profinity
Group=profinity
WorkingDirectory=/opt/profinity/app
ExecStart=/opt/profinity/profinity.sh -s
Restart=on-failure
TimeoutSec=900

[Install]
WantedBy=multi-user.target
```

Adjust `WorkingDirectory` and `ExecStart` if you installed with a different `--install-dir`.
If you installed with `--no-systemd` or from an archive, create the file yourself, and create the `profinity` user and the [artefacts directory](./Artifacts_Directory.md) first:

```bash
sudo mkdir -p /var/lib/prohelion/profinity
sudo chown -R profinity:profinity /var/lib/prohelion
```

The installer already enables the unit, so the start command is normally all you need.

1. If you edited the unit file, run `sudo systemctl daemon-reload` to reload the systemd configuration.
2. If the service was disabled, run `sudo systemctl enable profinity.service` to enable it at boot.
3. Start the service:

    ```bash
    sudo systemctl start profinity.service
    ```

A typical service layout is:

| Path | Purpose |
|------|---------|
| `/var/lib/prohelion/profinity` | Artefacts: config, profiles, plugins, logs |
| `/etc/profinity/env` | JWT signing key and encryption key, when a deployment script keeps them outside `security.yaml` |
| `/opt/profinity` | Install root: `profinity.sh`, `update.sh`, `VERSION`, `edition.json` |
| `/opt/profinity/app` | Profinity binaries, self-contained or portable |

To update an installed copy, refer to [Update Profinity](./Zip_Installation.md#update-profinity).
Set environment variables for a service as `Environment=` lines in the `[Service]` section of the unit, because a service does not read `~/.bashrc`, as described in [Environment variables](./Environment_Variables.md).

## macOS setup

On macOS, Profinity is installed with the same bootstrap installer as Linux, into `/opt/profinity` by default, and `launchd` runs it as a service in the role systemd fills on Linux.

1. Create a plist file:

    ```bash
    sudo nano /Library/LaunchDaemons/com.profinity.service.plist
    ```

2. Add these contents, adjusting `/opt/profinity` if you installed with `--install-dir`:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>Label</key>
        <string>com.profinity.service</string>
        <key>ProgramArguments</key>
        <array>
            <string>/opt/profinity/profinity.sh</string>
            <string>-b</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>KeepAlive</key>
        <true/>
    </dict>
    </plist>
    ```

3. Load the service:

    ```bash
    sudo launchctl load /Library/LaunchDaemons/com.profinity.service.plist
    ```

4. Start the service:

    ```bash
    sudo launchctl start com.profinity.service
    ```

The plist uses `-b` (`--background`), which logs to a file and the console instead of depending on an interactive console session.
It does not use `-s` (`--service`), which selects service-mode host integration only on Windows and Linux (systemd).
Always start Profinity through `profinity.sh`, because it also bootstraps the .NET runtime for the portable macOS build when needed.

## Windows setup

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

- Linux: run `sudo systemctl status profinity.service`.
- macOS: run `sudo launchctl list | grep com.profinity.service`, which lists the service when it is loaded.
- Windows: open the Services app, find Profinity in the list, and confirm that its status is **Running**.

## Troubleshooting

If the service does not start, read the log with `journalctl -u profinity.service` on Linux, the Console application on macOS, or the Event Viewer on Windows.

- A permission error on `/var/lib/prohelion` means the service user does not own the artefacts directory. Run `sudo chown -R profinity:profinity /var/lib/prohelion`.
- A "file not found" error means the path to `profinity.sh` in the unit or plist, or the installation directory on Windows, does not match where Profinity is installed. Correct the path in the service configuration and start the service again.
