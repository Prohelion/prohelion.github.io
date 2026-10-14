# Review of wave 2 group G (Getting_Started and Release_Notes)

Lint: `node scripts/lint-docs.js` on all 8 pages gives 0 errors, 0 warnings (12 info notes). On the whole 2.3 folder there are no Links errors. The one error and ten warnings are on four other pages (Component_And_Collection_Security, DBC, Configure_Data_Logging, Connect_to_CAN_Bus), outside this group.

## Getting_Started/Quick_Start.md: FIX

1. (medium) Removed Docker pointer. The original tip said "For Docker deployments, see the Docker Installation Guide". The new page has only the Linux/macOS link (line 12). Zip_Installation.md line 12 links Docker_Installation.md, so the target is reachable in two hops, but Quick_Start no longer links it. Step 2 still mentions "Docker, Linux services", so the page still assumes Docker exists. Suggest restoring the Docker link in the intro sentence.
2. (medium) Removed fact check against Zip_Installation.md and Docker_Installation.md. Both state `admin` / `password` and the new password required at first sign-in (Zip lines 176-177, Docker lines 104-105), and both link the Security guide. Neither states the rationale "so that the system is not left running with publicly documented credentials". That rationale is now only in Quick_Start, scoped to "If you sign in as the default `admin` user". The original warning applied to Docker and Linux installs. The Linux/Docker pages do not carry the warning, but the app forces the change, so no hard fact is lost. The Change My Password path is in Password_Policy.md line 48, so it is not unique to Quick_Start.
3. Verified unchanged from the original: the Windows Server licence sentence (admin / `password`, new password at first sign-in), the warning text and the **ADMIN** then **Change My Password** path, "A signed-in `admin` user holds both", Step 2 licence steps (including "check that State reads Valid", which is in the original), the permission sentences, and all list items and links. No step, check, permission or result was added. Step order is unchanged. Wording changes only: Click to Select, "Start Menu" to "Start menu", "see" to "refer to", and link-text suffixes.
4. (low) Windows-only reading. The page now reads as one Windows route (Start menu, built-in account sign-in, Windows Server licence), and the Linux/macOS pointer sits in the intro. Step 2 ("other installations start a 14-day local trial") and Step 6 ("A signed-in `admin` user holds both") still read as general. This is original text, but Step 6 is wrong for a Desktop host without a Server licence (writer question 4). Leave it for the product owner.
5. (low) Roles sentence confirmed. The original has no user-creation step and no roles text (grep "role" finds none). The sentence at line 152 is new and sits after the Create a user bullet. `#choose-roles` exists in Create_User.md, and the section does explain what access each person needs. It is an addition, not an invented fact. It sits as a stray paragraph after the list, not inside a bullet.
6. (low) "Read an Existing Rule" tip. Reworded as "To find what would make a rule fire, note the condition it uses, then find the tag it watches in Tag Explorer". The meaning is kept. The original opened with "Open a rule in the editor", which line 118 now covers.

## Getting_Started/Profiles.md: FIX

1. (medium) Diagram. Nodes and arrows (Profile to Components, Dashboards, Settings) are each supported by "Each profile keeps its own set of components, dashboards, and settings". But the sentence is repeated in the caption and the diagram adds nothing the sentence does not say. Suggest dropping the diagram, or keep it only if the lead wants one. The original attached the sentence to "Add profile creates a new profile, which keeps its own set...". It is now generalised to every profile. That is a small meaning shift, and the sentence is also less clearly sourced.
2. (low) The "More Information" heading was removed. The remaining link sentence is fine. No incoming links to that anchor.
3. No dropped facts (word diff clean apart from moved text and alt text). Page type concept is right.

## Getting_Started/Adding_New_Components.md: FIX

