---
title: Install Profinity on Linux and macOS
description: "Install Profinity on Linux and macOS with the bootstrap installer, update it, find where it stores data, open the web interface, and sign in."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Install Profinity on Linux and macOS

Install Profinity on Linux or macOS with the bootstrap installer, or from a downloaded archive.
For Windows, refer to [Install Profinity on Windows](./Windows_Installation.md), and for containers, refer to [Docker installation](./Docker_Installation.md).

| Method | Use when | Result |
|--------|----------|--------|
| [Bootstrap installer](#install-with-the-bootstrap-installer) (`install.sh`) | You install on a Linux server or embedded device, or any host where Profinity should start on boot | Selects the right archive for the host, installs into `/opt/profinity`, creates the `profinity` service user, and on Linux with systemd creates the `profinity.service` unit |
| [Archive installation](./Linux_and_macOS_Archive_Installation.md) | You are trying Profinity, running it interactively, or installing without root or systemd | Files extracted into a folder of your choice, and started by hand with `./profinity.sh` |

Profinity does not need Prohelion hardware to run.
To upgrade a 2.2 installation, read [Upgrade from Profinity 2.2](./Upgrade_From_2_2.md) first.

## Install with the bootstrap installer

The installer downloads the release archive that matches the host operating system and CPU architecture, verifies it, and unpacks it into an install root, `/opt/profinity` by default.
On Linux with systemd it also creates the `profinity` service user, the [artefacts directory](./Artifacts_Directory.md), and the `profinity.service` unit.
Installing does not start Profinity.

On Linux, run the installer as root with `sudo`, unless you use `--no-systemd` with a writable `--install-dir`.
The host needs internet access, or a local archive as described under [Installer options](#installer-options).

1. Download the installer and its checksum:

    ```bash
    curl -fsSL -o install.sh https://github.com/Prohelion/Profinity/releases/latest/download/install.sh
    curl -fsSL -o install.sh.sha256 https://github.com/Prohelion/Profinity/releases/latest/download/install.sh.sha256
    ```

2. Verify the checksum and run the installer:

    ```bash
    sha256sum -c install.sh.sha256 && sudo bash install.sh
    ```

    On macOS, use `shasum -a 256 -c install.sh.sha256` in place of `sha256sum -c`.

3. Start Profinity with `/opt/profinity/profinity.sh` to test the configuration, or start it as a service as described in [Run Profinity as a service](./Running_As_Service.md).

The installer can also be piped straight into the shell with `curl -fsSL https://github.com/Prohelion/Profinity/releases/latest/download/install.sh | sudo bash`.
That trusts the network transport only and cannot verify the checksum, so avoid it on production hosts.

### Installer options

| Option | Effect |
|--------|--------|
| `--install-dir <path>` | Install into a different location than `/opt/profinity` |
| `--version <x.y.z>` | Install a specific GitHub release tag instead of the latest, ignored with `--channel` |
| `--channel <name>` | Download from a Prohelion file server channel instead of GitHub. Prohelion supplies the channel name and the installer address |
| `--package <archive>` | Install from a local `.tar.gz` or `.zip` with no download, for hosts without internet access. No checksum step is performed for a local package |
| `--no-systemd` | File-only install: skip the service user, artefacts directory, and systemd unit |
| `--dry-run` | Print the planned actions without changing the system |

For a channel, download the installer from the address Prohelion supplies, then run it with the channel name:

```bash
sudo bash install.sh --channel <channel supplied by Prohelion>
```

### Update Profinity

`update.sh`, installed alongside `profinity.sh` in the install root, fetches the matching release for the installed edition and swaps the application files in place.
It takes the same `--channel` and `--version` options as the installer, and does nothing if the installed version is already current.
Pass `--force` to reinstall anyway.
If the `profinity` service is active, `update.sh` stops it before it applies the update and restarts it afterwards.

## Where Profinity stores its data

On Linux, Profinity 2.3 stores writable data under `/var/lib/prohelion/profinity` by default, not `~/.local/share`, and there is no per-user fallback.
The bootstrap installer creates this directory.
With an extracted archive, create it and set its ownership before the first start, or set `PROFINITY_HOME` to a writable path.
Refer to [Artefacts directory](./Artifacts_Directory.md).

## Open the web interface

Open the address that the `Now listening on` line of the log reports, or the `HttpAddress` and `HttpPort` values in `config.yaml`.
By default Profinity listens on all network interfaces (`0.0.0.0`) on port `18080`, so you reach it at `http://localhost:18080` on the local machine, or at `http://[host name or IP address]:18080` from another machine.
The sample log above came from an instance bound to the loopback address `127.0.0.1`, which only the local machine can reach.
Opening the web interface from another machine needs a Server licence, as described in [Apply a licence](./Applying_a_Licence.md).

The browser opens the Profinity sign-in page.

<figure markdown>
![The Profinity sign-in page](../images/login_page.png)
<figcaption>Profinity sign-in page</figcaption>
</figure>

A fresh installation has only the administrator user active.
Sign in with the username `admin` and the password `password`, and Profinity asks for a new password at the first sign-in.
Choose one as described in the [Security guide](./Security.md#default-credentials).
After you sign in, the Profinity homepage appears.

<figure markdown>
![The Profinity welcome page, headed "Welcome to Profinity Version 2.3", with Documentation, Add Component and Help shortcuts.](../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

To stop Profinity in a terminal, press `Ctrl-C` in that window.
To stop it as a service on Linux, run `sudo systemctl stop profinity`, as described in [Run Profinity as a Linux service](./Run_as_a_Linux_Service.md).

## Troubleshooting

- Profinity fails to start with a permission error on `/var/lib/prohelion`: the account that runs Profinity does not own the directory, so run `sudo chown -R profinity:profinity /var/lib/prohelion` for the service user, or set `PROFINITY_HOME` to a path the account can write.
