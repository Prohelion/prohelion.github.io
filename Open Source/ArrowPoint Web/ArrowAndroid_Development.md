---
title: ArrowPoint Android Development
tags: [ArrowPoint, Android, Development]
keywords: ArrowPoint, Android, Development
last_updated: November 22, 2019
summary:
sidebar: arrowpoint_sidebar
permalink: ArrowAndroid_Development.html
folder: ArrowPoint
---

## Compilation and Development
If you are planning to contribute to the development of this tool, please see our [Contribution File](https://github.com/Prohelion/ArrowPoint-CANbus-Tools/blob/master/CONTRIBUTING.md) on GitHub.

As mentioned above, compilation and development requires [Android Studio](https://developer.android.com/studio).

## Known Issues
Not all Android hardware is able to receive UDP packets and typically this capability is only available in mid tier to high tier Android tablets and Phone. TeamArrow have been racing with this solution for a number of years and we have typically found that Samsung products provide the most reliability in this space. It is worth checking that your tablet or phone can handle UDP broadcast traffic before attempting to use this application.

This applications receives 100's of CANbus packets per second and as such puts significant strain on the battery, also the screen runs all the time. We have typically found that we need a tablet per sector when running an event like World Solar Challenge. TeamArrow carries multiple tablets in the fleet and always has a few on charge at any time.

## Issues or Suggestions
If you have any issues with the code or discover bugs then we would encourage you to log them on the issues page here [https://github.com/Prohelion/ArrowPoint-Android/issues](https://github.com/Prohelion/ArrowPoint-Android/issues) or have a go at fixing them and then send us a pull request with details of what you have done. If you are fixing a bug, please log it as per the [Contribution File](https://github.com/Chrishaywood/ProhelionDocs/blob/master/CONTRIBUTING.md) instructions so that we have an idea on what you are attempting to do. Also check out the Software Troubleshooting page for more information.

{% include links.html %}