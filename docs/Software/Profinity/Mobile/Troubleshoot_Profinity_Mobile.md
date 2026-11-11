---
title: Troubleshoot Profinity Mobile
description: Fix an empty server list, emulator, certificate warning, and single sign-on problems in the Profinity Mobile app.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Troubleshoot Profinity Mobile

This page lists the discovery, certificate, and sign-in problems that Profinity Mobile can show, with the remedy for each.
To set up discovery first, refer to [Connect Profinity Mobile to a server](Connect_Profinity_Mobile_to_a_Server.md).

| What you see | Cause | What to do |
|--------------|-------|------------|
| The screen shows **Searching the local network…** and no servers. | **Send Profinity heartbeat** is off, the phone and server are on different subnets, the firewall blocks the heartbeat UDP port (49025 by default), or the network blocks broadcast traffic between Wi-Fi and wired segments or virtual LANs (VLANs). | Confirm that **Send Profinity heartbeat** is on, that the phone and server are on the same subnet, that the firewall allows UDP port 49025, and that the network allows broadcast traffic between Wi-Fi and wired segments or VLANs. |
| The Android emulator list is empty. | Emulators cannot receive LAN broadcasts. | Use a physical phone. |
| A self-signed certificate prompt appears. | The server does not have a trusted HTTPS certificate. | Install a trusted HTTPS certificate on the server, as described in [HTTPS certificates](../Administration/System_Configuration/Profinity_Web.md#https-certificates), or accept the prompt once per server. |
| Single sign-on (SSO) does not complete. | SSO needs the site to use the **Sso** sign-in method. | Confirm that **Sign-in method** is set to **Sso** in System Configuration, and complete the identity provider (IdP) sign-in in the app's embedded browser. |

For single sign-on setup, refer to [SSO and sign-in method](../Administration/System_Configuration/Security/SSO_and_Sign_In.md).
For the server-side discovery settings, refer to [Discovery](../Administration/System_Configuration/Discovery.md).
