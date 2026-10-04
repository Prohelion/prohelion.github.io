---
title: Profinity Mobile
description: "Connect to Profinity from iOS or Android with UDP server discovery, HTTPS support, and kiosk mode."
---

# Profinity Mobile

**Profinity Mobile** is a companion app for iOS and Android that connects to a Profinity engine over HTTPS and displays the web UI in a mobile shell. Profinity 2.3 adds **UDP heartbeat discovery**, so that devices on the same local area network (LAN) can find servers without typing URLs.

## Install the app

Install **Profinity Mobile** from your organisation's app distribution channel (App Store, TestFlight, Play Store, or an OEM build).

For OEM white-label builds, see [OEM white-label](./OEM_White_Label.md).

## Enable server discovery on the engine

1. On the Profinity server, select **ADMIN** in the side menu, then **System Configuration**.
2. Locate **Server Discovery** (application configuration section).
3. Configure:
    - **Profinity Server Name** — friendly name shown in the mobile list, which defaults to the host name of the machine (for example `Workshop-Profinity`).
    - **Send Profinity Heartbeat** — enabled by default.
    - **Heartbeat UDP port** — default **49025**.
    - **Heartbeat interval (seconds)** — heartbeat broadcast interval, from 1 to 60 seconds, with a default of 3.

<figure markdown>
![Server Discovery settings in System Configuration](../../../assets/images/2.3/2.3-config-server-discovery.png)
<figcaption>Server Discovery heartbeat settings (screenshot placeholder — provide SS-28)</figcaption>
</figure>

Saving config.yaml restarts the engine.

## Discovery protocol

Profinity Mobile listens for UDP broadcasts on port **49025** (default), and the JSON payload has the root key **`ProfinityHeartbeat`**.

Each heartbeat is a single UTF-8 JSON datagram, and a datagram is valid only when it holds the `ProfinityHeartbeat` root object. That object carries the product `version` (which must match the app, currently `2.3`), the `serverName`, the list of `serverIps` (a datagram with an empty list is ignored), the `activeProfile`, the `httpPort` and `httpsPort`, and a `preferHttps` flag that tells the app to try HTTPS first.

!!! warning "Not CAN bridge beacons"
    Profinity heartbeat uses port **49025**, whereas CAN Ethernet bridge discovery uses a different port (42000), so the two must not be confused.

## Connect from the app

1. Connect the phone to the **same Wi-Fi** network as the Profinity server.
2. Open Profinity Mobile, where the **discovery list** shows servers broadcasting heartbeat.
3. Select your server and connect (HTTPS is preferred when configured).

<figure markdown>
![Mobile app server discovery list on a physical phone](../../../assets/images/2.3/2.3-mobile-discovery-list.png)
<figcaption>Server discovery list — must be captured on a physical device (provide SS-29)</figcaption>
</figure>

<figure markdown>
![Mobile app connected home WebView](../../../assets/images/2.3/2.3-mobile-connected-home.png)
<figcaption>Connected mobile session (provide SS-30)</figcaption>
</figure>

## Login modes

| Mode | Description |
|------|-------------|
| **Password** | Standard Profinity login (respects site Local/SSO policy in the WebView) |
| **Kiosk** | Auto-login with a configured kiosk user (see [Kiosk Mode](../Administration/Kiosk_Mode.md)) |

Back navigation returns to server selection without clearing any server TLS trust prompts that have been accepted.

## Troubleshooting

| Issue | Remedy |
|-------|--------|
| No servers in list | Confirm heartbeat is enabled, the phone and server are on the same subnet, and the firewall allows UDP 49025 |
| Android emulator list is empty | Emulators **cannot** receive LAN broadcasts, so use a **physical phone** |
| Certificate warnings | Install a trusted HTTPS certificate on the server, or accept the prompt once per server |
| SSO in mobile WebView | The site must use the **Sso** sign-in method, and the identity provider (IdP) flow is completed in the embedded browser |

## Related documentation

- [OEM white-label](./OEM_White_Label.md)
- [Kiosk Mode](../Administration/Kiosk_Mode.md)
- [Settings registry](../Extending_Profinity/Configuration/Settings_Registry.md) - the **Server Discovery** settings
- [SSO and sign-in method](../Administration/Security/SSO_and_Sign_In.md)
- [Release notes 2.3.10](../Release_Notes/2.3.10.md)
