---
title: Artefacts directory
description: "Find where Profinity stores configuration, profiles, plugins, and logs on Windows, macOS, and Linux, and how to move it with PROFINITY_HOME."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Artefacts directory

Profinity stores its writable data, such as configuration, [profiles](../Administration/Profiles.md), plugins, and logs, in a single artefacts directory, which is separate from the install directory that holds the program files.
The path matters when you upgrade from 2.2, deploy on Linux as a service, or mount Docker volumes.

## Default locations

| Platform | Default artefacts path |
|----------|------------------------|
| Windows | `%LOCALAPPDATA%\Prohelion\Profinity` |
| macOS | `~/Library/Application Support/Prohelion/Profinity` |
| Linux (2.3 and later) | `/var/lib/prohelion/profinity` |

On Linux, Profinity 2.2 stored data in `~/.local/share/Prohelion/Profinity`.
From 2.3 the default is `/var/lib/prohelion/profinity`, and Profinity moves existing data there automatically on first start unless `PROFINITY_HOME` is set.

## Layout

Everything under the root uses the same layout on every platform, and the subfolders use lowercase names on every platform because Linux file systems are case-sensitive.

| Subfolder | Contents |
|-----------|----------|
| `config/` | `config.yaml`, `security.yaml`, `plugins.yaml`, `custom.yaml` |
| `profiles/` | Profile and component YAML, dashboards, scripts |
| `plugins/` | User-installed DLL plugin folders |
| `logs/` | File logs when enabled |
| `can_bus_logs/` | CAN bus logs, with `replay/` and `archive/` beneath it |
| `tag_logs/` | Tag logs |
| `license/`, `certificates/`, `themes/`, `webroot/` | Licence file, generated and uploaded certificates, themes, and web content |

The Linux installer pre-creates only `config/`, `profiles/`, `plugins/`, and `logs/`, and Profinity creates the other folders on demand.
Earlier releases used capitalised names (`Config`, `Config.yaml`, `Profiles`, `Logs`), and the first start of 2.3 renames them to the lowercase forms.
This documentation uses the lowercase names throughout.

## Move the directory with PROFINITY_HOME

Set the environment variable `PROFINITY_HOME` to the full path of the artefacts root to run several Profinity instances on one host, to use a staging or test layout outside the default path, or to match a non-standard mount root in a Docker or custom image.
Give each instance its own `PROFINITY_HOME` and its own HTTP and HTTPS ports.
For example, in a Linux shell:

```bash
export PROFINITY_HOME=/var/lib/prohelion-staging/profinity
```

## Automatic migration on startup

On the first start after you upgrade to 2.3, Profinity copies data from the older locations below into the artefacts directory, renames `Config`, `Profiles`, and `Logs` to lowercase, and removes an old folder once every file is present at the new location.
A locked or offline file does not stop Profinity from starting, and migration resumes from where it stopped on the next restart.
The Windows desktop application shows a progress window during migration, and on every host the **ADMIN > Logs** page lists a message for each file that moved.

| Platform | Older locations that Profinity migrates |
|----------|----------------------------------------|
| Windows and macOS | `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity`, and the same folder under the application-data location with the other casing (`prohelion/profinity`) |
| Linux | `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity`, `~/.local/share/Prohelion/Profinity` (the 2.2 location), `/var/lib/Prohelion/Profinity`, and `/var/lib/profinity/Prohelion/Profinity` |

!!! warning "Migration does not run when PROFINITY_HOME is set"
    When `PROFINITY_HOME` is set, Profinity does not copy data from the older locations, so a custom root is never filled from the default install.
    Copy any data you need into the custom root yourself, including for Docker deployments that set `PROFINITY_HOME`.
    The rename of capitalised folders (`Config`, `Profiles`, `Logs`) to lowercase still runs under any root.

## Back up and restore

Back up the artefacts directory before every upgrade, and keep `config/` (including `security.yaml`), `profiles/`, `license/`, and `certificates/` in every backup.
Stop Profinity before you copy or restore the folders, restore by replacing those folders, and start Profinity again.

## Troubleshooting

- The profile is empty after an upgrade: migration did not find your data. Check **ADMIN > Logs** for migration messages, and if `PROFINITY_HOME` is set, copy the old data across yourself or unset the variable.
- Linux reports a permission error: the account that runs Profinity does not own the artefacts directory. Give it ownership with `chown` on the artefacts tree, because `/var/lib` needs root to create the folder, which is then handed to the service user.
- Two instances share one configuration: give each its own `PROFINITY_HOME` and its own HTTP and HTTPS ports.

The Linux service layout and launcher are described in [Run Profinity as a Linux service](./Run_as_a_Service/Run_as_a_Linux_Service.md), and Docker volume mounts in [Install Profinity with Docker](./Docker_Installation.md).
