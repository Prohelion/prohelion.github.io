---
title: OEM White-Label Mobile
description: "Build and distribute white-label Profinity Mobile apps with custom branding and bundle identifiers."
---

# OEM white-label mobile builds

OEM partners can ship **white-label** builds of Profinity Mobile with custom branding, bundle identifiers, and default server hints.

## Documentation location

Authoritative build and branding instructions are maintained in the Profinity engineering repository:

- [WHITE-LABEL.md](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Profinity-Mobile/WHITE-LABEL.md) — full `app.config.yaml` field reference, bundle ID and branding steps
- [BUILD.md](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Profinity-Mobile/BUILD.md) — see §3 "Configure (white-label)" and §5–6 for app store and MDM submission for OEMs

This page does not duplicate OEM build steps — follow the colocated mobile docs on the branch that matches your engine release.

## Operator-facing summary

- End users install your OEM-branded app from your distribution channel.
- **Server discovery** and **login behaviour** are the same as [standard Profinity Mobile](./index.md).
- Coordinate **HTTPS certificates** and **SSO** with your deployed Profinity engine version.

## Related documentation

- [Profinity Mobile](./index.md)
- [Release notes 2.3.10](../Release_Notes/2.3.10.md)
