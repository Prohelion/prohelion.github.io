---
title: Install AI Skills
description: "Install the Profinity AI Skills pack, connect Claude Code, Cursor, or Codex through MCP, or set up a ChatGPT Custom GPT."
type: task
owner: Documentation
last_reviewed: 2026-10-27
---

# Install AI Skills

Install the Profinity AI Skills pack into your AI tool so it can build dashboards, rules, collections, scripts, plugins, derived tags, and example apps from your instance.
Claude Code, Cursor, and Codex read live tags and alerts through the [MCP Server](../../Integrating_to_Profinity/MCP_Server/index.md).
ChatGPT uses a Custom GPT and the REST API instead.
For what the skills do, refer to [AI Skills](./index.md) and [AI Skills reference](./AI_Skills_Reference.md).

Prohelion supplies the pack as `profinity-ai-skills.zip` with each Profinity release.
Contact Prohelion for the zip that matches your release.
Installing the agent skills with `npx` needs Node.js on your computer.

Before you install for Claude Code, Cursor, or Codex, finish [Prepare Profinity for an MCP client](../../Integrating_to_Profinity/MCP_Server/Prepare_Profinity.md), then the guide for your tool:

- [Connect Cursor to Profinity](../../Integrating_to_Profinity/MCP_Server/Connect_Cursor.md)
- [Connect Claude Code to Profinity](../../Integrating_to_Profinity/MCP_Server/Connect_Claude_Code.md)
- [Connect Codex to Profinity](../../Integrating_to_Profinity/MCP_Server/Connect_Codex.md)

Without that connection, the skills can still use the REST API for schema and saves when the instance is reachable, but they cannot read live tag and alert data through Model Context Protocol (MCP).

## Install the agent skills

The zip has no wrapping folder, so create the destination folder when you extract.

1. Extract the zip into a folder.
2. Point `npx skills add` at that folder:

    ```bash
    unzip profinity-ai-skills.zip -d profinity-ai-skills
    npx skills add ./profinity-ai-skills
    ```

On Windows, extract the zip with File Explorer, or with `Expand-Archive profinity-ai-skills.zip -DestinationPath profinity-ai-skills` in PowerShell.
Then run the same `npx skills add` command.
To see which skills the pack contains before installing, run `npx skills add ./profinity-ai-skills --list`.

After installation, the skills are available in your AI tool.
Each skill's `SKILL.md` file gives step-by-step instructions.
API reference notes, examples, and schemas sit beside it in the skill's folder.
Ask the tool for a list of components in the active profile.
A list of names confirms that the skills and the MCP connection are both working.

## Set up ChatGPT

Profinity is deployed per customer, so there is no ready-made GPT to share.
Whoever builds the GPT does a short one-time setup from the files in the pack, and others then use it.

1. Paste the instructions.
2. Upload the example files.
3. Import the OpenAPI Actions file (the file that tells the GPT how to call the REST API) with your Profinity host in it.

The host, certificate, and token steps are in [Connect ChatGPT to Profinity](Connect_ChatGPT.md).
For what a Custom GPT can and cannot do, refer to [AI Skills reference](./AI_Skills_Reference.md#what-each-tool-can-do).
