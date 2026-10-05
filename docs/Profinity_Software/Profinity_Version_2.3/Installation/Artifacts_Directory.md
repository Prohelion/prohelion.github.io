---
title: Artefacts Directory
description: "Understand where Profinity stores configuration, profiles, plugins, and logs in the artefacts directory on Windows, macOS, and Linux."
---

# Profinity artefacts directory

Profinity stores writable data — configuration, profiles, plugins, and logs — in a single **artefacts directory**. This is separate from the install directory that contains `Profinity Engine.dll` and other binaries.

The artefacts path matters when upgrading from 2.2.x, deploying on Linux as a service, or mounting Docker volumes.

## Default locations by platform

| Platform | Default artefacts path |
|----------|------------------------|
| **Windows** | `%LOCALAPPDATA%\Prohelion\Profinity` |
| **macOS** | `~/.local/share/Prohelion/Profinity` |
| **Linux (2.3+)** | `/var/lib/prohelion/profinity` |

The company and product path segments follow platform-normal casing: Pascal `Prohelion/Profinity` on Windows and macOS, lowercase `prohelion/profinity` on Linux. Everything under that root uses the same layout on every platform.

Typical subfolders, which use lowercase names on every platform (Linux file systems are case-sensitive):

| Subfolder | Contents |
|-----------|----------|
| `config/` | `config.yaml`, `security.yaml`, `plugins.yaml`, `custom.yaml` |
| `profiles/` | Profile and component YAML, dashboards, scripts |
| `plugins/` | User-installed DLL plugin folders |
| `logs/` | File logs when enabled |
| `can_bus_logs/` | CAN bus logs, with `replay/` and `archive/` beneath it |
| `tag_logs/` | Tag logs |
| `license/`, `certificates/`, `themes/`, `webroot/` | Licence state, generated and uploaded certificates, themes and web content |

The Linux installer pre-creates only `config/`, `profiles/`, `plugins/` and `logs/`. Profinity creates the other folders on demand.

Earlier releases used capitalised names (`Config`, `Config.yaml`, `Profiles`, `Logs`), and the migration on first start renames them to the lowercase forms. The same lowercase names are used for these files throughout the documentation.

