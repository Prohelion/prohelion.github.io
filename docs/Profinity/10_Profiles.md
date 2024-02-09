---
title: Profiles
order: 1
---

# Profinity Profiles

A Profile is the core mechanism by which Profinity maintains the configuration of your system.  Profiles typically consist of one or more CAN-Ethernet Bridges, which are used to connect to the CAN network as well as devices that you might be managing.

Profinity keeps track of your profile and loads the most recently used one each time you start the tool.

The Profile panel is typically located on the left side of your screen and if you close the profile you can open it again by pressing the Profile button on the menu.

![Profinity](images/profile.png)

The colours in a profile indicate the state of the device.  

| Colour   | Meaning                                                                       |
|----------|-------------------------------------------------------------------------------|
| `Green`  | The device is available, sending valid data and is a valid state              |
| `Yellow` | The device is available, but is either not sending data or is a warning state |
| `Red`    | The device is in an error state                                               |
| `Grey`   | The device is not available, connected or not visible on the network          |

Profinity ships with an example profile called the PET Profile (Prohelion / Elmar / Tritium) which contains all the necessary configuration to support a vehicle based on Prohelion, Elmar and Tritium technologies.  If you wish to use this profile as a basis for your own work we would suggest copying it to a new file name as the file is overwritten each time you install a new version of Profinity. 

Otherwise you can create your own Profiles or a new Profile, by pushing the New Profile button on the menu.

## Profile Files

In Profinity the profiles themselves are stored by default as files in the directory

`/Documents/Prohelion/Profinity/Profiles`

While it is possible to edit the profile file directly in a text we do not recommend you do so. 

Storing the file in this way makes it easy to share a Profile and if it makes sense if your environment, profiles can be stored on network drives or other shares such as Google Drive or Dropbox, you can also share a read only version of your Profile via [Prohelion Cloud Connect](55_Prohelion_Cloud_Connect.md)

## Profile Properties

Each item in the profile has a set of properties that define the configuration of the item.  These properties can be accessed by selecting the item or right mouse clicking on the item and selecting properties.  The properties then appear at the bottom of the profile panel, changing a property will set it in the profile.

Properties can also be set when the item is first created in the [New Items](15_Adding_New_Items.md) window.  

However, not all devices are configured directly via Properties, some devices that have more complex configuration setups like the [Prohelion Loggers](35_Logging_Replaying_CAN_Bus_Messages.md) are configured via wizards that set the underlying properties correctly for you.  

![Profinity](images/profile_properties.png)

The properties shown will depend on the device.  Some devices have a range of values that are allowed for a property and if an invalid property is entered then an error will be shown.  Information on the property is shown at the very bottom of the property panel.