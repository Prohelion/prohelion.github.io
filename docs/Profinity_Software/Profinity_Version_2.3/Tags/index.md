---
title: Tags
description: "Profinity's tag catalogue foundation for Tag Explorer, collections, rules, and alerts."
---

# Tag Layer

The **tag layer** is Profinity's catalogue of live and configured tag values, and it is the foundation for Tag Explorer, [collections](./Collections.md), [rules](./Actions.md) and [alerts](./Alerts.md) added in Profinity 2.3.

<figure markdown>
![Many source types, such as a Controller Area Network (CAN) DBC signal, a device property, a register or a firmware field, all become one tag with an address, value, quality flag and metadata, readable as an instantaneous value or as time-series history](../images/2.3-diagram-tags.png)
<figcaption>A tag combines an address, value, quality flag and metadata</figcaption>
</figure>

## Tag Explorer

Open **TAG EXPLORER** from the side menu, which requires the **View tags** permission. Tag Explorer lets you browse the tag tree, switch to table views where available, inspect the data quality indicator on each tag (stale quality has its own icon, separate from the rule alert triangle), and open the context-menu flows described in [Tag Linking](Tag_Linking.md).

<figure markdown>
![Tag Explorer tree and table view](../images/2.3-tag-explorer-tree.png)
<figcaption>Tag Explorer browse view</figcaption>
</figure>

## Collections, Rules and Alerts

| Feature | Where it opens | Permission to view |
|---------|----------------|--------------------|
| Collections | **COLLECTIONS** under **TAG UTILITIES** in the side menu, which opens an editor window | **View tag collections** |
| Rules | **RULES & ACTIONS** under **TAG UTILITIES**, which opens an editor window | **View tag rules** |
| Derived tags | **DERIVED TAGS** under **TAG UTILITIES**, which opens an editor window | **View tag collections** |
| Tag log replay | **TAG LOG REPLAY** under **TAG UTILITIES** | **Replay tag changes** |
| Alerts Log | **ALL ALERTS** in the side menu | **View alerts** |

The **TAG UTILITIES** group appears for users with the **View tags** permission. The collections and derived tags editors also need a loaded profile, and saving needs **Modify tag collections** for collections and derived tags, or **Modify tag rules** for rules.

## Key API Areas for Integrators

Integrations can work with tags, tag collections, tag rules and alerts through the Representational State Transfer (REST) [API](../Integrating_to_Profinity/APIs/index.md) under `/api/v2`. The Swagger page on your Profinity instance lists every endpoint and the parameters it accepts. The older data endpoint is not part of `/api/v2`, so use the tag endpoints for new integrations.

All endpoints require the appropriate permissions, which are listed in [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md).

## Logging and Replaying Tags

The TAG File Logger records tag values to a file, and the **TAG LOG REPLAY** screen plays a recording back onto your live tags. See [Log / replay tags](Logging_Replaying_Tags.md).

## Tag Relay

Profinity instances can share live tags with each other over the network, where one instance publishes periodic snapshots of selected collections and another ingests them as remote, read-only tags under that site's own prefix. See [Tag relay](./Tag_Relay.md) for how the sender and receiver roles work, the transport options and licensing.

<figure markdown>
![At each site, a local Tags to Collections to Rules to Actions and Alerts pipeline runs on its own; Tag Relay lifts that up to a central fleet instance with its own fleet-wide collections, rules and alerts spanning every site](../images/2.3-diagram-fleet-overview.png)
<figcaption>Each site runs its own tag pipeline, and relay adds a shared view at the central instance</figcaption>
</figure>

## Related Documentation

- [Tag relay](./Tag_Relay.md)
- [Tag linking](Tag_Linking.md)
- [Tag tree path](Tag_Tree_Path.md)
- [Tag expressions](Tag_Expressions.md)
- [Alerts Log](Alerts.md)
- [Collections](Collections.md)
- [Rule actions and scripts](Actions.md)
- [Derived tags](Derived_Tags.md)
- [Log / replay tags](Logging_Replaying_Tags.md)