!!! info "Linux path change in 2.3"
    Profinity 2.2 on Linux used the XDG layout (`~/.local/share/Prohelion/Profinity`). From **2.3**, the default is **`/var/lib/prohelion/profinity`** (lowercase, matching standard `/var/lib` packaging conventions) for service-oriented deployments. Migration runs automatically on first start after upgrade (unless `PROFINITY_HOME` is set; see [Automatic migration on startup](#automatic-migration-on-startup)), and also covers hosts that were previously migrated to a Pascal-cased `/var/lib/Prohelion/Profinity` path.

## Override with PROFINITY_HOME

Set the environment variable **`PROFINITY_HOME`** to the full path of the artefacts root to support:

- Multiple Profinity instances on one host (each with a unique `PROFINITY_HOME` and unique HTTP/HTTPS ports).
- Staging or test layouts outside the default path.
- Docker or custom images with a non-standard mount root.

Example (Linux shell):

```bash
export PROFINITY_HOME=/var/lib/prohelion-staging/profinity
```

## Automatic migration on startup

On first start after upgrading to 2.3, Profinity migrates legacy trees into the resolved artefacts directory. Migration is **non-fatal**: a locked or offline file does not block engine start; partial progress resumes on the next restart.

!!! warning "Migration does not run when PROFINITY_HOME is set"
    When `PROFINITY_HOME` is set, Profinity does **not** copy data from the legacy locations below, so a custom root is never filled from the default install. Copy any data you need into the custom root yourself. This includes Docker deployments that set `PROFINITY_HOME`. The in-place rename of capitalised folders (`Config`, `Profiles`, `Logs`) to lowercase still runs under any root.

### Windows and macOS sources

1. `~/Documents/Prohelion/Profinity` — files copied when the destination does not already have the same path (fill gaps only).
2. `~/Prohelion/Profinity` — merged with overwrite on collision when moving to the application-data target.
3. The same folder under the application-data location with the other casing (lowercase `prohelion/profinity`) — renamed in place on case-insensitive volumes, otherwise merged with overwrite on collision.

Sources are processed in the order listed. On Windows and macOS, `~/Prohelion/Profinity` is the older, authoritative location, so it overwrites. On Linux the same folder only fills gaps, and `~/.local/share/Prohelion/Profinity` (the 2.2 layout) is the source that overwrites.

### Linux sources

1. `~/Documents/Prohelion/Profinity` and `~/Prohelion/Profinity` — fill gaps only.
2. `~/.local/share/Prohelion/Profinity` (2.2 XDG layout) — overwrite on collision.
3. `/var/lib/Prohelion/Profinity` (Pascal-cased path used by some pre-release builds) — overwrite on collision.
4. `/var/lib/profinity/Prohelion/Profinity` (legacy Rinstrum layout) — overwrite on collision.

Legacy folders are removed only after every file is present at the destination with matching content.

The Windows desktop application shows a progress window during migration. On all hosts, the per-file migration messages appear in the **Admin** area under **Logs**.

## Linux service layout

For systemd deployments (including Rinstrum scale integrations), a typical layout is:

| Path | Purpose |
|------|---------|
| `/var/lib/prohelion/profinity` | Artefacts (config, profiles, plugins, logs) |
| `/etc/profinity/env` | JWT signing key and encryption key (created once by deploy) |
| `/opt/profinity` | Install root (`profinity.sh`, `update.sh`, `VERSION`, `edition.json`) |
| `/opt/profinity/app` | Profinity binaries (self-contained or portable) |

`/opt/profinity` is the default install root created by the bootstrap installer (`install.sh`); pass `--install-dir` to use a different location. The `profinity` service user is created by the installer, which sets ownership of `/var/lib/prohelion` (and so the artefacts directory) to that user. On a manual or file-only install (`install.sh --no-systemd`), create the artefacts directory and set ownership before first start:

```bash
sudo mkdir -p /var/lib/prohelion/profinity
sudo chown -R profinity:profinity /var/lib/prohelion
```

## Linux launcher (profinity.sh)

Unix installs (created by `install.sh`, and updated in place by `update.sh`) include **`profinity.sh`** in the install root. It resolves the edition from `edition.json`, runs preflight checks (including invariant globalization and, for the portable edition, the .NET runtime), and then starts the engine — either the self-contained `app/Profinity` binary or `dotnet app/Profinity.dll`, depending on edition. Always start Profinity through `profinity.sh` on Linux and macOS rather than calling `dotnet Profinity.dll` directly:

- **Interactive:** `./profinity.sh` runs in the foreground, and `Ctrl-C` stops it.
- **Service:** `./profinity.sh -s` (or `--service`) tells the engine to run in OS service mode. This is the form used by the systemd `ExecStart` line; see [Running as a Service](./Running_As_Service.md).
- **Preflight only:** `./profinity.sh --check-only` runs dependency and preflight checks and exits.

## Docker volumes

The artefacts directory inside a container is the path named by **`PROFINITY_HOME`**, so the compose file sets `PROFINITY_HOME` to the container-side mount path (for example `PROFINITY_HOME=/app/Prohelion` with `$HOME/Prohelion:/app/Prohelion:rw`, as in the compose file published with Profinity). Without `PROFINITY_HOME` the container resolves the Linux default of `/var/lib/prohelion/profinity`, and any data written there is lost with the container unless that path is mounted. The image runs as the non-root `app` user, so the mounted host directory must be writable by that user.

!!! warning "Update volume mounts after upgrading to 2.3 on Linux"
    If a compose file still mounts `./config` to `/root/.local/share/Prohelion/Profinity/Config` or `/root/Prohelion/Profinity/Config`, update the mounts to the artefacts root named by `PROFINITY_HOME`, and set `PROFINITY_HOME` so that config and profiles persist across container restarts.

The one-line Docker installer (`install-docker.sh`) takes a different approach: it sets `PROFINITY_HOME=/var/lib/prohelion/profinity` inside the container and mounts `./data` there. Either layout works, provided `PROFINITY_HOME` matches the container-side mount path.

See [Docker Installation](./Docker_Installation.md) for compose examples.

## Troubleshooting

| Symptom | Check |
|---------|--------|
| Empty profile after upgrade | Confirm migration logs; if `PROFINITY_HOME` is set, legacy data is not migrated, so copy it across or unset the variable |
| Permission denied on Linux | `chown` artefacts tree to the service user; `/var/lib` requires root to create, then hand off ownership |
| Two instances share config | Each instance needs a unique `PROFINITY_HOME` and unique HTTP/HTTPS ports |

## Related documentation

- [Linux and macOS Installation](./Zip_Installation.md)
- [Docker Installation](./Docker_Installation.md)
- [Running as a Service](./Running_As_Service.md)
- [Release notes 2.3.10](../Release_Notes/2.3.10.md)
