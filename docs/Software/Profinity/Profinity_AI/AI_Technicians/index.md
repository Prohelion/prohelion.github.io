---
title: AI technicians
description: Use an AI technician to have Profinity AI review a device on a schedule or after an alert, and publish its finding as tags for alert rules.
type: index
owner: Documentation
last_reviewed: 2026-11-10
---

# AI technicians

An AI technician is a component that asks [Profinity AI](../index.md) to review the profile without anyone at the screen, on a schedule, on demand, or when a rule calls it.
It reads with read-only tools, publishes its verdict as tags, and leaves the alerts to ordinary [tag rules](../../Tags/Rules/index.md) on those tags.
AI technicians require the **AI** licensed feature, included in the **Server** and **Enterprise** editions.

- [How AI technicians work](./How_AI_Technicians_Work.md): what happens in a round, what wakes a technician, and the limits that keep AI reviews rare.
- [AI Technician](./AI_Technician.md): the settings, the findings tags, the built-in rules, the dashboard, and troubleshooting.
- [Set up an AI technician](./Set_Up_an_AI_Technician.md): add a technician, give it a service account and a schedule, and check its first finding.
- [Write instructions](./Write_Instructions.md): write the instructions that give a technician a reliable verdict.
- [Investigate alerts with an AI technician](./Investigate_Alerts_with_an_AI_Technician.md): have a device rule wake the technician when an alert fires.
