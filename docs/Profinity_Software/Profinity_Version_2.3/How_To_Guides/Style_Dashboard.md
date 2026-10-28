---
title: How to style your dashboard
description: "Add a profile.css stylesheet to a profile and apply its classes to dashboard groups and readouts for branding and visual customisation."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to style your dashboard

Apply custom CSS styling to your dashboard elements for branding and visual customisation.
The web interface loads one stylesheet from the profile, `profile.css`, so a first style needs that one file.

Before you start, you need:

- Profinity running.
- A dashboard to style.
- Basic CSS knowledge.
- Access to the `styles` folder of the [profile](../Getting_Started/Profiles.md) directory, which is `<artefacts directory>/profiles/<profile name>/styles` inside the [artefacts directory](../Installation/Artifacts_Directory.md#default-locations).
  On Docker, create the file in the mounted volume that holds the artefacts directory.

The folder is named `styles` in lowercase on disk, and `/Profile/Styles` is only its URL path (refer to [Store dashboard files in a profile](../Customising_Profinity/Dashboards/Store_Dashboard_Files.md)).

## Create the stylesheet

1. Create the `styles` folder in the profile directory if it does not exist.
2. Create a file named `profile.css` in the `styles` folder, and add the rules for your dashboard:

    ```css
    .custom-panel {
        background-color: #f0f0f0;
        border: 2px solid #007bff;
        border-radius: 8px;
        padding: 1rem;
    }

    .custom-readout {
        font-size: 1.2em;
        color: #333;
        font-weight: bold;
    }
    ```

## Split the styles across files

You can keep a large set of styles in further files in the same folder, for example `custom-dashboard.css`.
`profile.css` loads them with a CSS `@import` rule.
The web interface loads only `profile.css`.
The HTML sanitiser, which cleans HTML content before Profinity displays it, removes `link` elements from the `content` of an [HTML component](../Customising_Profinity/Dashboards/Component_Reference/Content/HTML.md).
A dashboard therefore cannot link a stylesheet, so import it from `profile.css`:

```css
/* /Profile/Styles/profile.css */
@import url("custom-dashboard.css");
```

## Apply the classes

Use the `class` property on a `group` or `readouts` element in a dashboard.
The web interface does not use a `class` on an individual `readout` item.
Put the class that styles the readouts on the `readouts` element that holds them (refer to [Readouts component](../Customising_Profinity/Dashboards/Component_Reference/Data/Readouts.md)).
The [Component reference](../Customising_Profinity/Dashboards/Component_Reference/index.md) lists which other components accept `class`.

```yaml
- group:
    class: "custom-panel"
    items:
      - readouts:
          class: "custom-readout"
          items:
            - readout:
                label: "Temperature"
```

## Check the styling

Save the dashboard, close the editor, and reload the page.
The web interface loads `profile.css` when the page opens.

If a class has no effect, check these causes:

- The stylesheet is not named `profile.css`, or `profile.css` does not import it.
- The class name in the dashboard differs from the CSS in spelling or case.
- The class is on an element that does not use it, such as a `readout` item.

Correct the file or the dashboard, and reload the page.

For more, refer to [Conditional styling](../Customising_Profinity/Dashboards/Data_Binding/Conditional_Styling.md), which styles elements from data values.
