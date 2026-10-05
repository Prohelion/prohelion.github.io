---
title: Linux and macOS Installation
description: "Install Profinity on Linux and macOS with the bootstrap installer, or from a downloaded archive, and start it with the profinity.sh startup script."
---

# Installing Profinity on Linux and macOS

!!! info "Available Profinity Releases"
    Profinity is currently available on [Windows machines](./Windows_Installation.md) as a standard desktop application, for selected [Unix Platforms (including macOS and Linux)](./Zip_Installation.md) and as a [Docker container](./Docker_Installation.md) for Docker enabled environments and Cloud setups.

## Choosing an Installation Method

| Method | Use when | Result |
|--------|----------|--------|
| [Bootstrap installer](#bootstrap-installer) (`install.sh`) | Installing on a Linux server or embedded device, or any host where Profinity should start on boot | Selects the correct archive for the host, installs into `/opt/profinity`, creates the `profinity` service user and, on Linux with systemd, the `profinity.service` unit |
| [Archive installation](#archive-installation) | Trying Profinity, running it interactively, or installing without root or systemd | Files extracted into a folder of choice and started by hand with `./profinity.sh` |

## Bootstrap Installer

The bootstrap installer (`install.sh`) downloads the release archive that matches the host operating system and CPU architecture, verifies it, and unpacks it into an install root: `/opt/profinity` by default. On Linux with systemd it also creates the `profinity` service user, the [artefacts directory](./Artifacts_Directory.md) and the `profinity.service` unit. Installing does not start Profinity. On Linux the installer must be run as root (`sudo`), unless `--no-systemd` and a writable `--install-dir` are used.

!!! info "Where the installer comes from"
    Profinity v2.3 is currently available for Early Adopters only and is not published on GitHub. Contact Prohelion at the [Prohelion Website](https://www.prohelion.com) to register for the programme. Prohelion supplies the installer download address and the channel name to use; the download site needs no login. Download the installer from the supplied address, then run it with the channel:

    ```bash
    curl -fsSL -o install.sh <installer address supplied by Prohelion>
    sudo bash install.sh --channel <channel supplied by Prohelion>
    ```

    On a host without access to that site, download the archive for the host from the Early Adopter site on another machine, copy it across and install from it with `sudo bash install.sh --package ./<archive>` (no download or checksum step is performed for a local package).

    From general availability, the installer and releases are published on GitHub and the commands below apply as written.

For a general availability release, download the installer and verify its checksum before running it:

```bash
curl -fsSL -o install.sh https://github.com/Prohelion/Profinity/releases/latest/download/install.sh
curl -fsSL -o install.sh.sha256 https://github.com/Prohelion/Profinity/releases/latest/download/install.sh.sha256
sha256sum -c install.sh.sha256 && sudo bash install.sh
```

On macOS, use `shasum -a 256 -c install.sh.sha256` in place of `sha256sum -c`.

!!! info "Unverified shortcut"
    The installer can also be piped straight into the shell with `curl -fsSL https://github.com/Prohelion/Profinity/releases/latest/download/install.sh | sudo bash`. This trusts the network transport only; the checksum cannot be verified, so use the download-then-verify steps above for production hosts.

| Option | Effect |
|--------|--------|
| `--install-dir <path>` | Install into a different location than `/opt/profinity` |
| `--version <x.y.z>` | Install a specific GitHub release tag instead of the latest (ignored with `--channel`) |
| `--channel <name>` | Download from the Prohelion file server channel instead of GitHub (used for Early Adopter releases) |
| `--package <archive>` | Install from a local `.tar.gz` or `.zip`, with no download (for hosts without internet access) |
| `--no-systemd` | File-only install: skip the service user, artefacts directory and systemd unit |
| `--dry-run` | Print the planned actions without changing the system |

After installing, start Profinity interactively with `/opt/profinity/profinity.sh` to test the configuration, or start it as a service as described in [Running Profinity as a Service](./Running_As_Service.md).

### Updating

`update.sh`, installed alongside `profinity.sh` in the install root, fetches the matching release for the installed edition and swaps the application files in place. It takes the same `--channel` and `--version` options as the installer, so Early Adopter hosts update with `update.sh --channel <channel supplied by Prohelion>`. It does nothing if the installed version is already current; pass `--force` to reinstall anyway. If the `profinity` service is active, `update.sh` stops it before applying the update and restarts it afterwards.

## Archive Installation

Profinity is also available as a downloadable archive for macOS and Linux platforms, which does not require an installer. To have Profinity start on boot, use the [bootstrap installer](#bootstrap-installer) instead, or configure the extracted files as a service by following [Running Profinity as a Service](./Running_As_Service.md).

A separate archive is published for each supported host architecture, from the Prohelion Early Adopter site now and from GitHub releases at general availability. Select the archive that matches the host operating system and CPU architecture.

| Host | Archive | Format | .NET runtime |
|------|---------|--------|--------------|
| Linux, x86_64 / amd64 | `Profinity-Linux-x64.tar.gz` | tar.gz | Bundled (self-contained); no separate install required |
| Linux, ARM64 (aarch64) | `Profinity-Linux-arm64.tar.gz` | tar.gz | Bundled (self-contained); no separate install required |
| Linux, 32-bit ARM (ARMv6 / ARMv7) | `Profinity-Linux-arm.tar.gz` | tar.gz | Bundled (self-contained); the host may also need a system ICU library |
| macOS (any architecture), or any other unsupported architecture | `Profinity-Portable.zip` | zip | Not bundled. Requires the .NET 10 ASP.NET Core runtime; `profinity.sh` installs this automatically if it is not already present — see [Extracting and Starting Profinity](#extracting-and-starting-profinity) |

## When is ASP.NET Core Runtime Required?

The Linux archives are self-contained and include the required .NET runtime, so no separate runtime installation is needed on those hosts. The macOS/portable archive is framework-dependent and requires the .NET 10 ASP.NET Core runtime. This is downloaded and verified automatically by the bundled startup script the first time Profinity is started, provided the host has internet access. To install the runtime manually instead, or to prepare a host without internet access in advance, download it directly from Microsoft.

[Download ASP.NET Core 10 :material-download:](https://dotnet.microsoft.com/en-us/download/dotnet/10.0){ .md-button }

On Linux with Profinity 2.3 or later, writable data is stored under `/var/lib/prohelion/profinity` by default (not `~/.local/share`), and there is no per-user fallback. The bootstrap installer creates this directory; with an extracted archive, create it and set its ownership before the first start, or set `PROFINITY_HOME` to a writable path. See [Artefacts directory](./Artifacts_Directory.md).

## Extracting and Starting Profinity

Extract the downloaded archive into the folder from which Profinity is to run. None of the archives contain a wrapping top-level folder, so create the destination folder first and extract into it.

For a `.tar.gz` Linux archive (substitute the file name for the downloaded architecture):

```bash
mkdir profinity && tar -xzf Profinity-Linux-x64.tar.gz -C profinity
```

For the `.zip` macOS/portable archive:

```bash
mkdir profinity && unzip Profinity-Portable.zip -d profinity
```

The extracted folder has the following layout:

```text
profinity/
├── profinity.sh      # startup script: runs preflight checks, then starts Profinity
├── update.sh         # updates the installation to the latest matching release
├── VERSION
├── edition.json
├── lib/
└── app/              # Profinity binaries
```

Change into the extracted folder and mark the startup script executable, since some archive tools do not preserve the executable bit on extraction:

```bash
cd profinity
chmod +x profinity.sh
```

To start Profinity, run:

```bash
./profinity.sh
```

`profinity.sh` runs preflight checks appropriate to the archive before starting Profinity. On the self-contained Linux archives, it checks the host architecture and required system libraries. On the macOS/portable archive, it checks for a compatible .NET runtime and, if none is found, installs one automatically from a checksum-verified Microsoft installer. Run `./profinity.sh --check-only` to run these checks without starting Profinity.

Output similar to the following then appears.

```text
Prohelion Profinity - v2.3.10.0
Profinity (c) 2026 - Prohelion Pty Ltd.
------------------------------------------
Press Ctrl-C to shut the application down.

INFO: Starting Prohelion - Profinity
INFO: Default Quartz.NET properties loaded from embedded resource file
INFO: Initialized Scheduler Signaller of type: Quartz.Core.SchedulerSignalerImpl
INFO: Quartz Scheduler created
INFO: RAMJobStore initialized.
INFO: Quartz Scheduler 3.13.1.0 - 'DefaultQuartzScheduler' with instanceId 'NON_CLUSTERED' initialized
INFO: Using thread pool 'Quartz.Simpl.DefaultThreadPool', size: 10
INFO: Using job store 'Quartz.Simpl.RAMJobStore', supports persistence: False, clustered: False
INFO: Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED started.
INFO: Profinity Profile : Default 11
INFO: Profinity Services Starting
INFO: Now listening on: http://127.0.0.1:18080
```

## Accessing the Profinity Instance

With Profinity running, open the address that the `Now listening on` line of the log reports, or the `HttpAddress` and `HttpPort` values in the `config.yaml` file, to access the Profinity web client. By default Profinity listens on all network interfaces (`0.0.0.0`) on port `18080`, so the web client is reached at `http://localhost:18080` on the local machine, or at `http://[Host name or IP address]:18080` from another machine, The sample log above was taken from an instance bound to the loopback address `127.0.0.1`, which is reachable from the local machine only.

Connecting to the Profinity web client directs the browser to the Profinity login page.

<figure markdown>
![Profinity login page](../images/login_page.png)
<figcaption>Profinity V2 login page</figcaption>
</figure>

A fresh install of Profinity has only the administrator user active. To log in, use the following login details, and change the password immediately as described in the [Security Guide](./Security.md#default-credentials).

Username: `admin`

Password: `password`

After logging in, the Profinity homepage is shown.

<figure markdown>
![Profinity Homepage](../images/homepage.png)
<figcaption>Profinity V2 homepage</figcaption>
</figure>

To stop Profinity when it is running in a terminal, press `Ctrl-C` in that window. To stop it when it is running as a service, use `sudo systemctl stop profinity` on Linux, as described in [Running Profinity as a Service](./Running_As_Service.md).
