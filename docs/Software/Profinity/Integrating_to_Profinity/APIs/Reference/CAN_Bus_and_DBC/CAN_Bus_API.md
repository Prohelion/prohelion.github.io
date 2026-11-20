---
title: CAN bus API
description: "Look up the endpoints that read CAN bus traffic and adapter status, send CAN packets once or on a schedule, and replay recorded CAN logs."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# CAN bus API

The CAN bus API, shown as CAN in Swagger, reads CAN bus traffic and adapter status, sends CAN packets once or on a schedule, and replays recorded CAN logs.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

Use these links to go to a section.

- [Packet fields in responses](#packet-fields-in-responses)
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
Profinity reads a value made only of digits as decimal, so write `0x501`, not `501`, for the hex ID 501.

## Packet fields in responses

The endpoints that return a packet, and the scheduled packets in [Scheduled packets](#scheduled-packets), describe it with these fields:

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

## Live traffic and adapter status

These endpoints read the same traffic as the **SEND & RECEIVED CAN** window.
Refer to [Send / receive CAN bus messages](../../../../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md) for the window itself.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/CAN` | **View CAN data** | Returns the latest copy of every packet, as a `received` object and a `sent` object, each keyed by CAN ID as a decimal number. |
| GET | `/api/v2/CAN/{canId}` | **View CAN data** | Returns the latest received packet with that CAN ID. |
| GET | `/api/v2/CAN/Status` | **View CAN data** | Reports whether a [CAN bus adapter](../../../../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md) is connected, and what the connected adapters support. |

### `GET /api/v2/CAN`

Returns the latest copy of every packet that Profinity has received or sent.
The response is a JSON object with a `received` object and a `sent` object, and each holds one packet for each CAN ID, keyed by the CAN ID as a decimal number.
Each packet has the fields in [Packet fields in responses](#packet-fields-in-responses).
It needs the **View CAN data** permission, and returns `200`.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/CAN -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token for a user who holds **View CAN data**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response has a `received` object and a `sent` object.
Both are empty when no packet has been received or sent yet.

This endpoint has no errors of its own beyond sign-in and permission.

### `GET /api/v2/CAN/{canId}`

Returns the latest received packet with that CAN ID, with the fields in [Packet fields in responses](#packet-fields-in-responses).
It needs the **View CAN data** permission, and returns `200`.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `canId` | Text, in the path | None | The CAN ID, in `0x` hex or decimal. Required. |

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/<can-id>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/CAN/<can-id> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<can-id>` with the CAN ID, such as `0x501`.
- `<token>` with a token for a user who holds **View CAN data**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a packet whose `canIdAsHex` is the ID you asked for.

`GET /api/v2/CAN/{canId}` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `404` | The CAN ID is not valid hex or decimal, or Profinity has not received a packet with that ID. | Write the ID as `0x` hex or as a decimal number, and check the ID against `GET /api/v2/CAN`. |

### `GET /api/v2/CAN/Status`

Reports whether a CAN bus adapter is connected and what the connected adapters support.
It returns `200` with these fields, and needs the **View CAN data** permission.

| Field | Type | Meaning |
|-------|------|---------|
| `connected` | True or false | `true` when at least one adapter is connected. |
| `connectedCANFD` | True or false | `true` when an adapter is connected in CAN FD mode. |
| `supportsExtendedCAN` | True or false | `true` when a connected adapter can send 29-bit extended identifiers. |
| `supportsCANFD` | True or false | `true` when a connected adapter can send CAN FD frames. |

Check them before you send a packet that needs extended identifiers or CAN FD.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Status
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/CAN/Status -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace `<token>` with a token for a user who holds **View CAN data**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response has the four fields above.
`connected` is `false` when no adapter is connected.

This endpoint has no errors of its own beyond sign-in and permission.

## Packet object

`POST /api/v2/CAN` and the add and update endpoints in [Scheduled packets](#scheduled-packets) take a packet object in a JSON body, with these fields:

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `canIdAsHex` | Text | None | The CAN ID in hex, such as `0x501`. Include it, because a packet without it uses the CAN ID `0x0`. |
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

### `POST /api/v2/CAN/{canId}/{hexData}`

Sends one packet with the data bytes given as hex in the path.
It needs the **Send CAN messages** permission, and returns `200` with `true` when at least one adapter sent the packet.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `canId` | Text, in the path | None | The CAN ID, in `0x` hex or decimal. Required. |
| `hexData` | Text, in the path | None | The data bytes in hex, two characters for each byte, such as `0102030405060708`. The length is an even number of characters from 0 to 16 for standard CAN, or 24, 32, 40, 48, 64, 96, or 128 for CAN FD. Required. |
| `extended` | True or false, in the query | `true` when the CAN ID is `0x800` or above | Sends a 29-bit extended identifier. |
| `canFD` | True or false, in the query | `true` when `hexData` is longer than 16 characters | Sends a CAN FD frame. |
| `brs` | True or false, in the query | `false` | Sets the bit rate switch flag of a CAN FD frame. |
| `rtr` | True or false, in the query | `false` | Sends a remote frame. |

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

`POST /api/v2/CAN/{canId}/{hexData}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Hex Data must be an even number of characters" | `hexData` has an odd number of characters. | Write two hex characters for each byte. |
| `400` with "Hex Data must be either 0, 2, 4, 6, 8, 10, 12, 14 or 16 characters for standard CAN, or in addition 24, 32, 40, 48, 64, 96, 128 characters for CAN FD" | `hexData` has a length that is not allowed. | Use one of the listed lengths. |
| `400` with "No CAN adapters are currently connected" | No adapter is connected. | Connect an adapter, and check it with `GET /api/v2/CAN/Status`. |
| `400` with "Failed to send CAN packet. No adapters were able to send the message." | The packet needs extended CAN or CAN FD, and no connected adapter supports it. | Check `supportsExtendedCAN` and `supportsCANFD` in `GET /api/v2/CAN/Status`, or send a packet the adapter supports. |
| `500` | `canId` or `hexData` is not valid hex or decimal. | Write the CAN ID as `0x` hex or a decimal number, and the data as hex characters only. |

### `POST /api/v2/CAN/{canId}`

Sends one packet with no data bytes.
It needs the **Send CAN messages** permission, and returns `200` with `true` when at least one adapter sent the packet.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `canId` | Text, in the path | None | The CAN ID, in `0x` hex or decimal. Required. |
| `extended` | True or false, in the query | `true` when the CAN ID is `0x800` or above | Sends a 29-bit extended identifier. |
| `canFD` | True or false, in the query | `false` | Sends a CAN FD frame. |
| `brs` | True or false, in the query | `false` | Sets the bit rate switch flag of a CAN FD frame. |
| `rtr` | True or false, in the query | `false` | Sends a remote frame. |

The command transmits on the live bus, so run it against a bus with no live equipment on it, or with a CAN ID that no device on the bus uses.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/<can-id>
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/<can-id>
    ```

Replace these placeholders:

- `<can-id>` with the CAN ID, such as `0x501`.
- `<token>` with a token for a user who holds **Send CAN messages**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is `true`.

`POST /api/v2/CAN/{canId}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "No CAN adapters are currently connected" | No adapter is connected. | Connect an adapter, and check it with `GET /api/v2/CAN/Status`. |
| `400` with "Failed to send CAN packet. No adapters were able to send the message." | The packet needs extended CAN or CAN FD, and no connected adapter supports it. | Check `supportsExtendedCAN` and `supportsCANFD` in `GET /api/v2/CAN/Status`, or send a packet the adapter supports. |
| `500` | `canId` is not valid hex or decimal. | Write the CAN ID as `0x` hex or a decimal number. |

### `POST /api/v2/CAN`

Sends one packet described by a [packet object](#packet-object) in the JSON body.
It needs the **Send CAN messages** permission, and returns `200` with `true` when at least one adapter sent the packet and `false` when none did.

The command transmits on the live bus, so run it against a bus with no live equipment on it, or with a CAN ID that no device on the bus uses.

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/CAN \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"canIdAsHex": "<can-id>", "data": "<hex-data>", "dataLength": 8}'
    ```

=== "Windows"

    Run this command in PowerShell.
    It uses `Invoke-RestMethod`, as the sign-in in [Make your first API call](../../First_API_Call.md) does, because it sends the quotation marks in a JSON body as written.

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/CAN -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"canIdAsHex": "<can-id>", "data": "<hex-data>", "dataLength": 8}'
    ```

Replace these placeholders:

- `<can-id>` with the CAN ID, such as `0x501`.
- `<hex-data>` with eight data bytes in hex, such as `0102030405060708`.
- `<token>` with a token for a user who holds **Send CAN messages**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is `true`.
A response of `false` means no adapter sent the packet, for example because none is connected.

`POST /api/v2/CAN` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The body is empty or is not valid JSON. | Send a JSON [packet object](#packet-object). |

## Scheduled packets

These endpoints manage the same list as **Scheduled CAN Packets** in the **SEND & RECEIVED CAN** window.
Refer to [How to send and receive CAN bus messages](../../../../How_To_Guides/Send_Receive_CAN_Bus.md) for the list on screen.
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
| `canBusPacket` | Packet | The packet that Profinity sends, with the fields listed in [Packet fields in responses](#packet-fields-in-responses). |
| `intervalMs` | Whole number | The milliseconds between sends, or `0` for a packet that only the Start and Send endpoints send. |
| `count` | Whole number | How many times Profinity has sent the packet. |
| `running` | True or false | `true` while Profinity sends the packet on its interval. |

The add and update endpoints take a [packet object](#packet-object) in the body, and these query values:

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `intervalMs` | Whole number, 0 or more | `0` | Milliseconds between sends, so `100` sends the packet every 100 ms. With `0`, Profinity stores the packet without sending it, and the Start and Send endpoints send it. |
| `name` | Text | None | The name shown in the schedule. On an update, leaving it out keeps the current name. |
| `exclusive` | True or false | `false` | On the add endpoint only. With `true`, Profinity first removes every scheduled packet with the same CAN ID. |

### `GET /api/v2/CAN/Scheduled`

Lists every scheduled packet, as a JSON object keyed by schedule ID, with the fields above for each packet.
It needs the **View CAN data** permission, and returns `200`.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Scheduled
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/CAN/Scheduled -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token for a user who holds **View CAN data**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON object with one entry for each scheduled packet.
The object is empty when nothing is scheduled.

This endpoint has no errors of its own beyond sign-in and permission.

### `POST /api/v2/CAN/Scheduled`

Adds a packet to the schedule, with the [packet object](#packet-object) as the body and the query values above.
It needs the **Send CAN messages** permission, and returns `200` with the schedule ID of the new packet.
With an interval above 0, Profinity starts sending the packet straight away.

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

`POST /api/v2/CAN/Scheduled` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The body is empty or is not valid JSON, a query value is not a whole number of 0 or more, or Profinity could not add the packet (the message is "Failed to add the scheduled Packet"). | Send a JSON [packet object](#packet-object) and a valid `intervalMs`, then try again. |

### `POST /api/v2/CAN/Scheduled/{id}`

Replaces the packet and interval of a scheduled packet, and returns its schedule ID.
It needs the **Send CAN messages** permission, and returns `200`.
With an interval above 0, Profinity sends the new packet on the new interval.
Leaving out `intervalMs` sets the interval to 0, so the packet stops sending until you start it.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `id` | Whole number, in the path | None | The schedule ID. Required. |
| `intervalMs` | Whole number, in the query | `0` | Milliseconds between sends, as in the table above. |
| `name` | Text, in the query | The current name | The name shown in the schedule. |

The body is a [packet object](#packet-object).

=== "macOS or Linux"

    ```bash
    curl -X POST "http://localhost:18080/api/v2/CAN/Scheduled/<id>?intervalMs=<interval>" \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"canIdAsHex": "<can-id>", "data": "<hex-data>", "dataLength": 8}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri "http://localhost:18080/api/v2/CAN/Scheduled/<id>?intervalMs=<interval>" -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"canIdAsHex": "<can-id>", "data": "<hex-data>", "dataLength": 8}'
    ```

Replace these placeholders:

- `<id>` with the schedule ID.
- `<can-id>` with the CAN ID, such as `0x501`.
- `<hex-data>` with eight data bytes in hex, such as `0102030405060708`.
- `<interval>` with the milliseconds between sends, such as `100`.
- `<token>` with a token for a user who holds **Send CAN messages**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The update worked when the response is the schedule ID you sent.

`POST /api/v2/CAN/Scheduled/{id}` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The body is empty or is not valid JSON, a query value is not a whole number of 0 or more, or no scheduled packet has that ID (the message is "Failed to update the scheduled Packet"). | Check the ID against `GET /api/v2/CAN/Scheduled`, and send a JSON [packet object](#packet-object). |

### `DELETE /api/v2/CAN/Scheduled/{id}`

Removes the packet from the schedule, which stops it.
It needs the **Send CAN messages** permission, and returns `200` with `true` when it removed the packet and `false` when no scheduled packet has that ID.

=== "macOS or Linux"

    ```bash
    curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Scheduled/<id>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Delete -Uri http://localhost:18080/api/v2/CAN/Scheduled/<id> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<id>` with the schedule ID.
