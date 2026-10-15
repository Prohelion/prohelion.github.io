# GA report: Make your first API call

## Files
Created: docs/Profinity_Software/Profinity_Version_2.3/Integrating_to_Profinity/First_API_Call.md (type tutorial). No page edited. Lint: 0 errors, 0 warnings, 0 notes.

## Source ledger
APIs = Integrating_to_Profinity/APIs/index.md; MU = Administration/Users_and_Access/Manage_Users.md; SA = Service_Accounts.md.

| Page text | Source and quote |
|---|---|
| Purpose, latest sample of a tag with a Bearer token | APIs: "`curl -H \"Authorization: Bearer <token>\" http://localhost:18080/api/v2/Tags/Sample/{fullTagPath}` returns the latest sample of a tag." |
| APIs run whenever Profinity runs | APIs: "the APIs are running whenever Profinity is running." |
| Examples use localhost:18080 | APIs: "send a POST request to `http://localhost:18080/api/v2/Users/Authenticate`" |
| Username and password of the user the calls run as | APIs: "with the username and password of the Profinity user that the API calls run as in the JSON body." |
| Dedicated account, only needed permissions | APIs: "The user should be a dedicated account that holds only the permissions the client needs" |
| Users created in Users & Groups | MU: "All of this is done from **Users & Groups**" and "Creating a new user" steps |
| Step 1 request and JSON body | APIs: POST sentence above; JSON block copied byte for byte (json) |
| HTTPS and localhost sentences | APIs warning: "Calling this API over an HTTP connection can expose the password to network scanning." and "Custom applications running on the Profinity server can use the `localhost` address, which does not carry this risk, while an application that calls Profinity across a network should use HTTPS for all API usage." (I wrote "must use HTTPS" for "should use HTTPS": see Questions) |
| Step 2 response and wording | APIs: "If the username and password are valid, Profinity responds to a non-browser client with a JSON body that carries the access `token`... (the `permissions` list is abbreviated)"; JSON block copied byte for byte (json) |
| preAuthToken paragraph | APIs: "A user who must complete two-factor authentication or change a password first receives a `preAuthToken` with `requiresTwoFactor` or `requiresPasswordChange` set instead of a `token`, which is completed through `/api/v2/Users/Authenticate/TwoFactor` or `/api/v2/Users/Current/ChangePassword`." |
| Pass token as Bearer in each request | APIs: "The contents of the `token` field must be passed in each subsequent request as a Bearer token" |
| curl command | APIs: the curl sentence above (original is inline code, no language; shown in a bash block) |
| 401, 403, renew | APIs: "A call with a missing or expired token is answered with 401, and a call from a user that lacks the permission the route needs is answered with 403, so a client that starts receiving 401 should sign in again or renew the token with `GET /api/v2/Users/Refresh`." |
| Swagger at /swagger | APIs: "available by adding `/swagger` to the URL that Profinity is running on." |
| Historical data, OpenAPI document (link only) | APIs headings and "The OpenAPI document is served at `/swagger/v2/swagger.json`" |
| Endpoint Reference link | Integrating_to_Profinity/index.md: "The [Endpoint Reference]... lists the routes" |
| Service account, token never expires | SA: "A service account token never expires"; APIs: "a client that runs for a long time should use a service account." |

## Conflicts between sources
- Manage_Users says a new installation has `admin` with password `password` and "the first sign-in as `admin` forces a password change". The APIs page example uses admin/password. Step 1 uses the APIs example body unchanged. The preAuthToken paragraph covers the forced change, but no page says that the API sign-in as the default admin returns `requiresPasswordChange`. The tutorial does not claim it.

## Questions
- No page shows a response body for `GET /api/v2/Tags/Sample/{fullTagPath}`, so the tutorial has no result or checkpoint for the final call. It says only what the page states (returns the latest sample).
- No page says how to find a tag's full path, so the "full path of a tag" prerequisite has no link.
- No page states the permission `GET /api/v2/Tags/Sample/{fullTagPath}` needs (only `TagView` for TagQuerySet and `DBCView` for DBC). The tutorial does not name one.
- The APIs page says "should use HTTPS" for network calls; the tutorial says "must", a wider claim. Recommend changing to "should" if the product owner prefers exact fidelity.
- No page states the token lifetime of an ordinary user, so none is stated.
- The curl example is inline code on the source page with no language; tagged bash here.
- No page states a time estimate; none given.

## Not written
- Swagger Authorize flow (a branch, so left to the APIs page), Endpoint_Reference has no entry for Users/Authenticate or Tags/Sample, so it is linked only as a route list.

## Fixes applied
Lint after fixes: 0 errors, 0 warnings, 0 notes. Both JSON blocks and the curl command are unchanged.
1. High, Endpoint Reference "every route": applied. "Lists every route" now attaches to Swagger; the Endpoint Reference "lists the routes that complement the screens" (Endpoint_Reference.md line 12).
2. High, admin/password and preAuthToken: applied. Step 1 says the body is "For example:" and that the credentials are those of the Profinity user the calls run as. The `preAuthToken` sentence now sits under step 2, as one sentence. The page does not say what the default admin receives.
3. Medium, "should" and step 1: applied ("The user should be a dedicated account..."); step 1 consistent through the example label.
4. Medium, Users & Groups licence condition: applied (shown only when the licence includes the Profinity Server feature). The Security administration permission is not added to the page.
5. Medium, localhost: applied ("Custom applications running on the Profinity server can use the `localhost` address").
6. Medium, Swagger: applied, including the Authorize step with a link to Profinity REST APIs#profinity-api-security.
7. Medium, "still valid": applied in the single sentence that links to the owning page.
8. Medium, copied 2FA and 401/403 paragraphs: applied. The 401/403 paragraph is replaced by one sentence and a link. The 2FA paragraph is cut to one sentence (the `preAuthToken` branch, kept under step 2 as item 2 requires).
Low 10 and 11: the 403 permission gap is listed below; 11 applied. Findings 8 and 9: no change (no checkpoint added).
Tutorial ends with the next-step links.

## Questions (still open)
- No page states where to find a tag's full path.
- No page states the permission that `GET /api/v2/Tags/Sample/{fullTagPath}` needs, or its response body, so none is on the page.
- What the default `admin` receives on first API sign-in (Manage_Users says the first sign-in forces a password change).
