---
title: Run Profinity as a macOS service
description: "Run Profinity as a launchd service on macOS so it starts automatically at boot and restarts if it stops, with the plist, load commands and checks."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Run Profinity as a macOS service

Run Profinity as a launchd service on macOS to start it automatically on boot and restart it if it fails.
Install Profinity first, as described in [Install Profinity on Linux and macOS](../Linux_and_macOS_Installation.md).
A service serves the web interface to other machines, and opening it from another machine needs the **Profinity Server** licensed feature, as described in [Run Profinity as a service](./index.md).

On macOS, Profinity is installed with the same [bootstrap installer](../Linux_and_macOS_Installation.md#install-with-the-bootstrap-installer) as Linux, into `/opt/profinity` by default, and `launchd` runs it as a service in the role systemd fills on Linux.

The plist and commands below are an example only. Prohelion does not ship a launchd plist for the Profinity engine, so check the labels, paths and options against your own installation before you load the service.

1. Create a plist file:

    ```bash
    sudo nano /Library/LaunchDaemons/com.profinity.service.plist
    ```

2. Add these contents, adjusting `/opt/profinity` if you installed with `--install-dir`:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>Label</key>
        <string>com.profinity.service</string>
        <key>ProgramArguments</key>
        <array>
            <string>/opt/profinity/profinity.sh</string>
            <string>-b</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>KeepAlive</key>
        <true/>
    </dict>
    </plist>
    ```

3. Load the service:

    ```bash
    sudo launchctl load /Library/LaunchDaemons/com.profinity.service.plist
    ```

4. Start the service:

    ```bash
    sudo launchctl start com.profinity.service
    ```

The plist uses `-b` (`--background`), which logs to a file and the console instead of depending on an interactive console session.
It does not use `-s` (`--service`), which selects service-mode host integration only on Windows and Linux (systemd).
Always start Profinity through `profinity.sh`, because it also bootstraps the .NET runtime for the portable macOS build when needed.

To check that the service is running, run `sudo launchctl list | grep com.profinity.service`, which lists the service when it is loaded.
If the service does not start, read the `profinity_<date>.log` file in the `logs` folder of the artefacts directory (refer to [Artefacts directory](../Artifacts_Directory.md)).
Launchd discards console output unless you add `StandardOutPath` and `StandardErrorPath` keys to the plist.
A "file not found" error means the path to `profinity.sh` in the plist does not match where Profinity is installed, so correct the path in the service configuration and start the service again.
