---
title: API reference
description: "Find the page for each Profinity REST API: sign in, tags, alerts, profiles, components, dashboards, CAN bus, DBC and actions."
type: index
owner: Documentation
last_reviewed: 2026-11-20
---

# API reference

Each Profinity REST API has its own page, and the first sentence of a page names the group that Swagger shows for it on your instance.
A page lists the endpoints of one API, the permission each needs, and the fields each takes.
Swagger on your instance lists every parameter and response field, and the **Permission** column on each page names the permission an account needs, as described in [Roles and permissions](../../../Administration/Users_and_Access/Roles_and_Permissions.md).
Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get a token, and to [Read real-time and historical tag data](../Read_Tag_Data.md) for the tag query set endpoints and the endpoints that read one tag or signal.

## Sign in

- [Users API](Users_API.md): sign in, renew a token, and reset an account.

## Tags and alerts

- [Tags API](Tags/Tags_API.md): read the tag tree, as nested JSON or a paged list.
- [Tag history API](Tags/Tag_History_API.md): read stored tag history.
- [Alerts API](Tags/Alerts_API.md): list alerts, and acknowledge or silence them.
- [Tag rules API](Tags/Tag_Rules_API.md): read and save tag rules.
- [Tag collections API](Tags/Tag_Collections_API.md): read, save and delete tag collections.
- [Derived tags API](Tags/Derived_Tags_API.md): read, save and check derived tags.
- [Tag expressions API](Tags/Tag_Expressions_API.md): check an expression and preview the tags it matches.

## Profiles and components

- [Profiles API](Profiles_and_Components/Profiles_API.md): list, create, delete, import and export profiles.
- [Active profile API](Profiles_and_Components/Active_Profile_API.md): switch the active profile, read its configuration, add, configure and remove its components, and upload their files.
- [UI API](Profiles_and_Components/UI_API.md): read the dashboard schema, and save a profile or component dashboard.

## CAN bus and DBC

- [CAN bus API](CAN_Bus_and_DBC/CAN_Bus_API.md): read CAN traffic, send packets, and replay CAN logs.
- [DBC API](CAN_Bus_and_DBC/DBC_API.md): read the CAN database messages and signals of each component.

## Run actions

- [Actions API](Actions_API.md): run component and system actions.
