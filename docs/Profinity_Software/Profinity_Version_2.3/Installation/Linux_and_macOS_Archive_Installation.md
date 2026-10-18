---
title: Install Profinity from an archive on Linux and macOS
description: "Install Profinity on Linux or macOS from a downloaded archive without an installer, choose the archive for your processor, and start it with profinity.sh."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Install Profinity from an archive on Linux and macOS

Install Profinity from a downloaded archive when you are trying it, running it interactively, or installing without root or systemd.
To install on a Linux server or embedded device, or on any host where Profinity should start on boot, use the [bootstrap installer](./Linux_and_macOS_Installation.md#install-with-the-bootstrap-installer) instead.
Profinity does not need Prohelion hardware to run.

An archive installation needs no installer.
To have Profinity start on boot, configure the extracted files as a service by following [Run Profinity as a service](./Run_as_a_Service/index.md).

A separate archive is published for each supported host architecture.
Select the archive that matches the host operating system and CPU architecture.

| Host | Archive | Format | .NET runtime |
|------|---------|--------|--------------|
| Linux, x86_64 / amd64 | `Profinity-Linux-x64.tar.gz` | tar.gz | Bundled, so no separate install is needed |
| Linux, ARM64 (aarch64, 64-bit ARM) | `Profinity-Linux-arm64.tar.gz` | tar.gz | Bundled, so no separate install is needed |
| Linux, 32-bit ARM (ARMv6 / ARMv7) | `Profinity-Linux-arm.tar.gz` | tar.gz | Bundled. The host also needs the system ICU (International Components for Unicode) library |
| macOS (any architecture), or any other unsupported architecture | `Profinity-Portable.zip` | zip | Not bundled. Needs the .NET 10 ASP.NET Core runtime, which `profinity.sh` installs automatically if it is missing |

The Linux archives are self-contained.
The macOS and portable archive needs the .NET 10 ASP.NET Core runtime, which `profinity.sh` downloads and verifies the first time Profinity starts, if the host has internet access.
To install the runtime yourself, or to prepare a host without internet access, download it from Microsoft.

[Download ASP.NET Core 10 :material-download:](https://dotnet.microsoft.com/en-us/download/dotnet/10.0){ .md-button }

1. Download the archive that matches the host.
2. Create a destination folder and extract the archive into it, because the archives have no wrapping top-level folder.

    For a Linux `.tar.gz` archive, substitute the file name for your architecture:

    ```bash
    mkdir profinity && tar -xzf Profinity-Linux-x64.tar.gz -C profinity
    ```

    For the macOS and portable `.zip` archive:

    ```bash
    mkdir profinity && unzip Profinity-Portable.zip -d profinity
    ```

3. Change into the folder and mark the startup script executable, because some archive tools do not keep the executable bit:

    ```bash
    cd profinity
    chmod +x profinity.sh
    ```

4. Start Profinity:

    ```bash
    ./profinity.sh
    ```

The extracted folder has this layout:

```text
profinity/
├── profinity.sh      # startup script: runs preflight checks, then starts Profinity
├── update.sh         # updates the installation to the latest matching release
├── VERSION
├── edition.json
├── lib/
└── app/              # Profinity binaries
```

`profinity.sh` runs preflight checks before it starts Profinity.
On the self-contained Linux archives, it checks the host architecture and the required system libraries.
On the macOS and portable archive, it checks for a compatible .NET runtime and, if none is found, installs one from a checksum-verified Microsoft installer.
Run `./profinity.sh --check-only` to run these checks without starting Profinity.

The startup banner appears, followed by log lines that end with the address Profinity is listening on:

```text
Prohelion Profinity - v2.3.x.x
Copyright © 2026 - Prohelion Pty Ltd.
------------------------------------------
Press Ctrl-C to shut the application down.

INFO: Starting Prohelion - Profinity
INFO: Profinity Profile : Default 11
INFO: Profinity Services Starting
INFO: Now listening on: http://127.0.0.1:18080
```

To open the web interface and sign in, refer to [Open the web interface](./Linux_and_macOS_Installation.md#open-the-web-interface).
On Linux, create the artefacts directory and set its ownership before the first start, or set `PROFINITY_HOME` to a writable path, as described in [Where Profinity stores its data](./Linux_and_macOS_Installation.md#where-profinity-stores-its-data).

## Troubleshooting

- `./profinity.sh` reports `Permission denied`: the archive tool did not keep the executable bit, so run `chmod +x profinity.sh` and start it again.
- On the macOS and portable archive, a host without internet access cannot download the .NET runtime on first start: install the ASP.NET Core 10 runtime from Microsoft before you start Profinity, and run `./profinity.sh --check-only` to confirm.
- On Linux, Profinity cannot write to `/var/lib/prohelion`: refer to [Troubleshooting](./Linux_and_macOS_Installation.md#troubleshooting).
