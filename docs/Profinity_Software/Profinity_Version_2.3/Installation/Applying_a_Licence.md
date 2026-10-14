---
title: Applying a Licence
description: "Apply a Profinity licence file after installation, from the License page or by copying it into the licence folder, and check that it has taken effect."
---

# Applying a Licence

A new Profinity installation runs without a licence file. An unlicensed Desktop installation is limited to personal, non-commercial use, and other installations start a one-time 14-day local trial with the Server features, as described in [Licensing](../Administration/Licensing.md). A commercial or evaluation licence from Prohelion removes those limits, and it is applied after installation in the same way on every platform.

## What Is Needed

- The **Security administration** permission, which is needed to view or change the **License** page. On a Windows desktop installation the built-in account holds it.
- The licence file, named `license.yaml`, which Prohelion signs for one installation and returns after receiving its fingerprint.
- Access to the machine that runs Profinity, or to its artefacts directory, when the instance has no network access.

## Apply a Licence from the License Page

1. Select **ADMIN** in the side menu, then **License**.
2. Copy the **Fingerprint** shown on the page, using the copy button beside it, and send it to Prohelion through the usual sales or support channel. The fingerprint identifies this installation and is the only information Prohelion needs to issue a licence.
3. When Prohelion returns the `license.yaml` file, return to the **License** page, select **Update license file** and choose the file.

Profinity checks the file's signature and expiry, and that its fingerprint matches this installation, before applying it. If any check fails, the upload is rejected and the existing licence, if there is one, stays in effect.

!!! note "No Network Access"
    The fingerprint and the returned file can both travel by any route, for example email from another computer, a USB drive or a secure file copy, so the machine that runs Profinity does not need internet access.

## Apply a Licence Without the Web Interface

For Docker, Linux services and scripted deployments, copy `license.yaml` into the `license` folder of the [artefacts directory](Artifacts_Directory.md), so that the file ends up at `license/license.yaml` inside it. On Docker, place it in the mounted volume that holds the artefacts directory, so that it survives the container being recreated. A licence applied this way needs to belong to the installation's own fingerprint in the same way as one uploaded from the page.

To read the fingerprint without the web interface, use the **License** page from a browser on the same machine, or see [The Machine Fingerprint](../Administration/Licensing.md#the-machine-fingerprint).

## Check That the Licence Has Taken Effect

Open **ADMIN**, then **License**, and check the following:

- **State** reads `Valid`, or `Expiring` when 30 days or fewer remain before the licence expires.
- **Expires**, **Customer** and **Edition** match the licence that Prohelion issued.
- The **Licensed features** and **Licensed component groups** tables show the expected entries as licensed and available.

!!! note "Restart After Applying a Licence"
    Restart Profinity after you apply a licence that adds features, in particular a Server licence. The address that the web interface listens on is set when Profinity starts, so other machines cannot connect until it has been restarted. Removing licensed features restarts Profinity automatically.

If the page still shows the previous state after the file was copied into the folder, restart Profinity and check again.

## If the Licence Is Rejected

| What the page or message shows | Likely cause | What to do |
|--------------------------------|--------------|------------|
| The upload is rejected | The file's signature, expiry or fingerprint did not pass validation | Check that the file is the unchanged `license.yaml` that Prohelion returned, and that it has not expired |
| `WrongInstance` | The file was issued for a different machine | Send Prohelion the fingerprint shown on this installation, and apply the file that is issued for it |
| `Expired` | The licence's expiry date has passed | Ask Prohelion for a renewal, and apply it in the same way |

A rejected upload never replaces a working licence, so it is safe to retry.

## Related Documentation

- [Licensing](../Administration/Licensing.md) - editions, features, the status page and the 14-day local trial
- [Artifacts Directory](Artifacts_Directory.md) - where the `license` folder sits on each platform
- [Quick Start Guide](../Getting_Started/Quick_Start.md) - the short version of these steps
