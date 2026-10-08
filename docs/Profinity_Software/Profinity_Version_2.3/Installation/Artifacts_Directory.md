---
title: Artefacts Directory
description: "Understand where Profinity stores configuration, profiles, plugins, and logs in the artefacts directory on Windows, macOS, and Linux."
---

# Profinity Artefacts Directory

Profinity stores writable data (configuration, [profiles](../Administration/Profiles.md), plugins and logs) in a single artefacts directory, which is separate from the install directory that holds the program files. The artefacts path matters when upgrading from 2.2, deploying on Linux as a service, or mounting Docker volumes.

## Default Locations by Platform

| Platform | Default artefacts path |
|----------|------------------------|
| **Windows** | `%LOCALAPPDATA%\Prohelion\Profinity` |
| **macOS** | `~/.local/share/Prohelion/Profinity` |
| **Linux (2.3+)** | `/var/lib/prohelion/profinity` |

Everything under that root uses the same layout on every platform, and the subfolders use lowercase names on every platform because Linux file systems are case-sensitive:

| Subfolder | Contents |
|-----------|----------|
| `config/` | `config.yaml`, `security.yaml`, `plugins.yaml`, `custom.yaml` |
| `profiles/` | Profile and component YAML, dashboards, scripts |
| `plugins/` | User-installed DLL plugin folders |
| `logs/` | File logs when enabled |
| `can_bus_logs/` | CAN bus logs, with `replay/` and `archive/` beneath it |
| `tag_logs/` | Tag logs |
| `license/`, `certificates/`, `themes/`, `webroot/` | Licence file, generated and uploaded certificates, themes and web content |

The Linux installer pre-creates only `config/`, `profiles/`, `plugins/` and `logs/`. Profinity creates the other folders on demand.

Earlier releases used capitalised names (`Config`, `Config.yaml`, `Profiles`, `Logs`), and the first start of 2.3 renames them to the lowercase forms. This documentation uses the lowercase names throughout.

