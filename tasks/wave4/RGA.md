# Review: Make your first API call (Integrating_to_Profinity/First_API_Call.md)

Verdict: FIX (two high findings, several medium).

Mechanical checks
- Lint: whole 2.3 folder 0 errors, 0 warnings (70 notes on other pages). New page 0/0/0. `tutorial` is a valid type. Links and anchors resolve (no Links errors).
- JSON bodies: both blocks identical to APIs/index.md lines 48-53 and 61-69 after removing the 4-space list indent (diffed). The curl line is identical to the inline command in APIs/index.md line 81 (string match). Only change is the bash fence.
- "must use HTTPS": none remain. The page says "should use HTTPS". Confirmed.
- No page shows a response for GET /api/v2/Tags/Sample/{fullTagPath} (grep: only APIs/index.md and a Webhook_Publisher mention of its fields). Confirmed; the page states no result for the final call.
- index.md sentence and .pages entry: fine. The index.md sentence has no factual claim.

## Findings

High
1. Next steps: "Find every route in the [Endpoint Reference]". Source (Endpoint_Reference.md line 12): "The Swagger page on your Profinity instance lists every route and the parameters it accepts". The Endpoint Reference "lists REST API routes that complement the screens" and APIs/index.md line 32 lists its areas (alerts, collections, derived tags, AI chat, security, account resets, tag relay, themes). The page has turned "Swagger lists every route" into "Endpoint Reference has every route". Also the writer's own ledger notes the Endpoint Reference has no entry for Users/Authenticate or Tags/Sample, so the claim is contradicted by the tutorial's own routes. Fix: "The Endpoint Reference lists the routes that complement the screens described elsewhere in the documentation", and put "lists every route" against Swagger only.
2. Prerequisites and step 1 hide the source conflict in the one place a cold reader hits it. Step 1 gives `admin`/`password` with no comment. Manage_Users.md line 86: "A new installation includes an `admin` account with the password `password`, and the first sign-in as `admin` forces a password change." Following the tutorial on a new installation, the reader probably gets a `preAuthToken` and no `token`, but no page states that the API sign-in does this (the writer correctly did not claim it). The page leaves it to a generic paragraph after step 2, so step 2 ("Read the `token` field") has no stated outcome for this reader. This is not false, but it is misleading by omission. Safest fix using only agreed facts: say the body is an example, that the username and password are those of the Profinity user the calls run as (APIs/index.md line 44), and move the preAuthToken paragraph to sit directly under step 2 as the branch. Do not say the default admin returns requiresPasswordChange (unsupported). Raise the open question with the product owner.

Medium
3. Internal contradiction: the prerequisite says "Use a dedicated account that holds only the permissions the client needs", while step 1 uses `admin`, which Manage_Users.md line 45 says "holds every permission". Source wording is "The user should be a dedicated account...", so "Use" also hardens "should". Fix: "should be a dedicated account" and label the JSON body as an example (APIs/index.md line 46 says "For example:").
4. "User accounts are created in **Users & Groups**" drops the condition in Manage_Users.md line 15: Users & Groups "requires the **Security administration** permission and is shown only when the licence includes the Profinity Server feature". A reader on a Desktop licence will not find it. Add the condition or link only.
5. "The `localhost` address does not carry this risk" drops the source condition: "Custom applications running on the Profinity server can use the `localhost` address". Add "on the Profinity server".
6. Next steps: "Use the Swagger page at `/swagger` to try routes from a browser". APIs/index.md line 41 says testing in Swagger needs a token generated first and applied with the **Authorize** button. The sentence is inferred from "Swagger interface ... available by adding /swagger" and drops the Authorize step. Either add "after applying the token with the Authorize button (see Profinity REST APIs)" or reduce to "The Swagger page is at /swagger".
7. "A client that starts receiving 401 should sign in again or renew the token with `GET /api/v2/Users/Refresh`": source line 78 says "A token that is still valid can be renewed". The condition "still valid" is dropped, and the page itself says an expired token gets 401. This mirrors the source's own line 82, so it is faithful to that sentence, but the two source sentences are in tension. Note it; consider quoting both or linking.
8. "A running Profinity instance" and "The full path of a tag" are prerequisites no page states as such. The tag path is a needed input (the curl line takes it) but no page says where to get one. They are inferred but low-risk; list as Questions rather than fact. No link is given for the tag path.
9. Intro: "At the end you have a token and have sent one authenticated request". The outcome is true by construction but no page states a result for the last call. Acceptable; do not add a checkpoint.

Low
10. "Pass the contents of the `token` field in each request" drops "subsequent"; fine. The 403 sentence gives no permission for Tags/Sample (none documented), so a reader cannot prepare the account. Record as a gap.
11. The two-factor paragraph is a verbatim lift from APIs/index.md; it is longer than one sentence of copied content and lies outside the single path. Brief says link, do not copy, anything longer than one sentence. The same applies to the 401/403 paragraph. Consider shortening to a link to APIs/index.md#profinity-api-security.

## Source ledger check (sentence by sentence)
- Intro: supported by APIs line 81. OK.
- Need: "APIs are running whenever Profinity is running" (APIs 26) OK. "examples use localhost:18080" (APIs 30, 44) OK. Username/password (APIs 44) OK. "dedicated account" (APIs 45) see 3. Users & Groups (Manage_Users 15) see 4. Tag path: no support (8).
- Step 1: POST URL and body (APIs 44-53) OK. HTTPS sentences (APIs 56-57) OK except 5.
- Step 2: APIs 59-69 OK (the page trims the field list, which is fine).
- preAuthToken paragraph: APIs 77 verbatim OK.
- Bearer, curl: APIs 80-81 OK.
- 401/403/Refresh: APIs 82 OK, see 7.
- Next steps: bullet 1 see 6 (historical data and OpenAPI link supported by APIs lines 18, 91); bullet 2 see 1 (high); bullet 3: service account, "token never expires" (Service_Accounts line 14) OK; "client that runs for a long time" (APIs 45) OK.

## Conflicts
The page states only what all sources agree on, with the omission described in finding 2. The conflict is not stated anywhere on the page, which is why it needs the reorder.

## Is it a real tutorial?
Mostly: linear, one outcome (token, then one request). What is missing, without inventing it:
- Where to get a tag's full path (no page states it). Reader cannot complete the last step cold without knowing one.
- What a successful response from the last call looks like, and which permission the route needs (neither documented).
- What happens on first sign-in as the default `admin` (conflict above).
- How to carry the token between steps is stated (copy `token`, paste in curl), but the Windows/macOS/Linux shell quoting is not covered by any page (do not add).
Raise all four as Questions for the product owner.

## High severity list
1. "Find every route in the Endpoint Reference" (contradicts Endpoint_Reference line 12).
2. Source conflict on default admin sign-in is left to the reader; step 2 has no stated outcome for a new installation.
