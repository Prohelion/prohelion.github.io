# Review RA3: System_Configuration AI, Web and Security pages

Method: original (git HEAD) compared with the working tree for all seven pages. Lint run on the whole 2.3 folder and on the seven pages. The writer's report A3.md was not consulted for the verdicts.

Lint results:
- Whole 2.3 folder: 1 error, 46 warnings, none in these seven pages. The failing pages are Component_And_Collection_Security, Configure_Data_Logging, Connect_Profinity_to_AI, 2.2.5 and 2.3.1. No Links errors anywhere.
- The seven pages alone: 0 errors, 0 warnings, 1 info note (SerialComma). The SCIM heading warnings are gone.

Anchors used by other pages (all six resolve, slugs unchanged):
- Security/index.md#session-policy-and-login-lockout (Kiosk_Mode, Manage_Users, and Two_Factor_Authentication itself)
- Two_Factor_Authentication.md#security-key-sign-in (Licensing, MFA_Account_Management)
- Password_Policy.md#forced-password-change (MFA_Account_Management)
- SSO_and_Sign_In.md#linking-sso-users-to-profinity-accounts (Manage_Users)
- Profinity_Web.md#https-certificates (Extensions_Web, Installation/Security)
- SCIM_and_SIEM.md#event-format (own page)

No dropped, weakened or invented security statement was found. Every setting, default, range, restart note, licence note, error string, token-handling note, event name and code block matches the original.

## AI_Settings.md: PASS

All table rows, defaults (Reasoning Medium, timeout 30 to 3600, default 300), the five validation rules, the "no live test call" caveat, the data-leaves-instance warning, the encrypted API key, per-user token scoping, and the permission and licence notes are intact. Nothing in the privacy or capability claims is strengthened or softened. The reworded sentence "is not flagged until a user sends a chat message, and the chat then returns an error" keeps the meaning.

1. low. The "Related Documentation" bullet to Roles and Permissions was dropped. The link is still inline under Permissions, so no link is lost. The heading was also renamed "Related documentation"; no inbound anchors found.
2. low. "30–3600" became "30 to 3600". This is fine.

## Profinity_Web.md: PASS

All parameters, defaults (18080, 18443, 0.0.0.0, 127.0.0.1), the below-1024 admin note, the remote-access warning with the log message, troubleshooting, and the certificate table are unchanged.

1. The "(see below)" cell in the IP Address for Http row now reads "as the note on remote access explains". The named note exists (the "Remote access needs Profinity Server" warning, directly below the table). The meaning is unchanged. No finding.
2. low. The Windows certificate "tip" admonition was turned into a plain lead-in sentence plus a numbered list. All five original steps are kept in order. Steps 4 and 5 were merged into one step with a continuation line. The content is equivalent.
3. low. Parameter names moved from code font to bold. The names are UI labels, so this is acceptable.

## Security/index.md: PASS

Session table values (120, 1 to 10080, 1 to 1000, 10, 1 to 100, 15, 1 to 1440), the oldest-session behaviour, the "Too many attempts. Try later." message, the username-scoped lockout, and the restart note are unchanged. Type `index` fits.

## Security/Password_Policy.md: PASS (two low findings)

All defaults and ranges, the Reset Password behaviour, the admin first-login force-change, and the kiosk and Local conditions are intact.

1. low. The Related Documentation list lost two bullets: "SSO and Sign-In Method" and "Security Guide". Both are still linked inline in the body, so there is no lost link target. The heading was renamed "Related pages".
2. low. The first figure's alt text was lengthened ("shown after sign-in, asking for a new password before the user can continue"). It is descriptive and matches the caption, so it is acceptable.
3. low. The page is typed `reference` but "Changing your own password" is a short procedure in prose. This is acceptable, and it does not warrant `task`.

## Security/SCIM_and_SIEM.md: PASS

The error strings, the SCIM endpoint, the supported and unsupported operations, the bearer token as a secret ("Treat it like a password"), the backups and HTTPS advice, the SIEM defaults, the event line format, the example, and the full event name list are unchanged. The sections were reordered so that Securing the integration comes last. The "avoid assigning Administrators" warning is kept in full.

1. low. The Related Documentation list was removed (SSO, Roles and Permissions, System Configuration). All three are linked inline in the body, so no link is lost.

## Security/SSO_and_Sign_In.md: FIX (typing and one invented description)

Procedure check: the original has no procedure for choosing the method or configuring the provider. Its only numbered list is the three-step external-identity link under "Linking SSO Users to Profinity Accounts" (Provider ID `default`, Subject ID `sub`, optional Email then save). The rewrite keeps those three steps in the same order with the same wording. No step, prerequisite, permission or "check that it worked" sentence was added. The page still contains: the licence note, the save-restart warning with the verbatim rejection message, the single-IdP limit, the revert-to-Local behaviour, and the config.yaml recovery path (`authenticationMode` under `securityPolicy`).

1. medium. `type: task` does not fit. About 90 percent of the page is reference and concept (settings table, what users see, recovery explanation). The only numbered list is three steps. The brief says a page with no real numbered procedure cannot be `task`. Suggested correction: type `reference`, or accept `task` only if the lead decides the linking procedure is the page's main job. It mixes jobs either way. Recording the mix is better than relabelling.
2. low to medium. The "Related pages" section is rewritten as a sentence with new descriptive text: "for the permissions that govern access" (Roles and Permissions) and "for the 2.3 security changes" (release notes). The original was a bare link list. The 2.3.1 release notes do have a "Security and identity" section, so the release-notes description is supported. The permissions description is mild, but it is an added description. The bare bullets for Two-Factor Authentication and SCIM and SIEM were dropped; both are linked inline.
3. low. The link text "Artifacts directory" became "Artefacts directory". The target page is `Artifacts_Directory.md`, and "Artifacts directory" is likely the product or feature name. Respelling a named location is risky. Suggested correction: restore "Artifacts directory", or confirm what the product UI and the target page title use.
4. low. The "As described below" reference became a named anchor link to "Linking SSO users to Profinity accounts". The anchor exists, and the meaning is unchanged.

## Security/Two_Factor_Authentication.md: PASS (low findings)

Defaults (recovery codes on, remember device off, 10 days, range 1 to 90), the licence notes, the quoted UI strings ("Security key registered successfully." and "Security key registration was cancelled or timed out."), the clock-skew cause, the administrator reset, the WebAuthn and HTTPS requirement, and the "a site that wants security keys also enforces two-factor" dependency are unchanged.

1. low. The Related Documentation list was reduced to one sentence linking Password policy. The SSO and MFA Account Management links are still inline.
2. low. The mixed UK or US spelling "enrollment" in the setting name "Require recovery codes during enrollment" is a literal UI label, correctly left alone.

## Heading-case false positives

None remain. The SCIM acronym warnings no longer appear.

## Overlap noted

The restart-on-save note is repeated across Security/index, Password_Policy, SCIM_and_SIEM, SSO_and_Sign_In and Two_Factor_Authentication. It is the same warning on each page and was kept.

## Overall summary

All seven pages are faithful to the originals. No security statement, setting, default, range, restart note, licence note, error string or code block was dropped, weakened or invented. Anchors resolve and the pages lint clean. Remaining issues: the page type of SSO_and_Sign_In, the added descriptions in its "Related pages" section, and the possible respelling of the product term "Artifacts directory".

High severity findings: none.
