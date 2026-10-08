---
title: How to Set Up Profinity as a Kiosk Application
description: "Configure Profinity to run as a kiosk application that auto-launches in fullscreen mode on Windows, Linux, or macOS."
---

# How to Set Up Profinity as a Kiosk Application

Configure Profinity to run as a kiosk application that launches in fullscreen mode when the display starts. Two parts are involved: Kiosk Mode in Profinity, which signs the display in automatically as a chosen user, and the browser and operating system setup, which opens Profinity fullscreen.

## Prerequisites

- Profinity 2.3 installed as a service or in Docker with automatic start enabled, and running, because the browser fails to connect if Profinity is not already running (see [Running as a Service](../Installation/Running_As_Service.md))
- Administrator access to the system
- A [profile](../Getting_Started/Profiles.md) configured and ready to display, and the **Modify profiles** permission to change its settings
- An enabled [user](../Administration/Users_and_Access/Manage_Users.md) to act as the kiosk user, holding only the [permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) the display needs (see [Choosing the Kiosk User](../Administration/Kiosk_Mode.md#choosing-the-kiosk-user))
- A licence that includes the Profinity Server feature, to create that user. Kiosk Mode is available in every edition, but the kiosk user must be a user account, and user accounts are created in **Users & Groups**, which needs the **Profinity Server** feature (**Server** and **Enterprise** editions). Without it there are no user accounts, so a Desktop installation has no user to select (see [Licensing](../Administration/Licensing.md))

## Configure Kiosk Mode in Profinity

Kiosk Mode is configured per profile, and it authenticates the browser automatically as the configured kiosk user so that no login page is shown.

1. Select **ADMIN** in the side menu, then **Profile**
2. Select or create the profile to display, and open its profile settings
3. Enable **Kiosk Mode**
4. Select a **Kiosk Mode User** from the dropdown (all enabled users are listed, so choose one with minimal permissions)
5. Save the profile settings
6. Ensure this profile is the active profile, because Kiosk Mode applies only to the active profile

## Configure the Browser for Fullscreen Display

!!! warning "Start Profinity Before the Browser"
    The browser fails to connect if Profinity is not already running, so Profinity must start automatically as a service or in Docker, and the browser must start after it, allowing time for Profinity to finish starting.

The browser's own `--kiosk` switch provides the fullscreen display, and Profinity does not read query parameters that request fullscreen. The steps for each operating system follow, and each uses `http://localhost:18080`, the default Profinity web address.

### Windows

The example assumes that Google Chrome is installed. Create a desktop shortcut for the browser, right-click it and select **Properties**, and in **Target** add `--kiosk http://localhost:18080`, for example:

```text
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk http://localhost:18080
```

Then press `Win + R`, type `shell:startup`, and copy the shortcut to the startup folder that opens.

### Linux

Create a systemd service with `sudo nano /etc/systemd/system/profinity-kiosk.service` and add the following unit:

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

Enable the service with `sudo systemctl enable profinity-kiosk.service` and start it with `sudo systemctl start profinity-kiosk.service`.

### macOS

Open Automator, create a new Application, add a **Run Shell Script** action, and enter the script `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk http://localhost:18080`. Save it as an application, then open **System Settings** (**System Preferences** on older versions of macOS), select **Users & Groups**, then **Login Items**, and add the kiosk application.

## Hide the Side Menu

Profinity pages that are rendered from a dashboard accept the `noMenu=true` query parameter, which hides the side menu so that only the dashboard is shown. Append it to the address of the dashboard page that the browser opens, as `?noMenu=true` after the page path (or `&noMenu=true` where the address already has a query string). Profinity does not read query parameters that select a profile, so the profile that is shown is always the active profile.

## Lock Down the Display

The browser's `--kiosk` switch fills the screen but does not disable operating system shortcuts such as Alt+F4 or Ctrl+Alt+Del, so lock the system down with the operating system's own facilities, for example Windows Group Policy, hide the taskbar and system tray, and configure the system to restart the browser when it exits (the Linux unit above does this with `Restart=always`). A kiosk session expires under the normal token expiry policy, so a display that runs for months without attention can use a kiosk user marked as a service account, as described in [Kiosk Mode](../Administration/Kiosk_Mode.md#choosing-the-kiosk-user). Confirm that the kiosk user holds only the permissions the display needs, for example a read-only role built from view permissions only, because anyone at the display inherits them. A chart that polls for data at a fixed interval is set in the dashboard, as described in [Charts](../Customising_Profinity/Dashboards/Component_Reference/Data/Charts.md).

## Test Kiosk Mode

1. Restart the system
2. Confirm that Profinity starts automatically
3. Confirm that the browser opens fullscreen, loads the correct profile and signs in automatically without the login page

## Troubleshooting

### The Browser Does Not Start

A browser that does not open after a restart usually starts before Profinity or before the display is ready. Check the startup order and service dependencies so that the browser starts after Profinity.

### The Login Page Is Shown

A login page that appears instead of the dashboard means Kiosk Mode is off for the active profile, or the kiosk user is missing or disabled. Verify that Kiosk Mode is enabled for the active profile and that a valid kiosk user is selected, and see [Kiosk Mode](../Administration/Kiosk_Mode.md#troubleshooting) for the other causes.

### The Wrong Profile Is Shown

Kiosk Mode shows the active profile only, so make the intended profile the active profile.

### The Display or Performance Is Poor

A blank, cropped or slow display usually comes from the display resolution settings or a dashboard that is too complex for the machine. Check the display configuration and resolution settings, and monitor system resources and simplify the dashboard.

## Related Documentation

- [Kiosk Mode](../Administration/Kiosk_Mode.md) - the full Kiosk Mode reference, including how to choose the kiosk user and manage its token
- [Running as a Service](../Installation/Running_As_Service.md) - configure Profinity as a service
- [Profiles](../Administration/Profiles.md) - profile settings, including Kiosk Mode
