---
title: Connect ChatGPT to Profinity
description: "Build a ChatGPT Custom GPT that calls the Profinity REST API, and see why ChatGPT cannot use a private MCP server."
type: task
owner: Documentation
last_reviewed: 2026-10-27
---

# Connect ChatGPT to Profinity

Connect ChatGPT to Profinity with a Custom GPT from the [AI Skills](../../Profinity_AI/AI_Skills.md) pack.
The Custom GPT calls the Profinity REST API.
It does not connect to the Model Context Protocol (MCP) server, and it does not need the **AI** licensed feature.
The REST API is included in every edition.
Saving dashboards, rules, collections, or derived tags still needs the matching permission for the account whose token the GPT uses.
Refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

ChatGPT runs on the internet.
It cannot open `localhost`, and it cannot trust a self-signed certificate that you accepted on your computer.
The Profinity address in the Custom GPT has to be a public HTTPS address with a certificate from a trusted authority.
A service account token needs **Users & Groups**, which needs a Server licence.
Refer to [Service accounts](../../Administration/Users_and_Access/Service_Accounts.md) and [HTTPS certificates](../../Administration/System_Configuration/Profinity_Web.md#https-certificates).

ChatGPT cannot use the Profinity MCP server, because it adds a custom MCP server only as a public HTTPS endpoint or through an OpenAI Secure MCP Tunnel, and signs in with OAuth.
Profinity MCP authenticates with a bearer token and does not provide OAuth.
Use [Cursor](Connect_Cursor.md), [Claude Code](Connect_Claude_Code.md), or [Codex](Connect_Codex.md) when you need the MCP tools, including `get_all_components`.

A Custom GPT also has no shell on your computer.
The dashboard, rules, collections, derived tag, and app skills can read and save through the REST API.
The script and plugin skills give you commands to run yourself.
Refer to [AI Skills reference](../../Profinity_AI/AI_Skills_Reference.md#what-each-tool-can-do).

## Set up ChatGPT

Get `profinity-ai-skills.zip` for your Profinity release from Prohelion, and create the service account token first.
The token needs the permissions for the data the GPT reads and for anything it saves.

1. In ChatGPT, create a Custom GPT.
2. Paste the instructions from the pack, upload the example files, and import the OpenAPI actions file with your public Profinity host in it. The file list and the order of those three actions are in [Install AI Skills](../../Profinity_AI/Install_AI_Skills.md#set-up-chatgpt).
3. Set the action authentication to an API key of type Bearer, and paste the service account token. Do not choose OAuth. Profinity REST calls use `Authorization: Bearer` and the token.
4. Save the Custom GPT.
5. Start a new chat with that GPT and ask: "What components are in my active profile?"

A list of component names confirms that ChatGPT can reach the REST API and that the token is accepted.
The GPT shows a payload and asks before it saves a change.
Refer to [Authenticate to the Profinity REST API](../APIs/API_Authentication.md) for the token header.

## Fix a failed connection

- The action cannot reach the host. ChatGPT is not on your private network. Use a public HTTPS address, and allow that address through the firewall.
- The action reports a certificate error. The certificate is self-signed or does not name the public host. Select a certificate from a trusted authority on the **Web** tab. Trusting the generated certificate on your computer has no effect on ChatGPT.
- The action returns 401. The Bearer token is incomplete, or **Generate Token** has replaced it. Paste the current token into the action authentication.
- The action returns 403. The account lacks the permission for that API call.
- The script or plugin skill stops after printing commands. A Custom GPT cannot run those commands. Run them on a computer where the Profinity tools are installed, or use Claude Code, Cursor, or Codex.

When the Custom GPT can read the instance, the next step is to ask it for the dashboard, rule, or collection you want to build.
Refer to [AI Skills](../../Profinity_AI/AI_Skills.md).
