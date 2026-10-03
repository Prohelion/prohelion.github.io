---
title: Artifacts Directory
description: "Understand where Profinity stores configuration, profiles, plugins, and logs in the artifacts directory on Windows, macOS, and Linux."
---

# Profinity artifacts directory

Profinity stores writable data — configuration, profiles, plugins, and logs — in a single **artifacts directory**. This is separate from the install directory that contains `Profinity Engine.dll` and other binaries.

The artifacts path matters when upgrading from 2.2.x, deploying on Linux as a service, or mounting Docker volumes.

## Default locations by platform

| Platform | Default artifacts path |
|----------|------------------------|
| **Windows** | `%LOCALAPPDATA%\Prohelion\Profinity` |
| **macOS** | `~/Library/Application Support/Prohelion/Profinity` |
| **Linux (2.3+)** | `/var/lib/prohelion/profinity` |

The company and product path segments follow platform-normal casing: Pascal `Prohelion/Profinity` on Windows and macOS, lowercase `prohelion/profinity` on Linux. Everything under that root uses the same layout on every platform.

Typical subfolders:

| Subfolder | Contents |
|-----------|----------|
| `Config/` | `Config.yaml`, `Security.yaml`, `plugins.yaml` |
| `Profiles/` | Profile and component YAML, dashboards, scripts |
| `plugins/` | User-installed DLL plugin folders |
| `Logs/` | File logs when enabled |

!!! info "Linux path change in 2.3"
    Profinity 2.2 on Linux used the XDG layout (`~/.local/share/Prohelion/Profinity`). From **2.3**, the default is **`/var/lib/prohelion/profinity`** (lowercase, matching standard `/var/lib` packaging conventions) for service-oriented deployments. Migration runs automatically on first start after upgrade, and also covers hosts that were previously migrated to a Pascal-cased `/var/lib/Prohelion/Profinity` path.

<figure markdown>
![Linux artifacts directory showing Config and Profiles folders](../../../assets/images/2.3/2.3-linux-artifacts-path.png)
<figcaption>Linux artifacts directory at `/var/lib/prohelion/profinity` (screenshot placeholder — provide SS-35)</figcaption>
</figure>

## Override with PROFINITY_HOME

Set the environment variable **`PROFINITY_HOME`** to the full path of the artifacts root to support:

- Multiple Profinity instances on one host (each with a unique `PROFINITY_HOME` and unique HTTP/HTTPS ports).
- Staging or test layouts outside the default path.
- Docker or custom images with a non-standard mount root.

Example (Linux shell):

```bash
export PROFINITY_HOME=/var/lib/Prohelion-Staging/Profinity
```

## Automatic migration on startup

On first start after upgrading to 2.3, Profinity migrates legacy trees into the resolved artifacts directory. Migration is **non-fatal**: a locked or offline file does not block engine start; partial progress resumes on the next restart.

### Windows and macOS sources

1. `~/Documents/Prohelion/Profinity` — files copied when the destination does not already have the same path (fill gaps only).
2. `~/Prohelion/Profinity` — merged with overwrite on collision when moving to the application-data target.

### Linux sources

1. `~/Documents/Prohelion/Profinity` and `~/Prohelion/Profinity` — fill gaps only.
2. `~/.local/share/Prohelion/Profinity` (2.2 XDG layout) — overwrite on collision.
3. `/var/lib/Prohelion/Profinity` (Pascal-cased path used briefly during 2.3 development) — overwrite on collision.
4. `/var/lib/profinity/Prohelion/Profinity` (legacy Rinstrum layout) — overwrite on collision.

Legacy folders are removed only after every file is present at the destination with matching content.

The desktop application shows a progress window during migration. On all hosts, check **Admin → Logs** for per-file migration messages.

<figure markdown>
![Startup log lines showing migration from a legacy path](../../../assets/images/2.3/2.3-startup-migration-log.png)
<figcaption>Log output after migration from a legacy artifacts path (screenshot placeholder — provide SS-36)</figcaption>
</figure>

## Linux service layout

For systemd deployments (including Rinstrum scale integrations), a typical layout is:

| Path | Purpose |
|------|---------|
| `/var/lib/prohelion/profinity` | Artifacts (config, profiles, plugins, logs) |
| `/etc/profinity/env` | JWT signing key and encryption key (created once by deploy) |
| `/opt/profinity` | Install root (`profinity.sh`, `update.sh`, `VERSION`, `edition.json`) |
| `/opt/profinity/app` | Profinity binaries (self-contained or portable) |

`/opt/profinity` is the default install root created by the bootstrap installer (`install.sh`); pass `--install-dir` to use a different location. The `profinity` service user is created by the installer and owns `/var/lib/prohelion/profinity`. On a manual or file-only install (`install.sh --no-systemd`), create the artifacts directory and set ownership before first start:

```bash
sudo mkdir -p /var/lib/prohelion/profinity
sudo chown profinity:profinity /var/lib/prohelion/profinity
```

## Linux launcher (profinity.sh)

Unix installs (created by `install.sh`, and updated in place by `update.sh`) include **`profinity.sh`** in the install root. It resolves the edition from `edition.json`, runs preflight checks (including invariant globalization and, for the portable edition, the .NET runtime), and then starts the engine — either the self-contained `app/Profinity` binary or `dotnet app/Profinity.dll`, depending on edition. Always start Profinity through `profinity.sh` on Linux and macOS rather than calling `dotnet Profinity.dll` directly:

- **Interactive:** `./profinity.sh` runs in the foreground, and `Ctrl-C` stops it.
- **Service:** `./profinity.sh -s` (or `--service`) tells the engine to run in OS service mode. This is the form used by the systemd `ExecStart` line; see [Running as a Service](./Running_As_Service.md).
- **Preflight only:** `./profinity.sh --check-only` runs dependency and preflight checks and exits.

## Docker volumes

Docker images may use a different in-container root (for example `/app/prohelion/profinity`). Mount host volumes to match the path the container resolves, or set **`PROFINITY_HOME`** explicitly in the compose file.

!!! warning "Update volume mounts after upgrading to 2.3 on Linux"
    If a compose file still mounts `./config` to `/root/.local/share/Prohelion/Profinity/Config`, update the mounts to the image's current artifacts root or set `PROFINITY_HOME` so that config and profiles persist across container restarts.

See [Docker Installation](./Docker_Installation.md) for compose examples.

## Troubleshooting

| Symptom | Check |
|---------|--------|
| Empty profile after upgrade | Confirm migration logs; verify `PROFINITY_HOME` is not pointing at an empty directory |
| Permission denied on Linux | `chown` artifacts tree to the service user; `/var/lib` requires root to create, then hand off ownership |
| Two instances share config | Each instance needs a unique `PROFINITY_HOME` and unique HTTP/HTTPS ports |

## Related documentation

- [Zip Installation](./Zip_Installation.md)
- [Docker Installation](./Docker_Installation.md)
- [Running as a Service](./Running_As_Service.md)
- [Release notes 2.3.10](../Release_Notes/2.3.10.md)
