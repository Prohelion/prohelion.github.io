# Review RI1: Integrating_to_Profinity (4 pages)

Checks run: `node scripts/lint-docs.js` on the whole 2.3 folder (no Links errors, no findings on these four pages; 0 errors and 0 warnings when run on the four pages alone); `git diff HEAD` read in full for all four pages; every fenced block extracted and diffed against `git show HEAD:` (identical on all four pages); all three images opened.

## index.md: PASS
Findings:
1. Low. "Where Next" heading removed and its two bullets folded into one sentence. The Tag Relay link is still present in "Other ways to move data", and no page links to `#where-next` (grep). No fact lost.
2. Low. Table cell "app, or cloud" gained a comma (original "app or cloud"). Harmless but an unrequested change.
3. Low. Image alt text (line 15) not checked against the image (diagram unchanged by the writer; not in my image list).

## APIs/index.md: PASS
1. Verified: both fenced blocks byte for byte; warnings "API users can damage equipment" and "Use HTTPS to protect passwords" kept as admonitions at full strength, and the blank line added after the JSON fence fixes the admonition rendering.
2. Verified: alt texts match the images. swagger.png shows the "Profinity Rest APIs" page, Authorize button at right, Actions and ActiveProfile groups. swagger_authentication.png shows POST /api/v2/Users/Authenticate, username and password in the request body, a 200 response with a token. swagger_authorize_button.png shows the "Available authorizations" dialog, an empty Value field, Authorize and Close buttons. Captions are unchanged. Low: the first alt text names the page title as "Profinity Rest APIs", which is what the image shows (the body text says "REST"); fine.
3. Verified (item 5): the API-contract paragraph is word for word the original text, just moved out of the info admonition. Release-process detail ("committed snapshot", "caught before release") is unchanged, not strengthened. Medium/low: the info admonition became a plain paragraph with "As of Profinity 2.3" lead-in; the original used the same wording, so no invention. The product owner may still want the release-process clause cut (writer's question stands).
4. Low. "will run as" became "run as"; no meaning change.
5. Low. Description rewritten, now mentions the OpenAPI document and Swagger page, both in the body.

## APIs/Endpoint_Reference.md: PASS
1. Low. New words "for the policy itself" after the Component and collection security link. Not in the original, harmless, but it is an addition; consider reverting to "Refer to [..]." alone.
2. Verified: headings changed to sentence case with slugs unchanged. Inbound links (`#themes`, `#alerts`, `#tag-relay`, `#collections-and-derived-tags`) still resolve (lint clean). All routes, permissions, the 1 to 1440 minutes limit and the quoted error string are present and unchanged.

## MCP_Server/index.md: FIX
1. HIGH (structure). Lines 213 to 220: the numbered authentication steps were split to one sentence per line, so each marker sits alone on its own line ("1." newline "Create a user account..."). In Markdown the text is not indented under the marker, so each step becomes an empty list item followed by a plain paragraph. The three steps will render as three empty numbers with unnumbered text and, for step 3, the indented `text` code block may detach too. The linter does not catch this. Correction: put the first sentence on the same line as the marker (`1. Create a user account...`) and indent continuation sentences by three spaces, as in the original.
2. Verified (item 1): the three broken links are fixed to `../APIs/index.md` (lines 125, 216, 341). Anchors `#accessing-historical-data-via-apis` and `#profinity-api-security` resolve (headings kept, slugs unchanged); lint shows no Links errors.
3. Verified (item 2): the ten tool names, all parameter lists, types, defaults, permissions (`McpView`, `TagView`, `AlertsView`, MCP integration, View tags, View alerts), 401/403/404 rows and error strings are unchanged in the diff. Only line breaks, "Parameters:" and "Returns:" lost bold, and "see" became "refer to". Note: "Returns:" paragraphs have no final full stop, as in the original.
4. Verified (item 5): the `2026-07-28` revision statement and "stateless", "changes the handshake" are unchanged, not strengthened. The writer left them unconfirmed; the product owner should confirm.
5. Medium. "Service Accounts for Long-Lived Clients" info admonition became a plain sentence after step 3. Full content kept. It now sits directly after step 3's code block, which, once the list is fixed, will read as a trailing paragraph; acceptable. The licence and restart admonitions are kept at full strength.
6. Verified (item 3): both fenced blocks (Python example, text block) are identical to the original.
7. Medium/low. Page is about 2,870 words and mixes reference (tools), task (enabling, authenticating) and a client example. The writer proposed a split; not required for this wave.

## Heading-case false positives
None.

## Overlaps (both kept)
As listed in I1.md: token, 401 and 403 behaviour; the ten tools; service-account advice; bearer token and swagger.json path across index.md, APIs/index.md, MCP_Server/index.md and Connect_Profinity_to_AI.md.

## Invented procedures, steps, checks or permissions
None found. No warnings weakened. No new "Changed in 2.3" notes. No diagrams.

## Overall summary
Three pages are clean. The MCP Server page has one real defect: the numbered steps in "Authentication and permissions" are broken by the one-sentence-per-line change and render as empty list items. Everything else (links, tool detail, security statements, code blocks, alt text) checks out against the original.

## High severity findings
1. MCP_Server/index.md lines 213 to 220: numbered list markers split from their text. Rejoin the marker and first sentence, indent continuation lines by three spaces.
