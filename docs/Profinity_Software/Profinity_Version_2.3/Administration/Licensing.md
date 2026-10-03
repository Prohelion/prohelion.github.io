---
title: Licensing
description: "Manage Profinity licensing with offline signed license files, check feature entitlements, and configure trial licenses."
---

# Licensing

Profinity uses an offline, signed license file to control which commercial features and components are available on an instance. There is no activation service and no online license check: Profinity is designed to run on remote or air-gapped edge machines, so licensing works entirely from a file placed on the instance and a signature that Profinity validates locally.

A license sets the commercial **ceiling** for the instance. The final set of available features and components is the combination of the license, the OEM customisation file (`Custom.yaml`), and the site configuration (`Config.yaml`); a feature is only available when all three allow it. Config-level toggles can narrow what the license permits, but never grant more than the license allows.

## Check license status

Open **Admin > License**. A user needs the **SecurityAdmin** permission to view or change this page.

The page shows:

- **State** — `Valid`, `Trial`, `Expiring`, `Expired`, `Invalid`, `WrongInstance`, `UnsupportedVersion`, or `Missing`.
- **Type** — `Commercial`, `Trial`, or `LocalTrial` (the automatic in-product trial).
- **Edition** — the commercial edition name, for display only. Profinity does not gate features by edition name; it always checks explicit feature and component entitlements.
- **Customer** — the customer name or ID recorded on the license.
- **Expires** — the expiry date and, where applicable, the number of days remaining.
- **Fingerprint** — the unique identifier for this installation, with a button to copy it.
- **Licensed features** — a table of every product feature, whether it is licensed, whether it is currently available (licensed **and** not blocked by configuration), and, if unavailable, what is blocking it.
- **Licensed component groups** — the same status for licensed component groups, such as protocol or hardware-integration bundles.

<figure markdown>
![License page showing state, edition, expiry, fingerprint, and the licensed features and component tables](../../../assets/images/2.3/2.3-license-status-entitlements.png)
<figcaption>Admin &gt; License — status, entitlements, and fingerprint (screenshot placeholder — provide SS-53)</figcaption>
</figure>

!!! info "Available versus licensed"
    A feature can be licensed but still unavailable, for example when it has been turned off in site configuration. The **Licensed** column always reflects the license file; the **Available** column reflects the actual runtime state and names the layer responsible when it is blocked.

## Upload a new license

To apply a commercial or evaluation license:

1. Open **Admin > License**.
2. Copy the **fingerprint** shown on the page and send it to Prohelion through the normal sales or support channel.
3. Prohelion signs a `License.yaml` file for that fingerprint and returns it.
4. Transfer the file to the machine running Profinity (for example by USB drive or secure file copy) if the instance has no network access.
5. On the License page, use **Update license file** and select the `License.yaml` file.

<figure markdown>
![License upload dialog with a License.yaml file selected](../../../assets/images/2.3/2.3-license-upload-dialog.png)
<figcaption>Uploading a License.yaml file from Admin &gt; License (screenshot placeholder — provide SS-54)</figcaption>
</figure>

Profinity validates the file's signature, expiry, and fingerprint match before applying it. If validation fails, Profinity rejects the upload and the existing license, if any, remains in effect. A `License.yaml` file can also be installed without using the UI, by copying it directly into the instance's license folder; this is the usual path for headless or scripted deployments.

!!! warning "The fingerprint is instance-specific"
    A license is signed for one machine's fingerprint. A license issued for one instance does not apply to another, and Profinity reports the state as `WrongInstance` if an administrator uploads a license issued for a different machine.

## The 14-day local trial

A Profinity instance that has never had a license applied issues itself a one-time, 14-day, server-tier trial automatically on first startup, provided the installer build has trial issuance enabled; some OEM-customised builds may not offer this local trial. This local trial:

- Requires no network access and no request to Prohelion.
- Runs for a maximum of 14 days from first startup, enforced by the engine's own trial clock.
- Grants server-tier entitlements (the same feature set as a standard `Commercial` server license), not enterprise-only features.
- Is issued once per installation. Reinstalling or resetting the instance does not restart the trial, because the trial is recorded against the instance fingerprint.
- Is not available on Desktop hosts, which have a separate free-use policy (see below).

!!! warning "When the local trial expires"
    When the 14-day trial ends, Profinity drops the instance to the same unlicensed entitlement set a Desktop installation uses, and shows an expiry notice on the Home screen linking to **Admin > License**. Profinity does not stop, lock users out, or switch to a read-only mode: the engine keeps running, and features and components outside the unlicensed set become unavailable until a suitable commercial or extended evaluation license is uploaded.

## Desktop free-use policy

A Desktop installation is not required to have a license for non-commercial use, and does not issue or consume the automatic local trial described above. It keeps the unlicensed entitlement set indefinitely and shows a notice on the Home screen explaining the non-commercial-use restriction and directing commercial users to contact Prohelion. If a trial or commercial `License.yaml` is installed on a Desktop host manually, Profinity validates and applies it in the same way as on a server host.

## The machine fingerprint

The fingerprint is a value computed from the installation itself, unique to that machine and Profinity install. It has two purposes:

- It ties a signed `License.yaml` to one specific installation, so a license file cannot be copied to another machine and reused.
- It is the only piece of information an administrator needs to send to Prohelion to request a license or evaluation, which keeps the process usable for edge machines with no internet access.

## REST API

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v2/License` | Returns license status and the entitled features and components lists. Requires `SecurityAdmin`. |
| GET | `/api/v2/License/Fingerprint` | Returns the instance fingerprint used to request a license. Requires `SecurityAdmin`. |
| PUT | `/api/v2/License` | Uploads and applies a `License.yaml` document, validating signature, expiry, and fingerprint before saving it. Requires `SecurityAdmin`. |
| GET | `/api/v2/Availability/Features` | Returns the current availability of every product feature, with the blocking layer named where a feature is unavailable. Requires an authenticated user. |

## Related documentation

- [System information](System_Info.md) — instance version and license summary shown alongside other system details.
- [RBAC and permissions](Security/RBAC_Permissions.md) — assigning the SecurityAdmin permission needed to manage licenses.
- [System configuration](System_Config.md) — the site-level configuration layer that can narrow, but never exceed, what the license permits.
