---
title: API reference
description: "Find the page for each Profinity REST API: tags, alerts, profiles, components, CAN bus, DBC, actions and users."
type: index
owner: Documentation
last_reviewed: 2026-11-19
---

# API reference

Each Profinity REST API has its own page, and the first sentence of a page names the group that Swagger shows for it on your instance.
A page lists the endpoints of one API, the permission each needs, and the fields each takes.
Swagger on your instance lists every parameter and response field, and the **Permission** column on each page names the permission an account needs, as described in [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
Refer to [Authenticate to the Profinity REST API](API_Authentication.md) for how to get a token, and to [Read real-time and historical tag data](Read_Tag_Data.md) for the tag query set endpoints and the endpoints that read one tag or signal.

## Tags and alerts

- [Tags API](Reference/Tags_API.md): read the tag tree, as nested JSON or a paged list.
- [Tag rules API](Reference/Tag_Rules_API.md): read, save and report on tag rules.
- [Tag collections API](Reference/Tag_Collections_API.md): read, save, delete and report on tag collections.
- [Derived tags API](Reference/Derived_Tags_API.md): read, save and check derived tags.
- [Tag expressions API](Reference/Tag_Expressions_API.md): check an expression and preview the tags it matches.
- [Tag history API](Reference/Tag_History_API.md): read stored tag history.
- [Alerts API](Reference/Alerts_API.md): list alerts, and acknowledge or silence them.

## Profiles and components

- [Profiles API](Reference/Profiles_API.md): list, create, delete, import and export profiles.
- [Active profile API](Reference/Active_Profile_API.md): switch the active profile, and add and configure its components.

## CAN bus and DBC

- [CAN bus API](Reference/CAN_Bus_API.md): read CAN traffic, send packets, and replay CAN logs.
- [DBC API](Reference/DBC_API.md): read the CAN database messages and signals of each component.

## Actions and users

- [Actions API](Reference/Actions_API.md): run component and system actions.
- [Users API](Reference/Users_API.md): sign in, renew a token, and reset an account.