- `<token>` with a token for a user who holds **Send CAN messages**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The removal worked when the response is `true`.

This endpoint has no errors of its own beyond sign-in and permission.

### `POST /api/v2/CAN/Scheduled/Start/{id}`

Starts sending the packet on its interval, or sends it once when its interval is 0.
Starting a packet that is already running sends it once more straight away, and it keeps running on its interval.
It needs the **Send CAN messages** permission, and returns `200` with `true` when Profinity started or sent the packet.
It returns `false` when no scheduled packet has that ID, or when a send found no adapter able to send the packet.

The packet goes out on the live bus, so run the command against a bus with no live equipment on it, or with a CAN ID that no device on the bus uses.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Scheduled/Start/<id>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/CAN/Scheduled/Start/<id> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<id>` with the schedule ID.
- `<token>` with a token for a user who holds **Send CAN messages**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is `true`.

This endpoint has no errors of its own beyond sign-in and permission.

### `POST /api/v2/CAN/Scheduled/Stop/{id}`

Stops sending the packet and keeps it in the schedule.
It needs the **Send CAN messages** permission, and returns `200` with `true` when a scheduled packet has that ID, including a packet that was not running, and `false` when none does.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Scheduled/Stop/<id>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/CAN/Scheduled/Stop/<id> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<id>` with the schedule ID.
- `<token>` with a token for a user who holds **Send CAN messages**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is `true`, and `running` is `false` for the packet in `GET /api/v2/CAN/Scheduled`.

