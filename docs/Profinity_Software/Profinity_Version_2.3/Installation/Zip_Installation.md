---
title: Zip Installation (macOS and Linux)
description: "Install Profinity on macOS and Linux by extracting platform-specific archives and running the profinity.sh startup script."
---

# Installing Profinity on macOS and Linux

!!! info "Available Profinity Releases"
    Profinity is currently available on [Windows machines](./Windows_Installation.md) as a standard desktop application, for selected [Unix Platforms (including macOS and Linux)](./Zip_Installation.md) and as a [Docker container](./Docker_Installation.md) for Docker enabled environments and Cloud setups.

## Zip Installation

Profinity is available as a downloadable archive for macOS and Linux platforms, which does not require an installer. To run Profinity as a service that starts on boot, use the bootstrap installer described in [Running Profinity as a Service](./Running_As_Service.md) instead.

The Prohelion GitHub releases page publishes a separate archive for each supported host architecture. Select the archive that matches the host operating system and CPU architecture.

| Host | Archive | Format | .NET runtime |
|------|---------|--------|--------------|
| Linux, x86_64 / amd64 | `Profinity-Linux-x64.tar.gz` | tar.gz | Bundled (self-contained); no separate install required |
| Linux, ARM64 (aarch64) | `Profinity-Linux-arm64.tar.gz` | tar.gz | Bundled (self-contained); no separate install required |
| Linux, 32-bit ARM (ARMv6 / ARMv7) | `Profinity-Linux-arm.tar.gz` | tar.gz | Bundled (self-contained); the host may also need a system ICU library |
| macOS (any architecture), or any other unsupported architecture | `Profinity-Portable.zip` | zip | Not bundled. Requires the .NET 10 ASP.NET Core runtime; `profinity.sh` installs this automatically if it is not already present — see [Extracting and Starting Profinity](#extracting-and-starting-profinity) |

[Download Profinity for Linux x64 :material-download:](https://github.com/Prohelion/Profinity/releases/latest/download/Profinity-Linux-x64.tar.gz){ .md-button }
[Download Profinity for Linux ARM64 :material-download:](https://github.com/Prohelion/Profinity/releases/latest/download/Profinity-Linux-arm64.tar.gz){ .md-button }
[Download Profinity for Linux ARM :material-download:](https://github.com/Prohelion/Profinity/releases/latest/download/Profinity-Linux-arm.tar.gz){ .md-button }
[Download Profinity Portable (macOS) :material-download:](https://github.com/Prohelion/Profinity/releases/latest/download/Profinity-Portable.zip){ .md-button }

The Linux archives are self-contained and include the required .NET runtime, so no separate runtime installation is needed on those hosts. The macOS/portable archive is framework-dependent and requires the .NET 10 ASP.NET Core runtime. This is downloaded and verified automatically by the bundled startup script the first time Profinity is started, provided the host has internet access. To install the runtime manually instead, or to prepare a host without internet access in advance, download it directly from Microsoft.

[Download ASP.NET Core 10 :material-download:](https://dotnet.microsoft.com/en-us/download/dotnet/10.0){ .md-button }

On Linux with Profinity 2.3 or later, writable data is stored under `/var/lib/prohelion/profinity` by default (not `~/.local/share`). See [Artifacts directory](./Artifacts_Directory.md).

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

With Profinity running, open the URL defined in the `Config.yaml` file (for example, `http://profinity:18080`) to access the Profinity web client. 

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

To stop Profinity, go to the terminal window running Profinity and press `Ctrl-C`.
