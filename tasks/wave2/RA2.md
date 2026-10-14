# Wave 2 review RA2: Administration licensing and users

Method: word-level diff of each page against `git show HEAD:` (all changed text read), linter run on all six pages, table text of Roles_and_Permissions compared programmatically, whole 2.3 docs searched for Desktop next to accounts or roles, inbound links to removed headings searched.

Lint result: 0 errors, 1 warning (Component_And_Collection_Security.md, heading "The built-in (All Tags) collection"), 6 info notes.

## Licensing.md: PASS
Every change is front matter (type reference, owner, last_reviewed, new description), sentence-case headings and admonition titles, serial commas, "see" to "refer to", and one removed sentence.
1. (low) Removed "See [Licensing](../Administration/Licensing.md)." from the "Licence required for remote access and user accounts" note. It linked the page to itself; no fact lost. Acceptable.
2. (low) "(see below)" and "described above" became named links to #desktop-free-use-policy and #the-14-day-local-trial. Both anchors exist.
3. Entitlements: every table row, edition column value (Yes/No/Add-on), feature name, the 14-day trial, the 7-day and 30-day Expiring thresholds, the `WrongInstance` and other state names and the Server-only loopback warning are unchanged. Table diffs are only added serial commas. No entitlement changed or dropped.
4. Anchors: `#the-machine-fingerprint` (line 159) and `#hardware-requirements-and-remote-access` (line 71) exist. `#desktop-free-use-policy` and `#the-14-day-local-trial` are unchanged slugs.
5. F1: Licensing still says "Without Profinity Server there are no user accounts or roles... A Desktop installation runs as a single built-in admin user", and the info note ties user accounts and roles to the Server licence. Consistent.
6. (low) Writer's "Questions" items (Themes and Branding link target, Custom components Yes for unlicensed, no verification step after upload) are genuine open questions; correctly not acted on.

## Users_and_Access/Component_And_Collection_Security.md: PASS
1. (info, confirmed false positive) HeadingCase warning is on "The built-in (All Tags) collection". "(All Tags)" is the product collection name; the slug `the-built-in-all-tags-collection` is kept. Add to the heading-case exceptions.
2. (low) The two-sentence "Permissions" section was folded into the intro: "Only a user with Security administration can see or change these settings" and the Roles and permissions link are both present. No inbound links to #permissions were found.
3. Fail-closed warning, bypass rules (Security administration and Modify profiles), 404 not 403, 400 on id `All`, unresolved roles and profile import text all keep full force. The "below" reference now links to #unresolved-roles-after-a-profile-import, which exists.
4. Type concept fits. The restriction procedures remain prose (noted by the writer as a possible split).

## Users_and_Access/MFA_Account_Management.md: PASS (one low item)
1. Steps: the four numbered steps for Reset MFA are the original single sentence split in the original order (ADMIN, Users & Groups, click the user's row, User Actions tab, Reset MFA and confirm, user re-enrols at next sign-in). Nothing added.
2. Security statements keep force: Reset MFA hidden on the administrator's own tab and on service accounts; Reset Password sets Require password change on next login and signs out active sessions; shown only when Sign-in method is Local; the licence and enforcement condition for Reset MFA is intact.
3. The SSO section became one clause in the intro: "MFA and credentials are managed in the identity provider, so Reset MFA and Reset Password are not used for them." Meaning kept. Section #sso-users had no inbound links.
4. (low) Related documentation list no longer lists Two-Factor Authentication and Password Policy; both are linked inline. Acceptable.
5. (low) Type task, but the self-service section is descriptive only. Page mixes reference and task; acceptable, no change needed.
6. Heading-case: "Administrator reset of MFA" no longer warns. The linter now accepts MFA; the writer's false positive is confirmed and already resolved.

## Users_and_Access/Manage_Users.md: FIX
1. (medium, F1 wording) New text: "A Windows Desktop installation without a Server licence does not use user accounts... User accounts and roles exist on a Desktop host when a Server licence is applied". The product owner's rule is that they exist ONLY when a Server licence is applied. "when" reads as sufficient, not necessary. Suggested: "User accounts and roles exist on a Desktop host only when a Server licence is applied." The built-in administrator and no-accounts statement is otherwise correct and agrees with Licensing.md, Getting_Started/Create_User.md and How_To_Guides/Set_Up_Profinity_as_Kiosk.md. No page contradicts it.
2. (low) The original info callout "Desktop Mode" is now plain prose after the intro. Informational only, so acceptable, but it reads late; consider placing it first.
3. Steps: Creating a new user (Select ADMIN, Users & Groups, Add user, fill fields, choose roles, save) and Disabling a user (open dialog, switch off "Is the user currently enabled", save) both map to the original sentences. No invented prerequisite, permission or check. Step 3 and 4 split one original clause; fine.
4. Warnings intact: roles change ends active sessions; default admin password `password` with forced change; Reset Password and role change as ways to end sessions.
5. (low) "Overview" heading removed; no inbound links. Related documentation list dropped Roles and Permissions, linked inline.

## Users_and_Access/Roles_and_Permissions.md: FIX
1. (medium, F1 wording) Same issue as Manage_Users: "Roles exist on a Desktop host when a Server licence is applied". Change to "only when".
2. Permission count: original and rewrite both contain 27 permission rows (Security administration to Receive external tags) plus the same two example role rows and eight "page or menu entry to permission" rows. The table text of the original and the rewrite is identical once commas are ignored, so every name and description is unchanged, including the "Also turns on" notes.
3. (low) The "Start narrow" tip lost its admonition box; wording unchanged. A tip, not a warning, so acceptable.
4. (low) "will rely on" to "relies on". Harmless.
5. The "Person is signed out" warning (including firmware update and logging session example) and the "Send CAN messages is high-risk" warning are intact.
6. Type reference with a short procedure (Create a role); acceptable, writer's split proposal is reasonable.

## Users_and_Access/Service_Accounts.md: PASS
1. Steps 1 to 7 come from the original sentences in the original order: ADMIN, Users & Groups, Add user or click an existing automation user, switch on Service Account, assign roles and save, click row, User Actions tab, Generate Token, token shown in dialog. No invented step. Step 5 ("Click the user's row") follows save, as in the original.
2. Security statements intact: token never expires; stays valid until a new one is generated, roles change or the account is disabled; treat as password; danger admonition on Generate Token retained at full strength; Revoking access sentence unchanged.
3. (low) Related documentation dropped the MCP Server and Roles and permissions links; both appear inline.
4. (low) Writer's open question about the "AI" feature name versus "Profinity AI" in Licensing is valid and left unchanged.

## Overall summary
Five pages pass or nearly pass; no entitlement, permission, security statement or anchor was lost or changed. The only substantive defect is the F1 wording on two pages, which says Desktop hosts have accounts and roles "when" a Server licence is applied instead of "only when". Heading-case: both writer-reported warnings confirmed as false positives ("(All Tags)" still warns; MFA no longer warns). No new links to removed headings were found. I did not check pages outside this list beyond the Desktop/accounts/roles search.

## Heading-case false positives
- "The built-in (All Tags) collection" (Component_And_Collection_Security.md): product collection name.

## High severity findings
None.

## Medium severity findings
1. Manage_Users.md intro: F1 must say "only when a Server licence is applied".
2. Roles_and_Permissions.md intro: same.
