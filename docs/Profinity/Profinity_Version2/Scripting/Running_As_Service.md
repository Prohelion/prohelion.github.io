# Running Profinity as a Service

This guide provides instructions on how to run Profinity as a service on Unix-based systems, ensuring that it starts automatically on boot and restarts if it fails.

## Introduction

Running Profinity as a service allows you to automate its startup and ensure continuous operation. This is particularly useful for production environments where reliability and uptime are critical.

## Linux Setup

To run Profinity as a service on Linux, you can use `systemd`, a system and service manager for Linux operating systems.

### Step 1: Create a systemd Service File

1. Open a terminal and create a new service file:
   ```bash
   sudo nano /etc/systemd/system/profinity.service
   ```

2. Add the following content to the file:
   ```ini
   [Unit]
   Description=Profinity Service
   After=network.target

   [Service]
   ExecStart=/usr/bin/dotnet /path/to/Profinity.dll
   Restart=always
   User=your-username
   Group=your-group
   Environment=ASPNETCORE_ENVIRONMENT=Production

   [Install]
   WantedBy=multi-user.target
   ```
   Replace `/path/to/Profinity.dll` with the actual path to your Profinity DLL file.

### Step 2: Enable and Start the Service

1. Reload the systemd manager configuration:
   ```bash
   sudo systemctl daemon-reload
   ```

2. Enable the service to start on boot:
   ```bash
   sudo systemctl enable profinity.service
   ```

3. Start the service:
   ```bash
   sudo systemctl start profinity.service
   ```

## macOS Setup

On macOS, you can use `launchd` to run Profinity as a service.

### Step 1: Create a launchd Plist File

1. Open a terminal and create a new plist file:
   ```bash
   sudo nano /Library/LaunchDaemons/com.profinity.service.plist
   ```

2. Add the following content to the file:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>Label</key>
       <string>com.profinity.service</string>
       <key>ProgramArguments</key>
       <array>
           <string>/usr/local/bin/dotnet</string>
           <string>/path/to/Profinity.dll</string>
       </array>
       <key>RunAtLoad</key>
       <true/>
       <key>KeepAlive</key>
       <true/>
   </dict>
   </plist>
   ```
   Replace `/path/to/Profinity.dll` with the actual path to your Profinity DLL file.

### Step 2: Load and Start the Service

1. Load the service:
   ```bash
   sudo launchctl load /Library/LaunchDaemons/com.profinity.service.plist
   ```

2. Start the service:
   ```bash
   sudo launchctl start com.profinity.service
   ```

## Verification

To verify that the service is running correctly, you can use the following commands:

### Linux
- Check the status of the service:
  ```bash
  sudo systemctl status profinity.service
  ```

### macOS
- Check the status of the service:
  ```bash
  sudo launchctl list | grep com.profinity.service
  ```

## Troubleshooting

- **Service Fails to Start**: Check the logs for errors using `journalctl -u profinity.service` on Linux or `sudo launchctl log show` on macOS.
- **Permission Issues**: Ensure the service file has the correct permissions and the user/group settings are correct.
- **Path Errors**: Double-check the path to the Profinity DLL file in the service configuration. 