---
title: Supported Languages
---

# Supported Languages

Profinity offers a versatile scripting environment that supports two powerful languages: C# and Python (via [IronPython](https://ironpython.net/)). Each language is integrated with the .NET framework, providing a rich set of libraries and tools to enhance your scripting experience. This guide will walk you through the core functionalities and provide insights into choosing the right language for your needs.

Profinity supports two programming languages.

| C# Scripting | Python |
|--------------|--------|
|![C# Logo](../../../images/CSharpLogo.png) | ![Python Logo](../../../images/PythonLogo.png) |

Ultimately the choice of your preferred scripting language is up to you, Profinity supports two to help developers who are coming from different programming backgrounds, but the features and functions available are common across both languages.

| Language | Strengths | Considerations |
|----------|-----------|----------------|
| C# | - Strong typing<br>- Full .NET framework access<br>- Enterprise features<br>- Performance optimization | - More verbose syntax<br>- Requires .NET knowledge<br>- Longer development time |
| Python | - Clean syntax<br>- Rich ecosystem<br>- Great for data processing<br>- Easy to learn | - Slower execution<br>- Less suitable for real-time operations<br>- Memory management considerations |

If you need even more power than Profinity Scripting provides then you can also call Profinity APIs to get the full access to all key Profinity functionality from your own tools.

### C# Scripting

C# is a statically typed, object-oriented language known for its performance and scalability. In Profinity, C# scripts leverage the full power of the .NET framework, making it ideal for complex operations and enterprise-level applications.  It is also the best language to use if you are looking to deeply integrate with Profinity itself as Profinity is written in C#.

C# scripts in Profinity are implemented as classes that inherit from base classes or implement specific interfaces. They provide strong typing and full access to the .NET framework.

**C# is Best for:**

- Complex operations requiring type safety
- Integration with .NET libraries
- Large-scale automation projects
- Performance-critical applications
- Enterprise-level solutions

[C# Language Reference](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/)
[.NET API Documentation](https://docs.microsoft.com/en-us/dotnet/api/)

### Python (via [IronPython](https://ironpython.net/))

Python scripts in Profinity use a procedural style with functions that are called by the system. They provide a clean, readable syntax and are excellent for data processing and automation tasks.

Profinity uses a C# library called [IronPython](https://ironpython.net/) to allow you to write Python code within the C# framework that Profinity is built on.  IronPython brings the simplicity and readability of Python to the .NET ecosystem. It is particularly well-suited for data analysis, scripting, and rapid prototyping, offering seamless integration with .NET libraries.

Profinity uses [IronPython](https://ironpython.net/) with Python 3 compatibility enabled. All Python scripts use Python 3 syntax, including:

- `print()` as a function (not a statement)
- Support for f-strings (e.g., `f"Value: {value}"`)
- Division operators (`/` for true division, `//` for floor division)
- Unicode literals
- Absolute imports

If you want to use Python as your preferred programming language or want to integrate Profinity with other libraries written in Python, this is a good choice.

**Python Is Best for:**

- Data processing and analysis
- Complex data manipulation
- Scientific computing
- Integration with Python libraries
- Readable, maintainable code

[IronPython Documentation](https://ironpython.net/documentation/)
[Python Language Reference](https://docs.python.org/3/reference/)