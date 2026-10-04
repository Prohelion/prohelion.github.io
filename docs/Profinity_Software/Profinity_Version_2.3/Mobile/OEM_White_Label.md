---
title: OEM White-Label Mobile Builds
description: "Build and distribute white-label Profinity Mobile apps with custom branding and bundle identifiers."
---

# OEM White-Label Mobile Builds

OEM partners can ship **white-label** builds of Profinity Mobile with custom branding, bundle identifiers, and default server hints.

## Branding configuration

OEM partners rebrand the app by editing the build-time file `app.config.yaml` and the branding assets, and then building signed iOS and Android binaries. The file holds these fields:

| Field | Description |
|-------|-------------|
| `appName` | Display name on the splash screen and in the app stores |
| `companyName` | Subtitle on the splash screen |
| `primaryColor` | Action colour for buttons and badges |
| `navBackground` | Navigation and toolbar background colour |
| `secondaryColor` | Muted text colour |
| `brandRed` | Logo accent colour |
| `splashLogo`, `landingLogo` and `appIcon` | Paths to the splash logo, the landing page logo and the app icon source artwork |
| `development.androidEmulatorHostConnect` | Set to `true` only for development builds that connect an Android emulator to a Profinity server on the host machine |
| `discovery.profinityHeartbeatPort` | Must match the engine **Heartbeat UDP port** (default 49025) |
| `discovery.profinityHeartbeatVersion` | Profinity product version, currently `2.3` |
| `discovery.staleTimeoutMs` | Time in milliseconds after which a server that has not been seen is removed from the discovery list |

The iOS bundle identifier and the Android application identifier are set in the native projects, and each OEM sets them to its own namespace. The `npm run configure` command regenerates the generated application configuration from `app.config.yaml` (and runs automatically as part of `npm run setup` and `npm run validate`), and the launcher icons are regenerated from the `appIcon` artwork when the app is built.

## Operator-facing summary

- End users install the OEM-branded app from the OEM's distribution channel.
- **Server discovery** and **login behaviour** are the same as [standard Profinity Mobile](./index.md).
- **HTTPS certificates** and **SSO** must be coordinated with the deployed Profinity engine version.

## Related documentation

- [Profinity Mobile](./index.md)
- [Release notes 2.3.10](../Release_Notes/2.3.10.md)
