---
title: Run Profinity as a Linux service
description: "Run Profinity as a systemd service on Linux so it starts on boot and restarts on failure, with the unit file, start commands and troubleshooting."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Run Profinity as a Linux service

Run Profinity as a systemd service on Linux to start it automatically on boot and restart it if it fails.
Install Profinity first, as described in [Install Profinity on Linux and macOS](../Linux_and_macOS_Installation.md).
A service serves the web interface to other machines, and opening it from another machine needs the **Profinity Server** licensed feature, as described in [Run Profinity as a service](./index.md).

On Linux, Profinity runs as a systemd service through the `profinity.sh` launcher in the install root, `/opt/profinity` by default.
The [bootstrap installer](../Linux_and_macOS_Installation.md#install-with-the-bootstrap-installer) creates the `profinity` service user and the unit file.
These steps cover systemd, which the installer supports, and on a distribution without systemd you follow that distribution's documentation for running a daemon.

`profinity.sh` supports two ways to start Profinity, selected by the `-s` (`--service`) flag.
Running `/opt/profinity/profinity.sh` in a terminal starts Profinity in the foreground, which suits testing a configuration before you enable the service, and Ctrl+C stops it.
Running `systemctl start profinity` starts the service, whose unit runs `profinity.sh -s`, and the `-s` flag does not select the account that Profinity runs under.
Always start Profinity through `profinity.sh` and never by calling `dotnet Profinity.dll`, because the launcher resolves the installed edition and runs preflight checks.

## The systemd unit

The installer writes `/etc/systemd/system/profinity.service` with these contents:

```ini
[Unit]
Description=Profinity
After=syslog.target network.target

[Service]
Type=notify
User=profinity
Group=profinity
WorkingDirectory=/opt/profinity/app
ExecStart=/opt/profinity/profinity.sh -s
Restart=on-failure
TimeoutSec=900

[Install]
WantedBy=multi-user.target
```

Adjust `WorkingDirectory` and `ExecStart` if you installed with a different `--install-dir`.
If you installed with `--no-systemd` or from an archive, create the file yourself, and create the `profinity` user and the [artefacts directory](../Artifacts_Directory.md) first:

```bash
sudo mkdir -p /var/lib/prohelion/profinity
sudo chown -R profinity:profinity /var/lib/prohelion
```

## Start the service

The installer already enables the unit, so the start command is normally all you need.

1. If you edited the unit file, run `sudo systemctl daemon-reload` to reload the systemd configuration.
2. If the service was disabled, run `sudo systemctl enable profinity.service` to enable it at boot.
3. Start the service:

    ```bash
    sudo systemctl start profinity.service
    ```

## Service layout

A typical service layout is:

| Path | Purpose |
|------|---------|
| `/var/lib/prohelion/profinity` | Artefacts: config, profiles, plugins, logs |
| `/etc/profinity/env` | JWT signing key and encryption key, when a deployment script keeps them outside `security.yaml` |
| `/opt/profinity` | Install root: `profinity.sh`, `update.sh`, `VERSION`, `edition.json` |
| `/opt/profinity/app` | Profinity binaries, self-contained or portable |

To update an installed copy, refer to [Update Profinity](../Linux_and_macOS_Installation.md#update-profinity).
Set environment variables for a service as `Environment=` lines in the `[Service]` section of the unit, because a service does not read `~/.bashrc`, as described in [Environment variables](../Environment_Variables.md#linux-and-macos).

## Check that the service is running

Run `sudo systemctl status profinity.service`.

## Troubleshooting

If the service does not start, read the log with `journalctl -u profinity.service`.

- If Profinity logs `Unable to create directory '/var/lib/prohelion/...'` and then fails to save its configuration, the service user does not own the artefacts directory. Run `sudo chown -R profinity:profinity /var/lib/prohelion`.
- A "file not found" error means the path to `profinity.sh` in the unit does not match where Profinity is installed. Correct the path in the service configuration and start the service again.
