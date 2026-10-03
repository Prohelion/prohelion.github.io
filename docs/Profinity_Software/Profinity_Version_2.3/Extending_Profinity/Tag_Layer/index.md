---
title: Tag Layer
description: "Profinity's tag catalog foundation for Tag Explorer, collections, rules, and alerts."
---

# Tag layer

The **tag layer** is Profinity's catalog of live and configured tag values — the foundation for Tag Explorer, collections, rules, and alerts introduced in 2.3.

<figure markdown>
![Many source types — a CAN/DBC signal, a device property, a register, a firmware field — all become one Tag with an address, value, quality flag, and metadata, readable as an instantaneous value or as time-series history](../../../../assets/images/2.3/2.3-diagram-tags.png)
<figcaption>One data model for every signal</figcaption>
</figure>

## Tag Explorer

Open **TAG EXPLORER** from the side menu (`/tags` or `/tags?view=tag_explorer`). Requires **`TagView`** permission.

<figure markdown>
![Tag Explorer tree and table view](../../../../assets/images/2.3/2.3-tag-explorer-tree.png)
<figcaption>Tag Explorer browse view (screenshot placeholder — provide SS-42)</figcaption>
</figure>

Use Tag Explorer to:

- Browse the tag tree and switch to table views where available.
- Inspect **data quality** indicators (stale quality uses a Carbon icon — distinct from **rule alert** triangles).
- Open context-menu flows for [tag linking](../Tags/Tag_Linking.md).

## Collections and rules

| Feature | Side menu route | View permission |
|---------|-----------------|-----------------|
| Collections | `/tags?view=tag_collections` | `TagCollectionsView` |
| Rules | `/tags?view=tag_rules` | `TagRulesView` |
| ALL ALERTS | `/tags?view=alerts` | `AlertsView` |

Visual editors are also available from component and profile settings depending on profile layout.

## Key API areas (integrators)

New and changed `/api/v2` controllers on 2.3 include:

| Area | Controllers (representative) |
|------|------------------------------|
| Tags | `TagsController`, `TagDefinitionController`, `TagQuerySetController`, `TagExpressionsController` |
| Collections | `TagCollectionsController` |
| Rules | `TagRulesController` |
| Alerts | `AlertsController` |

Legacy **`DataController`** is removed from the v2 surface — use tag-layer endpoints for new integrations.

All endpoints require appropriate permissions — see [RBAC and permissions](../../Administration/Security/RBAC_Permissions.md) and the engineering [endpoint authorization matrix](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/plans/2.3/A8-Endpoint-Authorization-Matrix.md).

## Tag relay

Profinity instances can share live tags with each other over the network — one
instance publishes a snapshot, another ingests it as remote, read-only tags under
that site's own prefix. See [Tag relay](./Tag_Relay.md) for how sender and receiver
roles work, transport options, and licensing.

## Engineering references

Normative architecture (link, do not duplicate in operator guides):

- [Tag layer RFC](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/Tag-Layer/01-rfc-tag-layer.md)
- [Rules engine](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/Tag-Layer/02.7-rules-engine.md)
- [Collections and filters](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/Tag-Layer/02.5-collections-and-filters.md)

## Related documentation

- [Tag relay](./Tag_Relay.md)
- [Tag linking](../Tags/Tag_Linking.md)
- [Tag expressions](../Rules/Tag_Expressions.md)
- [ALL ALERTS](../Rules/Alerts.md)
- [Collections](../Rules/Collections.md)
- [Rule actions and scripts](../Rules/Rule_Actions_And_Scripts.md)
- [Derived tags](../Rules/Derived_Tags.md)
