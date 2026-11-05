---
title: Profile folders
description: "Find where Profinity stores profile files and what the images, models, styles, and content folders of a profile directory hold."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Profile folders

Profinity stores profiles and their related files in the `profiles` folder of the [artefacts directory](../Installation/Artifacts_Directory.md), which gives the location for each operating system.
You can edit a profile file directly in a text editor, but this is not recommended.
Profinity reloads the file once the change is saved.

A profile directory has four folders that serve files to dashboards: `images`, `models`, `styles` and `content`.
Profinity creates the other folders, such as `dashboards`, `scripts` and `rules`, when the profile first needs them.

| Folder | Holds |
|---|---|
| `images` | Images such as icons, device diagrams, logos, and status indicators |
| `models` | 3D model files used by a `model` component, such as `.glb`, `.gltf`, `.stl` and `.obj` |
| `styles` | Custom CSS stylesheets for colour schemes and layout overrides |
| `content` | General files such as HTML templates and Markdown files |

For example, a dashboard references an image as `image: "my-icon.svg"` and a stylesheet as `profile.css`.

To share a profile with its files, refer to [Manage profiles](./Manage_Profiles.md).
