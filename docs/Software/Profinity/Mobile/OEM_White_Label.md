---
title: OEM white-label mobile builds
description: Rebrand Profinity Mobile with your own name, colours, logos, and bundle identifiers, and build signed iOS and Android apps for your customers.
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# OEM white-label mobile builds

Original equipment manufacturer (OEM) partners can ship white-label builds of Profinity Mobile with their own branding and bundle identifiers.

The Profinity Mobile source package includes the build guide (`BUILD.md`) and the white-label guide (`WHITE-LABEL.md`). The source package's `BUILD.md` lists the prerequisites for building, including Node.js, Xcode, CocoaPods, Android Studio and JDK 17.

## Branding configuration

OEM partners rebrand the app by editing the build-time file `app.config.yaml`.
Prohelion supplies this file with the Profinity Mobile source code and the branding assets. It sits in the root folder of the source package, beside `package.json`.
The partner then builds signed iOS and Android binaries.
The file holds these fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `appName` | Text | `Profinity` | Display name on the splash screen and in the app stores |
| `companyName` | Text | `Prohelion Pty Ltd` | Subtitle on the splash screen |
| `primaryColor` | Text | `#1976d2` | Action colour for buttons and badges |
| `navBackground` | Text | `#232c3a` | Navigation and toolbar background colour |
| `secondaryColor` | Text | `#6b7482` | Muted text colour |
| `brandRed` | Text | `#e50019` | Accent colour of the Profinity logo |
| `splashLogo`, `landingLogo` and `appIcon` | File upload | `assets/images/profinity-logo.svg`, `assets/images/landing-profinity.svg` and `assets/images/apple-touch-icon.png` | Paths to the splash logo, the landing page logo and the app icon source artwork |
| `development.androidEmulatorHostConnect` | On or off | `false` | Set to `true` only for development builds that connect an Android emulator to a Profinity server on the host machine |
| `discovery.profinityHeartbeatPort` | Whole number | `49025` | Must match the **Heartbeat UDP port** on the Profinity server (default 49025) |
| `discovery.profinityHeartbeatVersion` | Text | `2.3` | The major.minor product version (for example `2.3`) that a server must report in its heartbeat. The app hides any server that reports a different version |
| `discovery.staleTimeoutMs` | Time (ms) | `10000` | Time in milliseconds after which a server that has not been seen is removed from the discovery list |

The iOS bundle identifier is set in Xcode under the **ProfinityMobile** target, in **Signing**. The Android application identifier is `defaultConfig.applicationId` in `android/app/build.gradle`.

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

Refer to the [Profinity release notes](../Release_Notes/index.md) for what changed in the release you ship.
