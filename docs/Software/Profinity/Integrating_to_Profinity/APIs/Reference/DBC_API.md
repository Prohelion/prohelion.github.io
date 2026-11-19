---
title: DBC API
description: "Look up the endpoints that return the CAN database (DBC) messages and signals of every component, or one, with their latest values or definitions."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# DBC API

The CAN database (DBC) API, the Dbc group in Swagger, returns the messages and signals that each component's DBC file defines, with either their latest values or their definitions.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

These endpoints return the same messages and signals as the DBC Viewer.
To open it, select **CAN UTILITIES**, then **DBC MESSAGES & SIGNALS**, and refer to [CAN bus DBC](../../../CAN_Utilities/CAN_Bus_DBC.md) for what it shows.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/DBC` | **View DBC definitions** | Returns the latest value of every signal of every component in the active profile. |
| GET | `/api/v2/DBC/AllInfo` | **View DBC definitions** | Returns the definition of every signal of every component in the active profile, in place of its value. |
| GET | `/api/v2/DBC/{component}` | **View DBC definitions** | Returns the latest value of every signal of one component. |
| GET | `/api/v2/DBC/{component}/AllInfo` | **View DBC definitions** | Returns the definition of every signal of one component, in place of its value. |
| GET | `/api/v2/DBC/{component}/{message}/{signal}` | **View DBC definitions** | Returns the latest value of one signal. Refer to [Read the latest value of one item](../Read_Tag_Data.md#read-the-latest-value-of-one-item). |

`{component}` is the component's name in the profile, URL-encoded, such as `Cooling%20pump` for a component named `Cooling pump`.

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

In the full list, a component that has no DBC file holds `null`, and Profinity leaves out each component that the signed-in user cannot see under [component security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md).
For a single component, Profinity returns `400` with "No component was found with the component id of" and the name when no component in the active profile has that name.
It returns `404` for a component that has no DBC file, and for a component the user cannot see.

To give a Custom Component a third-party DBC file, so that its messages and signals appear in these endpoints, refer to [Using a Custom Component](../../../Components/Custom_Components/Using_a_Custom_Component.md).

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

Replace `<token>` with a token for a user who holds **View DBC definitions**, and `<component>` with the component's name in the profile, URL-encoded.
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
