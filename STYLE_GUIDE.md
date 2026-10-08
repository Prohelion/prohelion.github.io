---
title: Documentation Style Guide
---

# Prohelion Documentation Style Guide

This style guide defines the standards for all Prohelion documentation. Follow these guidelines to maintain consistency across all documentation.

## 1. Document Structure

### Front Matter
Every document must start with YAML front matter:
```yaml
---
title: Document Title
---
```

### Heading Hierarchy
- H1 (#): Main document title
- H2 (##): Major sections
- H3 (###): Subsections
- H4 (####): Minor subsections
- Avoid going deeper than H4
- Write headings and admonition titles in Title Case: capitalise the first and last word and every other word except a, an, the, and, but, or, nor, for, of, in, at, to, by, as, via and vs. Words whose case depends on the grammar of the heading (on, up, off, out, over, with, from, into, per) keep the case that reads correctly, so "Set Up InfluxDB" and "Turn On the Custom Home Dashboard" capitalise the particle while "Running V1 and V2 on One Machine" does not. Acronyms, product names, code spans and quoted software output keep their own form.

## 2. Voice and Tone

*This section is grounded in direct analysis of Prohelion's existing human-authored documentation (Profinity V1, Battery Management Systems, Motor Controllers, Solar Charge Controllers, Solar Car Racing / ArrowPoint) — not a generic style checklist. Follow it closely: the goal is documentation that reads as if a Prohelion engineer wrote it, not AI-generated copy. Section 2.6 lists the specific tells to avoid.*

### 2.1 Register by Content Area

Prohelion's docs aren't one voice — they shift with content type. Match the register to what you're writing, and default to the hardware/reference register when unsure — it's the dominant house style. The two registers below are the ones to write commercial documentation (including Profinity) in:

- **Hardware / reference** (Battery Management Systems, Motor Controllers, DBC/protocol specs): terse, third person, jargon-dense, no contractions, no exclamation marks except safety-critical emphasis. The product or system is the grammatical subject — "The BMS State Machine is responsible for engaging and disengaging the battery contactors", not "We designed the state machine to engage the contactors".
- **Software procedural** (Profinity UI instructions): more discursive. Longer sentences chain trigger → action → result in one breath: "Items can be added to your profile by right mouse clicking on the profile and selecting 'Add / New Item', at which point a panel is shown with all of the available items that can be added." Second person ("you") is used for reader actions; the product name is still often the subject ("Profinity can...", "Profinity provides...").

Two registers found in the source material are explicitly **out of scope — do not imitate either for commercial product documentation such as Profinity**:

- **Open-source / community** (ArrowPoint, Contributing guides): first-person plural ("we") and contractions show up naturally here — it reads closer to a GitHub README. "First off, thank you for..." / "if you've..." / "go ahead and make one!" This voice fits ArrowPoint because it's a community open-source project, not a Prohelion commercial offering. Profinity and the other commercial products should not borrow this casual, "we"-driven tone.
- **Marketing/landing pages** (e.g. the Solar Car Racing homepage) use superlatives and sales language ("industry-leading", "Ready to power your solar racing success?"). This is a deliberate outlier — do not imitate it for technical documentation, even on an overview/index page.

### 2.2 Person and Voice

- Third person is the default for descriptive and reference content: the system, device or document is the subject ("The BMU collates and summarises data from the CMUs...").
- Use second person ("you"/"your") specifically when addressing the reader's actions in a procedure or troubleshooting step — not as a general narrative device.
- Avoid a generic first-person-plural "we" brand voice. Prohelion mostly refers to itself in the third person, even in its own docs: "Contact Prohelion immediately if there is a discrepancy" (not "contact us"). In the source material, "we" shows up almost only in (a) ArrowPoint/open-source docs — out of scope, see 2.1 — or (b) a specific claim about Prohelion's own past engineering decisions, e.g. "Originally developed by Prohelion to manage our own products...". For commercial product documentation, keep (b) as the only acceptable use of "we" and don't extend it into a general narrating voice.
- Write in active voice by default. Passive voice is acceptable specifically for liability/consequence statements where the actor doesn't matter: "a panel is shown"; "Operating the controller beyond the limits specified... will result in the voiding of the controller warranty."

### 2.3 Sentence Rhythm

This is the most distinctive — and most commonly lost when AI rewrites prose — trait of the existing docs: **sentences run long and additive, not short and punchy.**

- Chain trigger → action → result, or condition → caveat → consequence, inside one sentence using commas and "and"/"which"/"so that", rather than breaking into several short sentences:
  > "Right mouse clicking on a line allows you to select an option to 'Send Can Message like this', clicking this option will open the Send CAN Packet window and pre-populate it with the data from the message that you have received."
- Reserve numbered steps for genuinely sequential procedures only (a firmware update, a physical assembly). Most "how-to" content is prose describing what happens when you click or select something, not a numbered checklist.
- Short fragments appear occasionally, for contrast or pacing, not as the default: "Power flow is bi-directional, so it can also perform regenerative braking... Power flow is bi-directional." is a deliberate stylistic beat, not a template to repeat everywhere.
- Don't chop long explanatory sentences into bullet fragments just to "read faster" — that's an AI-rewriting tell, and it runs directly against the house style.

### 2.4 Tone and Confidence

- State facts as settled and declarative. Avoid hedging qualifiers ("might", "should probably", "in most cases") around technical or safety-critical claims — write "could result in damage", not "may potentially cause some damage in certain situations".
- Be candid about limitations and work-in-progress features rather than smoothing them over: "For the moment, Profinity provides a DBC Viewer..."; "Prohelion's API solution is currently evolving rapidly as we develop new capabilities." This honesty is part of the voice — don't polish it into evergreen marketing language.
- Safety content escalates to blunt, short, emphatic language — capitals, short imperatives — rather than softened warnings: "Wear eye protection. Use insulated tools. Take extreme caution. Go slow." Use the admonition blocks in §3 for this, titled with a direct statement rather than a generic label — e.g. `!!! danger "Working Around Batteries is DANGEROUS"`, `!!! danger "Ensure Your Pack Is Correctly Fused"`.
- Date capability statements rather than treating them as timeless, when a feature is versioned: "As of Profinity 1.11, Prohelion has migrated to a modern container and API centric architecture."
- Boilerplate repetition across sibling pages is normal and expected, not something to "vary for freshness". Near-identical opening paragraphs recur deliberately across product generations — the D1000 Gen1 and Gen2 Warnings pages share nearly the same opening two paragraphs; the WS22 and WS200 datasheets both open "This document describes the specifications, performance and properties of the Prohelion WaveSculptor [X] Motor Controller." When documenting a family of similar products, reuse the same sentence template rather than manufacturing artificial variation between pages.

### 2.5 Terminology

- Assume a technically literate reader. Domain jargon (CAN Bus, DBC, BMU, CMU, HVIL, ASIL D, precharge, regen) is used freely, expanded once on first use if it's an acronym, then used bare — not re-explained on every page.
- Product, feature and UI element names are proper nouns and always capitalised: Profinity, Profile, Adapter, WaveSculptor200, Battery Management Unit. Reference on-screen UI labels exactly as they appear, in quotes or Title Case: `'Add / New Item'`, the "Engage Contactors" button.
- Version numbers use three forms, and only these:
  - In sentences and headings, write the product and the number with no letter: Profinity 2.3, Profinity 2.2, "As of Profinity 1.11". If the product name is already in the sentence, "version 2.3" is fine. Do not write V2.3 or v2.3 in prose.
  - On a button, a git tag, or a quoted installer banner, use a lowercase v: "Download Profinity v2.2", `v2.3.10.0`.
  - **Profinity V2**, capital V and no minor number, is the product generation. "Security (V2 Only)" and "Profinity V2 installed" stay in that form.
  - Leave paths, document keys, and other products as they are. Folder names such as `Profinity_Version_2.3`, YAML stamps such as `version: "2.3"`, API paths such as `/api/v2`, and third-party names such as InfluxDB v2 are not Profinity release names. Quote software output literally.
- Expand an acronym in full on its first use on every page, for example "Message Queuing Telemetry Transport (MQTT)", because readers arrive on a page from search; later uses on the same page are bare. Universal terms (API, CAN, URL, YAML, JSON, HTTP, HTTPS, UI, CSV, PDF, ID) are not expanded.
- Write on-screen UI labels (buttons, tabs, menu items and field names) in **bold**, exactly as they appear, without quotation marks. Reserve backticks for values the reader types, file names, paths, YAML keys and code identifiers.
- Keep configuration fields, parameters and code identifiers literal — don't "prettify" `serialNumber` into "Serial Number" where the text is referring to the actual field name.

### 2.6 Signs of AI-Generated Prose — Avoid These

None of these patterns appear in Prohelion's existing documentation. Treat them as tells to actively edit out of any drafted content:

- Contractions anywhere in commercial product documentation (Profinity, BMS, Motor Controllers, etc.) — this is an ArrowPoint/open-source community trait, and ArrowPoint is explicitly out of scope for commercial docs (see 2.1)
- Exclamation marks used for anything other than genuine safety emphasis
- Emoji
- Em dashes: none of Prohelion's human-authored documentation uses them, so use a comma, colon or full stop, or restructure the sentence, and use "to" for ranges. Quoted software output and literal UI labels that contain a dash are left as they are
- Marketing adjectives and superlatives — "powerful", "seamless", "cutting-edge", "industry-leading", "comprehensive suite"
- Stock AI openers and filler — "In today's fast-paced world...", "Let's dive in...", "Great question!", "It's worth noting that...", "In conclusion..."
- Rhetorical questions as section openers
- Hedging around facts that should be stated plainly
- Chopping naturally long, additive sentences into short bullet fragments purely for "scannability"
- Re-defining jargon a technical reader would already know
- Negative-parallelism constructions ("It's not just X, it's Y")
- A generic first-person-plural brand voice ("we" as narrator) — this belongs to ArrowPoint's open-source register only, which is out of scope for commercial docs (see 2.1)

This section was built from a mix of direct source review and automated page-fetch summaries. Formatting claims in particular are worth spot-checking against the live `.md` source before treating them as absolute — direct review of the BMS `Warnings.md` and `Precharge.md` source, for example, confirmed `!!! danger` / `!!! info` / `!!! tip` admonitions **are** used in that section, contrary to one research pass's read of the rendered page.

### 2.7 Technical Level
- Assume technical competence but don't assume expertise
- Define specialised terms on first use, briefly and in-line — not as a separate glossary entry
- Link to reference materials for advanced concepts, and link the first mention of any concept that has its own page (see Links and Cross-References)
- Explain relationships between concepts in narrative form, in keeping with the long-sentence rhythm in 2.3

### 2.8 Write for the User, Not the Builder

Published documentation is read by people who use Profinity, not by people who built it. The reader has the product in front of them and nothing else: no access to the source code, internal plans, task lists, review findings, ticket numbers or the history of how a feature was designed. Every page must make sense to that reader alone.

- Describe what the user sees and does: which screen to open, what a setting controls, what happens when they change it, and what to expect afterwards. Start from the user's goal, not from how the feature is implemented.
- Do not reference class names, method names, file paths in the source repository, database tables, internal service names or architecture layers unless the reader must type or select that exact thing. Where a name is visible in the product (a menu item, a field, a file the user edits, an API route the user calls), use it exactly as it appears; where it is not, describe the behaviour instead.
- Do not explain why the code is structured the way it is. Design rationale, refactoring history, "previously this was..." and "this was changed because..." belong in release notes or engineering records, not in the user guide. State the current behaviour as settled fact, dated to a version where it matters (see 2.4).
- Do not point to internal artefacts: plan files, `tasks/` documents, review or finding IDs, branch names, pull requests, internal ticket numbers. If a limitation or upcoming change matters to the reader, state it in plain terms ("For the moment, Profinity does not...") without citing where it was tracked.
- Do not use internal shorthand or codenames the reader has never been shown. If a term is not in the product UI, the public documentation or the glossary, define it in place or replace it with plain words.
- Prefer a worked example in user terms ("To alert when pack temperature exceeds 45 °C, open Alerts and...") over a description of the underlying mechanism. Include mechanism only when it changes what the user should do, such as a timing, ordering or limit that affects their configuration, and then explain it in one or two plain sentences.
- Cover failure from the user's side: the message or symptom they will see, the likely cause in their setup, and the action that fixes it. Do not describe which internal component raised the error.

Test every page before publishing by asking whether a new customer, with only the product and these docs, could follow it end to end. If any sentence only makes sense to someone who has read the code or the plan, rewrite it in terms of what the user sees and does, or delete it. This applies equally to hand-written and AI-drafted pages; drafts generated from code or planning documents are especially prone to carrying internal wording across.

## 3. Content Elements

### Images and Diagrams
```markdown
<figure markdown>
![Alt Text](path/to/image.png)
<figcaption>Descriptive Caption</figcaption>
</figure>
```

### Admonitions
Use for important information:
```markdown
!!! danger "Danger"
    Critical safety information

!!! warning "Warning"
    Important caution information

!!! info
    Additional helpful information

!!! tip
    Helpful suggestions and best practices
```

## 4. Code and Technical Elements

### Code Formatting
- Use inline backticks (`) for:
  - File names
  - Directory paths
  - Command names
  - Parameter names
  - Variable names
  - Short code snippets

### Code Blocks
- Use triple backticks with language specification
- Include comments for complex code
- Provide context when necessary
```python
# Example code block
def example_function():
    return "Hello, World!"
```

## 5. Lists and Procedures

### Bulleted Lists
- Use sparingly and only for:
  - Feature lists
  - Quick reference materials
  - Non-sequential items
- Keep items parallel in structure
- End each item with appropriate punctuation

### Numbered Lists
- Use for sequential procedures
- Start with action verbs
- Be specific and clear
- Include prerequisites before instructions

## 6. Technical References

### Links and Cross-References
- Use descriptive link text: link the words that name the thing being linked to, never "click here" or "this page"
- Provide context for external links
- Use relative paths to the `.md` file for internal links, for example `[Derived Tags](../Tags/Derived_Tags.md)`, so MkDocs can check them at build time

#### Linking Concepts in Prose
When a sentence mentions a Profinity concept, component or feature that has its own page, link the first mention to that page, so a reader who does not know the term can follow it without searching. This applies to features and UI areas (Profiles, Derived Tags, Historians, the Visual Editor, Kiosk Mode), component and script types, administration topics (Roles and Permissions, Licensing) and the how-to guides that put a reference page into practice.

- Link the first mention on a page, using the words already in the sentence. Link again only where a long page returns to the concept in a distant section, and never repeat the same link within a paragraph.
- Do not link in headings, admonition titles, code spans or code blocks, image alt text or table header rows, and never link a page to itself. Where a heading names a concept, link it in the first sentence beneath.
- Link where the reader benefits from the destination: a definition, a procedure or a reference they would otherwise have to find. Skip generic words ("tag" in a sentence about something else, "profile" used loosely) and terms the page is itself explaining.
- Reference and concept pages should point to the how-to that applies them, and how-to guides should point back to the reference pages for each concept they use. Where one guide naturally follows another, say so with a link.
- Keep link density readable: as a guide, a handful of links per page, not several per sentence. If a paragraph is mostly blue, keep only the links the reader is most likely to need.
- Do not reword a sentence to fit a link. If the link text does not read naturally in place, leave the word unlinked.
- Link to the page for the version being documented. Pages under `Profinity_Version_2.3` link to other `Profinity_Version_2.3` pages, never to earlier versions, unless the sentence is about that earlier version.

### Citations
- Cite sources when referencing external material
- Include version numbers where applicable
- Link to official documentation when available

## 7. Safety and Warning Information

### Safety Notices
- Place safety warnings prominently at the start of relevant sections
- Use appropriate admonition levels
- Clearly state risks and consequences
- Include preventive measures

### Warning Hierarchy
1. DANGER: Life-threatening risks
2. WARNING: Potential for injury or serious damage
3. CAUTION: Potential for minor damage
4. NOTICE: Important information not related to physical harm

## 8. File Organization

### File Naming
- Use clear, descriptive names
- Separate words with underscores
- Use lowercase letters
- Include category prefixes when helpful

### Directory Structure
- Group related documents in directories
- Use clear directory names
- Maintain a logical hierarchy
- Include index.md files in each directory

## 9. Formatting Conventions

### Text Formatting
- Bold (**) for emphasis
- Italic (*) for new terms
- Code blocks for commands and code
- Tables for structured data

### Numbers and Units
- Spell out numbers under 10
- Use numerals for 10 and above
- Version numbers always use numerals, including versions under 10 (Profinity 2.3). See Terminology for when to add a v.
- Include units where applicable
- Use SI units with imperial in parentheses

## 10. Review and Maintenance

### Document Updates
- Include last updated date
- Maintain a changelog for significant changes
- Review and update links regularly
- Archive obsolete content appropriately

### Quality Checks
- Verify all links work, and that the first mention of each concept that has its own page is linked (see Links and Cross-References)
- Check code examples are current
- Ensure images are clear and relevant
- Validate technical accuracy
- Confirm the page reads as a user guide: no source-code names, internal plan or ticket references, or design-history commentary (see 2.8)

---

This style guide is a living document. Updates and improvements will be made as needed to ensure the highest quality documentation. 