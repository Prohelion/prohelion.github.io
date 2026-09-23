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
- Keep configuration fields, parameters and code identifiers literal — don't "prettify" `serialNumber` into "Serial Number" where the text is referring to the actual field name.

### 2.6 Signs of AI-Generated Prose — Avoid These

None of these patterns appear in Prohelion's existing documentation. Treat them as tells to actively edit out of any drafted content:

- Contractions anywhere in commercial product documentation (Profinity, BMS, Motor Controllers, etc.) — this is an ArrowPoint/open-source community trait, and ArrowPoint is explicitly out of scope for commercial docs (see 2.1)
- Exclamation marks used for anything other than genuine safety emphasis
- Emoji
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
- Link to reference materials for advanced concepts
- Explain relationships between concepts in narrative form, in keeping with the long-sentence rhythm in 2.3

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
- Use descriptive link text
- Link to related documentation
- Provide context for external links
- Use relative paths for internal links

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
- Include units where applicable
- Use SI units with imperial in parentheses

## 10. Review and Maintenance

### Document Updates
- Include last updated date
- Maintain a changelog for significant changes
- Review and update links regularly
- Archive obsolete content appropriately

### Quality Checks
- Verify all links work
- Check code examples are current
- Ensure images are clear and relevant
- Validate technical accuracy

---

This style guide is a living document. Updates and improvements will be made as needed to ensure the highest quality documentation. 