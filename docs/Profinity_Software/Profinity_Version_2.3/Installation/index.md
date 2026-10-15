---
title: Installing Profinity
description: "Choose how to install Profinity on Windows, Linux, macOS, or Docker, then apply a licence, set environment variables and run it as a service."
type: index
owner: Documentation
last_reviewed: 2026-10-15
---

# Installing Profinity

Choose the installation method that matches your platform, then complete the setup pages that apply to your deployment.

## Choose an installation method

- [Install Profinity on Windows](Windows_Installation.md): the Setup Wizard installer, for the desktop application or browser access.
- [Install Profinity on Linux and macOS](Linux_and_macOS_Installation.md): the bootstrap installer, with update, data location, and sign-in.
- [Install Profinity from an archive on Linux and macOS](Linux_and_macOS_Archive_Installation.md): a downloaded archive, started with the `profinity.sh` script.
- [Install Profinity with Docker](Docker_Installation.md): run Profinity in containers with Docker Compose, expose CAN devices, and prepare for production.
- [Install Profinity with the Docker one-line installer](Docker_One_Line_Installer.md): install in Docker with a single script.

## After you install

- [Apply a licence](Applying_a_Licence.md): apply a licence file and check that it has taken effect.
- [Upgrade from Profinity 2.2](Upgrade_From_2_2.md): back up, install 2.3, and check the licence, roles, dashboards, and integrations in order.
- [Update the Profinity Docker image](Update_Docker_Image.md): move a Docker installation to a newer image, by hand or with Watchtower.
- [Set environment variables](Set_Environment_Variables.md): set configuration and profile values from the environment on each platform.
- [Environment variables](Environment_Variables.md): the placeholder syntax and the variables Profinity reads.
- [Artefacts directory](Artifacts_Directory.md): where Profinity keeps configuration, profiles, plugins, and logs.
- [Run Profinity as a service](Running_As_Service.md): start automatically on Linux, macOS, or Windows, with a page for each system.
- [Security guide](Security.md): the controls to put in place for a production deployment.
- [Migration from V1 to V2](Migration.md): the differences between the two generations, and the clean installation that moving requires.
