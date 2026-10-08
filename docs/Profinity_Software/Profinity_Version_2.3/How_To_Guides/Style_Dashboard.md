---
title: How to Style Your Dashboard
description: "Apply custom CSS styling to Profinity dashboard elements for branding and visual customisation."
---

# How to Style Your Dashboard

Apply custom CSS styling to your dashboard elements for branding and visual customisation. The web interface loads one stylesheet from the profile, `profile.css`, so a first style needs that one file.

## Prerequisites

- Profinity V2 installed
- A dashboard to style
- Basic CSS knowledge
- Access to the `styles` folder of the [profile](../Getting_Started/Profiles.md) directory, which is `<artefacts directory>/profiles/<profile name>/styles`

The [artefacts directory](../Installation/Artifacts_Directory.md) is `%LOCALAPPDATA%\Prohelion\Profinity` on Windows, `~/.local/share/Prohelion/Profinity` on macOS and `/var/lib/prohelion/profinity` on Linux, and on Docker it is the path inside the container named by `PROFINITY_HOME`, so on Docker the file must be created in the mounted volume that holds that directory. The folder is named `styles` in lowercase on disk, and `/Profile/Styles` is only its URL path (see [Profile Directories](../Customising_Profinity/Dashboards/Profile_Directories.md)).

## Create the Stylesheet

Create the `styles` folder in the profile directory if it does not exist, then create a file named `profile.css` in it and add the rules for your dashboard:

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

## Split the Styles Across Files

A large set of styles can be kept in further files in the same folder, for example `custom-dashboard.css`, which `profile.css` loads with a CSS `@import` rule. The web interface loads only `profile.css`, and the HTML sanitiser removes `link` elements from the `content` of an [HTML](../Customising_Profinity/Dashboards/Component_Reference/Interactive/HTML.md) component, so a stylesheet cannot be linked from the dashboard and must be imported from `profile.css`:

```css
/* /Profile/Styles/profile.css */
@import url("custom-dashboard.css");
```

## Apply the Classes

Use the `class` property on a `group` or `readouts` element in a dashboard. A `class` on an individual `readout` item is not used by the web interface, so the class that styles the readouts goes on the `readouts` element that holds them (see [Readouts](../Customising_Profinity/Dashboards/Component_Reference/Data/Readouts.md)). Other [components](../Customising_Profinity/Dashboards/Component_Reference/index.md) list which of them accept `class`.

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

## Check the Styling

Save the dashboard, close the editor and reload the page, because the web interface loads `profile.css` when the page opens. If a class has no effect, the stylesheet is not named `profile.css` or is not imported from it, or the class name in the dashboard differs from the CSS in spelling or case, or the class is on an element that does not use it, such as a `readout` item. Correct the file or the dashboard and reload the page.

## Related Documentation

- [Profile Directories](../Customising_Profinity/Dashboards/Profile_Directories.md) - the full profile directories reference
- [HTML Component](../Customising_Profinity/Dashboards/Component_Reference/Interactive/HTML.md) - HTML component reference
- [Conditional Styling](../Customising_Profinity/Dashboards/Conditional_Styling.md) - styling driven by data values
