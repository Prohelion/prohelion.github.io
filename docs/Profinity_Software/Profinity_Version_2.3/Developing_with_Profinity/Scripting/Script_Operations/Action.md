---
title: Action context
description: "Read the firmware action that started a script, including the uploaded file and the invoker, and report progress back to the action."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Action context

`Profinity.Action` is set for the duration of a script that a Custom Component runs from a firmware action.
The object carries the action name, any file the operator uploaded, the user who started the action, and a way for the script to report progress.
When the script returns, Profinity clears `Profinity.Action`.

A firmware action is an entry under `actions` in [`firmware.yaml`](../../Custom_Components/index.md#firmware-actions-in-firmwareyaml).
The load script and the save script (`loadScript` and `saveScript`) do not receive this object.
On a menu button, a scheduled run, a service, a tag change, a CAN receive, and a rule script, `Profinity.Action` is null (`None` in Python, `nil` in Lua).
A script checks for null before it reads the object.

New in Profinity 2.3.

## Properties

| Property | Meaning |
|----------|---------|
| `Name` | The action's display name from `firmware.yaml` |
| `Group` | The action group. Firmware actions use `Firmware` |
| `FileName` | The profile-relative name of the uploaded file, or null when the action takes no file |
| `FilePath` | The absolute path of that file after Profinity has resolved it, or null |
| `InvokedByUsername` | The user who started the action |
| `InvokedByJti` | The session identifier of that user |
| `Variables` | A string dictionary. When a file was uploaded it contains `fileName` and `filePath`, with the same values as `FileName` and `FilePath` |

`GetVariable(key)` returns the value for that key, or null when the key is missing or empty.

## Reporting progress

`ReportProgress(progress)` takes a number from 0.0 to 1.0, and Profinity limits the value to that range.
The firmware action shows that fraction as its percentage complete.

=== "C#"

    ```csharp
    if (Profinity.Action != null)
    {
        Profinity.Console.WriteLine(Profinity.Action.Name);
        string path = Profinity.Action.FilePath;
        Profinity.Console.WriteLine(path);
        Profinity.Action.ReportProgress(1.0);
    }
    ```

=== "Python"

    ```python
    if Profinity.Action is not None:
        print(Profinity.Action.Name)
        print(Profinity.Action.FilePath)
        Profinity.Action.ReportProgress(1.0)
    ```

=== "Lua"

    ```lua
    if Profinity.Action ~= nil then
        print(Profinity.Action.Name)
        print(Profinity.Action.FilePath)
        Profinity.Action:ReportProgress(1.0)
    end
    ```

The rule firing passed to `OnAlert` or `on_alert` is a separate object.
Refer to [Rule scripts](../Script_Types/Rule_Scripts.md).
