---
title: How to set up Profinity as a kiosk application
description: "Configure Kiosk Mode in Profinity and start a fullscreen browser on Windows, Linux, or macOS so a display shows a profile without a login page."
type: task
owner: Documentation
last_reviewed: 2026-11-11
---

# How to set up Profinity as a kiosk application

Set up a display that opens Profinity full screen when the computer starts and signs in on its own, with no login page.
You turn on Kiosk Mode for a profile, which signs the display in as a chosen user, and then set the computer to open a browser full screen on Profinity.
[Kiosk Mode](../Administration/Kiosk_Mode.md) describes how to choose the kiosk user and keep its session working.

You need:

- Profinity running as a service or in Docker, so that it starts on its own when the computer starts, as described in [Run Profinity as a service](../Installation/Run_as_a_Service/index.md).
- Administrator access to the computer that drives the display.
- Google Chrome on Windows or macOS, or Chromium on Linux.
- The [profile](../Getting_Started/Profiles.md) to display, and the **Modify profiles** permission.
- An enabled [user account](../Administration/Users_and_Access/Manage_Users.md) to act as the kiosk user, with only the [permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) the display needs. Kiosk Mode needs the **Profinity Server** licensed feature, as described in [Licensing](../Licensing.md), because the kiosk user is a user account, and user accounts need that feature. [Choosing the kiosk user](../Administration/Kiosk_Mode.md#choosing-the-kiosk-user) describes how to pick that account.

## Turn on Kiosk Mode

Kiosk Mode is set for each profile and applies only to the active profile.

1. Select **ADMIN** in the side menu, then open the **Profile** pill.
2. Select the name of the profile to display. **Profile Settings** opens.
3. Select the **Home** tab, then turn on **Kiosk mode**.
4. In **Kiosk mode user**, choose the kiosk user. Anyone at the display acts as this user.
5. Select **Save**.
6. If the profile is not already active, select **ACTIVATE** on its row in the profile list.

The profile's row carries the **ACTIVE** marker.
Profinity refuses the save when **Kiosk mode user** is empty or names a user that is disabled.

## Open the browser full screen at startup

Start the browser in its full-screen kiosk mode at `http://localhost:18080`, the default Profinity address, which opens the home dashboard of the active profile.
Profinity has to be running before the browser opens it, so start the browser after the user signs in to the computer, by which time the Profinity service has started.
Use the browser's and the operating system's own documentation for the steps.

To hide the side menu so that only the dashboard shows, add `?noMenu=true` to the address, so that it reads `http://localhost:18080/?noMenu=true`.
On an address that already has a query string, add `&noMenu=true` instead.
Profinity always shows the active profile, whatever the address.

## Check the display

1. Restart the computer.
2. Check that the browser opens full screen.
3. Check that the dashboard of the kiosk profile appears without a login page.

A kiosk session ends under the normal token expiry, after 120 minutes by default.
For a display that runs unattended for longer, refer to [Choosing the kiosk user](../Administration/Kiosk_Mode.md#choosing-the-kiosk-user).

## Lock down the display

Kiosk mode fills the screen, and operating system shortcuts still work.
Lock the computer down with the operating system's own tools.

## Troubleshooting

| What you see | Cause | What to do |
|---|---|---|
| The browser shows that it cannot connect after a restart | The browser opened before Profinity finished starting. | Select reload in the browser. If it happens at every restart, check that Profinity runs as a service, as described in [Run Profinity as a service](../Installation/Run_as_a_Service/index.md). |
| The login page appears, or the display shows the wrong profile | The kiosk profile is not active, Kiosk Mode is off for it, or the **Kiosk mode user** is disabled. | Activate the profile, and check its **Home** tab, as in [Turn on Kiosk Mode](#turn-on-kiosk-mode). Refer to [Kiosk Mode troubleshooting](../Administration/Kiosk_Mode.md#troubleshooting). |
| The login page appears after the display has run for some hours | The kiosk session reached its token expiry. | Refer to [Choosing the kiosk user](../Administration/Kiosk_Mode.md#choosing-the-kiosk-user) for a session that does not expire. |
