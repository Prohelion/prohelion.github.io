---
title: Running Profinity as a Service or Daemon
description: "Configure Profinity to run as a system service on Linux, macOS, or Windows with automatic startup and failure recovery."
---

# Running Profinity as a Service

This guide provides instructions on how to run Profinity as a service on Windows and Unix-based systems, ensuring that it starts automatically on boot and restarts if it fails.

## Table of Contents

- [Introduction](#introduction)
- [Hardware Requirements](#hardware-requirements)
- [Linux Setup](#linux-setup)
- [macOS Setup](#macos-setup)
- [Windows Setup](#windows-setup)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Introduction

Running Profinity as a service automates its startup and ensures continuous operation. This is particularly useful for production environments where reliability and uptime are critical.

As of version 2, Profinity is available to run in server mode on Windows, Docker, macOS and Linux (x86_64 and ARM64, plus 32-bit ARM on Linux).

In this mode, the Profinity GUI is available only via the browser (there is no desktop support). It is served by REST APIs, which are also available to [custom applications](../Customising_Profinity/Hosting/index.md) hosted on the Profinity Server.

!!! info "Why Profinity Server?"
    Profinity Server supports CAN bus based platforms that need an API-centric front end for user kiosks or other interfaces, data analytics and reporting, remote logging, or deployment in the cloud, on desktop, or on embedded hardware.

## Hardware Requirements

Profinity Server does not require any additional Prohelion hardware to run. It can be used as a general-purpose development framework for building web UIs for CAN bus based architectures, or for providing a server interface to CAN infrastructure with cloud connectivity.  

When not using Prohelion hardware, a way to connect to the CAN bus network is still required; see the [CAN Adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) page for supported CAN bus adapters.

!!! info "Licensing for Production Environments"
    Use of Profinity Server in production environments on Windows, Docker, Linux or macOS may require an additional licence key, depending on the commercial arrangement with Prohelion.

    For production environments without an existing Profinity Server arrangement, contact Prohelion through the <a href="https://www.prohelion.com/contact-us/">Prohelion contact page</a> for further information.

!!! info "Running in Docker"
    If Profinity is running inside Docker, Docker rather than Profinity is configured as a service: configure Docker to start the Profinity container automatically on startup. See the Docker documentation for details.

## Linux Setup

On Linux, Profinity runs as a systemd service through the `profinity.sh` launcher in the install root (`/opt/profinity` by default). Install Profinity first by following the [bootstrap installer](./Zip_Installation.md#bootstrap-installer) steps in the macOS and Linux installation guide, which also creates the `profinity` service user and the unit file described below.

!!! info "Things can vary on Linux from version to version"
    These instructions are a guide, and the service setup can differ between Linux distributions and releases.  If they do not work, check the documentation for the distribution on how to set up a daemon or service.

### Two ways to start Profinity

`profinity.sh` supports both an interactive foreground run and a systemd-managed service, controlled by the `-s` (`--service`) flag:

| Mode | Command | Notes |
|------|---------|-------|
| **Interactive** | `/opt/profinity/profinity.sh` | Runs in the terminal; Ctrl+C stops it. Useful for testing a configuration before enabling the service. |
| **Service (systemd)** | `systemctl start profinity` | The unit's `ExecStart` runs `profinity.sh -s`. `-s` tells the engine to run in OS service mode (`UseSystemd()`); it does not select a Windows/Linux user account. |

### Step 1: Review the systemd Unit

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

### Step 2: Enable and Start the Service

The installer already enables the unit, so only the start command is normally required. The following commands reload the unit after manual changes, re-enable it if it was disabled, and start it:

1. Reload the systemd manager configuration (only needed after editing the unit file directly):
   ```bash
   sudo systemctl daemon-reload
   ```

2. Enable the service to start on boot (already done by `install.sh`):
   ```bash
   sudo systemctl enable profinity.service
   ```

3. Start the service:
   ```bash
   sudo systemctl start profinity.service
   ```

To update an installed copy, see [Updating](./Zip_Installation.md#updating).

## macOS Setup

On macOS, Profinity is installed with the same [bootstrap installer](./Zip_Installation.md#bootstrap-installer) as Linux, into the same install root (`/opt/profinity` by default), with the `profinity.sh` launcher shipped in that install root. `launchd` runs Profinity as a service on macOS, in the same role systemd fills on Linux.

### Step 1: Create a launchd Plist File

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
   Adjust `/opt/profinity` if Profinity was installed to a different location (`install.sh --install-dir`).

   Profinity must always be started through `profinity.sh` rather than by invoking `dotnet Profinity.dll` directly — `profinity.sh` resolves the installed edition, runs preflight checks, and bootstraps the .NET runtime for the portable/macOS build when required.

   `-s` (`--service`) is not used here: it selects service-mode host integration only on Windows and Linux (systemd), and has no macOS equivalent. `-b` (`--background`) is used instead, which logs to file and console rather than depending on an interactive console session, and runs on every platform `profinity.sh` supports.

### Step 2: Load and Start the Service

1. Load the service:
   ```bash
   sudo launchctl load /Library/LaunchDaemons/com.profinity.service.plist
   ```

2. Start the service:
   ```bash
   sudo launchctl start com.profinity.service
   ```

## Windows Setup

The installation directory of Profinity contains a file called ProfinityService.cmd. With default configuration options, the file is typically located here:

`C:\Program Files (x86)\Prohelion\Profinity\ProfinityService.cmd`

Running the script requires administrator privileges. Open a cmd window as an administrator by searching for cmd, right-clicking it, and selecting 'Run as Administrator'.

A default installation installs the service under the LocalSystem user. Installing Profinity under a different user account is generally recommended, for two reasons.

### Security

Running Profinity under a dedicated user account, rather than LocalSystem, reduces its privilege level and therefore its exposure.

### Profile files

When running as a service, Profinity resolves its [artefacts directory](./Artifacts_Directory.md) in the same way as the desktop application, as `%LOCALAPPDATA%\Prohelion\Profinity` of the account that the service runs under. For the default LocalSystem account that folder is inside the system profile (for the 32-bit Windows build, beneath `C:\Windows\SysWOW64\config\systemprofile\AppData\Local\Prohelion\Profinity`), which is inside the Windows directory and can be difficult to work with in some environments, and modifying files stored in the Windows directory directly is not generally recommended. Installing Profinity under a user account avoids this, and the `PROFINITY_HOME` system environment variable can be set to place the artefacts directory at a path of your choosing instead; for example:

```bat
ProfinityService.cmd install [Username to install under]
```

Profile files are then created within that user's account directories instead.

To install Profinity under the LocalSystem user instead, run:

```bat
ProfinityService.cmd install
```

Once complete, Profinity appears in the Windows Services list and can be managed like any other service.

!!! warning "Port Conflicts"
    Once Profinity is started as a service, starting another instance with the same configuration on the same machine causes a port conflict on the API or web content ports. To serve content and develop on the same machine at the same time, install Profinity under a separate user account, and use different ports for the development and production instances by changing the port in the Config file.

### Uninstall Profinity as a Windows Service

To uninstall Profinity as a Windows Service, run the command below as an administrator from the cmd window.

```bat
ProfinityService.cmd uninstall
```

#### Script Explanation

The batch script performs the following actions:

- **Checks for Administrative Permissions**: Ensures the script is run with the necessary permissions to manage services.
- **Installs the Service**: Uses the `sc create` command to install Profinity as a service. If a user account is provided, it configures the service to run under that account.
- **Uninstalls the Service**: Uses the `sc delete` command to remove the Profinity service.
- **Error Handling**: Provides feedback if the script is not run with administrative permissions or if incorrect parameters are provided.

This script simplifies the process of managing Profinity as a service on Windows, ensuring it can start automatically and run with the necessary permissions.

## Verification

The following checks verify that the service is running correctly.

### Linux

- Check the status of the service:
  ```bash
  sudo systemctl status profinity.service
  ```

### macOS

- Check the status of the service:
  ```bash
  sudo launchctl list | grep com.profinity.service
  ```

### Windows

Check the state of the service in the Windows Service Manager.

## Troubleshooting

- **Service Fails to Start**: Check the logs for errors using `journalctl -u profinity.service` on Linux or `sudo launchctl log show` on macOS and the Event Log in Windows.
- **Permission Issues**: Ensure the service file has the correct permissions and the user/group settings are correct.
- **Path Errors**: Double-check the path to `profinity.sh` (Linux/macOS) or the installation directory (Windows) in the service configuration.

