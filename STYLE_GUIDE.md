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

### Writing Style
- Use professional but accessible language
- Write in active voice
- Use second person ("you") for instructions
- Use first person plural ("we") for recommendations
- Contractions are acceptable for readability
- Be direct and concise

### Technical Level
- Assume technical competence but don't assume expertise
- Define specialized terms on first use
- Link to reference materials for advanced concepts

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
- Use for features, characteristics, and non-sequential items
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