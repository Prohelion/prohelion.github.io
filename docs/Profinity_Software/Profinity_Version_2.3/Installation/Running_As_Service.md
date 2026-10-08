---
title: Running Profinity as a Service or Daemon
description: "Configure Profinity to run as a system service on Linux, macOS, or Windows with automatic startup and failure recovery."
---

# Running Profinity as a Service

This guide provides instructions on how to run Profinity as a service on Windows and Unix-based systems, ensuring that it starts automatically on boot and restarts if it fails.

## Introduction

Running Profinity as a service automates its startup and ensures continuous operation, which suits production environments where reliability and uptime are critical.

As of Profinity V2, Profinity runs in server mode on Docker, macOS and Linux (x86-64 and 64-bit ARM, plus 32-bit ARM on Linux). On Windows the service runs the desktop application and becomes a server when a Server licence is applied. In server mode the Profinity user interface is available only through a browser, with no desktop application, and it is served by REST APIs that are also available to [custom applications](../Customising_Profinity/Hosting/index.md) hosted on the Profinity Server.

!!! info "Profinity Server Suits Kiosk, Analytics and Cloud Deployments"
    Profinity Server supports CAN bus based platforms that need an API-centric front end for user kiosks or other interfaces, data analytics and reporting, remote logging, or deployment in the cloud, on desktop, or on embedded hardware.

!!! info "Licence Required for Remote Access and User Accounts"
    A service serves the web interface to other machines. Opening the web interface from another machine, and creating user accounts and roles, need the **Profinity Server** licensed feature, which the Server and Enterprise editions include. A new installation that is not a Desktop host starts a one-time 14-day local trial with the Server features, and then drops to the unlicensed feature set, so apply a licence file under **ADMIN > License** before the trial ends. See [Licensing](../Administration/Licensing.md).

## Linux Setup

