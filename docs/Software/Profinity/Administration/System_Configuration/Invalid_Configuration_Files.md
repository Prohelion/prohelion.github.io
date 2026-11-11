---
title: When a configuration file is invalid
description: "What Profinity 2.3 does when a settings file, profile, rule, collection, derived tag or menu layout is invalid, and how to recover."
type: reference
owner: Documentation
last_reviewed: 2026-10-25
---

# When a configuration file is invalid

This page describes what Profinity does when one of its settings files is damaged, has an unrecognised key, or refers to an unset environment variable, and how to recover from these scenarios.
For `config.yaml` and `security.yaml`, the two files that control how Profinity is secured and exposed, Profinity stops and shows a message.
For the other settings files it carries on with a default and tells you in the log.

## What happens to each file

| File | If the file is invalid | What changes on disk |
|---|---|---|
| `config.yaml` | Profinity does not start and shows a message that names the file and the reason. | Nothing. The file is left exactly as it is. |
| `security.yaml` | Profinity does not start and shows a message that names the file and the reason. | Nothing. No keys or users are created or changed. |
| `profile.yaml` | Profinity creates a new default profile, makes it the active profile, and writes the reason to the log. | Nothing in the invalid profile. The file is left exactly as it is. |
| `plugins.yaml` | Profinity starts with no registered plugins. Plugin folders it finds are registered as disabled until the file is repaired. | Nothing. Profinity leaves the damaged file as it is. |
| `theme.yaml` | Profinity starts with the default theme. | Nothing. |
| `custom.yaml` | Because the file is invalid, the install is not offered the [14-day local trial](../../Licensing.md#the-14-day-local-trial), and the component groups that the file hides are shown. Profinity never changes `custom.yaml`, which the OEM build supplies, so it must be corrected in that file. | Nothing. |

A file that does not exist counts as valid.
Profinity creates the default for `config.yaml`, `security.yaml` and `plugins.yaml`, and uses the default theme and no custom settings for the others.
`config.yaml`, `security.yaml`, `plugins.yaml` and `custom.yaml` are in the `config` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md), `theme.yaml` is in the `themes` folder, and `profile.yaml` is in the profile folder.
`custom.yaml` holds the installer settings of an OEM build, such as the trial and the component groups it hides.

## Rules, collections, and derived tags

These documents hold many separate items, so Profinity checks each item on its own and does not stop.
An item that is not valid is skipped, and every other item still works.
A skipped rule is inactive, and a skipped collection or derived tag is withheld.

An item is skipped when it fails its own checks, refers to something missing, or has an unrecognised key, such as a misspelt setting name.
Because an item with an unknown key is skipped, check these documents after an upgrade from 2.2.
Refer to the [breaking changes](../../Release_Notes/Breaking_Changes_2_3.md) for what changed.

Profinity writes one line to the log for each skipped item, with the name of the item and the reason.
The rules, collections, and derived tags editors show the same list.

Each skipped item has a red **Invalid** marker, and the reason appears when you point at it.
A key that is not inside any item appears in a banner instead of on an item.
The file itself stays unchanged when it loads.

To fix a skipped item, open its editor, correct the item named in the marker, and select **SAVE**. The editors are under **TAG UTILITIES** in the side menu: **RULES & ACTIONS** for rules, **COLLECTIONS** for tag collections, and **DERIVED TAGS** for derived tags.
Saving needs every item in the document to be valid first.

If the whole file cannot be read, the editor tells you so and shows a message in place of an empty list that you might save over the top of it.

## Menu layout

A menu layout that is invalid is ignored, and every component appears in its default group.
A layout is invalid when it has a mistake such as a misspelt key, a component listed twice, or a value of the wrong type, or when it uses an older format.
Profinity writes one message to the log that names the problem, and the profile file is not changed.

The **Menu Layout** editor shows a notice that gives the reasons.
Saving from the editor replaces the ignored layout.
Refer to [Menu Layout](../Menu_Layout.md) for how to arrange groups and components in the editor.

## Profiles

A profile is invalid when it has an unrecognised key at its own level, such as a misspelt setting name, or when it cannot be read as YAML.
Profinity checks the profile when it starts.
If the profile is invalid, Profinity creates a new default profile and makes it the active profile, and the log names the profile and the reason.

