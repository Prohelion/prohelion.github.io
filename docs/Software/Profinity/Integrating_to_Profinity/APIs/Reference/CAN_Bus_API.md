---
title: CAN bus API
description: "Look up the endpoints that read CAN bus traffic and adapter status, send CAN packets once or on a schedule, and replay recorded CAN logs."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# CAN bus API

The CAN bus API, shown as CAN in Swagger, reads CAN bus traffic and adapter status, sends CAN packets once or on a schedule, and replays recorded CAN logs.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

Use these links to go to a section.

- [Live traffic and adapter status](#live-traffic-and-adapter-status)
- [Packet object](#packet-object)
- [Single packets](#single-packets)
- [Scheduled packets](#scheduled-packets)
- [CAN log replay](#can-log-replay)

!!! warning "A sent CAN packet commands live equipment"
    A packet sent or scheduled through these endpoints goes out on the live CAN bus through every connected adapter, and every device on the bus acts on it.
    A wrong CAN ID or data byte can start a motor or change a controller setpoint, and a scheduled packet keeps sending until it is stopped or removed.
    Give the **Send CAN messages** permission only to the users and applications that need it, and test a client against a bus with no live equipment on it first.

An endpoint that takes a CAN ID in its path or query accepts it in hex with a `0x` prefix, such as `0x501`, or as a decimal number, such as `1281`.
Profinity reads a value without the `0x` prefix as decimal, so write `0x501`, not `501`, for the hex ID 501.

## Live traffic and adapter status

These endpoints read the same traffic as the **SEND & RECEIVED CAN** window.
Refer to [Send / receive CAN bus messages](../../../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md) for the window itself.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/CAN` | **View CAN data** | Returns the latest copy of every packet, as a `received` object and a `sent` object, each keyed by CAN ID as a decimal number. |
| GET | `/api/v2/CAN/{canId}` | **View CAN data** | Returns the latest received packet with that CAN ID. An ID that Profinity has not received returns `404`. |
| GET | `/api/v2/CAN/Status` | **View CAN data** | Reports whether a [CAN bus adapter](../../../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md) is connected, and what the connected adapters support. |

Each packet in these responses has these fields:

| Field | Type | Meaning |
|-------|------|---------|
| `canIdAsHex` | Text | The CAN ID in hex with a `0x` prefix, such as `0x501`. |
| `canBusId` | Whole number | The same CAN ID as a decimal number, which is the key the packet has in `received` or `sent`. |
| `data` | Text | The data bytes as one hex string, two characters for each byte. |
| `dataLength` | Whole number | The number of data bytes. |
| `count` | Whole number | How many packets with this CAN ID Profinity has received, or sent for a packet in `sent`. |
| `cycleTimeMs` | Number | The milliseconds between this packet and the one before it with the same CAN ID, or `0` for the first. |
| `dataChanged` | True or false | `true` when the data bytes differ from the packet before it with the same CAN ID. |
| `extended` | True or false | `true` for a 29-bit extended identifier. |
| `rtr` | True or false | `true` for a remote frame. |
| `canFD` | True or false | `true` for a Controller Area Network Flexible Data-rate (CAN FD) frame. |
| `brs` | True or false | `true` when the bit rate switch flag of a CAN FD frame is set. |
| `bytePos0`, `short16Pos0`, `int32Pos0`, `floatPos0`, and the rest of each series | Number, or `null` | The data decoded at each position. The series `bytePos`, `int8Pos`, `short16Pos`, and `int32Pos` hold signed integers of 8, 8, 16, and 32 bits, the series `uBytePos`, `uInt8Pos`, `uShort16Pos`, and `uInt32Pos` hold the unsigned forms, and `floatPos` holds 32-bit floats. A position past the end of the data holds `null`. |

The packet also carries display fields that the **SEND & RECEIVED CAN** window uses, such as the hex value of each byte.

The status response has these fields:

| Field | Type | Meaning |
|-------|------|---------|
| `connected` | True or false | `true` when at least one adapter is connected. |
| `connectedCANFD` | True or false | `true` when an adapter is connected in CAN FD mode. |
| `supportsExtendedCAN` | True or false | `true` when a connected adapter can send 29-bit extended identifiers. |
| `supportsCANFD` | True or false | `true` when a connected adapter can send CAN FD frames. |

Check them before you send a packet that needs extended identifiers or CAN FD.

## Packet object

`POST /api/v2/CAN` and the add and update endpoints in [Scheduled packets](#scheduled-packets) take a packet object in a JSON body, with these fields:

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `canIdAsHex` | Text | None | The CAN ID in hex, such as `0x501`. Required. |
| `data` | Text | None | The data bytes in hex, two characters for each byte. |
| `dataLength` | Whole number | `8` | The number of data bytes. |
| `extended` | True or false | `false` | Sends a 29-bit extended identifier. |
| `canFD` | True or false | `false` | Sends a CAN FD frame. |
| `brs` | True or false | `false` | Sets the bit rate switch flag of a CAN FD frame. |
| `rtr` | True or false | `false` | Sends a remote frame. |

## Single packets

These endpoints send one packet straight away, like **SEND** in the schedule editor.
Profinity sends the packet through every connected adapter.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| POST | `/api/v2/CAN/{canId}/{hexData}` | **Send CAN messages** | Sends one packet with the data bytes given as hex in the path. |
| POST | `/api/v2/CAN/{canId}` | **Send CAN messages** | Sends one packet with no data bytes. |
| POST | `/api/v2/CAN` | **Send CAN messages** | Sends one packet described by a [packet object](#packet-object). |

The two endpoints with the CAN ID in the path take these values:

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `canId` | Text, in the path | None | The CAN ID, in `0x` hex or decimal. Required. |
| `hexData` | Text, in the path | None | The data bytes in hex, two characters for each byte, such as `0102030405060708`. The length is an even number of characters from 0 to 16 for standard CAN, or 24, 32, 40, 48, 64, 96, or 128 for CAN FD. Required on the endpoint that has it. |
| `extended` | True or false, in the query | `true` when the CAN ID is `0x800` or above | Sends a 29-bit extended identifier. |
| `canFD` | True or false, in the query | `true` when `hexData` is longer than 16 characters | Sends a CAN FD frame. |
| `brs` | True or false, in the query | `false` | Sets the bit rate switch flag of a CAN FD frame. |
| `rtr` | True or false, in the query | `false` | Sends a remote frame. |

Both return `true` when at least one adapter sent the packet.
They return `400` with "No CAN adapters are currently connected" when no adapter is connected, or with a message about extended CAN or CAN FD when no connected adapter supports the frame.

`POST /api/v2/CAN` returns `true` when an adapter sent the packet and `false` when none did.

To send eight data bytes with one CAN ID, for example a command to a motor controller, run the command for your operating system.
The command transmits on the live bus, so run it against a bus with no live equipment on it, or with a CAN ID that no device on the bus uses.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/<can-id>/<hex-data>
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/<can-id>/<hex-data>
    ```

Replace `<token>` with a token for a user who holds **Send CAN messages**.
Replace `<can-id>` with the CAN ID, such as `0x501`, and `<hex-data>` with the data bytes, such as `0102030405060708`.
The command uses `localhost:18080`, the address of Profinity on its own computer, so replace it with the address of your instance when you run the command on another computer.

The response is:

```json
true
```

A response of `true` shows that an adapter sent the packet.
The packet then appears as outgoing in the **CAN Activity** table of the **SEND & RECEIVED CAN** window, and in the `sent` object of `GET /api/v2/CAN`.

## Scheduled packets

These endpoints manage the same list as **Scheduled CAN Packets** in the **SEND & RECEIVED CAN** window.
Refer to [How to send and receive CAN bus messages](../../../How_To_Guides/Send_Receive_CAN_Bus.md) for the list on screen.
Each scheduled packet has a schedule ID, which is the `{id}` in these endpoints and is different from its CAN ID.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/CAN/Scheduled` | **View CAN data** | Lists every scheduled packet, keyed by schedule ID. |
| POST | `/api/v2/CAN/Scheduled` | **Send CAN messages** | Adds a packet to the schedule and returns its schedule ID. With an interval above 0, Profinity starts sending it straight away. |
| POST | `/api/v2/CAN/Scheduled/{id}` | **Send CAN messages** | Replaces the packet and interval of a scheduled packet, and returns its schedule ID. With an interval above 0, Profinity sends the new packet on the new interval. |
| DELETE | `/api/v2/CAN/Scheduled/{id}` | **Send CAN messages** | Removes the packet from the schedule, which stops it. Returns `true` when it was removed. |
| POST | `/api/v2/CAN/Scheduled/Start/{id}` | **Send CAN messages** | Starts sending the packet on its interval, or sends it once when its interval is 0. Starting a packet that is already running sends it once more straight away, and it keeps running on its interval. |
| POST | `/api/v2/CAN/Scheduled/Stop/{id}` | **Send CAN messages** | Stops sending the packet and keeps it in the schedule. |
| POST | `/api/v2/CAN/Scheduled/Send/{id}` | **Send CAN messages** | Sends the packet once and leaves it running or stopped as it was. |

Each scheduled packet in the list has these fields:

| Field | Type | Meaning |
|-------|------|---------|
| `id` | Whole number | The schedule ID. |
| `name` | Text | The name shown in the schedule. |
| `canBusPacket` | Packet | The packet that Profinity sends, with the fields listed in [Live traffic and adapter status](#live-traffic-and-adapter-status). |
| `intervalMs` | Whole number | The milliseconds between sends, or `0` for a packet that only the Start and Send endpoints send. |
| `count` | Whole number | How many times Profinity has sent the packet. |
| `running` | True or false | `true` while Profinity sends the packet on its interval. |

The add and update endpoints take a [packet object](#packet-object) in the body, and these query values:

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `intervalMs` | Whole number, 0 or more | `0` | Milliseconds between sends, so `100` sends the packet every 100 ms. With `0`, Profinity stores the packet without sending it, and the Start and Send endpoints send it. |
| `name` | Text | None | The name shown in the schedule. On an update, leaving it out keeps the current name. |
| `exclusive` | True or false | `false` | On the add endpoint only. With `true`, Profinity first removes every scheduled packet with the same CAN ID. |

A failed add or update returns `400`.

To send a packet every 100 ms, run the command for your operating system.
Profinity starts sending on the live bus as soon as the command runs, so run it against a bus with no live equipment on it, or with a CAN ID that no device on the bus uses.

=== "macOS or Linux"

    ```bash
    curl -X POST "http://localhost:18080/api/v2/CAN/Scheduled?intervalMs=<interval>&name=<name>" \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"canIdAsHex": "<can-id>", "data": "<hex-data>", "dataLength": 8}'
    ```

=== "Windows"

    Run this command in PowerShell.
    It uses `Invoke-RestMethod`, as the sign-in in [Make your first API call](../../First_API_Call.md) does, because it sends the quotation marks in a JSON body as written.

    ```powershell
    Invoke-RestMethod -Method Post -Uri "http://localhost:18080/api/v2/CAN/Scheduled?intervalMs=<interval>&name=<name>" -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"canIdAsHex": "<can-id>", "data": "<hex-data>", "dataLength": 8}'
    ```

Replace these placeholders:

- `<can-id>` with the CAN ID, such as `0x501`.
- `<hex-data>` with eight data bytes in hex, such as `0102030405060708`.
- `<interval>` with the milliseconds between sends, such as `100`.
- `<name>` with a name for the schedule, such as `Motor-heartbeat`.
- `<token>` with a token for a user who holds **Send CAN messages**.

The response is the schedule ID of the new packet, such as:

```json
1
```

A number in the response shows that Profinity added the packet, and the packet appears in **Scheduled CAN Packets** with its count rising.
To stop it, send `POST /api/v2/CAN/Scheduled/Stop/<id>`, replacing `<id>` with that schedule ID.

## CAN log replay

These endpoints control the same replayer as **CAN LOG REPLAY** under **CAN UTILITIES**.
Refer to [How to replay CAN bus logs](../../../How_To_Guides/Replay_CAN_Logs.md) for the replayer on screen.
The replayer feeds a recorded log into Profinity as if it came from the bus, so tags, dashboards, rules, and alerts react to it alongside any live traffic.
It never transmits the recorded messages on the bus.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/CAN/Replay` | **Replay CAN logs** | Lists the log files in the `can_bus_logs/replay` folder of the [artefacts directory](../../../Installation/Artifacts_Directory.md). |
| POST | `/api/v2/CAN/Replay/Start/{logName}` | **Replay CAN logs** | Starts replaying a log file. Returns `true` when the replay starts, `false` when a replay is already running, and `404` when the log does not exist. |
| POST | `/api/v2/CAN/Replay/Stop` | **Replay CAN logs** | Stops the replay that is running, and returns `true` when it has stopped. |
| GET | `/api/v2/CAN/Replay/Status` | **Replay CAN logs** | Reports the replay that is running. |

Each log file in the list has these fields:

| Field | Type | Meaning |
|-------|------|---------|
| `fileName` | Text | The file name, including its extension. Send it as `{logName}` to replay the file. |
| `length` | Whole number | The size of the file in bytes. |
| `creationTime` | Date and time | When the file was created. |
| `isReplaying` | True or false | `true` for the file that is replaying now. |
| `percentage` | Number | How far the replay of this file has got, from `0` to `1`, and `0` for a file that is not replaying. |

The status response has these fields:

| Field | Type | Meaning |
|-------|------|---------|
| `isReplaying` | True or false | `true` while a replay runs. |
| `isLooping` | True or false | `true` when the replay starts again each time it reaches the end. |
| `currentlyReplayingLogFile` | Text, or `null` | The file name of the log that is replaying. |
| `statusText` | Text | The replayer's state, such as `IDLE`, the number of the packet it is sending, or the reason it could not read the file. |
| `percentage` | Number | How far the replay has got, from `0` to `1`. |

To add a log file to the list, copy it into the `can_bus_logs/replay` folder, or upload it on the **CAN LOG REPLAY** page.

The start endpoint takes these values:

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `logName` | Text, in the path | None | The file name, including its extension, such as `example_log.csv`. Required. |
| `filterFrom` | Text, in the query | None, so no lower limit | The lowest CAN ID to replay, in `0x` hex or decimal. |
| `filterTo` | Text, in the query | None, so no upper limit | The highest CAN ID to replay, in `0x` hex or decimal. |
| `percentageStart` | Number, in the query | `0` | Where in the log to start, from `0` for the start to `100` for the end, so `50` starts in the middle. |
| `loopReplay` | True or false, in the query | `false` | With `true`, the replay starts again from the beginning each time it reaches the end. |
