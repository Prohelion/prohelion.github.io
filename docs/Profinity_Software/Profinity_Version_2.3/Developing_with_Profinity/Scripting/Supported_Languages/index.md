---
title: Supported Languages
description: "Scripting support for C#, Python (IronPython), and Lua (NLua) with full .NET framework access."
---

# Supported Languages

Profinity scripting supports three languages: C#, Python (through [IronPython](https://ironpython.net/)) and Lua (through [NLua](https://github.com/NLua/NLua)). Each language runs on .NET, the Microsoft software framework Profinity is written in, so scripts can use .NET libraries directly. Each language supports the same [script types](../Script_Types/index.md) (Run, Receive, Service, Tag Change and Rule Script, the last being a script set to Run On Alert mode) and the same host operations, exposed through the `Profinity` script variable, so the choice of language is a matter of preference and background.

<!-- Logo sources (page note, not rendered).
     C#: https://github.com/dotnet/brand/tree/main/logo/language-icons (csharp-128.png)
     Python: https://www.python.org/community/logos/
     Lua: https://www.lua.org/images/ (lua-logo.gif), copyright 1998 Lua.org, graphic design by Alexandre Nakonechnyj -->

| Language | Typing and style | Main limits |
|----------|------------------|-------------|
| C# | Statically typed classes with full .NET access | More verbose, and needs some .NET knowledge |
| Python | Procedural functions with Python 3 syntax | Runs on IronPython, so libraries that need compiled CPython extensions cannot be used |
| Lua | Procedural functions with a small syntax | Smaller standard library, and fewer third-party packages |

Functionality beyond what Profinity Scripting provides is available by calling the [Profinity APIs](../../../Integrating_to_Profinity/APIs/index.md) from separate tools.

## C# Scripting

C# is a statically typed, object-oriented language. C# scripts in Profinity are classes that inherit from a base class or implement a specific interface, and they have full access to the .NET framework. Because Profinity is itself written in C#, C# gives the deepest integration with Profinity types and suits large automation projects and performance-critical work. See the [C# Language Reference](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/) and the [.NET API Documentation](https://docs.microsoft.com/en-us/dotnet/api/).

## Python Scripting

Python scripts in Profinity use a procedural style, with functions that Profinity calls at defined points. Profinity runs them through [IronPython](https://ironpython.net/), a .NET implementation of Python, so a Python script can also call .NET libraries directly. IronPython is not the standard CPython interpreter, so Python packages that depend on compiled CPython extensions, such as numpy, cannot be imported, whereas the Python standard library modules that IronPython provides and .NET types can.

Profinity runs IronPython with Python 3 compatibility enabled, so all Python scripts use Python 3 syntax, including:

- `print()` as a function, not a statement
- f-strings, such as `f"Value: {value}"`
- `/` for true division and `//` for floor division
- Unicode literals
- Absolute imports

See the [IronPython Documentation](https://ironpython.net/documentation/) and the [Python Language Reference](https://docs.python.org/3/reference/).

## Lua Scripting

Lua scripts in Profinity use a procedural style, with functions that Profinity calls at defined points, such as `receive()` for a Receive script or `on_start()` for a Service script. Profinity embeds the Lua 5.4 runtime through [NLua](https://github.com/NLua/NLua), and a Lua script can call .NET types directly, including the same `Profinity` script variable that C# and Python scripts use. The General Purpose Input/Output (GPIO) and serial port types `GpioController`, `PinMode`, `PinValue`, `SerialPort`, `Parity`, `StopBits` and `Handshake` are available as globals without any import.

Profinity also registers four Lua host functions:

| Function | What it does |
|----------|--------------|
| `print(...)` | Writes its arguments to the script output stream |
| `stderr(...)` | Writes its arguments to the script error stream, the Lua equivalent of Python's `sys.stderr` |
| `sleep(seconds)` | Pauses the script for the given number of seconds. Each call is limited to 30 seconds, so a loop that needs to wait longer calls `sleep()` again |
| `CanBusPacket(address)` | Creates a new CAN packet for the given CAN address, for use with the operations described in [CAN Bus](../Script_Operations/CANBus.md) |

Lua scripts follow Lua syntax, including these points that differ from Python and C#:

- Native Lua tables use 1-based indexing, whereas .NET collections such as `TriggeredTags` keep their own 0-based indexing.
- `nil` takes the place of `null` or `None`.
- Strings are joined with `..` rather than `+`.
- Blocks are written as `function name(...) ... end` rather than with indentation or braces.

See the [Lua 5.4 Reference Manual](https://www.lua.org/manual/5.4/) and the [NLua Documentation](https://github.com/NLua/NLua).