1. (medium) Page typing. `type: task` but the page now holds three jobs: add steps, a status colour reference table with troubleshooting, and removal. Consider concept/task split or accept as task with the table as a reference section.
2. (medium) Numbered steps come only from the original (button, page, select component, prompts for properties; removal: open settings, select delete). No invented steps. Step 1 mixes description (page layout, auto-discovery) into the step. Step 2 omits the dialog's **ADD COMPONENT** button, which the screenshot shows, but the original never states it. No step was added; list it as a gap for Questions.
3. (low) Original "Selecting a component prompts for the necessary configuration properties" lost the word "necessary". Original "selecting a component on that page adds it" is now "Select the component", then "Profinity prompts for the configuration properties". The "adds it" claim is gone, and the original is itself ambiguous. Acceptable.
4. (low) The "Duplicate Component Names" admonition is now four plain sentences after the sidebar paragraph, with no heading and no emphasis. The consequence ("Profinity refuses the component otherwise") is kept.
5. All other facts present. Alt text checked against the real images and is accurate. Anchors are kept (`#removing-components-from-your-profile`, H1 slug).

## Getting_Started/Profinity_Log.md: PASS

1. (low) The "Expanding Log Lines" tip is now a plain sentence, and "click on" became "select". Fine. `type: reference` is a loose fit for a short how-to-open page, and a concept or task type might suit it better. Alt text checked against the real image and is accurate.

## Getting_Started/Visualising_Data.md: PASS

1. No dropped facts. Content is identical apart from sentence splitting. Alt text changed to "showing live data widgets", which I did not verify against wavesculptor.png (low). Type concept is fine.

## Release_Notes/index.md: PASS

1. (low) Description reworded. The "key features" detail is replaced by "new features, breaking changes, upgrade information and known issues". The "## Releases" heading is removed and the bold entries are plain links. The content is the same. Link text now reads "Profinity 2.3 release notes" for a file named 2.3.1.md. Acceptable.

## Release_Notes/2.2.5.md: PASS

1. Word-level diff (case and punctuation normalised): the only content difference is the link that was `[Upgrading From 2.2](2.3.1.md#upgrading-from-22)` and is now `[Upgrade from Profinity 2.2](../Installation/Upgrade_From_2_2.md)`. That is what the 2.3.1 section itself pointed to. It is justified, and Upgrade_From_2_2.md exists. Also added: "release notes" in the title, and metadata. No other facts changed. The `#upgrading-from-22` section remains in 2.3.1 for any other links.

## Release_Notes/2.3.1.md: PASS (two low notes)

1. Word-level diff against HEAD (lowercased, commas stripped): the only differences are the H1 and title ("2.3.1" to "2.3 release notes"), the description (dropped "publishers and subscribers", "how to upgrade" to "upgrading"), and the added front matter fields. No body sentence was removed. Serial commas and heading case are the only other changes. "No text removed" is confirmed.
2. Heading slugs: 28 headings before and after. After removing `{#...}` and lowercasing, 27 of 28 slugs are identical, and capitalisation changes do not change slugs. The one change is H1 `profinity-231` to `profinity-23-release-notes`. grep finds no link to `#profinity-231` anywhere under docs. The anchors other pages use (`#breaking-changes`, `#rest-api-errors`, `#bacnet-device-instance`) all resolve, and the linter reports no Links errors.
3. (low) The file is still 2.3.1.md and Release_Notes/.pages lists it by that name, which is fine because the release notes page may use 2.3.1.
4. (low) The description drops the "publishers and subscribers" feature, which the index page still lists.

## Overall summary

- The Quick_Start Linux, macOS and Docker removals mostly live in Zip_Installation.md and Docker_Installation.md. The Docker link was dropped from Quick_Start, and the "publicly documented credentials" rationale for Docker/Linux is nowhere in those install pages (the first sign-in change is forced there anyway).
- No invented steps, checks or permissions were found. The roles sentence is a new pointer, not a fact claim.
- Release_Notes/2.3.1.md is verified: no body text removed, all 27 non-H1 slugs unchanged, H1 slug change unlinked.
- The Profiles diagram is supported by the page but redundant. Adding_New_Components mixes three jobs under `task`.
- The writer's questions 1 and 2 are unchanged sentences from the original. The Change My Password path is also in Password_Policy.md line 48.

## High severity findings

None.

## Heading case false positives

None reported by the linter now.
