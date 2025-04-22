---
title: Running Profinity as a Service or Daemon
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the documentation public.  To get access to the Profinity V2 installers, please log a support request at the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals) requesting access to the Early Adopter release.

# Running Profinity as a Service

This guide provides instructions on how to run Profinity as a service on Windows and Unix-based systems, ensuring that it starts automatically on boot and restarts if it fails.

## Table of Contents

- [Introduction](#introduction)
- [Linux Setup](#linux-setup)
- [macOS Setup](#macos-setup)
- [Windows Setup](#windows-setup)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Introduction

Running Profinity as a service allows you to automate its startup and ensure continuous operation. This is particularly useful for production environments where reliability and uptime are critical.  

As of version 2 Profinity is now available to run in server mode on Windows, Docker, MacOS and Linux (64 bit Intel and Arm chips only).  

In this mode, the Profinity GUI is only available via the browser (there is no Desktop support) and is supported by our REST APIs, which is also available to your [custom applications](../Extending_Profinity/Hosting/index.md) which you can host on the Profinity Server.

!!! info "Why Profinity Server?"
    Do you have a CAN Bus based platform and want to provide modern API centric front ends to support user kiosks or other advanced user interfaces, sophisticated modern data analytics and reporting, remote logging or to run your solution in the cloud, desktop, or embedded hardware?  Profinity Server supports this need.

## Hardware Requirements

Profinity Server does not require any additional Prohelion Hardware to run. It can be used as a general purpose development framework for anyone writing modern web UI's for CAN Bus based architectures or wanting to provide a modern server style interface to your CAN infrastructure with native cloud connectivity.  

However, if you are not using Prohelion hardware, you will still need some way to connect to your CAN Bus network, see the [CAN Adapters](../Components/Adaptors/CAN_Bus_Adapters.md) page for information on supported CAN Bus adapters that you can use.

!!! info "Licensing for Production Environments"
    Use of Profinity server in production environments on Windows, Docker, Linux or MacOS may require an additional license key depending on your commercial status with Prohelion.

    If you are interested in using the tools for your Production environments and do not currently have a Profinity Server arrangement with us, please contact Prohelion on the <a href="https://www.prohelion.com/contact-us/">Contact Us Page</a> of our website and we would be happy to assist with additional information.

!!! info "Running in Docker"
    Note if you are running Profinity inside Docker, then it is Docker not Profinity that you need to setup as a service, you then need to configure Docker to automatically start the Profinity Docker container when it starts up.  See the Docker Documentation for more details.

In the 'headless' service mode, Profinity continues to operate as normal with some minor differences in behaviour.

- There is no GUI, the server can only be accessed via the APIs and Web Interfaces.
- Profile files if they need to be chanced, are edited directly rather than through the GUI.  When a Profile file is changed Profinity detects this change and automatically reloads the Profile.
- Config files are also edited directly, changing a Config file requires a service restart.
- Profinity Logs are logged as normal and available in the Log directory under

`[user]/Documents/Prohelion/Profinity/Logs`

# Linux Setup

To run Profinity as a service on Linux, you can use `systemd`, a system and service manager for Linux operating systems.

!!! info "Things can vary on Linux from version to version"
    These instructions are provided as a guide, but depending on your version of Linux, things might be different.  Check the documentation for your release on how to setup a daemon or service if these instructions are not working for you.

### Step 1: Create a systemd Service File

1. Open a terminal and create a new service file:
   ```bash
   sudo nano /etc/systemd/system/profinity.service
   ```

2. Add the following content to the file:
   ```ini
   [Unit]
   Description=Profinity Service
   After=network.target

   [Service]
   ExecStart=/usr/bin/dotnet /path/to/Profinity.dll
   Restart=always
   User=your-username
   Group=your-group
   Environment=ASPNETCORE_ENVIRONMENT=Production

   [Install]
   WantedBy=multi-user.target
   ```
   Replace `/path/to/Profinity.dll` with the actual path to your Profinity DLL file.

### Step 2: Enable and Start the Service

1. Reload the systemd manager configuration:
   ```bash
   sudo systemctl daemon-reload
   ```

2. Enable the service to start on boot:
   ```bash
   sudo systemctl enable profinity.service
   ```

3. Start the service:
   ```bash
   sudo systemctl start profinity.service
   ```

# macOS Setup

On macOS, you can use `launchd` to run Profinity as a service.

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
           <string>/usr/local/bin/dotnet</string>
           <string>/path/to/Profinity.dll</string>
       </array>
       <key>RunAtLoad</key>
       <true/>
       <key>KeepAlive</key>
       <true/>
   </dict>
   </plist>
   ```
   Replace `/path/to/Profinity.dll` with the actual path to your Profinity DLL file.

### Step 2: Load and Start the Service

1. Load the service:
   ```bash
   sudo launchctl load /Library/LaunchDaemons/com.profinity.service.plist
   ```

2. Start the service:
   ```bash
   sudo launchctl start com.profinity.service
   ```

# Windows Setup

In the installation directory of Profinity you will find a file called ProfinityService.cmd.  If default configuration options have been selected for the installation directory, the file is typically found here.

`C:\Program Files (x86)\Prohelion\Profinity\ProfinityService.cmd`

In order to run the script, you will need to be an administrator.  Open a cmd window as an administrator by searching for cmd, right clicking on it, selecting 'Run As Administrator'.

While a default installation of the service can be performed to install the service under the service user of LocalSystem.  We would generally recommend installing Profinity under a different user account, for two reasons.

#### Security
By running Profinity as a user you are reducing the security level and hence exposure

#### Profile files
When running as a service, the Prohelion home directory of the service user is

`C:\Windows\SysWOW64\Prohelion\Profinity`

This can be hard to work with in some environments and generally we would not want to be regularly modifying files stored in the Windows directory.  As such you are generally better off installing Profinity under a user account using a command such as.

```
ProfinityService.cmd install [Username to install under]
```

As the Profile files then get created in that users account directories.

If you do wish to install Profinity under the LocalSystem user, then simply run.

```
ProfinityService.cmd install
```

Once this is done you will find Profinity in your Windows Services list and it can be managed as per any other service.

!!! warning "Port Conflicts"
    Once Profinity is started as a service, if you are serving API or Web content then there will be a conflict on those ports if you try to start another instance of Profinity on the machine with the same configuration.  If you want to both serve content and develop on one machine at the same time, we suggest installing Profinity under a separate user account to keep these instances from conflicting and use different ports for your development and production instances, by changing the port in the Config file.

## Uninstall Profinity as a Windows Service

To uninstall Profinity as a Windows Service, run the command below as an administrator from the cmd window.

```
ProfinityService.cmd uninstall
```

### Script Explanation

The batch script performs the following actions:

- **Checks for Administrative Permissions**: Ensures the script is run with the necessary permissions to manage services.
- **Installs the Service**: Uses the `sc create` command to install Profinity as a service. If a user account is provided, it configures the service to run under that account.
- **Uninstalls the Service**: Uses the `sc delete` command to remove the Profinity service.
- **Error Handling**: Provides feedback if the script is not run with administrative permissions or if incorrect parameters are provided.

This script simplifies the process of managing Profinity as a service on Windows, ensuring it can start automatically and run with the necessary permissions.

# Verification

To verify that the service is running correctly, you can use the following commands:

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

# Troubleshooting

- **Service Fails to Start**: Check the logs for errors using `journalctl -u profinity.service` on Linux or `sudo launchctl log show` on macOS and the Event Log in Windows.
- **Permission Issues**: Ensure the service file has the correct permissions and the user/group settings are correct.
- **Path Errors**: Double-check the path to the Profinity DLL file in the service configuration.

