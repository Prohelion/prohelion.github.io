# Wave 2 review RA1 (Administration, part 1)

Linter: all 14 pages, 0 errors, 0 warnings, 1 note (FutureTense). No inbound link anchors broken (Kiosk_Mode `#choosing-the-kiosk-user` and `#troubleshooting` still resolve; no other inbound anchors to changed headings found).

## Image check (every referenced image opened)

| Page | Image | Alt text now | Verdict |
|---|---|---|---|
| Profiles.md | profiles_menu.png | "The ADMIN page with the Profile pill selected, listing the profiles" | WRONG. The image shows a page headed "PROFINITY PROFILES". No ADMIN heading and no pills are visible. It shows ADD PROFILE, an Upload Profile Pack drop zone, a search box, and a table (Name, Description, Version) of five profiles with ACTIVATE, download and delete icons, and one row marked ACTIVE. Suggested: "Profinity Profiles page with an Add Profile button, an Upload Profile Pack area, and a table of profiles with Activate, download, and delete actions". |
| Feedback.md | feedback.png | "Feedback form with name, email and description fields" | Mostly right, but the third field is labelled "Feedback", not "description". Suggested: "name, email and feedback fields and a Send button". Alt was not changed by the writer. |
| Logs_Config.md | system_logs.png | "...listing entries with timestamp, level and message" | OK. The image also shows a search box and a level filter list (Debug, Error, Fatal, Info, Trace, Warn). |
| Menu_Layout.md | 2.3-profile-menu-layout-editor.png | "...showing the menu structure tree and the inspector for a group" | OK (MPPTs group selected, Name and Appearance shown). |
| Menu_Layout.md | 2.3-component-menu-placement.png | "...with a component being dragged between groups" | UNVERIFIABLE and probably wrong. The dragged item is Prohelion 12v, and the drop line sits beneath Prohelion BMU, apparently still inside the Battery Management Systems group. It shows a reposition, not clearly a move between groups. Suggested: "with the Prohelion 12v component being dragged to a new position in the menu structure". |
| System_Info.md | system_info.png | "...showing version, active memory, diagnostics and release history" | OK. |
| Application_Config.md | app_configuration.png | "Profinity System Configuration" | Unchanged, vague but not wrong. Low: could say "Application Config tab showing update server, update interval, retained packets, tag history window and Enable Scripting". |
| Extensions_Web.md | extensions_web.png | "...showing the web server options" | OK. |
| Logging.md | logging_config.png | "...showing log level, rollover size and retained logs" | OK. |

Captions were not changed, so no caption problems.

## Specific questions

2. Logging `Info` "etc." dropped. Original: "E.g., when changing states, connecting to the web API, etc." New: "For example, when changing states or connecting to the web API." The change is a minor meaning shift. The original marked the examples as open-ended, and the new text still reads as examples ("For example"), so it is acceptable. The new text is a sentence fragment inside a table cell. Low: either restore "and so on" or leave. Verdict on this item: not a fact loss.

3. Profiles folders. Confirmed `Profile.css` to `profile.css` and "three" to "four folders: images, models, styles and content". Two further changes were made:
   - "Three of them serve dashboard assets" is NOT in the original, and it is probably wrong. The original said the three named folders serve dashboard assets. Customising_Profinity/Dashboards/Profile_Directories.md says the four folders hold images, 3D models, stylesheets and content files that dashboard YAML references, so `models` is also a dashboard asset folder. Medium-high (a claim the original does not support). Suggested: "Each profile directory has four folders: `images`, `models`, `styles` and `content`." Then the table, with `models` either omitted or described only as the writer can verify.
   - The three folders were turned into a table and the example `image: "my-icon.svg"` was moved to a separate sentence with `profile.css`. Content is preserved. Low: the new example sentence "a stylesheet as `profile.css`" is only an example, fine.
   - Dropped: the `(#profiles)` self-link on "profile" in Profile packs. Low.

4. Feedback.md. No procedure invented. The only action line is "To open the form, select ADMIN in the side menu, and select the Feedback pill", which is the original's access text condensed. The original has no submit step, and none was added. The `reference` type is arguable (it still has one short open-the-form step, so `task` or `concept` could fit), but it is acceptable. PASS.

5. System_Configuration tables and restart notes. Diffed table and admonition lines against HEAD.
   - Settings tables unchanged on Application_Config, Discovery, Extensions_Web and Tags (byte identical). The em dash in `Recent tag history — local window (minutes)` was left alone.
   - Logging: only the `Fatal` row trailing whitespace and the `Info` row change above.
   - "Saving restarts Profinity" admonition: wording intact on all pages. Only title case, line breaks and "See" to "Refer to" changed. The index admonition keeps the 2-second check, the 60-second limit and the interrupted sessions, and gains two links.
   - index.md Security row: "sessions and lockout" became "sessions, and lockout". That splits one item ("sessions and lockout") into two and reads oddly. Low: revert to "sessions and lockout".
   - Logging: the "Log Levels Are Persistent" info box became a plain sentence. Fact kept. Low only.
   - Application_Config: one opening sentence added ("holds packet retention, update checks, the recent tag history window and scripting"). It restates the description and is supported by the page. Low.
   - Description claims checked against page content: Discovery (name, UDP port, interval), Tags (points per tag, total, TTL) and Extensions_Web (ports, API, Swagger) are all supported.