On Linux, Profinity runs as a systemd service through the `profinity.sh` launcher in the install root (`/opt/profinity` by default). Install Profinity first by following the [bootstrap installer](./Zip_Installation.md#bootstrap-installer) steps in the macOS and Linux installation guide, which also creates the `profinity` service user and the unit file described below. These instructions cover systemd, which the installer supports; on a distribution without systemd, follow that distribution's documentation for running a daemon.

### Two Ways to Start Profinity

`profinity.sh` supports an interactive foreground run and a systemd-managed service, selected by the `-s` (`--service`) flag. Running `/opt/profinity/profinity.sh` in a terminal starts Profinity in the foreground, which suits testing a configuration before you enable the service, and Ctrl+C stops it. Running `systemctl start profinity` starts the service, whose unit runs `profinity.sh -s` so that Profinity runs as a background service; the `-s` flag does not select the user account that Profinity runs under.

### Review the systemd Unit

The installer writes `/etc/systemd/system/profinity.service` with the following content:

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

Adjust `WorkingDirectory` and `ExecStart` if Profinity was installed with a different `--install-dir`. If Profinity was installed with `--no-systemd` or from an archive, create this file manually, create the `profinity` user and set up the [artefacts directory](./Artifacts_Directory.md) first.

### Enable and Start the Service

The installer already enables the unit, so only the start command is normally required. After you edit the unit file directly, run `sudo systemctl daemon-reload` to reload the systemd manager configuration. To enable the service at boot again if it was disabled, run `sudo systemctl enable profinity.service`, and to start it, run:

```bash
sudo systemctl start profinity.service
```

To update an installed copy, see [Updating](./Zip_Installation.md#updating). Environment variables for a service belong in the `[Service]` section of the unit as `Environment=` lines, because a service does not read `~/.bashrc`; see [Environment Variables](./Environment_Variables.md).

## macOS Setup

On macOS, Profinity is installed with the same [bootstrap installer](./Zip_Installation.md#bootstrap-installer) as Linux, into the same install root (`/opt/profinity` by default), with the `profinity.sh` launcher shipped in that install root. `launchd` runs Profinity as a service on macOS, in the same role systemd fills on Linux.

### Create a launchd Plist File

1. Open a terminal and create a new plist file:
   ```bash
   sudo nano /Library/LaunchDaemons/com.profinity.service.plist
   ```

2. Add the following content to the file:
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

Adjust `/opt/profinity` if Profinity was installed to a different location (`install.sh --install-dir`). Always start Profinity through `profinity.sh` rather than by invoking `dotnet Profinity.dll` directly, because `profinity.sh` resolves the installed edition, runs preflight checks, and bootstraps the .NET runtime for the portable macOS build when required. The plist uses `-b` (`--background`), which logs to file and console instead of depending on an interactive console session, rather than `-s` (`--service`), which selects service-mode host integration only on Windows and Linux (systemd).

### Load and Start the Service

1. Load the service:
   ```bash
   sudo launchctl load /Library/LaunchDaemons/com.profinity.service.plist
   ```

2. Start the service:
   ```bash
   sudo launchctl start com.profinity.service
   ```

## Windows Setup

The installation directory of Profinity contains a file called `ProfinityService.cmd`. With default configuration options, the file is located here:

`C:\Program Files (x86)\Prohelion\Profinity\ProfinityService.cmd`

!!! warning "The Windows Service Needs a Server Licence to Accept Remote Connections"
    `ProfinityService.cmd` registers `Profinity.exe`, the Windows desktop application, as the service. Without a Server licence the service serves its web interface to the local machine only, on 127.0.0.1. With a Server licence applied under **ADMIN > License**, it uses the address set under [Profinity Web](../Administration/System_Configuration/Profinity_Web.md) and creates the default `admin` account (password change required at first sign-in), so other machines can sign in. A service has no application window, so apply the licence file before you rely on remote access, and expect the engine to restart when you apply it. See the note on local connections in [Windows Installation](./Windows_Installation.md).

Running the script requires administrator privileges, so open a command prompt as an administrator by searching for cmd, right-clicking it, and selecting **Run as administrator**.

A default installation installs the service under the LocalSystem user. Prohelion recommends installing Profinity under a dedicated user account instead, because a dedicated account holds fewer privileges than LocalSystem and keeps the artefacts directory out of the Windows directory. When Profinity runs as a service, it resolves its [artefacts directory](./Artifacts_Directory.md) in the same way as the desktop application, as `%LOCALAPPDATA%\Prohelion\Profinity` of the account that the service runs under. For LocalSystem that folder is inside the system profile (for the 32-bit Windows build, beneath `C:\Windows\SysWOW64\config\systemprofile\AppData\Local\Prohelion\Profinity`), which is inside the Windows directory and is difficult to work with, and Prohelion does not recommend modifying files in the Windows directory directly.

To install Profinity under a user account, run the following command, where the bracketed value is the account name:

```bat
ProfinityService.cmd install [Username to install under]
```

Profile files are then created within that user's account directories. To install Profinity under the LocalSystem user instead, run:

```bat
ProfinityService.cmd install
```

Once complete, Profinity appears in the Windows Services list and can be managed like any other service. To place the artefacts directory at a path of your choosing instead, set the `PROFINITY_HOME` system environment variable before the service starts, for example by running `setx PROFINITY_HOME "D:\ProfinityData" /M` from an administrator command prompt, and restart the service so that it reads the new value.

!!! warning "Port Conflicts"
    Once Profinity is started as a service, starting another instance with the same configuration on the same machine causes a port conflict on the API or web content ports. To serve content and develop on the same machine at the same time, install Profinity under a separate user account, and use different ports for the development and production instances by changing the port in the Config file.

### Uninstall Profinity as a Windows Service

To uninstall Profinity as a Windows Service, run the command below as an administrator from the command prompt.

```bat
ProfinityService.cmd uninstall
```

## Verification

On Linux, check the status of the service with `sudo systemctl status profinity.service`. On macOS, run `sudo launchctl list | grep com.profinity.service`, which lists the service when it is loaded. On Windows, open the Services app, find Profinity in the list and confirm that its status is **Running**.

## Troubleshooting

If the service does not start, read the log with `journalctl -u profinity.service` on Linux, the Console application on macOS, or the Event Viewer on Windows. A permission error on `/var/lib/prohelion` means the service user does not own the artefacts directory, which `sudo chown -R profinity:profinity /var/lib/prohelion` fixes. A "file not found" error means the path to `profinity.sh` in the unit or plist, or the installation directory on Windows, does not match where Profinity is installed, so correct the path in the service configuration and start the service again.
