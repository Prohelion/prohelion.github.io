---
title: OPC UA certificates
description: Find where the OPC UA Client and OPC UA Server keep their application certificates on each platform, and how to trust a certificate explicitly.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# OPC UA certificates

The Open Platform Communications Unified Architecture (OPC UA) components, the [OPC UA Client](OPC_UA_Client.md) and the [OPC UA Server](OPC_UA_Server.md), keep their application certificates in the `opcua_pki` folder.
The folder is inside the Profinity data folder of the account that runs Profinity.
Its sub-folders are `own`, `trusted`, `issuer` and `rejected`.
The folder is at:

- Windows: `%LocalAppData%\Prohelion\Profinity\opcua_pki`
- macOS: `~/Library/Application Support/Prohelion/Profinity/opcua_pki`
- Linux: `~/.local/share/Prohelion/Profinity/opcua_pki`

The folder follows the home folder of the account that runs Profinity, not the `PROFINITY_HOME` setting or the `/var/lib/prohelion/profinity` data folder.
In Docker it therefore sits inside the container rather than in the data volume, and the certificates are created again if the container is recreated.
For a Windows service that runs as LocalSystem, the folder is under `C:\Windows\SysWOW64\config\systemprofile\AppData\Local\Prohelion\Profinity` on 64-bit Windows.

To trust a certificate explicitly, rather than trusting all, place it in `trusted`.
Profinity places refused certificates in `rejected`.
A connection that fails on a certificate leaves the refused certificate there, and you can move it into `trusted` once you have confirmed it.

The **Trust all server certificates** setting of the OPC UA Client and the **Trust all client certificates** setting of the OPC UA Server skip certificate validation instead.
They are described on the [OPC UA Client](OPC_UA_Client.md) and [OPC UA Server](OPC_UA_Server.md) pages.
