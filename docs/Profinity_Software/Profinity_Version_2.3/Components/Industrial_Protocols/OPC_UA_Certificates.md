---
title: OPC UA certificates
description: Find where the OPC UA Client and OPC UA Server keep their application certificates on each platform, and how to trust a certificate explicitly.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# OPC UA certificates

The [OPC UA Client](OPC_UA_Client.md) and the [OPC UA Server](OPC_UA_Server.md) keep their application certificates in the `opcua_pki` folder inside the Profinity data folder of the account that runs Profinity, in the `own`, `trusted`, `issuer` and `rejected` sub-folders.
On Windows the folder is `%LocalAppData%\Prohelion\Profinity\opcua_pki`, on macOS it is `~/Library/Application Support/Prohelion/Profinity/opcua_pki`, and on Linux it is `~/.local/share/Prohelion/Profinity/opcua_pki`.
The folder follows the home folder of the account that runs Profinity, not the `PROFINITY_HOME` setting or the `/var/lib/prohelion/profinity` data folder, so in Docker it sits inside the container rather than in the data volume, and the certificates are created again if the container is recreated.
For a Windows service that runs as LocalSystem, the folder is under `C:\Windows\SysWOW64\config\systemprofile\AppData\Local\Prohelion\Profinity` on 64-bit Windows.

To trust a certificate explicitly, rather than trusting all, place it in `trusted`.
Certificates that are refused are placed in `rejected`, so a connection that fails on a certificate leaves the refused certificate there to move into `trusted` once you have confirmed it.

The **Trust all server certificates** setting of the OPC UA Client and the **Trust all client certificates** setting of the OPC UA Server skip certificate validation instead, and are described on the [OPC UA Client](OPC_UA_Client.md) and [OPC UA Server](OPC_UA_Server.md) pages.
