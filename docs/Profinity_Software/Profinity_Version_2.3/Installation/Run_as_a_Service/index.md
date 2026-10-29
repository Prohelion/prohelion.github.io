---
title: Run Profinity as a service
description: "Choose how to run Profinity as a service on Linux, macOS, or Windows so it starts automatically on boot, and check the licence that remote access needs."
type: concept
owner: Documentation
last_reviewed: 2026-10-15
---

# Run Profinity as a service

Run Profinity as a service to start it automatically on boot and restart it if it fails, which suits production environments where uptime matters.
Install Profinity first, using the page for your platform: [Install Profinity on Windows](../Windows_Installation.md), [Install Profinity on Linux and macOS](../Linux_and_macOS_Installation.md), or [Install Profinity with Docker](../Docker/index.md).
In Docker, configure Docker to start the container on boot instead.

As of Profinity V2, Profinity runs in server mode on Docker, macOS, and Linux (x86-64 and 64-bit Advanced RISC Machine (ARM), plus 32-bit ARM on Linux).
On Windows the service runs the desktop application, and becomes a server when a Server licence is applied.
In server mode the user interface is available only through a browser.
Representational State Transfer (REST) APIs serve it, and those APIs are also available to [custom applications](../../Customising_Profinity/Hosting/index.md) hosted on the Profinity Server.

A service serves the web interface to other machines, which needs a Server licence or the 14-day local trial.
Apply a licence file under **ADMIN > License** before the trial ends, as described in [Apply a licence](../Applying_a_Licence.md).
For the accounts that can sign in, refer to [Who can sign in, by installation type](../Applying_a_Licence.md#who-can-sign-in).

Each operating system has its own procedure:

- [Run Profinity as a Linux service](./Run_as_a_Linux_Service.md): a systemd unit that runs `profinity.sh`.
- [Run Profinity as a macOS service](./Run_as_a_macOS_Service.md): a launchd plist.
- [Run Profinity as a Windows service](./Run_as_a_Windows_Service.md): the `ProfinityService.cmd` script.
