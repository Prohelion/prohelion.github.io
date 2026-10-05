---
title: Supported Languages
description: "Scripting support for C#, Python (IronPython), and Lua (NLua) with full .NET framework access."
---

# Supported Languages

Profinity scripting supports three languages: C#, Python (via [IronPython](https://ironpython.net/)), and Lua (via [NLua](https://github.com/NLua/NLua)). Each language is integrated with the .NET framework, so scripts can use .NET libraries directly. This page describes each language and the considerations for choosing between them.

<!-- Logo sources (page note, not rendered).
     C#: https://github.com/dotnet/brand/tree/main/logo/language-icons (csharp-128.png)
     Python: https://www.python.org/community/logos/
     Lua: https://www.lua.org/images/ (lua-logo.gif), copyright 1998 Lua.org, graphic design by Alexandre Nakonechnyj -->

| C# Scripting | Python | Lua |
|--------------|--------|-----|
| ![C# Logo](../../../images/CSharpLogo.png) | ![Python Logo](../../../images/PythonLogo.png) | ![Lua Logo](../../../images/LuaLogo.png) |

The choice of scripting language is a matter of preference. Profinity supports three to suit developers from different programming backgrounds, and the features available are common across all of them: each supports the same [script types](../Script_Types/index.md) (Run, Receive, Service, Tag Change and Rule Script, the last being a script set to Run On Alert mode) and the same host API surface, exposed through the `Profinity` script variable.

| Language | Strengths | Considerations |
|----------|-----------|----------------|
| C# | - Strong typing<br>- Full .NET framework access<br>- Performance optimization | - More verbose syntax<br>- Requires .NET knowledge<br>- Longer development time |
| Python | - Clean syntax<br>- Rich ecosystem<br>- Suited to data processing<br>- Easy to learn | - Slower execution<br>- Less suitable for real-time operations<br>- Memory management considerations |
| Lua | - Lightweight, minimal syntax<br>- Fast startup and low memory use<br>- Familiar to embedded and game-scripting backgrounds<br>- Direct General Purpose Input/Output (GPIO) and serial port interop | - Smaller standard library than C# or Python<br>- Fewer third-party packages available<br>- Native Lua tables are 1-indexed, but .NET collections such as `TriggeredTags` keep 0-based indexing |

Functionality beyond what Profinity Scripting provides is available by calling the [Profinity APIs](../../../Integrating_to_Profinity/APIs/index.md) from your own tools.

## C# Scripting

C# is a statically typed, object-oriented language known for its performance and scalability. In Profinity, C# scripts have full access to the .NET framework, which suits complex operations and large automation projects. C# is also the best choice for deep integration with Profinity itself, as Profinity is written in C#.

C# scripts in Profinity are implemented as classes that inherit from base classes or implement specific interfaces. They provide strong typing and full access to the .NET framework.

**C# is Best for:**

- Complex operations requiring type safety
- Integration with .NET libraries
- Large-scale automation projects
- Performance-critical applications

Further reading:

- [C# Language Reference](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/)
- [.NET API Documentation](https://docs.microsoft.com/en-us/dotnet/api/)

## Python (via [IronPython](https://ironpython.net/))

Python scripts in Profinity use a procedural style with functions that are called by the system. They provide a clean, readable syntax and are excellent for data processing and automation tasks.

Profinity uses a C# library called [IronPython](https://ironpython.net/) to allow you to write Python code within the C# framework that Profinity is built on.  IronPython brings the simplicity and readability of Python to the .NET ecosystem. It is well suited to data analysis, scripting, and rapid prototyping, and can call .NET libraries directly.

Profinity uses [IronPython](https://ironpython.net/) with Python 3 compatibility enabled. All Python scripts use Python 3 syntax, including:

- `print()` as a function (not a statement)
- Support for f-strings (e.g., `f"Value: {value}"`)
- Division operators (`/` for true division, `//` for floor division)
- Unicode literals
- Absolute imports

If you want to use Python as your preferred programming language or want to integrate Profinity with other libraries written in Python, this is a good choice.

**Python is Best for:**

- Data processing and analysis
- Complex data manipulation
- Scientific computing
- Integration with Python libraries
- Readable, maintainable code

Further reading:

- [IronPython Documentation](https://ironpython.net/documentation/)
- [Python Language Reference](https://docs.python.org/3/reference/)

## Lua (via [NLua](https://github.com/NLua/NLua))

Lua scripts in Profinity use a procedural style with functions that the engine calls at defined points (for example `receive()` for a Receive script, or `on_start()` for a Service script). They provide a small, simple syntax and are well suited to lightweight, resource-conscious automation.

Profinity uses a C# library called [NLua](https://github.com/NLua/NLua) to embed a Lua 5.1 compatible interpreter inside the .NET framework that Profinity is built on. NLua loads the CLR (Common Language Runtime) package into the Lua environment, so a Lua script can call .NET types directly, including the same `Profinity` script variable surface available to C# and Python scripts. Profinity performs this CLR import for you and pre-registers `GpioController`, `PinMode`, `PinValue`, `SerialPort`, `Parity`, `StopBits`, and `Handshake` as globals, so scripts do not need to call an import function themselves to reach GPIO and serial port interop types.

In addition to these CLR-backed globals, Profinity registers a small set of Lua-specific host functions: `print(...)` writes its arguments to the script output stream; `stderr(...)` writes its arguments to the script error stream, the Lua equivalent of Python's `sys.stderr`; `sleep(seconds)` pauses script execution for the given number of seconds, with each call clamped to a maximum of 30 seconds, so a loop that needs to wait longer should call `sleep()` again rather than passing one large value; and `CanBusPacket(address)` constructs a new CAN packet for the given CAN address, for use with the operations described in [CAN bus](../Script_Operations/CANBus.md).

All Lua scripts use Lua 5.1 compatible syntax, including:

- 1-based indexing for native Lua tables (.NET collections such as `TriggeredTags` keep their own 0-based indexing)
- `nil` in place of `null`/`None`
- string concatenation with `..` rather than `+`
- `function name(...) ... end` blocks rather than indentation or braces

If you want the smallest, fastest-loading script runtime, or you are coming from an embedded-systems or game-scripting background where Lua is already familiar, this is a good choice.

**Lua is Best for:**

- Lightweight, low-overhead scripts
- Fast startup and low memory use
- Straightforward procedural logic
- Direct GPIO and serial port interop
- Developers familiar with embedded or game scripting

Further reading:

- [Lua 5.1 Reference Manual](https://www.lua.org/manual/5.1/)
- [NLua Documentation](https://github.com/NLua/NLua)