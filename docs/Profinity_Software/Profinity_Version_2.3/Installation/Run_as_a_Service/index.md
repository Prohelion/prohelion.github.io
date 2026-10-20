---
title: Run Profinity as a service
description: "Choose how to run Profinity as a service on Linux, macOS, or Windows so it starts automatically on boot, and check the licence that remote access needs."
type: concept
owner: Documentation
last_reviewed: 2026-10-15
---

# Run Profinity as a service

Run Profinity as a service to start it automatically on boot and restart it if it fails, which suits production environments where uptime matters.
Install Profinity first, using the page for your platform: [Windows](../Windows_Installation.md), [Linux and macOS](../Linux_and_macOS_Installation.md), or [Docker](../Docker_Installation.md).
In Docker, configure Docker to start the container on boot instead.

As of Profinity V2, Profinity runs in server mode on Docker, macOS, and Linux (x86-64 and 64-bit ARM, plus 32-bit ARM on Linux).
On Windows the service runs the desktop application, and becomes a server when a Server licence is applied.
In server mode the user interface is available only through a browser, and it is served by REST APIs that are also available to [custom applications](../../Customising_Profinity/Hosting/index.md) hosted on the Profinity Server.

A service serves the web interface to other machines.
Opening the web interface from another machine, and creating user accounts and roles, need the **Profinity Server** licensed feature, which the Server and Enterprise editions include.
A new installation that is not a Desktop host starts a one-time 14-day local trial with the Server features, so apply a licence file under **ADMIN > License** before the trial ends, as described in [Apply a licence](../Applying_a_Licence.md).

Each operating system has its own procedure:

- [Run Profinity as a Linux service](./Run_as_a_Linux_Service.md): a systemd unit that runs `profinity.sh`.
- [Run Profinity as a macOS service](./Run_as_a_macOS_Service.md): a launchd plist.
- [Run Profinity as a Windows service](./Run_as_a_Windows_Service.md): the `ProfinityService.cmd` script.
