---
title: Profinity REST APIs
description: "Authenticate to the Profinity REST API with Bearer tokens, read real-time and historical tag data, and find the OpenAPI document and Swagger page."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Profinity REST APIs

Profinity V2 is built around its own Representational State Transfer (REST) APIs, which exchange JSON and are secured with Bearer tokens.
Custom applications use the APIs to add capabilities to a solution, to provide custom user interfaces, or to extend the out-of-the-box functionality.
A custom user interface can be hosted either externally or within Profinity itself (refer to [Hosting](../../Customising_Profinity/Hosting/index.md)).

As of Profinity 2.3, `/api/v2` is the published shape of the REST API.
Errors are returned as `application/problem+json` documents.
Areas that are still being developed, such as firmware, can change between releases, so test a client built on them against each new release.

The OpenAPI document is served at `/swagger/v2/swagger.json`.
API tools and AI skills can import it to generate a client or to read the available routes and models.

!!! warning "API users can damage equipment"
    The Profinity APIs support security and can be encrypted, but an API user can change system and equipment state.
    Grant API access only to the users and applications that need it, and limit what each of them can do, so that nobody can accidentally damage the environment or equipment.

## Using Profinity APIs

Profinity V2 is built around its own APIs, so the APIs are running whenever Profinity is running.
The main Profinity host always publishes the API and Swagger.
The **Enable Profinity API** and **Enable Swagger on API** settings apply only to the Profinity Web server for extensions (refer to [Extensions Web](../../Administration/System_Configuration/Extensions_Web.md)).

[Swagger](https://swagger.io) is the interactive API page on your Profinity instance.
Open it by adding `/swagger` to the URL that Profinity is running on.
For example, if Profinity is running on `localhost:18080`, the Swagger page is at `http://localhost:18080/swagger`.

The [Endpoint Reference](Endpoint_Reference.md) lists the routes for alerts, collections, derived tags, Profinity AI chat, security, account resets, tag relay and themes.

<figure markdown>
![The Swagger page titled Profinity Rest APIs, with the Authorize button at the right and routes grouped under headings such as Actions and ActiveProfile](../../images/swagger.png)
<figcaption>Showing the Profinity APIs</figcaption>
</figure>

## Profinity API security

Profinity APIs require a Bearer token, which is either a service account token or a token returned by signing in with a username and password.
Either way, the account should be dedicated to the client and hold only the permissions the client needs.

### Using a service account token

A [service account](../../Administration/Users_and_Access/Service_Accounts.md) token is generated on the account's **User Actions** tab in **Users & Groups**, and it is already a Bearer token.
A client that has one skips the `/api/v2/Users/Authenticate` call and passes the token directly in each request.
In Swagger, paste the token into the **Authorize** dialog.
The token never expires and has no refresh token, so it suits a client that runs for a long time or unattended.
It stays valid until an administrator generates a new one, changes the account's roles, or disables the account.

### Signing in with a username and password

To test the APIs from the Swagger page without a service account token, execute a call against `/api/v2/Users/Authenticate` on that page.
Then apply the returned token with the **Authorize** button at the top right of the Swagger page.

To get a token from any other client, send a POST request to `http://localhost:18080/api/v2/Users/Authenticate`.
Put the username and password of the Profinity user that the API calls run as in the JSON body, for example:

```json
{
  "username": "admin",
  "password": "password"
}
```

!!! warning "Use HTTPS to protect passwords"
    Calling this API over an HTTP connection can expose the password to network scanning.
    Custom applications running on the Profinity server can use the `localhost` address, which does not carry this risk.
    An application that calls Profinity across a network should use HTTPS for all API usage.

If the username and password are valid, Profinity responds to a non-browser client with a JSON body.
The body carries the access `token`, a `refreshToken` (omitted for service accounts, whose tokens do not expire), the `username`, an `id` and the user's `permissions`.
This example abbreviates the `permissions` list:

```json
{
    "token": "eyJhbGciOi...",
    "refreshToken": "...",
    "username": "admin",
    "id": "admin",
    "permissions": ["TagView", "..."]
}
```

<figure markdown>
![The Swagger POST /api/v2/Users/Authenticate call with a username and password in the request body and a 200 response that returns a token](../../images/swagger_authentication.png)
<figcaption>Generating a Bearer token on the Swagger page</figcaption>
</figure>

A browser client receives the same session as cookies and a body without the token.
A user who must complete two-factor authentication or change a password first receives a `preAuthToken` instead of a `token`, with `requiresTwoFactor` or `requiresPasswordChange` set.
Complete the sign-in through `/api/v2/Users/Authenticate/TwoFactor` or `/api/v2/Users/Current/ChangePassword`.
A token that is still valid can be renewed with `GET /api/v2/Users/Refresh`.

### Passing the token

Pass the service account token, or the contents of the `token` field, in each request as a Bearer token.
The documentation of the client-side tool calling Profinity describes how to do this for that tool.
From a command line, this request returns the latest sample of a tag:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Sample/<full-tag-path>
```

Replace `<token>` with the token and `<full-tag-path>` with the full path of the tag.

A call with a missing or expired token is answered with 401.
A call from a user that lacks the permission the route needs is answered with 403.
A client that signed in with a username and password and starts receiving 401 should sign in again or renew the token with `GET /api/v2/Users/Refresh`.
A client that uses a service account token and starts receiving 401 needs the current token from an administrator, because the old token stops working when a new one is generated or the account's roles change.

In Swagger, select the **Authorize** button at the top right of the screen and paste in the generated token:

<figure markdown>
![The Swagger Available authorizations dialog with an empty Value field, an Authorize button and a Close button](../../images/swagger_authorize_button.png)
<figcaption>Entering the token in Swagger</figcaption>
</figure>

## Accessing historical data via APIs

APIs can provide both realtime and historical data when an InfluxDB database is configured in the profile.
If no InfluxDB database is set up, only real-time data is available.

Historical data is retrieved in three steps.
The first two use `POST /api/v2/TagQuerySet`, which requires the `TagView` permission (**View tags**).

1. Configure an InfluxDB database in the profile.
2. Send `POST /api/v2/TagQuerySet` with a body that holds an optional `srcSetId` and a list of `bindings`. The response carries the matching values and a `srcSetId`.
    - Each binding names a tag `source` and a `store` of `Local` or `Logged`.
    - For the `Logged` store, a binding also carries the `timeRangeStart` and `timeRangeStop` of the InfluxDB range.
    - A `Logged` binding can also carry `seriesMode`, `aggregationWindow` and `aggregationFunction` values.
3. Send `GET /api/v2/TagQuerySet/Delta/{sourceSet}` to poll that set. It returns only the values that have changed since the previous poll.

Two further routes return the latest value of one item.
`GET /api/v2/DBC/{component}/{message}/{signal}` returns the latest local value of a single signal from a CAN database (DBC) and needs the `DBCView` permission (**View DBC definitions**).
`GET /api/v2/Tags/Sample/<full-tag-path>` returns the latest sample of a tag.

For more information on configuring InfluxDB, refer to [InfluxDB and Prometheus Logging](../../Components/Loggers/index.md).
