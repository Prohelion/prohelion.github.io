---
title: Core Elements
description: "The elements a dashboard holds at its top level (titlebar, row, accordion, footer), how items nest, and how rows lay out their contents."
---

# Core Elements

A dashboard is a vertical list of full-width elements, and each element at the top level is a titlebar, a row, an accordion or a footer. Anything else, such as a group, a panel or a readout, sits inside one of these. This page describes the four top-level elements, the `items` property that nests elements, and the layout direction of rows, and the complete [Full Example](./Full_Example.md) shows them all in one dashboard.

## The Four Top-Level Elements

The `items` list of `dashboard:` accepts only these four elements, and the order of the list is the order on screen.

A [titlebar](./Component_Reference/Layout/Titlebar.md) is the header of the dashboard, which typically holds status lamps, navigation menus and the component name, so it gives the dashboard its context and navigation.

<figure markdown>
![Titlebar with a green status lamp and the component name on the left and three icon buttons on the right](images/titlebar.png)
<figcaption>Dashboard titlebar</figcaption>
</figure>

A [row](./Component_Reference/Layout/Row.md) is a layout container that holds components or groups and arranges them horizontally or vertically, so rows divide the dashboard into logical sections.

<figure markdown>
![A row holding a grid of status lamps titled Battery Events beside a state diagram titled Battery State](images/row.png)
<figcaption>Row layout container</figcaption>
</figure>

An [accordion](./Component_Reference/Layout/Accordion.md) is a collapsible section that suits detailed information, settings or secondary data that users open only when they need it, and it keeps the main dashboard focused on key information.

<figure markdown>
![Collapsed accordion header reading MORE DETAILS with a downward arrow](images/accordion.png)
<figcaption>Accordion header</figcaption>
</figure>

A [footer](./Component_Reference/Layout/Footer.md) is a bar at the bottom of the dashboard that the web interface can show or hide through a binding on its `visible` target. A menu added to the footer is not displayed, so the footer is not a place for navigation. Use a footer when the dashboard needs a bar that appears only under some conditions, and use the titlebar menu or an [Action](./Component_Reference/Interactive/Actions.md) component for navigation and actions.

<figure markdown>
![Empty footer bar at the bottom of a dashboard](images/footer.png)
<figcaption>Dashboard footer bar</figcaption>
</figure>

## Nesting With `items`

The `items` property is an array that holds the child elements of a container, and it appears at almost every level of a dashboard: in `dashboard`, `row`, `group`, `panel`, `accordion`, and in containers such as `pill`, `lamps`, `readouts` and `tabs`. It is always an array, written with `-` list syntax even for one element, and the order of the array is the order on screen. A row holds groups and components, a group organises related components, a panel is a titled container, and the HTML and Image components display custom content.

```yaml
dashboard:
  items:                    # Top-level items
    - row:
        items:              # Items within the row
          - group:
              items:        # Items within the group
                - readouts:
                    items:  # Items within the readouts container
                      - readout:
                          label: "Temperature"
                          value: 25.5
```

A larger dashboard nests in the same way:

```text
Dashboard
├── Titlebar
├── Row (vertical)
│   ├── Group
│   │   ├── Component 1 (Readouts)
│   │   ├── Component 2 (Chart)
│   │   └── Component 3 (HTML)
│   └── Group
│       └── Component 4 (Image)
├── Accordion
│   └── Row
│       └── Components
└── Footer
```

!!! info "Dashboard Assets Live in the Profile Directories"
    Images, stylesheets and HTML templates for a dashboard are stored in the profile directories, which are named `images`, `styles` and `content` on disk and served from `/Profile/Images`, `/Profile/Styles` and `/Profile/Content`. See [Profile Directories](./Profile_Directories.md).

## Layout Directions

A row stacks its components vertically by default and arranges them side by side when `direction: horizontal` is set, and a group behaves the same way, so both layouts can be mixed within one dashboard.

```yaml
dashboard:
  items:
    - row:
        direction: horizontal
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 25.5
          - readouts:
              items:
                - readout:
                    label: "Pressure"
                    value: 1013
```

## Where Next

The complete motor controller dashboard for a Prohelion WaveSculptor22, which uses rows, groups, panels, an accordion and a tab, is listed and analysed in [Full Example](./Full_Example.md). [Data Binding](./Data_Binding.md) shows how components take their values from tags, and [Component Reference](./Component_Reference/index.md) describes every component.
