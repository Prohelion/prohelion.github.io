---
title: Install AI Skills
description: Install the Profinity AI Skills pack into Claude Code, Cursor, or Codex with npx, or set up a ChatGPT Custom GPT from the same files.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Install AI Skills

Prohelion supplies AI Skills as `profinity-ai-skills.zip` with each Profinity release, and you install it into your AI tool with `npx`.
Installing the skills with `npx` needs Node.js on your computer.
Contact Prohelion for the zip that matches your release.
For what the skills do and what they need once installed, refer to [AI Skills](./AI_Skills.md) and [AI Skills reference](./AI_Skills_Reference.md).

## Install the agent skills

The zip has no wrapping folder, so create the destination folder when you extract.

Extract the zip into a folder, and point `npx skills add` at that folder:

```bash
unzip profinity-ai-skills.zip -d profinity-ai-skills
npx skills add ./profinity-ai-skills
```

On Windows, extract the zip with File Explorer or with `Expand-Archive profinity-ai-skills.zip -DestinationPath profinity-ai-skills` in PowerShell, then run the same `npx skills add` command.

After installation, the skills are available in your AI tool, and each skill's `SKILL.md` file gives step-by-step instructions, with API reference notes, examples, and schemas beside it in the skill's folder.

## Set up a ChatGPT Custom GPT

Profinity is deployed per customer, so there is no ready-made GPT to share.
Whoever builds the GPT does a short one-time setup from the files in the pack, and others then use it:

1. Paste the instructions.
2. Upload the example files.
3. Import the OpenAPI Actions file (the file that tells the GPT how to call the REST API) with your Profinity host in it.

For what a Custom GPT can and cannot do, refer to [AI Skills reference](./AI_Skills_Reference.md#supported-ai-tools).
