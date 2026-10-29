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
| Linux | `/var/lib/prohelion/profinity` |

On Linux, the default is `/var/lib/prohelion/profinity`.
Profinity moves existing data there automatically on first start, including data from the 2.2 location `~/.local/share/Prohelion/Profinity`, unless `PROFINITY_HOME` is set.

## Layout

Everything under the root uses the same layout on every platform.
The subfolders use lowercase names on every platform because Linux file systems are case-sensitive.

| Subfolder | Contents |
|-----------|----------|
| `config/` | `config.yaml`, `security.yaml`, `plugins.yaml`, `custom.yaml` |
| `profiles/` | Profile and component YAML, dashboards, scripts |
| `plugins/` | User-installed plugin folders, each holding a dynamic-link library (DLL) |
| `logs/` | File logs when enabled |
| `can_bus_logs/` | CAN bus logs, with `replay/` and `archive/` beneath it |
| `tag_logs/` | Tag logs |
| `license/`, `certificates/`, `themes/`, `webroot/` | Licence file, generated and uploaded certificates, themes, and web content |
| `.dp_keys/` | Hidden folder that Profinity manages for its own security keys; leave it alone, and you do not need to back it up |

The Linux installer pre-creates only `config/`, `profiles/`, `plugins/`, and `logs/`.
Profinity creates the other folders on demand.
Because `.dp_keys/` lives inside the artefacts directory, it stays on a Docker volume when you replace the container.
Profinity renames the capitalised names that earlier releases used (`Config`, `Config.yaml`, `Profiles`, `Logs`) to the lowercase forms on first start.
This documentation uses the lowercase names throughout.

## Sample content on a new installation

The first time Profinity starts on a new, empty artefacts directory, it adds an **Example Profile**, the example scripts in `example_scripts/`, and a starter web page in `webroot/`.
It never replaces a file that already exists, and it does not add them again after the first start, so anything you delete stays deleted.
Existing installations, including upgrades from 2.2, are not changed.
The example CAN log used for the replay examples is added too.

## Move the directory with PROFINITY_HOME

Set the environment variable `PROFINITY_HOME` to the full path of the artefacts root to:

- Run several Profinity instances on one host.
- Use a staging or test layout outside the default path.
- Match a non-standard mount root in a Docker or custom image.

Give each instance its own `PROFINITY_HOME` and its own HTTP and HTTPS ports.
For example, in a Linux shell:

```bash
export PROFINITY_HOME=/var/lib/prohelion-staging/profinity
```

## Automatic migration on startup

On the first start after you upgrade to 2.3, Profinity copies data from the older locations in the table into the artefacts directory.
It renames `Config`, `Profiles`, and `Logs` to lowercase, and removes an old folder once every file is present at the new location.
A locked or offline file does not stop Profinity from starting, and migration resumes from where it stopped on the next restart.
The Windows desktop application shows a progress window during migration.
On every host, the **ADMIN > Logs** page lists a message for each file that moved.

| Platform | Older locations that Profinity migrates |
|----------|----------------------------------------|
| Windows and macOS | `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity`, and the same folder under the application-data location with the other casing (`prohelion/profinity`) |
| Linux | `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity`, `~/.local/share/Prohelion/Profinity` (the 2.2 location), `/var/lib/Prohelion/Profinity`, and `/var/lib/profinity/Prohelion/Profinity` |

!!! warning "Migration does not run when PROFINITY_HOME is set"
    When `PROFINITY_HOME` is set, Profinity does not copy data from the older locations, so a custom root is never filled from the default install.
    Copy any data you need into the custom root yourself, including for Docker deployments that set `PROFINITY_HOME`.
    The rename of capitalised folders (`Config`, `Profiles`, `Logs`) to lowercase still runs under any root.

## Back up and restore

Back up the artefacts directory before every upgrade.
Keep `config/` (including `security.yaml`), `profiles/`, `license/`, and `certificates/` in every backup.
Stop Profinity before you copy or restore the folders, restore by replacing those folders, and start Profinity again.

## Troubleshooting

- The profile is empty after an upgrade: migration did not find your data. Check **ADMIN > Logs** for migration messages, and if `PROFINITY_HOME` is set, copy the old data across yourself or unset the variable.
- Linux reports a permission error: the account that runs Profinity does not own the artefacts directory. Give it ownership with `chown` on the artefacts tree, because `/var/lib` needs root to create the folder, which is then handed to the service user.
- Two instances share one configuration: give each its own `PROFINITY_HOME` and its own HTTP and HTTPS ports.

For the Linux service layout and launcher, refer to [Run Profinity as a Linux service](./Run_as_a_Service/Run_as_a_Linux_Service.md).
For Docker volume mounts, refer to [Install Profinity with Docker](./Docker/index.md).