!!! info "Linux Data Moves in 2.3"
    Profinity 2.2 on Linux stored data in `~/.local/share/Prohelion/Profinity`. From 2.3 the default is `/var/lib/prohelion/profinity`, and Profinity moves existing data there automatically on first start unless `PROFINITY_HOME` is set (see [Automatic Migration on Startup](#automatic-migration-on-startup)).

## Override with PROFINITY_HOME

Set the environment variable `PROFINITY_HOME` to the full path of the artefacts root to run several Profinity instances on one host (each with its own `PROFINITY_HOME` and its own HTTP and HTTPS ports), to use a staging or test layout outside the default path, or to match a non-standard mount root in a Docker or custom image. For example, in a Linux shell:

```bash
export PROFINITY_HOME=/var/lib/prohelion-staging/profinity
```

## Automatic Migration on Startup

On first start after upgrading to 2.3, Profinity copies data from the older locations in the table below into the artefacts directory, renames `Config`, `Profiles` and `Logs` to lowercase, and removes an old folder once every file is present at the new location. A locked or offline file does not stop Profinity from starting, and migration resumes from where it stopped on the next restart. The Windows desktop application shows a progress window during migration, and on every host the **ADMIN > Logs** page lists a message for each file that moved.

| Platform | Older locations that Profinity migrates |
|----------|----------------------------------------|
| Windows and macOS | `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity`, and the same folder under the application-data location with the other casing (`prohelion/profinity`) |
| Linux | `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity`, `~/.local/share/Prohelion/Profinity` (the 2.2 location), `/var/lib/Prohelion/Profinity`, and `/var/lib/profinity/Prohelion/Profinity` |

!!! warning "Migration Does Not Run When PROFINITY_HOME Is Set"
    When `PROFINITY_HOME` is set, Profinity does not copy data from the older locations, so a custom root is never filled from the default install. Copy any data you need into the custom root yourself, including for Docker deployments that set `PROFINITY_HOME`. The rename of capitalised folders (`Config`, `Profiles`, `Logs`) to lowercase still runs under any root.

## Back Up and Restore

Back up the artefacts directory before every upgrade, and keep `config/` (including `security.yaml`), `profiles/`, `license/` and `certificates/` in every backup. Stop Profinity before you copy or restore the folders, and restore by replacing those folders and starting Profinity again.

## Linux Service Layout

For systemd deployments, a typical layout is:

| Path | Purpose |
|------|---------|
| `/var/lib/prohelion/profinity` | Artefacts (config, profiles, plugins, logs) |
| `/etc/profinity/env` | JWT signing key and encryption key, when a deployment script keeps them outside `security.yaml` |
| `/opt/profinity` | Install root (`profinity.sh`, `update.sh`, `VERSION`, `edition.json`) |
| `/opt/profinity/app` | Profinity binaries (self-contained or portable) |

`/opt/profinity` is the default install root created by the bootstrap installer (`install.sh`); pass `--install-dir` to use a different location. The `profinity` service user is created by the installer, which sets ownership of `/var/lib/prohelion` (and so the artefacts directory) to that user. On a manual or file-only install (`install.sh --no-systemd`), create the artefacts directory and set ownership before first start:

```bash
sudo mkdir -p /var/lib/prohelion/profinity
sudo chown -R profinity:profinity /var/lib/prohelion
```

## Linux Launcher

Unix installs (created by `install.sh` and updated in place by `update.sh`) include `profinity.sh` in the install root. It resolves the installed edition, runs preflight checks, and then starts Profinity. Always start Profinity through `profinity.sh` on Linux and macOS rather than calling `dotnet Profinity.dll` directly. Run `./profinity.sh` for an interactive foreground run that `Ctrl-C` stops, `./profinity.sh -s` (or `--service`) for service mode, which the systemd unit uses (see [Running as a Service](./Running_As_Service.md)), and `./profinity.sh --check-only` to run the preflight checks and exit.

## Docker Volumes

The artefacts directory inside a container is the path named by `PROFINITY_HOME`, so the compose file sets `PROFINITY_HOME` to the container-side mount path (for example `PROFINITY_HOME=/app/Prohelion` with `$HOME/Prohelion:/app/Prohelion:rw`). Without `PROFINITY_HOME` the container resolves the Linux default of `/var/lib/prohelion/profinity`, and any data written there is lost with the container unless that path is mounted. The image runs as the non-root `app` user, so the mounted host directory must be writable by that user; if it is not, Profinity cannot write its configuration and fails to start with a permission error.

!!! warning "Update Volume Mounts After Upgrading to 2.3 on Linux"
    If a compose file still mounts `./config` to `/root/.local/share/Prohelion/Profinity/Config` or `/root/Prohelion/Profinity/Config`, move the mounts to the artefacts root named by `PROFINITY_HOME`, and set `PROFINITY_HOME`, so that config and profiles persist across container restarts. Because migration does not run when `PROFINITY_HOME` is set, copy your existing `Config` and `Profiles` folders into the mounted directory before you start the 2.3 image.

The one-line Docker installer uses `PROFINITY_HOME=/var/lib/prohelion/profinity` inside the container and mounts `./data` there. Either layout works, provided `PROFINITY_HOME` matches the container-side mount path.

See [Docker Installation](./Docker_Installation.md) for compose examples.

## Troubleshooting

If the profile is empty after an upgrade, migration did not find your data: check **ADMIN > Logs** for migration messages, and if `PROFINITY_HOME` is set, copy the old data across yourself or unset the variable. If Linux reports a permission error, the account that runs Profinity does not own the artefacts directory, so give it ownership with `chown` on the artefacts tree (`/var/lib` needs root to create the folder, which is then handed to the service user). If two instances share one configuration, give each its own `PROFINITY_HOME` and its own HTTP and HTTPS ports.

## Related Documentation

- [Linux and macOS Installation](./Zip_Installation.md)
- [Docker Installation](./Docker_Installation.md)
- [Running as a Service](./Running_As_Service.md)
- [Release notes 2.3](../Release_Notes/2.3.1.md)
