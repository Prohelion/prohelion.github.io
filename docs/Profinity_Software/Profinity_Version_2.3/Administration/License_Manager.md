---
title: License manager
description: "Read the licence state, type, edition, expiry, fingerprint, and licensed features of a Profinity instance on the License page under ADMIN."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# License manager

The **License** page under **ADMIN** shows the licence state of an instance, its fingerprint, and which features and component groups are licensed and available.
Select **ADMIN** in the side menu, then **License**.
A user needs the **Security administration** permission to view or change this page.

The page shows:

- **State**: `Valid`, `Trial`, `Expiring`, `Expired`, `Invalid`, `WrongInstance`, `UnsupportedVersion`, or `Missing`.
  A licence file whose expiry is 30 days or less away is reported as `Expiring` instead of `Valid` or `Trial`.
- **Type**: `Commercial`, `Trial`, or `LocalTrial` (the automatic in-product trial).
- **Edition**: the commercial edition name, shown for information only, because availability follows the individual features and components in the licence.
- **Customer**: the customer name or ID recorded on the licence.
- **Expires**: the expiry date and, where applicable, the number of days remaining.
- **Fingerprint**: the unique identifier for this installation, with a button to copy it.
- **Licensed features**: a table of every product feature.
  It shows whether the feature is licensed, whether it is currently available (licensed **and** not blocked by configuration), and, if unavailable, what is blocking it.
- **Licensed component groups**: the same status for licensed component groups, such as protocol or hardware-integration bundles.

<figure markdown>
![The License page showing licence state, edition, expiry date, fingerprint, and the tables of licensed features and component groups](../images/license-status-entitlements.png)
<figcaption>The License page under ADMIN, showing status, entitlements and fingerprint</figcaption>
</figure>

A feature can be licensed but still unavailable, for example when it has been turned off in site configuration.
The **Licensed** column always reflects the licence file.
The **Available** column reflects the actual runtime state and names what blocks the feature when it is unavailable.

Component groups are licensed separately from product features.
For example, the BACnet, EtherNet/IP, Modbus, Open Platform Communications Unified Architecture (OPC UA), and S7 [industrial protocol plugins](../Components/Industrial_Protocols/index.md) all need the **Industrial Protocols** component group.
[Tag Relays](../Components/Tag_Relays/index.md) need the **Data Relay** feature.
Without the matching entitlement the components show as unavailable, even when the plugin is installed.

To change the licence, refer to [Apply a licence](../Installation/Applying_a_Licence.md).
For what each edition includes, the 14-day local trial, and the machine fingerprint, refer to [Licensing](../Licensing.md).
