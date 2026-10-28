---
title: Connect Profinity Mobile to a server
description: Turn on server discovery on the Profinity server, then connect the Profinity Mobile app from a phone on the same Wi-Fi network.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Connect Profinity Mobile to a server

To connect Profinity Mobile to a server, check the discovery settings on the Profinity server, then select the server from the app's discovery list.
You need the app installed on the phone (refer to [Profinity Mobile](index.md)).
Phones reach the server only when other machines can open its web interface, which depends on the installation type and licence (refer to [Who can sign in, by installation type](../Installation/Applying_a_Licence.md#who-can-sign-in)).

## Enable server discovery

Phones find a server only while it broadcasts a heartbeat, so check these settings on the Profinity server first.
The server sends heartbeats only while the web server is running and the machine has at least one network address other than loopback.

1. On the Profinity server, select **ADMIN** in the side menu, then [**System Configuration**](../Administration/System_Configuration/index.md), then the **Discovery** tab.
2. Check the four settings in this table, which [Discovery](../Administration/System_Configuration/Discovery.md) describes.

| Setting | Description |
|---------|-------------|
| **Profinity Server Name** | The friendly name shown in the mobile list, which defaults to the host name of the machine (for example `Workshop-Profinity`) |
| **Send Profinity Heartbeat** | Turns the broadcast on or off, and is on by default |
| **Heartbeat UDP port** | The UDP port of the broadcast, 49025 by default |
| **Heartbeat interval (seconds)** | The time between broadcasts, from 1 to 60 seconds, 3 by default |

<figure markdown>
![The Discovery tab of the System Configuration dialog, showing a Server Discovery section with a ticked Send Profinity Heartbeat box, a Profinity Server Name field, a Heartbeat UDP Port field and a Heartbeat Interval in seconds.](../images/config-server-discovery.png)
<figcaption>Server Discovery heartbeat settings</figcaption>
</figure>

Saving System Configuration restarts Profinity.
The mobile app listens for the broadcast on UDP port 49025 by default.
If you change the **Heartbeat UDP port**, the app build must use the same port (refer to [OEM white-label mobile builds](OEM_White_Label.md)).
Each entry in the app's discovery list shows the server name, the active profile, and the server's network addresses.

## Connect from the app

1. Connect the phone to the same Wi-Fi network as the Profinity server.
2. Open Profinity Mobile.
   The discovery list shows the servers that are broadcasting a heartbeat.
3. Select your server and connect.
   The app opens the server's web sign-in page inside the app.
4. Sign in with your Profinity user name and password.
   If the site uses single sign-on (SSO), sign in with SSO instead, and answer the two-factor prompt if the site requires one.

The app uses HTTPS when the server has it configured.
If the active profile has Kiosk Mode enabled, the page signs in automatically as the kiosk user.

To return to the server list, swipe from the left edge of the screen on iOS.
On Android, use the system back action, which first steps back through the pages you opened in the app.
A certificate warning that you accepted for a server stays accepted when you go back.

If the discovery list is empty or sign-in does not complete, refer to [Troubleshoot Profinity Mobile](Troubleshoot_Profinity_Mobile.md).
