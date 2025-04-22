# Getting Started with Profinity Scripting

Welcome to the Profinity Scripting guide. This document serves as your comprehensive introduction to the scripting capabilities within Profinity, designed to empower you with the tools and knowledge needed to create robust and efficient scripts. Whether you are automating tasks, processing data, or integrating systems, this guide will help you navigate the essential features and best practices of Profinity scripting.

## Overview

Profinity offers a versatile scripting environment that supports three powerful languages: C#, Python (via IronPython), and JavaScript (via Jint). Each language is integrated with the .NET framework, providing a rich set of libraries and tools to enhance your scripting experience. This guide will walk you through the core functionalities and provide insights into choosing the right language for your needs.

## Supported Scripting Languages

Profinity supports three programming languages.

<center>

| C# Scripting                        | Python                                   | JavaScript                                       |
|-------------------------------------|------------------------------------------|--------------------------------------------------|
|![C# Logo](../../../images/CSharpLogo.png) | ![Python Logo](../../../images/PythonLogo.png) | ![JavaScript Logo](../../../images/JavaScriptLogo.png) |

</center>

Ultimately the choice of your preferred scripting language is up to you, Profinity supports three to help developers who are coming from different programming backgrounds, but the features and functions available are common across all three languages.

<center>

| Language | Strengths | Considerations |
|----------|-----------|----------------|
| C# | - Strong typing<br>- Full .NET framework access<br>- Enterprise features<br>- Performance optimization | - More verbose syntax<br>- Requires .NET knowledge<br>- Longer development time |
| JavaScript | - Simple syntax<br>- Quick development<br>- Familiar to web developers<br>- Lightweight | - Less type safety<br>- Limited to basic features<br>- Less suitable for complex operations |
| Python | - Clean syntax<br>- Rich ecosystem<br>- Great for data processing<br>- Easy to learn | - Slower execution<br>- Less suitable for real-time operations<br>- Memory management considerations |

</center>

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

### Python (via IronPython)

Python scripts in Profinity use a procedural style with functions that are called by the system. They provide a clean, readable syntax and are excellent for data processing and automation tasks.

Profinity uses a C# library called IronPython to allow you to write Python code within the C# framework that Profinity is built on.  IronPython brings the simplicity and readability of Python to the .NET ecosystem. It is particularly well-suited for data analysis, scripting, and rapid prototyping, offering seamless integration with .NET libraries.  

If you want to use Python as your preferred programming language or want to integrate Profinity with other libraries written in Python, this is a good choice.

**Python Is Best for:**

- Data processing and analysis
- Complex data manipulation
- Scientific computing
- Integration with Python libraries
- Readable, maintainable code

[IronPython Documentation](https://ironpython.net/documentation/)
[Python Language Reference](https://docs.python.org/3/reference/)

### JavaScript (Jint)

JavaScript scripts in Profinity use a more functional approach, with global functions that are called by the system. They provide a simpler syntax and are well-suited for quick scripting tasks.

Profinity supports JavaScript scripting, through the Jint interpreter, provides a dynamic scripting option within Profinity. It is perfect for web developers and those looking for a lightweight, flexible scripting solution and want to be able to create scripts in Profinity.

**Best for:**

- Rapid prototyping
- Quick automation tasks
- Simple scripts
- Web developers familiar with JavaScript
- Lightweight operations

[Jint Documentation](https://github.com/sebastienros/jint)
[JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

