---
title: Troubleshoot Profinity Mobile
description: Fix an empty server list, Docker discovery, emulator, certificate warning, and single sign-on problems in the Profinity Mobile app.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Troubleshoot Profinity Mobile

This page lists the discovery, certificate, and sign-in problems that Profinity Mobile can show, with the remedy for each.
To set up discovery first, refer to [Connect Profinity Mobile to a server](Connect_Profinity_Mobile_to_a_Server.md).

| What you see | Cause | What to do |
|--------------|-------|------------|
| The screen shows **Searching the local network…** and no servers. | **Send Profinity Heartbeat** is off, the phone and server are on different subnets, the firewall blocks UDP port 49025, or the network blocks broadcast traffic between Wi-Fi and wired segments or virtual LANs (VLANs). | Confirm that **Send Profinity Heartbeat** is on, that the phone and server are on the same subnet, that the firewall allows UDP port 49025, and that the network allows broadcast traffic between Wi-Fi and wired segments or VLANs. |
| No servers in the list, and Profinity runs in Docker. | UDP broadcasts stay inside a Docker bridge network. | Run the container with host networking on Linux (refer to [Install Profinity with Docker](../Installation/Docker/index.md)). |
| The Android emulator list is empty. | Emulators cannot receive LAN broadcasts. | Use a physical phone. |
| Certificate warnings appear. | The server does not have a trusted HTTPS certificate. | Install a trusted HTTPS certificate on the server, or accept the prompt once per server. |
| Single sign-on (SSO) does not complete. | SSO needs the site to use the **Sso** sign-in method. | Confirm the site uses the **Sso** sign-in method, and complete the identity provider (IdP) sign-in in the app's embedded browser. |

For single sign-on setup, refer to [SSO and sign-in method](../Administration/System_Configuration/Security/SSO_and_Sign_In.md).
For the server-side discovery settings, refer to [Discovery](../Administration/System_Configuration/Discovery.md).
