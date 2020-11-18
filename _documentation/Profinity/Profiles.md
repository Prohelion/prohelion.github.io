---
title: Profiles
tags: [Profinity, CAN Bus, CAN Bus DBC, DBC, Overview]
keywords: Profinity, CAN Bus, CAN Bus DBC, DBC, Overview
last_updated: November 3, 2020
permalink: Profinity/Profiles.html
folder: Profinity
order: 1
---

# Profinity Profiles

A Profile is the core mechanism by which Profinity maintains the configuration of your system.  Profiles typically consist of one or more CAN Bus adapters, which are used to connect to the CAN network as well as devices that you might be managing.

Profinity keeps track of your profile and loads the most recently used one each time you start the tool.

The Profile panel is typically located on the left side of your screen and if you close the profile you can open it again by pressing the Profile button on the menu.

![Profinity]({{site.dox.baseurl}}/images/Profinity/profile.png)

The colors in a profile indicate the state of the device.  

- Green: The device is available, sending valid data and is a valid state
- Yellow: The device is available, but is either not sending data or is a warning state
- Red: The device is in an error state
- Grey: The device is not available, connected or not visible on the network

Profinity ships with an example profile called the PET Profile (Prohelion / Elmar / Tritium) which contains all the necessary configuration to support a vehicle based on Prohelion, Elmar and Tritium technologies.  If you wish to use this profile we would suggest copying it from the /Profiles/Templates folder that it is installed in to in to your Profile folder as Templates are over witten on each install.

Otherwise you can create your own Profiles or a new Profile, but pushing the New Profile button on the menu.

## Profile Files

In Profinity the profiles themselves are stored by default as files in

`/Documents/Prohelion/Profinity/Profiles`

While it is possible to edit the profile file directly we do not recommend you do so. 

Storing the file in this way makes it easy to share a Profile and if it makes sense if your environment, profiles can be stored on network drives or other shares such as Google Drive or Dropbox.

## Profile Properties

Each item in the profile has a set of properties that define the configuration of the item.  These properties can be accessed by right mouse clicking on the item and selecting properties.  The properties then appear at the bottom of the profile panel.

Properties can also be set when the item is first created in the [New Items](Adding_New_Items.html) window.

![Profinity]({{site.dox.baseurl}}/images/Profinity/profile_properties.png)

The properties shown will depend on the device.  Some devices have a range of values that are allowed for a property and if an invalid property is entered then an error will be shown.  Information on the property is shown at the very bottom of the property panel.