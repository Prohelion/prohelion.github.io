---
title: Installing Profinity
description: "Choose how to install Profinity on Windows, Linux, macOS, or Docker, then apply a licence, set environment variables and run it as a service."
type: index
owner: Documentation
last_reviewed: 2026-10-29
---

# Installing Profinity

Choose the installation method that matches your platform, then complete the setup pages that apply to your deployment.

## Choose an installation method

<div class="grid cards" markdown>

-   :fontawesome-brands-windows:{ .lg .middle } __Windows__

    ---

    The Setup Wizard installer, for the desktop application or browser access.

    [:octicons-arrow-right-24: Install Profinity on Windows](Windows_Installation.md)

-   :fontawesome-brands-apple:{ .lg .middle } :fontawesome-brands-linux:{ .lg .middle } __Linux and macOS__

    ---

    The bootstrap installer, which also sets up updates, the data location, and sign-in.

    [:octicons-arrow-right-24: Install Profinity on Linux and macOS](Linux_and_macOS_Installation.md)

-   :material-archive-outline:{ .lg .middle } __Archive on Linux and macOS__

    ---

    A downloaded archive that you unpack and start with the `profinity.sh` script.

    [:octicons-arrow-right-24: Install Profinity from an archive](Linux_and_macOS_Archive_Installation.md)

-   :fontawesome-brands-docker:{ .lg .middle } __Docker__

    ---

    A container started with Docker Compose or the one-line installer, with pages for ports, updates, and troubleshooting.

    [:octicons-arrow-right-24: Install Profinity with Docker](Docker/index.md)

</div>

## After you install

- [Apply a licence](Applying_a_Licence.md): apply a licence file, check that it has taken effect, and see who can sign in on each installation type.
- [Run Profinity as a service](./Run_as_a_Service/index.md): start automatically on Linux, macOS, or Windows, with a page for each system.
- [Environment variables](Environment_Variables.md): set configuration and profile values from the environment, and read the list of variables Profinity reads.
- [Artefacts directory](Artifacts_Directory.md): where Profinity keeps configuration, profiles, plugins, and logs.
- [Security guide](Security.md): the controls to put in place for a production deployment.

## Upgrade from an earlier version

- [Migration from V1 to V2](Upgrading/Migration.md): the differences between the two generations, and the clean installation that moving requires.
- [Upgrade from Profinity 2.2](Upgrading/Upgrade_From_2_2.md): back up, install 2.3, and check the licence, roles, dashboards, and integrations in order.
