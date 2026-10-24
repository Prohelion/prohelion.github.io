---
title: When a configuration file is invalid
description: "Find out what Profinity 2.3 does when config.yaml, security.yaml or another settings file is damaged, and how to recover, restore a safety copy or reset the file."
type: reference
owner: Documentation
last_reviewed: 2026-10-24
---

# When a configuration file is invalid

This page describes what Profinity does when one of its settings files is damaged, has a key it does not recognise, or refers to an environment variable that is not set, and how to recover.
Profinity stops rather than start on a guess for the two files that control how it is secured and exposed: `config.yaml` and `security.yaml`.
For the other settings files it carries on with a default and tells you in the log.

## What happens to each file

| File | If the file is invalid | What changes on disk |
|---|---|---|
| `config.yaml` | Profinity does not start and shows a message that names the file and the reason. | Nothing. The file is left exactly as it is. |
| `security.yaml` | Profinity does not start and shows a message that names the file and the reason. | Nothing. No keys or users are created or changed. |
| `plugins.yaml` | Profinity starts with no registered plugins. Plugin folders it finds are registered as disabled until the file is repaired. | Nothing. Profinity does not save over the damaged file. |
| `theme.yaml` | Profinity starts with the default theme. | Nothing. |
| `custom.yaml` | The install is not offered a trial. | Nothing. |

A file that does not exist is not invalid.
Profinity creates the default for `config.yaml`, `security.yaml` and `plugins.yaml`, and uses the default theme and no custom settings for the others.

## What counts as invalid

A settings file is invalid when any of these is true:

- The file is empty, or its contents cannot be read as settings.
- A value has the wrong type or shape.
- The file has a key that Profinity does not define, such as a misspelt setting name.
- The file refers to an environment variable, such as `${PROFINITY_ADMIN_USERNAME}`, that is not set.

Keys that earlier releases wrote and Profinity 2.3 no longer uses are ignored, so a `config.yaml` that 2.2 wrote still starts.

## Recover when Profinity will not start

The message appears in the console, in the Windows desktop start-up dialog, and in the log.
It names the file and the reason.

1. Open the file named in the message and fix the problem it reports. If it names a key, correct or remove that key.
2. If you cannot fix the file, restore the last good copy by copying `<file>.bak` over it. For example, copy `config.yaml.bak` over `config.yaml`.
3. If neither works, delete the file to reset it. Profinity creates the default on the next start.
4. Start Profinity again.

If the message names an environment variable, set the variable and start again.
The file itself is not damaged, so do not delete it.

If the message says the file could not be read, check the file permissions for the account that runs Profinity.

!!! warning "Resetting security.yaml removes users and keys"
    Deleting `security.yaml` resets security.
    All users, roles and keys are reset, and Profinity creates the default **admin** account, which must change its password at first sign-in.
    Values that were encrypted under the old key, such as the AI key and two-factor secrets, become unreadable and must be entered again.
    Restore the safety copy first if you have one.

Resetting `config.yaml` returns every setting to its default.

## The safety copy

Every time Profinity saves one of these files it keeps the version it replaced as `<file>.bak`, for example `config.yaml.bak`.
There is one copy per file, and each save replaces it.
A file that is damaged is never copied over the safety copy, so the copy always holds the last file that worked.

The safety copy can hold credentials that you have since removed, so Profinity creates it readable only by the account that runs Profinity.
Exported profile packs do not include safety copies, and importing a pack ignores any it contains.

## Containers and services

A container that restarts automatically will restart again and again while a file is invalid, and each attempt writes the same message to the log.
Read the message, fix or restore the file in the data volume, and the next start succeeds.
Check a configuration before an upgrade by running `Profinity --preflight-only`, which reports an invalid file without starting Profinity.

## Last sign-in times

Profinity no longer rewrites `security.yaml` each time someone signs in.
It records each user's last sign-in time in a small separate file, `user_activity.yaml`, beside `security.yaml`.
If that file is damaged, Profinity ignores it and last sign-in times start again.
