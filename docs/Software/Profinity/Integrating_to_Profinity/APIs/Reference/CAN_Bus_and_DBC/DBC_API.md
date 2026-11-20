---
title: DBC API
description: "Look up the endpoints that return the CAN database (DBC) messages and signals of every component, or one, with their latest values or definitions."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# DBC API

The CAN database (DBC) API, the Dbc group in Swagger, returns the messages and signals that each component's DBC file defines, with either their latest values or their definitions.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

These endpoints return the same messages and signals as the DBC Viewer.
To open it, select **CAN UTILITIES**, then **DBC MESSAGES & SIGNALS**, and refer to [CAN bus DBC](../../../../CAN_Utilities/CAN_Bus_DBC.md) for what it shows.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/DBC` | **View DBC definitions** | Returns the latest value of every signal of every component in the active profile. |
| GET | `/api/v2/DBC/AllInfo` | **View DBC definitions** | Returns the definition of every signal of every component in the active profile, in place of its value. |
| GET | `/api/v2/DBC/{component}` | **View DBC definitions** | Returns the latest value of every signal of one component. |
| GET | `/api/v2/DBC/{component}/AllInfo` | **View DBC definitions** | Returns the definition of every signal of one component, in place of its value. |
| GET | `/api/v2/DBC/{component}/{message}/{signal}` | **View DBC definitions** | Returns the latest value of one signal. Refer to [Read the latest value of one item](../../Read_Tag_Data.md#read-the-latest-value-of-one-item). |

In an endpoint, `{component}` is the component's name in the profile, URL-encoded, such as `Cooling%20pump` for a component named `Cooling pump`.

To give a Custom Component a third-party DBC file, so that its messages and signals appear in these endpoints, refer to [Using a Custom Component](../../../../Components/Custom_Components/Using_a_Custom_Component.md).

## Signal catalogue shape

Each endpoint that returns more than one signal responds with a JSON object with a key for each component, holding a key for each message, which in turn holds a key for each signal.
Without `AllInfo`, each signal holds its latest value, or `null` when Profinity has no value for it yet.
With `AllInfo`, each signal holds its definition from the DBC file, with these fields:

| Field | Type | Meaning |
|-------|------|---------|
| `name` | Text | The signal name. |
| `startBit` | Whole number | The position of the signal's first bit in the message data. |
| `length` | Whole number | The number of bits the signal takes. |
| `isBigEndian` | True or false | `true` for big-endian (Motorola) byte order, `false` for little-endian (Intel). |
| `byteOrderText` | Text | The byte order in words, `Big Endian (Motorola)` or `Little Endian (Intel)`. |
| `isUnsigned` | True or false | `true` when the raw value is an unsigned integer. |
| `valueTypeText` | Text | The raw value type: `Unsigned`, `Signed`, `Float`, or `Double`. |
| `factor` | Number | The scale applied to the raw value. The value is the raw value times `factor`, plus `offset`. |
| `offset` | Number | The amount added after scaling. |
| `min` | Number | The lowest value the DBC file allows. |
| `max` | Number | The highest value the DBC file allows. |
| `unit` | Text | The unit of the value, such as `rpm`, or empty when the file gives none. |
| `comment` | Text, or `null` | The comment the DBC file holds for the signal. |
| `valuesSummary` | Text | The names of the signal's value table entries, separated by commas, or empty when it has none. |
| `attributesSummary` | Text | The names of the signal's DBC attributes, separated by commas. |
| `isMuxer`, `isMuxed`, `muxValue`, `isExtendedMuxed`, `muxerSwitchName`, `muxValueRanges` | True or false, whole number, text, or list | The multiplexing of the signal: whether it selects which other signals a message holds, whether a multiplexer selects it, and the multiplexer value or multiplexer name that selects it. |
| `value` | Number, or the text `"NaN"` | The latest value, or `"NaN"` when Profinity has no current value for it. |

## All components

These endpoints return every component in the active profile.
A component that has no DBC file holds `null`, and Profinity leaves out each component that the signed-in user cannot see under [component security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md).

### `GET /api/v2/DBC`

Returns the latest value of every signal of every component in the active profile, in the shape described in [Signal catalogue shape](#signal-catalogue-shape).
It needs the **View DBC definitions** permission, and returns `200`.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/DBC
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/DBC -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token for a user who holds **View DBC definitions**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON object with a key for each component you can see.

This endpoint has no errors of its own beyond sign-in and permission.

### `GET /api/v2/DBC/AllInfo`

Returns the definition of every signal of every component in the active profile, in place of its value.
Each signal holds the fields in [Signal catalogue shape](#signal-catalogue-shape), and `value` holds its latest value.
It needs the **View DBC definitions** permission, and returns `200`.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/DBC/AllInfo
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/DBC/AllInfo -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token for a user who holds **View DBC definitions**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when each signal in the response holds a definition with fields such as `startBit` and `length`.

This endpoint has no errors of its own beyond sign-in and permission.

## One component

These endpoints return one component, by its name in the profile.

### `GET /api/v2/DBC/{component}`

Returns the latest value of every signal of one component, in the shape described in [Signal catalogue shape](#signal-catalogue-shape), with the component as the only key.
It needs the **View DBC definitions** permission, and returns `200`.

To read the latest signal values of one component, run the command for your operating system:

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/DBC/<component>
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/DBC/<component>
    ```

