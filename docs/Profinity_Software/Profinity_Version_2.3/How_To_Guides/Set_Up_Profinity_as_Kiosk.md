---
title: How to set up Profinity as a kiosk application
description: "Configure Kiosk Mode in Profinity and start a fullscreen browser on Windows, Linux, or macOS so a display shows a profile without a login page."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to set up Profinity as a kiosk application

Configure Profinity to run as a kiosk application that launches in fullscreen mode when the display starts.
Two parts are involved:

- Kiosk Mode in Profinity, which signs the display in automatically as a chosen user.
- The browser and operating system setup, which opens Profinity fullscreen.

[Kiosk Mode](../Administration/Kiosk_Mode.md) is the full reference, including how to choose the kiosk user and manage its token.

Before you start, you need:

- Profinity 2.3 installed as a service or in Docker with automatic start enabled, and running. The browser fails to connect if Profinity is not already running (refer to [Run Profinity as a service](../Installation/Run_as_a_Service/index.md)).
- Administrator access to the system.
- A [profile](../Getting_Started/Profiles.md) configured and ready to display, and the **Modify profiles** permission to change its settings. [Profiles](../Administration/Profiles.md) describes the profile settings, including Kiosk Mode.
- An enabled [user](../Administration/Users_and_Access/Manage_Users.md) to act as the kiosk user, holding only the [permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) the display needs (refer to [Kiosk Mode](../Administration/Kiosk_Mode.md#choosing-the-kiosk-user)).
- A licence that includes the **Profinity Server** licensed feature, to create that user. Kiosk Mode is available in every edition, but the kiosk user must be a user account, and **Users & Groups** creates user accounts only with that feature. A Desktop installation has no user to select. [Licensing](../Licensing.md) lists the features of each edition.

## Configure Kiosk Mode in Profinity

Kiosk Mode is configured per profile.
It authenticates the browser automatically as the configured kiosk user, so no login page is shown.

1. Select **ADMIN** in the side menu, then **Profile**.
2. Select or create the profile to display, and open its profile settings.
3. Enable **Kiosk Mode**.
4. Select a **Kiosk Mode User** from the dropdown.
   The list shows all enabled users, so choose one with minimal permissions.
5. Save the profile settings.
6. Make this profile the active profile, because Kiosk Mode applies only to the active profile.

## Configure the browser for fullscreen display

!!! warning "Start Profinity before the browser"
    The browser fails to connect if Profinity is not already running.
    Profinity must start automatically as a service or in Docker, and the browser must start after it, with time for Profinity to finish starting.

The browser's own `--kiosk` switch provides the fullscreen display, and Profinity does not read query parameters that request fullscreen.
The steps for each operating system use `http://localhost:18080`, the default Profinity web address.

### Windows

The example assumes that Google Chrome is installed.

1. Create a desktop shortcut for the browser.
2. Right-click the shortcut, and select **Properties**.
3. In **Target**, add `--kiosk http://localhost:18080`, for example:

    ```text
    "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk http://localhost:18080
    ```

4. Press `Win + R`, and type `shell:startup`.
   The startup folder opens.
5. Copy the shortcut to the startup folder.

### Linux

1. Create a systemd service with `sudo nano /etc/systemd/system/profinity-kiosk.service`, and add this unit:

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

2. Enable the service with `sudo systemctl enable profinity-kiosk.service`.
3. Start the service with `sudo systemctl start profinity-kiosk.service`.

### macOS

1. Open Automator and create a new Application.
2. Add a **Run Shell Script** action and enter the script `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk http://localhost:18080`.
3. Save it as an application.
4. Open **System Settings** (**System Preferences** on older versions of macOS).
5. Select **Users & Groups**, then **Login Items**.
6. Add the kiosk application.

## Hide the side menu

Profinity pages that a dashboard renders accept the `noMenu=true` query parameter, which hides the side menu so that only the dashboard is shown.
Append it to the address of the dashboard page that the browser opens.
Add `?noMenu=true` after the page path, or `&noMenu=true` where the address already has a query string.
Profinity does not read query parameters that select a profile, so it always shows the active profile.

## Lock down the display

The browser's `--kiosk` switch fills the screen but does not disable operating system shortcuts such as Alt+F4 or Ctrl+Alt+Del.
Lock the system down with the operating system's own facilities, for example Windows Group Policy.
Hide the taskbar and system tray, and configure the system to restart the browser when it exits.
The Linux unit in this guide does this with `Restart=always`.

!!! warning "Anyone at the display inherits the kiosk user's permissions"
    Confirm that the kiosk user holds only the permissions the display needs, for example a read-only role built from view permissions only.
    Anyone at the display inherits those permissions.

A kiosk session expires under the normal token expiry policy.
A display that runs for months without attention can use a kiosk user marked as a service account, as [Kiosk Mode](../Administration/Kiosk_Mode.md#choosing-the-kiosk-user) describes.
Set a chart that polls for data at a fixed interval in the dashboard, as described in [Charts component](../Customising_Profinity/Dashboards/Component_Reference/Data/Charts.md).

## Test Kiosk Mode

1. Restart the system.
2. Confirm that Profinity starts automatically.
3. Confirm that the browser opens fullscreen and loads the correct profile.
4. Confirm that the browser signs in automatically, without the login page.

## Troubleshooting

### The browser does not start

A browser that does not open after a restart usually starts before Profinity or before the display is ready.
Check the startup order and service dependencies so that the browser starts after Profinity.
To run Profinity as a service, refer to [Run Profinity as a service](../Installation/Run_as_a_Service/index.md).

### The login page is shown

A login page that appears instead of the dashboard means Kiosk Mode is off for the active profile, or the kiosk user is missing or disabled.
Verify that Kiosk Mode is enabled for the active profile, and that a valid kiosk user is selected.
Refer to [Kiosk Mode](../Administration/Kiosk_Mode.md#troubleshooting) for the other causes.

### The wrong profile is shown

Kiosk Mode shows the active profile only, so make the intended profile the active profile.

### The display or performance is poor

A blank, cropped, or slow display usually comes from the display resolution settings or a dashboard that is too complex for the machine.
Check the display configuration and resolution settings.
Monitor system resources, and simplify the dashboard.
