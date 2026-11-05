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
| `example_scripts/` | Example scripts in C#, Python and Lua, added on the first start |
| `plugins/` | User-installed plugin folders, each holding a .NET assembly (`.dll`) on every platform, and any native libraries it needs (`.so` on Linux, `.dylib` on macOS) |
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
It keeps every file that already exists, and adds them only on the first start, so anything you delete stays deleted.
Existing installations, including upgrades from 2.2, are not changed.
The example CAN log used for the replay examples is added too, for the replay step in the [Quick start guide](../Getting_Started/Quick_Start.md).

## Move the directory with PROFINITY_HOME

Set the environment variable `PROFINITY_HOME` to the full path of the artefacts root to:

- Run several Profinity instances on one host.
- Use a staging or test layout outside the default path.
- Match a non-standard mount root in a Docker or custom image.

Give each instance its own `PROFINITY_HOME`, and its own HTTP and HTTPS ports, set in the **IP Port for Http** and **IP Port for Https** settings on the **Web** tab, as described on the [Profinity Web](../Administration/System_Configuration/Profinity_Web.md) page.
Setting `PROFINITY_HOME` stops migration from the older locations, so copy any existing data you need into the new root first. Refer to [Automatic migration on startup](#automatic-migration-on-startup) for those locations.
For example, in a Linux shell:

```bash
export PROFINITY_HOME=/var/lib/prohelion-staging/profinity
```

Profinity reads `PROFINITY_HOME` when it starts, so restart Profinity after you set it. Set it before the first start, because Profinity does not migrate data from the older locations while it is set.

## Automatic migration on startup

On the first start after you upgrade to 2.3, Profinity moves or copies data from the older locations in the table into the artefacts directory.
It renames capitalised names from earlier releases, such as `Config`, `Config.yaml`, `Profiles`, and `Logs`, to lowercase, and removes an old folder once every file is present at the new location.
A locked or offline file does not stop Profinity from starting, and migration resumes from where it stopped on the next restart.

The Windows desktop application shows a progress window during migration.
On every host, the **ADMIN > Logs** page lists a message for each file that moved.

| Platform | Older locations that Profinity migrates |
|----------|----------------------------------------|
| Windows and macOS | `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity`, `%LOCALAPPDATA%\prohelion\profinity` on Windows, and `~/Library/Application Support/prohelion/profinity` on macOS |
| Linux | `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity`, `~/.local/share/Prohelion/Profinity` (the 2.2 location), `/var/lib/Prohelion/Profinity`, and `/var/lib/profinity/Prohelion/Profinity` |

!!! warning "Migration does not run when PROFINITY_HOME is set"
    When `PROFINITY_HOME` is set, Profinity skips copying data from the older locations, so a custom root receives nothing from the default install.
    Copy any data you need into the custom root yourself, including for Docker deployments that set `PROFINITY_HOME`.
    The rename of capitalised names (`Config`, `Config.yaml`, `Profiles`, `Logs`) to lowercase still runs under any root.

## Back up and restore

Back up the artefacts directory before every upgrade.
Keep `config/` (including `security.yaml`), `profiles/`, `license/`, and `certificates/` in every backup.
Restore the folders in this order:

1. Stop Profinity.
2. Rename the current folders instead of deleting them, so that they remain as a copy.
3. Copy the backed-up folders into place.
4. Start Profinity again.
5. Check that Profinity runs correctly, then delete the renamed folders.

## Troubleshooting

| What you see | Cause | What to do |
|--------------|-------|------------|
| The profile is empty after an upgrade | Migration did not find your data. | Check **ADMIN > Logs** for migration messages. If `PROFINITY_HOME` is set, copy the old data across yourself or unset the variable. |
| Linux reports a permission error | The account that runs Profinity does not own the artefacts directory. | Run `chown -R <service-account>:<service-group> <artefacts-root>` as root, with `sudo`. |
| Two instances show the same profiles and settings | Both instances use the same artefacts directory, so they read the same `config.yaml`. |  Give each its own `PROFINITY_HOME`, and its own HTTP and HTTPS ports, set in the **IP Port for Http** and **IP Port for Https** settings on the **Web** tab, as described on the [Profinity Web](../Administration/System_Configuration/Profinity_Web.md) page. |

In the command, `<service-account>` and `<service-group>` are the user and group that run Profinity, and `<artefacts-root>` is the artefacts directory, such as `/var/lib/prohelion/profinity`. The Linux installer creates the `profinity` user and group, so on a default install use `profinity:profinity`. Run the command with `sudo`, because only root can change the owner of a folder.

For the Linux service layout and launcher, refer to [Run Profinity as a Linux service](./Run_as_a_Service/Run_as_a_Linux_Service.md).
For Docker volume mounts, refer to [Install Profinity with Docker](./Docker/index.md).