6. Kiosk_Mode warning. Full force kept. Wording is the same: "Anyone who can reach a kiosk display, or the Profinity web address of a kiosk profile, acts as the kiosk user with every permission that user holds... choose a dedicated user with the minimum permissions required", still an admonition at the top, with the link. The "Choosing the kiosk user" section (never an administrator, no high-risk permissions, read-only role) is unchanged in substance. The Profiles.md copy of the warning also keeps full force.

## Per page

### Components_and_Plugins.md: FIX (medium)
1. Medium, "Installing a plugin". Original: "enable the plugin once it is listed, which also needs the Custom Plugins licensed feature". The writer resolved the ambiguity into "Installing a plugin also needs the Custom Plugins licensed feature" and moved it ahead of the steps as a prerequisite. This is an interpretation, not stated in the original. Suggested: keep the original attachment to the enable step, for example in step 3 "Enable the plugin once it is listed, which also needs the Custom Plugins licensed feature". Keep the Questions entry open.
2. Low. The ADMIN > Components & Plugins pill navigation now exists only in install step 1. The catalogue section no longer has it. Acceptable, but consider one sentence in the intro.
3. Low. "Not licensed" meaning: the original said "See Licensing". The new text says "Licensing lists what each edition includes", a mild addition. Suggested: "Refer to Licensing."
4. Low. Install steps: only original actions, in original order. No invented steps. Related list folded into text, all four links kept. The permissions sentence is intact.
Type `task`: acceptable (install procedure plus catalogue reference).

### Feedback.md: PASS
Only the alt-text note above (low).

### Kiosk_Mode.md: PASS
Enable steps now 5 (the navigation clause split into steps 1 and 2); the original order is preserved. Added sentence "The Kiosk Mode User must be an enabled user" is supported by the original. Troubleshooting bullets kept, bold lead-ins converted to "If ... " sentences, no loss. Related list removed, all three links already in the text.

### Logs_Config.md: PASS
No loss. Description is specific and accurate.

### Menu_Layout.md: FIX (low)
1. Low. The component placement alt text is unverifiable and probably wrong (see above).
2. Low. The "Limitations" content now sits in the intro: "Only this top section can be customised... fixed and cannot be rearranged, and its entries appear according to the user's permissions and in a fixed order". Content preserved, slightly redundant with the old first sentence.

### Profile_Dashboard.md: PASS
All facts kept. The removal warning still precedes the removal instruction and keeps the file-deletion consequence and the log note. The "Dashboard Location" info box became a plain sentence with no loss. The step reference was correctly updated from step 1 to step 2 after the navigation clause became step 1. Heading-case false positives are legitimate.

### Profiles.md: FIX (medium to high)
1. Medium-high. "Three of them serve dashboard assets": an unsupported claim, probably wrong (see question 3). Fix as above.
2. Low. Alt text for profiles_menu.png is wrong (see the table).
3. Low. The active-profile rename warning was demoted from an admonition to prose. Consequence kept, as the writer states. It is a procedural caution rather than data loss, so acceptable.
4. Low. The kiosk warning stays an admonition at full strength. Good.
5. Low. Type `task` with several concept sections (Profile packs, Profile files). Acceptable, but the page still mixes jobs.
6. Facts F2 otherwise applied exactly: four folders and lowercase `profile.css`. The table paths and the `/Profile/Images/`, `/Profile/Styles/`, `/Profile/Content/` values are unchanged.

### System_Info.md: PASS
The restart confirmation text is split across two lines inside a quote, but it renders as one string. No loss.

### System_Configuration/index.md: PASS
One low item (Security row comma, see above). The restart warning is intact.

### Application_Config.md: PASS
### Discovery.md: PASS
### Extensions_Web.md: PASS
### Logging.md: PASS (low: the `Info` row fragment)
### Tags.md: PASS

## Diagrams
None added, none required.

## Overall summary
Writing quality is good and the lint is clean. No procedure, step, permission or check was invented in Feedback, Kiosk_Mode or Components_and_Plugins, with one interpretive wording choice on Custom Plugins. The Kiosk warning and all restart warnings kept full force. The settings tables are unchanged. Main problems: one wrong image alt text and one unsupported folder claim in Profiles.md, one unverifiable alt text in Menu_Layout.md.

## High severity findings
1. Profiles.md: "Three of them serve dashboard assets" is not supported by the original and conflicts with Customising_Profinity/Dashboards/Profile_Directories.md, where `models` holds dashboard 3D models. (Rated medium-high; it is an invented fact.)
2. Profiles.md: alt text for profiles_menu.png describes an ADMIN page and Profile pill that the image does not show.

## Medium
- Components_and_Plugins.md: the Custom Plugins licence requirement was reattached to "installing" instead of the enable step the original named.
