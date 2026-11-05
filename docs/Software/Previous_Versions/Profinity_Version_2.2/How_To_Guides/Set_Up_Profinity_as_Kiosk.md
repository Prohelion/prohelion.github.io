---
title: How to Set Up Profinity as a Kiosk Application
---

# How to Set Up Profinity as a Kiosk Application

Configure Profinity to run as a kiosk application that automatically launches in fullscreen mode.

## Prerequisites

- Profinity V2 installed **as a service or in Docker with automatic start enabled**
- Profinity must be **running** before configuring the browser for kiosk mode
- Admin access to the system
- A profile configured and ready to display
- Understanding of your operating system's kiosk mode features

## Steps

### Step 1: Configure Kiosk Mode in Profinity

1. Navigate to **ADMIN** → **System Configuration**
2. Find **Kiosk Mode** section
3. Enable **Kiosk Mode**
4. Configure settings:
   - **Auto-Start**: Enable
   - **Fullscreen**: Enable
   - **Startup Profile**: Select profile to load
   - **URL**: Set initial URL/page
5. Click **Save**

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

1. **Ensure Profinity starts automatically** - Profinity must be installed as a service or in Docker with automatic start enabled
2. **Verify Profinity is running** - Before configuring the browser, ensure Profinity service is running and accessible at `http://localhost:18080`
3. Configure browser to start after Profinity (with a delay to ensure Profinity is fully started)
4. Test startup sequence

### Step 4: Secure Kiosk Mode

1. Disable browser navigation
2. Disable keyboard shortcuts (Alt+F4, Ctrl+Alt+Del)
3. Hide taskbar/system tray
4. Configure timeouts if needed

### Step 5: Test Kiosk Mode

1. Restart the system
2. Verify Profinity starts automatically
3. Verify browser opens in kiosk mode
4. Verify correct profile loads
5. Verify fullscreen display works

## Advanced Configuration

### URL Parameters for Kiosk Mode

You can use URL parameters when launching:

```
http://localhost:18080?profile=MyProfile&fullscreen=true
```

### Auto-Refresh Dashboard

Configure dashboards to auto-refresh:

```yaml
# In your dashboard YAML
chart:
  refreshInterval: 1000  # Refresh every second
```

### Prevent User Exit

- Disable browser's exit shortcuts
- Configure system to restart on browser exit (Linux systemd)
- Use Windows Group Policy to lock down the system

## Tips

- **Test Thoroughly**: Test all functionality in kiosk mode before deployment
- **Monitor Performance**: Ensure system has adequate resources
- **Backup Configuration**: Keep a backup of your kiosk configuration
- **Update Process**: Plan how to update Profinity without breaking kiosk mode
- **Remote Access**: Consider remote monitoring for kiosk systems

## Troubleshooting

- **Browser Not Starting**: Check system startup order and service dependencies
- **Wrong Profile**: Verify startup profile setting in Profinity
- **Display Issues**: Check display configuration and resolution settings
- **Performance Issues**: Monitor system resources and optimize dashboard complexity

## Related Documentation

- [Kiosk Mode](../Administration/Kiosk_Mode.md) - Complete kiosk mode configuration guide
- [Running as Service](../Installation/Running_As_Service.md) - Configure Profinity as a service
- [System Configuration](../Administration/System_Config.md) - System configuration options
