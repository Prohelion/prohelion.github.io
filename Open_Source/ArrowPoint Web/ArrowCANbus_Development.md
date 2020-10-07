---
title: ArrowPoint CANbus Development
tags: [ArrowPoint, CANbus, Development]
keywords: ArrowPoint, CANbus, Development
last_updated: November 22, 2019
summary: 
sidebar: arrowpoint_sidebar
permalink: ArrowCANbus_Development.html
folder: ArrowPoint
---

## Compilation and Development
If you are planning to contribute to the development of this tool, please see our [Contribution File](https://github.com/Prohelion/ArrowPoint-CANbus-Tools/blob/master/CONTRIBUTING.md) on GitHub.

Compiling the solution requires Visual Studio 2017 with the C# modules installed. The community edition of Visual Studio works fine for building this code.

You have two options to build the code, either load the project in Visual Studio 2017 and build normally or execute a build on the command line by opening the Developer Command Prompt for Visual Studio 2017 and then running

in the root level source code directory. Information on running msbuild can be found on the [Microsoft Visual Studio Website](https://docs.microsoft.com/en-us/cpp/build/building-on-the-command-line?redirectedfrom=MSDN&view=vs-2019).

```shell
msbuild;
```

## Issues or Suggestions
If you have any issues with the code or discover bugs then we would encourage you to log them on the issues page here [https://github.com/Prohelion/ArrowPoint-CANbus-Tools/issues](https://github.com/Prohelion/ArrowPoint-CANbus-Tools/issues) or have a go at fixing them and then send us a pull request with details of what you have done. If you are fixing a bug, please log it as per the [Contribution File](https://github.com/Prohelion/ArrowPoint-CANbus-Tools/blob/master/CONTRIBUTING.md) instructions so that we have an idea on what you are attempting to do. Also check out the [Software Troubleshooting](Arrow_SoftwareTroubleshooting.html) page.

{% include links.html %}