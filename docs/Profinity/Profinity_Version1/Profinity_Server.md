---
title: Profinity Server
---

# Profinity Server Mode

As of version 1.11 Profinity is now available to run in server mode on Windows, Docker, MacOS and Linux (64 bit Intel and Arm chips only).  

In this mode, the Profinity GUI is replaced by a Custom UI you can develop and extend, supported by our REST APIs.

!!! info "Why Profinity Server?"
    Do you have a CAN Bus based platform and want to provide modern API centric front ends to support user kiosks or other advanced user interfaces, sophisticated modern data analytics and reporting, remote logging or to run your solution in the cloud, desktop, or embedded hardware?  Profinity Server supports this need.

Prohelion provides the [Windows Profinity release](https://github.com/Prohelion/Profinity/releases/latest/download/Profinity.install.msi) for general public use.  It is designed for developers who are using the [Rest API and Kiosk / Web Hosting](Profinity_Rest_APIs.md) capabilities of Profinity to develop and test their solutions.  

This Windows release can be used for development and testing without any additional licensing.

Profinity Server does not require any additional Prohelion Hardware to run. It can be used as a general purpose development framework for anyone writing modern web UI's for CAN Bus based architectures or wanting to provide a modern server style interface to your CAN infrastructure with native cloud connectivity.  

However, if you are not using Prohelion hardware, you will still need some way to connect to your CAN Bus network, see the [CAN Adapters](CAN_Bus_Adapters.md) page for information on supported CAN Bus adapters that you can use.

!!! info "Licensing for Production Environments"
    Use of Profinity server in production environments on Windows, Docker, Linux or MacOS may require an additional license key depending on your commercial status with Prohelion.

    If you are interested in using the tools for your Production environments and do not currently have a Profinity Server arrangement with us, please contact Prohelion on the <a href="https://www.prohelion.com/contact-us/">Contact Us Page</a> of our website and we would be happy to assist with additional information.

## Platform Support

Profinity supports operating in service mode on Windows, Linux, MacOS and inside a Docker container.  

!!! info "Support for other Environments"
    If you would like access to our docker, Linux and MacOS software you will need to contact us first as we do not currently provide these downloads directly to the public.
    
    Please contact Prohelion on the <a href="https://www.prohelion.com/contact-us/">Contact Us Page</a> of our website and we would be happy to assist with additional information.

## Running as a Service

In the 'headless' service mode, Profinity continues to operate as normal with some minor differences in behaviour.

- There is no GUI, the server can only be accessed via the APIs and Web Interfaces.

- Profile files if they need to be chanced, are edited directly rather than through the GUI.  When a Profile file is changed Profinity detects this change and automatically reloads the Profile.

- Config files are also edited directly, changing a Config file requires a service restart.

- Profinity Logs are logged as normal and available in the Log directory under

`[user]/Documents/Prohelion/Profinity/Logs`

## Installing Profinity as a Windows Service

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