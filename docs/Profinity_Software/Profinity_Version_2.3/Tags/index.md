---
title: Tags
description: "Profinity's tag catalogue foundation for Tag Explorer, collections, rules, and alerts."
---

# Tag layer

The **tag layer** is Profinity's catalogue of live and configured tag values — the foundation for Tag Explorer, collections, rules, and alerts introduced in 2.3.

<figure markdown>
![Many source types — a CAN/DBC signal, a device property, a register, a firmware field — all become one Tag with an address, value, quality flag, and metadata, readable as an instantaneous value or as time-series history](../images/2.3-diagram-tags.png)
<figcaption>One data model for every signal</figcaption>
</figure>

## Tag Explorer

Open **TAG EXPLORER** from the side menu. Requires **`TagView`** permission.

<figure markdown>
![Tag Explorer tree and table view](../images/2.3-tag-explorer-tree.png)
<figcaption>Tag Explorer browse view</figcaption>
</figure>

Use Tag Explorer to:

- Browse the tag tree and switch to table views where available.
- Inspect **data quality** indicators (stale quality uses a Carbon icon — distinct from **rule alert** triangles).
- Open context-menu flows for [tag linking](Tag_Linking.md).

## Collections, rules, and alerts

| Feature | Where it opens | View permission |
|---------|----------------|-----------------|
| Collections | Side menu → **TAG UTILITIES** → **COLLECTIONS** (editor window) | `TagCollectionsView` |
| Rules | Side menu → **TAG UTILITIES** → **RULES** (editor window, when the Tag Rule Actions feature is enabled) | `TagRulesView` |
| ALL ALERTS | Side menu → **ALL ALERTS** | `AlertsView` |

The **TAG UTILITIES** group appears for users with `TagView`, and the collections and rules editors need a loaded profile and the view permission shown, whereas saving needs `TagCollectionsModify` or `TagRulesModify`.

## Key API areas (integrators)

The new and changed `/api/v2` controllers in 2.3 include:

| Area | Controllers (representative) |
|------|------------------------------|
| Tags | `TagsController`, `TagDefinitionController`, `TagQuerySetController`, `TagExpressionsController` |
| Collections | `TagCollectionsController` |
| Rules | `TagRulesController` |
| Alerts | `AlertsController` |

Legacy **`DataController`** is removed from the v2 surface — use tag-layer endpoints for new integrations.

All endpoints require the appropriate permissions — see [Roles and permissions](../Administration/Roles_and_Permissions.md).

## Tag relay

Profinity instances can share live tags with each other over the network — one
instance publishes a snapshot, another ingests it as remote, read-only tags under
that site's own prefix. See [Tag relay](./Tag_Relay.md) for how sender and receiver
roles work, transport options, and licensing.

## Related documentation

- [Tag relay](./Tag_Relay.md)
- [Tag linking](Tag_Linking.md)
- [Tag tree path](Tag_Tree_Path.md)
- [Tag expressions](Tag_Expressions.md)
- [ALL ALERTS](Alerts.md)
- [Collections](Collections.md)
- [Rule actions and scripts](Actions.md)
- [Derived tags](Derived_Tags.md)
