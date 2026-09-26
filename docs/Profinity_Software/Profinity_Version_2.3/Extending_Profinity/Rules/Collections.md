---
title: Collections
---

# Tag collections

**Collections** group tags for filtering, dashboards, and rules. Profinity 2.3 stamps collections YAML with **`version: "2.3"`**; each entry carries a plain `id` field so the visual editor can round-trip edits without losing identity.

## Open the collections editor

- Side menu → **COLLECTIONS** (`/tags?view=tag_collections`) when the active profile supports tag collections, or
- Component/profile settings → collections visual editor.

<figure markdown>
![Collections visual editor with member list](../../../../assets/images/2.3/2.3-collections-visual-editor.png)
<figcaption>Collections visual editor (screenshot placeholder — provide SS-43)</figcaption>
</figure>

Requires **`TagCollectionsView`** to view and **`TagCollectionsModify`** to save.

## Document version and ids

After upgrading from 2.2.x:

- Open each collection in the **visual editor** and **save** once to stamp `version: "2.3"` and normalise ids if you hand-edited YAML.
- The `id` field ties collection members to editor state and API resources.

Engineering reference: [02.5 collections and filters](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/Tag-Layer/02.5-collections-and-filters.md).

## Create collections from Tag Explorer

You can start a collection from the Tag Explorer context menu — see [Tag linking](../Tags/Tag_Linking.md).

!!! note "Partial GA linking"
    Reciprocal editors (for example "add rule to collection" from the collections view only) are **not** shipped in 2.3 GA. Document and use **shipped** Tag Explorer flows only.

## API

Collections are managed via `/api/v2` tag collections controllers with JSON request and response bodies. Permissions follow `TagCollectionsView` / `TagCollectionsModify`.

## Related documentation

- [Tag layer](../Tag_Layer/index.md)
- [Tag linking](../Tags/Tag_Linking.md)
- [ALL ALERTS](./Alerts.md)
- [Derived tags](./Derived_Tags.md)