This endpoint has no errors of its own beyond sign-in and permission.

### `POST /api/v2/CAN/Scheduled/Send/{id}`

Sends the packet once and leaves it running or stopped as it was.
It needs the **Send CAN messages** permission, and returns `200` with `true` when at least one adapter sent the packet.
It returns `false` when no scheduled packet has that ID, or when no adapter sent the packet.

The packet goes out on the live bus, so run the command against a bus with no live equipment on it, or with a CAN ID that no device on the bus uses.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Scheduled/Send/<id>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/CAN/Scheduled/Send/<id> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<id>` with the schedule ID.
- `<token>` with a token for a user who holds **Send CAN messages**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is `true`.

This endpoint has no errors of its own beyond sign-in and permission.

## CAN log replay

These endpoints control the same replayer as **CAN LOG REPLAY** under **CAN UTILITIES**.
Refer to [How to replay CAN bus logs](../../../../How_To_Guides/Replay_CAN_Logs.md) for the replayer on screen.
The replayer feeds a recorded log into Profinity as if it came from the bus, so tags, dashboards, rules, and alerts react to it alongside any live traffic.
It never transmits the recorded messages on the bus.

To add a log file to the list, copy it into the `can_bus_logs/replay` folder, or upload it on the **CAN LOG REPLAY** page.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/CAN/Replay` | **Replay CAN logs** | Lists the log files in the `can_bus_logs/replay` folder of the [artefacts directory](../../../../Installation/Artifacts_Directory.md). |
| POST | `/api/v2/CAN/Replay/Start/{logName}` | **Replay CAN logs** | Starts replaying a log file. |
| POST | `/api/v2/CAN/Replay/Stop` | **Replay CAN logs** | Stops the replay that is running. |
| GET | `/api/v2/CAN/Replay/Status` | **Replay CAN logs** | Reports the replay that is running. |

