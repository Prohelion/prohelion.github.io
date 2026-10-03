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

1. On the Profinity server, open **System Configuration**.
2. Locate **Server Discovery** (application configuration section).
3. Configure:
    - **Server name** — friendly name shown in the mobile list (for example `Profinity-Docs-Demo`).
    - **Send heartbeat** — enabled.
    - **UDP port** — default **49025**.
    - **Interval** — heartbeat broadcast interval.

<figure markdown>
![Server Discovery settings in System Configuration](../../../assets/images/2.3/2.3-config-server-discovery.png)
<figcaption>Server Discovery heartbeat settings (screenshot placeholder — provide SS-28)</figcaption>
</figure>

Saving Config.yaml restarts the engine.

## Discovery protocol

Profinity Mobile listens for UDP broadcasts on port **49025** (default), and the JSON payload has the root key **`ProfinityHeartbeat`**.

Full wire format: engineering [PROFINITY-HEARTBEAT.md](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Profinity-Mobile/docs/PROFINITY-HEARTBEAT.md).

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
