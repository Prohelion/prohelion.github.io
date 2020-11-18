---
# Page settings
layout: homepage # Choose layout: "default", "homepage" or "documentation-archive"
title: Prohelion Documentation
description: Documentation for Prohelions tools
keywords: Prohelion, Profinity, CAN Bus Tools, CAN Bus Utilities

# Hero section
hero:
    title: Download Profinity
    text: Prohelion's Battery and CAN Bus management solution
    background_image: # Paste image URL to display image in background of hero section
    buttons: # Add buttons below, there are examples with all available options
        - label: Download (for Windows)
          url: https://github.com/Prohelion/Profinity/releases/latest/download/Profinity.install.msi
          external_url: true # Set to "false" if you're pointing to inner page
          style: filled # Choose style: "filled" or "bordered"
          icon: download # Choose from 266 icons in "Feather" icon set, list of all icons is available here - https://feathericons.com

# Features section
features:
    rows: # Add feature rows below, there are examples with all available options
        - title: Commercially Supported Products
          description: Documentation for our Prohelion tools for Professional Battery Management and CAN Bus power users.
          grid: # Add feature grid items below, there are examples with all available options
              - title: Battery Management System (BMU)
                description: Prohelion's world class battery management system, used for racing, automotive and fixed location solutions
                icon: battery-charging 
                url: Battery_Management_System_PDF/Overview.html
              - title: Profinity
                description: Modern software for managing Prohelion Batteries and other CAN Bus based solutions.
                icon: check-circle
                url: Profinity/Overview.html
        - title: Open Source Products
          description: Prohelion provided a number of Open Source products to support our racing heratige and electric vehicle teams from around the world, called ArrowPoint
          grid:
              - title: ArrowPoint Tablet
                description: Android Tablet application for monitoring batteries and solar arrays built using Prohelion technologies.
                icon: tablet
                url: ArrowPoint_Tablet/Overview.html
              - title: ArrowPoint Telemetry
                description: A data capture and fleet management solution for solar electric and electric vehicle racing car teams
                icon: activity
                url: ArrowPoint_Telemetry/Overview.html
              - title: ArrowPoint CAN Bus Tools
                description: Before Profinity (download above) we used the ArrowPoint CAN Bus tools, this release is provided open source to help you learn how to develop CAN Bus solutions
                icon: server
                url: ArrowPoint_CAN Bus_Tools/Overview.html
---