### `GET /api/v2/CAN/Replay`

Lists the log files in the replay folder.
It needs the **Replay CAN logs** permission, and returns `200` with a list that has one entry for each file, with these fields.
The list is empty when the folder holds no files.

| Field | Type | Meaning |
|-------|------|---------|
| `fileName` | Text | The file name, including its extension. Send it as `{logName}` to replay the file. |
| `length` | Whole number | The size of the file in bytes. |
| `creationTime` | Date and time | When the file was created. |
| `isReplaying` | True or false | `true` for the file that is replaying now. |
| `percentage` | Number | How far the replay of this file has got, from `0` to `1`, and `0` for a file that is not replaying. |

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Replay
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/CAN/Replay -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token for a user who holds **Replay CAN logs**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response lists your log files by `fileName`.

This endpoint has no errors of its own beyond sign-in and permission.

### `POST /api/v2/CAN/Replay/Start/{logName}`

Starts replaying a log file from the replay folder.
It needs the **Replay CAN logs** permission, and returns `200` with `true` when the replay starts and `false` when a replay is already running.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `logName` | Text, in the path | None | The file name, including its extension, such as `example_log.csv`. Required. |
| `filterFrom` | Text, in the query | None, so no lower limit | The lowest CAN ID to replay, in `0x` hex or decimal. |
| `filterTo` | Text, in the query | None, so no upper limit | The highest CAN ID to replay, in `0x` hex or decimal. A value of `0` also means no upper limit. |
| `percentageStart` | Number, in the query | `0` | Where in the log to start, from `0` for the start to `100` for the end, so `50` starts in the middle. |
| `loopReplay` | True or false, in the query | `false` | With `true`, the replay starts again from the beginning each time it reaches the end. |

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" "http://localhost:18080/api/v2/CAN/Replay/Start/<log-name>?loopReplay=false"
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri "http://localhost:18080/api/v2/CAN/Replay/Start/<log-name>?loopReplay=false" -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<log-name>` with the file name from `GET /api/v2/CAN/Replay`, such as `example_log.csv`.
- `<token>` with a token for a user who holds **Replay CAN logs**.

Add `filterFrom`, `filterTo`, and `percentageStart` to the query in the same way when you need them.
Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is `true`, and `GET /api/v2/CAN/Replay/Status` then shows `isReplaying` as `true`.
A response of `false` means a replay is already running, so stop it first.

`POST /api/v2/CAN/Replay/Start/{logName}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | A query value is not in the form it needs, such as a `percentageStart` that is not a number. | Correct the value named in the message. |
| `404` with "Replay log file not found" and the file name | The replay folder has no file with that name. | Check the name against `GET /api/v2/CAN/Replay`. |

### `POST /api/v2/CAN/Replay/Stop`

Stops the replay that is running.
It needs the **Replay CAN logs** permission, and returns `200` with `true` when the replay has stopped and `false` when it has not.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Replay/Stop
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/CAN/Replay/Stop -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace `<token>` with a token for a user who holds **Replay CAN logs**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is `true`.

This endpoint has no errors of its own beyond sign-in and permission.

### `GET /api/v2/CAN/Replay/Status`

Reports the replay that is running.
It needs the **Replay CAN logs** permission, and returns `200` with these fields.

| Field | Type | Meaning |
|-------|------|---------|
| `isReplaying` | True or false | `true` while a replay runs. |
| `isLooping` | True or false | `true` when the replay starts again each time it reaches the end. |
| `currentlyReplayingLogFile` | Text, or `null` | The file name of the log that is replaying. |
| `statusText` | Text | The replayer's state, such as `IDLE`, the number of the packet it is sending, or the reason it could not read the file. |
| `percentage` | Number | How far the replay has got, from `0` to `1`. |

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/CAN/Replay/Status
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/CAN/Replay/Status -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace `<token>` with a token for a user who holds **Replay CAN logs**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response has the five fields above.

This endpoint has no errors of its own beyond sign-in and permission.
