---
title: Apply a licence
description: "Apply a Profinity licence file after installation, from the License page or by copying it into the licence folder, and check that it has taken effect."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Apply a licence

A new Profinity installation runs without a licence file.
An unlicensed Desktop installation is limited to personal, non-commercial use, and other installations start a one-time 14-day local trial with the Server features, as described in [Licensing](../Administration/Licensing.md).
A commercial or evaluation licence from Prohelion removes those limits, and you apply it after installation in the same way on every platform.

You need three things:

- The **Security administration** permission, which is needed to view or change the **License** page. On a Windows desktop installation the built-in account holds it.
- The licence file, named `license.yaml`, which Prohelion signs for one installation and returns after receiving its fingerprint.
- Access to the machine that runs Profinity, or to its artefacts directory, when the instance has no network access.

## Apply a licence from the License page

1. Select **ADMIN** in the side menu, then **License**.
2. Copy the **Fingerprint** with the copy button beside it, and send it to Prohelion through the usual sales or support channel. The fingerprint identifies this installation and is the only information Prohelion needs to issue a licence.
3. When Prohelion returns the `license.yaml` file, return to the **License** page, select **Update license file**, and choose the file.
4. Restart Profinity if the licence adds features, in particular a Server licence, because the address the web interface listens on is set when Profinity starts.

Profinity checks the file's signature, its expiry, and that its fingerprint matches this installation before it applies the file.
If any check fails, the upload is rejected and the existing licence, if there is one, stays in effect.
The fingerprint and the returned file can travel by any route, such as email from another computer, a USB drive, or a secure file copy, so the machine that runs Profinity does not need internet access.

## Apply a licence without the web interface

For Docker, Linux services, and scripted deployments, copy the file into the artefacts directory instead.

1. Copy `license.yaml` into the `license` folder of the [artefacts directory](./Artifacts_Directory.md), so that the file ends up at `license/license.yaml`.
2. On Docker, place it in the mounted volume that holds the artefacts directory, so that it survives the container being recreated.
3. Restart Profinity if the licence adds features, or if the **License** page still shows the previous state.

The licence must belong to the installation's own fingerprint, in the same way as one uploaded from the page.
To read the fingerprint without the web interface, open the **License** page from a browser on the same machine, or refer to [the machine fingerprint](../Administration/Licensing.md#the-machine-fingerprint).

## Check that the licence has taken effect

Open **ADMIN**, then **License**, and check these three things:

- **State** reads `Valid`, or `Expiring` when 30 days or fewer remain before the licence expires.
- **Expires**, **Customer**, and **Edition** match the licence that Prohelion issued.
- The **Licensed features** and **Licensed component groups** tables show the expected entries as licensed and available.

If the page still shows the previous state after you copied the file into the folder, restart Profinity and check again.
Removing licensed features restarts Profinity automatically.

## If the licence is rejected

| What the page or message shows | Likely cause | What to do |
|--------------------------------|--------------|------------|
| The upload is rejected | The file's signature, expiry, or fingerprint did not pass validation | Check that the file is the unchanged `license.yaml` that Prohelion returned, and that it has not expired |
| `WrongInstance` | The file was issued for a different machine | Send Prohelion the fingerprint shown on this installation, and apply the file that is issued for it |
| `Expired` | The licence's expiry date has passed | Ask Prohelion for a renewal, and apply it in the same way |

A rejected upload never replaces a working licence, so it is safe to retry.
For editions, features, and the 14-day local trial, refer to [Licensing](../Administration/Licensing.md).