Replace these placeholders:

- `<component>` with the component's name in the profile, URL-encoded.
- `<token>` with a token for a user who holds **View DBC definitions**.

The command uses `localhost:18080`, the address of Profinity on its own computer, so replace it with the address of your instance when you run the command on another computer.

The response looks like this for a pump controller, shortened to one message:

```json
{
    "Pump": {
        "MotorStatus": {
            "Speed": 1450,
            "Current": 12.6,
            "Temperature": 41.5
        }
    }
}
```

A response that names the component and lists its messages and signals with values shows that the call worked.
A signal that holds `null` is defined in the DBC file, and Profinity has not yet received a value for it.

`GET /api/v2/DBC/{component}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "No component was found with the component id of" and the name | No component in the active profile has that name. | Check the name against the profile, and URL-encode it. |
| `404` | The signed-in user cannot see the component under component security. | Ask an administrator for access to the component. |
| `404` with "No Messages or Signals can be found on this component" | The component has no DBC file. | Give the component a DBC file, or read a component that has one. |

### `GET /api/v2/DBC/{component}/AllInfo`

Returns the definition of every signal of one component, in place of its value, with the component as the only key.
Each signal holds the fields in [Signal catalogue shape](#signal-catalogue-shape).
It needs the **View DBC definitions** permission, and returns `200`.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/DBC/<component>/AllInfo
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/DBC/<component>/AllInfo -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<component>` with the component's name in the profile, URL-encoded.
- `<token>` with a token for a user who holds **View DBC definitions**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when each signal in the response holds a definition with fields such as `startBit` and `length`.

`GET /api/v2/DBC/{component}/AllInfo` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "No component was found with the component id of" and the name | No component in the active profile has that name. | Check the name against the profile, and URL-encode it. |
| `404` | The signed-in user cannot see the component under component security. | Ask an administrator for access to the component. |
| `404` with "No Messages or Signals can be found on this component" | The component has no DBC file. | Give the component a DBC file, or read a component that has one. |

## One signal

### `GET /api/v2/DBC/{component}/{message}/{signal}`

Returns the latest value that Profinity holds for one signal.
It needs the **View DBC definitions** permission, and returns `200` with a `measurement` object.
`measurement` holds the signal's tag ID as `tagId` and `label`, its latest value as `sample`, its `unit`, its `transmitter`, and a `dataPoints` list with the current value.
When Profinity holds no value for the signal yet, `measurement` still names the signal and its unit but has no value.
A `{message}` or `{signal}` that the component does not have returns `200` with an empty object, not an error.
Refer to [Read the latest value of one item](../../Read_Tag_Data.md#read-the-latest-value-of-one-item) for how this fits with reading tags.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `component` | Text, in the path | None | The component's name in the profile, URL-encoded. Required. |
| `message` | Text, in the path | None | The DBC message name. Required. |
| `signal` | Text, in the path | None | The DBC signal name. Required. |

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/DBC/<component>/<message>/<signal>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/DBC/<component>/<message>/<signal> -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<component>` with the component's name in the profile, URL-encoded.
- `<message>` with the DBC message name, such as `MotorStatus`.
- `<signal>` with the DBC signal name, such as `Speed`.
- `<token>` with a token for a user who holds **View DBC definitions**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response has a `measurement` object that names the signal you asked for.

`GET /api/v2/DBC/{component}/{message}/{signal}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "No component was found with the component id of" and the name | No component in the active profile has that name. | Check the name against the profile, and URL-encode it. |
| `404` | The signed-in user cannot see the component under component security. | Ask an administrator for access to the component. |
