---
title: Connect ChatGPT to Profinity
description: "Build a ChatGPT Custom GPT that reads and saves Profinity data through the REST API, with a service account token and a public HTTPS address."
type: task
owner: Documentation
last_reviewed: 2026-10-29
---

# Connect ChatGPT to Profinity

Connect ChatGPT to Profinity with a Custom GPT built from the [AI Skills](index.md) pack, so that ChatGPT can read your instance and save dashboards, rules, and collections to it.
The Custom GPT calls the Profinity REST API, which every edition includes, so it does not need the **AI** licensed feature.
ChatGPT cannot use the Profinity [MCP Server](../../Integrating_to_Profinity/MCP_Server/index.md), because it connects only to public servers that use a different sign-in from Profinity's token.

ChatGPT runs on the internet, so it cannot open `localhost` or trust a certificate that you accepted on your computer.
Before you start, you need:

- A public HTTPS address for Profinity, with a certificate from a trusted authority. Refer to [HTTPS certificates](../../Administration/System_Configuration/Profinity_Web.md#https-certificates).
- A service account token with the permissions for the data the GPT reads and for anything it saves. A service account needs **Users & Groups**, which needs a Server licence. Refer to [Service accounts](../../Administration/Users_and_Access/Service_Accounts.md) and [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
- `profinity-ai-skills.zip` for your Profinity release, from Prohelion.

A Custom GPT has no shell on your computer.
The dashboard, rules, collections, derived tag, and app skills read and save through the REST API, and the script and plugin skills give you commands to run yourself.
Refer to [What each tool can do](AI_Skills_Reference.md#what-each-tool-can-do).

## Set up ChatGPT

1. In ChatGPT, create a Custom GPT.
2. Paste the instructions from the pack, upload the example files, and import the OpenAPI actions file with your public Profinity host in it. The file list and the order of those three actions are in [Set up ChatGPT](Install_AI_Skills.md#set-up-chatgpt).
3. Set the action authentication to an API key of type Bearer, and paste the service account token. Do not choose OAuth.
4. Save the Custom GPT.
5. Start a new chat with that GPT, and ask: "What components are in my active profile?"

A list of component names confirms that ChatGPT can reach the REST API and that Profinity accepts the token.
The GPT shows you what it is about to save, and asks before it saves a change.
For the token header, refer to [Authenticate to the Profinity REST API](../../Integrating_to_Profinity/APIs/API_Authentication.md).

## Fix a failed connection

| What you see | Cause | What to do |
|--------------|-------|------------|
| The action cannot reach the host | ChatGPT is not on your private network | Use a public HTTPS address, and allow it through the firewall |
| The action reports a certificate error | The certificate is self-signed, or does not name the public host | Select a certificate from a trusted authority on the **Web** tab. Trusting the generated certificate on your computer has no effect on ChatGPT |
| The action returns 401 | The token is incomplete, or **Generate Token** has replaced it | Paste the current token into the action authentication |
| The action returns 403 | The account lacks the permission for that call | Add the permission to one of the account's roles |
| The script or plugin skill stops after printing commands | A Custom GPT cannot run commands | Run the commands on a computer where the Profinity tools are installed, or use Claude Code, Codex, or Cursor |

When the Custom GPT can read the instance, ask it for the dashboard, rule, or collection you want to build.
Refer to [AI Skills](index.md).
