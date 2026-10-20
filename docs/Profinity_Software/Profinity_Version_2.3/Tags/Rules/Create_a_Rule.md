---
title: Create a rule
description: Create a threshold rule in the rules visual editor that raises a Warning and then a Fatal alert as a battery pack temperature rises.
type: task
owner: Documentation
last_reviewed: 2026-10-20
---

# Create a rule

This procedure creates a threshold rule that raises a Warning alert when a pack temperature goes above 45 °C and a Fatal alert above 55 °C.
Opening the rules editor needs the **View tag rules** permission, and saving needs **Modify tag rules**, as listed under [Permissions](index.md#permissions).

1. In the side menu, select **RULES & ACTIONS** under **TAG UTILITIES**. The **Editing Rules & Actions** editor opens.
2. In the **Rule Set** list, select the profile's rule set.
3. Select **+ RULE**. A new rule is added to the selected group, or to the rule set when no group is selected, and its settings open in the inspector.
4. Set **Rule id** to `pack_temperature` and **Display name** to `Pack temperature`.
5. In **Item Scope**, enter `/Vehicles/Car1/Battery/PackTemperature`. The leading `/` starts the path at the root of the tag tree, so the rule watches that tag whatever scope the rule set has.
6. Set **Rule type** to **Threshold rule**, and leave **Expression** as `tag.HasValue`.
7. Under **Thresholds**, select **+ Add step**, and set the step as follows:
    1. Set **Operator** to `>` and **Value** to `45`.
    2. Set **Clear value (deadband)** to `42`.
    3. Leave **Level** as **Warning**, and set **Enter message** to `Pack temperature above 45 C`.
8. Select **+ Add step** again, and set **Operator** to `>`, **Value** to `55`, **Clear value (deadband)** to `52`, **Level** to **Fatal**, and **Enter message** to `Pack temperature above 55 C`.
9. Optional: Set **Dwell seconds** to `10`, so the temperature must stay above a limit for 10 seconds before the alert is raised.
10. Select **SAVE**. The editor shows "Rules saved", and a failed save shows "Save failed:" followed by the validation error.

When the pack temperature next rises above 45 °C, a Warning alert for **Pack temperature** appears in the [Alerts Log](../Alerts.md), and it clears once the temperature falls below 42 °C.
The same rule is written out in YAML in [Complete rules.yaml example](Rules_YAML_Example.md).

A rule records its alert but runs only the actions it inherits from its rule set and groups until actions are attached to it, as described in [Actions](Actions/index.md).
A rule can also be started from a collection by right-clicking the collection in the collections editor and choosing **Create rule from collection…**, which fills in the collection as the rule's scope (refer to [Create a collection](../Collections/Create_a_Collection.md)).
