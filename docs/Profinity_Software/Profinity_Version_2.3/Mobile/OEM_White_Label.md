---
title: OEM white-label mobile builds
description: Rebrand Profinity Mobile with your own name, colours, logos, and bundle identifiers, and build signed iOS and Android apps for your customers.
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# OEM white-label mobile builds

Original equipment manufacturer (OEM) partners can ship white-label builds of Profinity Mobile with their own branding and bundle identifiers.

The Profinity Mobile source package includes the build guide (`BUILD.md`) and the white-label guide (`WHITE-LABEL.md`), which list the prerequisites for building:

- Node.js 22.11 or later and npm for every build.
- macOS with Xcode 16 or later and CocoaPods for iOS.
- Android Studio with SDK platform API 26 or later and JDK 17 for Android.

## Branding configuration

OEM partners rebrand the app by editing the build-time file `app.config.yaml`.
Prohelion supplies this file with the Profinity Mobile source code and the branding assets.
The partner then builds signed iOS and Android binaries.
The file holds these fields:

| Field | Description |
|-------|-------------|
| `appName` | Display name on the splash screen and in the app stores |
| `companyName` | Subtitle on the splash screen |
| `primaryColor` | Action colour for buttons and badges |
| `navBackground` | Navigation and toolbar background colour |
| `secondaryColor` | Muted text colour |
| `brandRed` | Accent colour of the Profinity logo |
| `splashLogo`, `landingLogo` and `appIcon` | Paths to the splash logo, the landing page logo and the app icon source artwork |
| `development.androidEmulatorHostConnect` | Set to `true` only for development builds that connect an Android emulator to a Profinity server on the host machine |
| `discovery.profinityHeartbeatPort` | Must match the **Heartbeat UDP port** on the Profinity server (default 49025) |
| `discovery.profinityHeartbeatVersion` | The Profinity product version that the heartbeat is expected to report, set to `2.3` for Profinity 2.3 |
| `discovery.staleTimeoutMs` | Time in milliseconds after which a server that has not been seen is removed from the discovery list |

The iOS bundle identifier and the Android application identifier are set in the native projects, and each OEM sets them to its own namespace.
The `npm run configure` command regenerates the application configuration from `app.config.yaml`.
The `npm run setup` and `npm run validate` commands run it automatically.
The app build regenerates the launcher icons from the `appIcon` artwork.

## What end users get

End users install the OEM-branded app from the OEM's own store listing, or the OEM installs it on the phones of its service technicians.
Server discovery and login behaviour are the same as in [Profinity Mobile](index.md).
The app only finds servers whose **Heartbeat UDP port** matches `discovery.profinityHeartbeatPort`.
A server that uses HTTPS with a self-signed certificate shows the user a certificate prompt on first connection.
Install a trusted certificate on the server where you deploy the app to staff.
Sign-in through single sign-on (SSO) needs a Profinity site set to the **Sso** sign-in method.

Refer to the [Profinity 2.3 release notes](../Release_Notes/2.3.1.md) for what changed in this release.
