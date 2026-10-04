---
title: How to Set Up Profinity as a Kiosk Application
description: "Configure Profinity to run as a kiosk application that auto-launches in fullscreen mode on Windows, Linux, or macOS."
---

# How to Set Up Profinity as a Kiosk Application

Configure Profinity to run as a kiosk application that automatically launches in fullscreen mode.

## Prerequisites

- Profinity V2 installed **as a service or in Docker with automatic start enabled**
- Profinity must be **running** before configuring the browser for kiosk mode
- Administrator access to the system
- A profile configured and ready to display
- An enabled user to act as the kiosk user, holding only the permissions the display needs (see [Kiosk Mode](../Administration/Kiosk_Mode.md#requirements) for the requirements)
- Familiarity with your operating system's kiosk mode features

## Steps

### Step 1: Configure Kiosk Mode in Profinity

Kiosk Mode is configured per profile, and it authenticates the browser automatically as the configured kiosk user so that no login page is shown.

1. Select **ADMIN** in the side menu, then **Profile**
2. Select or create the profile to display, and open its profile settings
3. Enable **Kiosk Mode**
4. Select a **Kiosk Mode User** from the dropdown (all enabled users are listed, so choose one with minimal permissions)
5. Save the profile settings
6. Ensure this profile is the active profile, because Kiosk Mode applies only to the active profile

### Step 2: Configure Browser for Kiosk Mode

**Important**: Ensure Profinity is installed as a service or in Docker with automatic start, and that it is running before configuring the browser. The browser will fail to connect if Profinity is not already running.

**Windows:**

1. Create desktop shortcut
2. Right-click → Properties
3. In Target, add: `--kiosk http://localhost:18080`
4. Example: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk http://localhost:18080`
5. Press `Win + R`, type `shell:startup`
6. Copy shortcut to startup folder

**Linux:**

1. Create systemd service: `sudo nano /etc/systemd/system/profinity-kiosk.service`
2. Add service file:
   ```ini
   [Unit]
   Description=Profinity Kiosk Mode
   After=graphical.target
   
   [Service]
   Type=simple
   User=your-username
   ExecStart=/usr/bin/chromium-browser --kiosk --noerrdialogs http://localhost:18080
   Restart=always
   
   [Install]
   WantedBy=graphical.target
   ```
3. Enable: `sudo systemctl enable profinity-kiosk.service`
4. Start: `sudo systemctl start profinity-kiosk.service`

**macOS:**

1. Open Automator
2. Create new Application
3. Add "Run Shell Script" action
4. Script: `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk http://localhost:18080`
5. Save as application
6. System Preferences → Users & Groups → Login Items
7. Add kiosk application

### Step 3: Configure System Startup

1. **Ensure Profinity starts automatically** - Profinity must be installed as a service (see [Running as a Service](../Installation/Running_As_Service.md)) or in Docker with automatic start enabled
2. **Verify Profinity is running** - the Profinity service must be running and accessible at `http://localhost:18080`
3. Configure the browser to start after Profinity, with a delay to ensure Profinity is fully started
4. Test the startup sequence

### Step 4: Secure Kiosk Mode

1. Disable browser navigation
2. Disable keyboard shortcuts (Alt+F4, Ctrl+Alt+Del)
3. Hide the taskbar and system tray
4. Configure timeouts if needed
5. Confirm the kiosk user holds only the permissions the display needs, for example a read-only role built from view permissions only, because anyone at the display inherits them

### Step 5: Test Kiosk Mode

1. Restart the system
2. Verify Profinity starts automatically
3. Verify the browser opens in kiosk mode
4. Verify the correct profile loads and signs in automatically
5. Verify the fullscreen display works

## Advanced Configuration

### Hiding the Side Menu

Profinity pages that are rendered from a dashboard accept the `noMenu=true` query parameter, which hides the side menu so that only the dashboard is shown. Append it to the address of the dashboard page that the browser opens, as `?noMenu=true` after the page path (or `&noMenu=true` where the address already has a query string).

Profinity does not read query parameters that select a profile or request fullscreen. The profile that is shown is always the active profile, and fullscreen display is provided by the browser's own kiosk switch (`--kiosk`) described in Step 2.

### Auto-Refresh Charts

Charts update from live data by default. A chart in a dashboard can instead poll for new data at a fixed interval by setting `refreshInterval` in milliseconds, with a minimum of `1000`, and setting it turns off the live updates for that chart:

```yaml
# In your dashboard YAML
- chart:
    type: line
    refreshInterval: 1000  # Refresh every second
```

### Prevent User Exit

- Disable browser's exit shortcuts
- Configure system to restart on browser exit (Linux systemd)
- Use Windows Group Policy to lock down the system

## Tips

- **Test Thoroughly**: test all functionality in kiosk mode before deployment
- **Monitor Performance**: ensure the system has adequate resources
- **Backup Configuration**: keep a backup of your kiosk configuration
- **Update Process**: plan how to update Profinity without breaking kiosk mode
- **Remote Access**: consider remote monitoring for kiosk systems

## Troubleshooting

- **Browser Not Starting**: check system startup order and service dependencies
- **Wrong Profile**: verify the intended profile is the active profile
- **Login Page Shown**: verify Kiosk Mode is enabled for the active profile and a valid kiosk user is selected
- **Display Issues**: check display configuration and resolution settings
- **Performance Issues**: monitor system resources and optimise dashboard complexity

## Related Documentation

- [Kiosk Mode](../Administration/Kiosk_Mode.md) - the full Kiosk Mode reference, including requirements and token management
- [Running as a Service](../Installation/Running_As_Service.md) - configure Profinity as a service
- [Profiles](../Administration/Profiles.md) - profile settings, including Kiosk Mode
