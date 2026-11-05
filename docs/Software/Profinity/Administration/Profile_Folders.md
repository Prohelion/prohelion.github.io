---
title: Profile folders
description: "Find where Profinity stores profile files and what the images, models, styles, and content folders of a profile directory hold."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Profile folders

Profinity stores profiles and their related files in the `profiles` folder of the [artefacts directory](../Installation/Artifacts_Directory.md), which gives the location for each operating system.
You can edit a profile's `profile.yaml` file in the profile's own folder with a text editor, but this is not recommended, because a mistake such as an unrecognised setting name stops the profile loading, as described in [Invalid configuration files](System_Configuration/Invalid_Configuration_Files.md).
Profinity reloads the file once the change is saved.

A profile directory has four folders that serve files to dashboards: `images`, `models`, `styles` and `content`.
Profinity also uses `collections`, `components`, `dashboards`, `dbc`, `firmware`, `rules` and `scripts` in a profile directory, and creates them when the profile first needs them.

| Folder | Holds |
|---|---|
| `images` | Images such as icons, device diagrams, logos, and status indicators |
| `models` | 3D model files used by a `model` component, such as `.glb`, `.gltf`, `.stl` and `.obj` |
| `styles` | Custom CSS stylesheets for colour schemes and layout overrides |
| `content` | General files such as HTML templates and Markdown files |

For example, a dashboard references an image as `image: "my-icon.svg"` and a stylesheet as `profile.css`.

To share a profile with its files, refer to [Manage profiles](./Manage_Profiles.md).