The invalid profile file stays unchanged, so everything in it is kept.
To go back to it, correct the key that the log names, then select the profile again in the **Profile** pill on the **ADMIN** page, as described in [Manage profiles](../Manage_Profiles.md).
If the profile named in `config.yaml` has no `profile.yaml`, as on a new installation, Profinity treats the profile as missing. It creates a default profile, makes it active, and logs that no profile of that name was found.

Settings inside a component are defined by the component, so Profinity does not check them this way.
When Profinity saves the profile, it discards an unrecognised setting for that component.
A profile is read only from `profile.yaml` in the profile folder.

## Alert state

Profinity keeps the current state of each alert, including which alerts are acknowledged or silenced, in `active_alerts.yaml` in the profile's `events` folder.
If that file is damaged or empty, Profinity discards it and rebuilds it from the daily alert files, `alerts_<date>.yaml`, which hold every alert event.
Acknowledged and silenced alerts stay acknowledged and silenced, and the log records the rebuild.
A daily file that cannot be read is left out of the rebuild.

## What counts as invalid

A settings file is invalid when any of these is true:

- The file is empty, or its contents cannot be read as settings.
- A value has the wrong type or shape.
- The file has a key that Profinity does not define, such as a misspelt setting name.
- The file refers to an environment variable, such as `${PROFINITY_ADMIN_USERNAME}`, that is not set.

Profinity ignores the keys that 2.2 wrote to `config.yaml` and that 2.3 dropped, such as `mcp`, `enableScripting`, `urls` and `webSite`, so a `config.yaml` that 2.2 wrote still starts.
Any other key that Profinity 2.3 does not define still makes the file invalid.

## Recover when Profinity will not start

The message appears in the console, in the Windows desktop start-up dialog, and in the log.
It names the file and the reason.

!!! warning "Resetting security.yaml removes users and keys"
    Deleting `security.yaml` resets security.
    All users, roles, and keys are reset, and Profinity creates the default **admin** account, which must change its password at first sign-in.
    Values that were encrypted under the old key, such as the AI key and two-factor secrets, become unreadable and must be entered again.
    Restore the safety copy first if you have one.

1. Open the file named in the message and fix the problem it reports. `theme.yaml` is in the `themes` folder and `profile.yaml` is in the profile folder; the others are in the `config` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md). If it names a key, correct or remove that key.
2. If you cannot fix the file, copy it to a safe place so that its content is kept.
   Then restore the last good copy by copying `<file>.bak` over it.
   For example, copy `config.yaml.bak` over `config.yaml`.
3. If both fail, copy the file to a safe place if you have not already, then delete it to reset it.
   Profinity creates the default on the next start.
   Do not delete `custom.yaml`: the OEM build supplies it, so ask your supplier for a corrected copy.
4. Start Profinity again.

| What you see | Cause | What to do |
|---|---|---|
| The message names an environment variable | The file refers to an environment variable that is not set | Set the variable and start again. The file itself is intact, so do not delete it. |
| The message says the file could not be read | - | Check the file permissions for the account that runs Profinity. |


Resetting `config.yaml` returns every setting to its default.

## The safety copy

Every time Profinity saves one of these files it keeps the version it replaced as `<file>.bak`, for example `config.yaml.bak`.
Profinity keeps one copy per file, and each save replaces it.
A file that is damaged is never copied over the safety copy, so the copy always holds the last file that worked.

The safety copy can hold credentials that you have since removed, so Profinity creates it readable only by the account that runs Profinity.
Exported profile packs do not include safety copies, and importing a pack ignores any it contains.

## Containers and services

A container that restarts automatically will restart again and again while a file is invalid, and each attempt writes the same message to the log.
Read the message, fix or restore the file in the data volume, and the next start succeeds.
Check a configuration without starting Profinity by running `Profinity --preflight-only` with the Profinity executable on any operating system. The command checks the runtime and the configuration and security files without starting Profinity or writing anything. A valid set prints `[profinity] Preflight checks passed.` and exits with code 0. An invalid file prints its message and exits with code 2. The check runs the same way on each platform, reporting the runtime checks first and then each invalid file.

## Last sign-in times

Profinity records each user's last sign-in time in a small separate file, `user_activity.yaml`, beside `security.yaml`, so signing in does not rewrite `security.yaml`.
If that file is damaged, Profinity ignores it and last sign-in times start again.
