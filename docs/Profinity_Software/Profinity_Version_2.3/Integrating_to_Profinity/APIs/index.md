---
title: Profinity REST APIs
description: "Overview of Profinity's REST API architecture, security authentication with Bearer tokens, and accessing realtime and historical data."
---

# Profinity REST APIs

Profinity V2 is built around its own Representational State Transfer (REST) APIs, which exchange JSON and are secured with Bearer tokens. Custom applications use the APIs to add capabilities to a solution, to provide custom user interfaces, or to extend the out-of-the-box functionality, and a custom user interface can be hosted either externally or within Profinity itself (see [Hosting](../../Customising_Profinity/Hosting/index.md)).

!!! info "The API Contract in Profinity 2.3"
    As of Profinity 2.3, `/api/v2` is the published shape of the REST API, errors are returned as `application/problem+json` documents, and the OpenAPI document that describes every route is checked against a committed snapshot, so an unreviewed change to a route or model is caught before release. Areas that are still being developed, such as firmware, can change between releases, and a client built on them should be tested against each new release.

The OpenAPI document is served at `/swagger/v2/swagger.json`, which API tools and AI skills can import to generate a client or to read the available routes and models.

!!! warning "API Users Can Damage Equipment"
    The Profinity APIs support security and can be encrypted, but an API user can change system and equipment state. Grant API access only to the users and applications that need it, and limit what each of them can do, so that nobody can accidentally damage the environment or equipment.

## Using Profinity APIs

Profinity V2 is built around its own APIs, so the APIs are running whenever Profinity is running. The **Enable Profinity API** and **Enable Swagger on API** settings apply to the Profinity Web server for extensions only (see [Extensions Web](../../Administration/System_Configuration/Extensions_Web.md)), and the main Profinity host always publishes the API and Swagger.

The [Swagger](https://swagger.io) interface for Profinity is available by adding `/swagger` to the URL that Profinity is running on, so for example if Profinity is running on `localhost:18080`, the Swagger UI is at `http://localhost:18080/swagger`.

<figure markdown>
![Showing the Profinity APIs](../../images/swagger.png)
<figcaption>Showing the Profinity APIs</figcaption>
</figure>

## Profinity API Security

Profinity APIs require a Bearer token, so testing them from the Swagger GUI means generating a token first and then providing it to Swagger. To generate the token, execute a call against the `/api/v2/Users/Authenticate` API in the Swagger GUI and apply the returned token with the **Authorize** button in the top right of the Swagger page.

To get a security token from any other client, send a POST request to `http://localhost:18080/api/v2/Users/Authenticate`, with the username and password of the Profinity user that the API calls will run as in the JSON body. The user should be a dedicated account that holds only the permissions the client needs, and a client that runs for a long time should use a [service account](../../Administration/Users_and_Access/Service_Accounts.md). For example:

```json
{
  "username": "admin",
  "password": "password"
}
```
!!! warning "Use HTTPS to Protect Passwords"
    Calling this API over an HTTP connection can expose the password to network scanning. Custom applications running on the Profinity server can use the `localhost` address, which does not carry this risk, while an application that calls Profinity across a network should use HTTPS for all API usage.

If the username and password are valid, Profinity responds to a non-browser client with a JSON body that carries the access `token`, a `refreshToken` (omitted for service accounts, whose tokens do not expire), the `username`, an `id` and the user's `permissions`, like this (the `permissions` list is abbreviated):

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
![Generating an Authorization token via Swagger](../../images/swagger_authentication.png)
<figcaption>Generating an Authorization token via Swagger</figcaption>
</figure>

A browser client receives the same session as cookies and a body without the token, and a user who must complete two-factor authentication or change a password first receives a `preAuthToken` with `requiresTwoFactor` or `requiresPasswordChange` set instead of a `token`, which is completed through `/api/v2/Users/Authenticate/TwoFactor` or `/api/v2/Users/Current/ChangePassword`. A token that is still valid can be renewed with `GET /api/v2/Users/Refresh`.

The contents of the `token` field must be passed in each subsequent request as a Bearer token, and the documentation of the client-side tool calling Profinity describes how to do this for that tool. From a command line, `curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Sample/{fullTagPath}` returns the latest sample of a tag. A call with a missing or expired token is answered with 401, and a call from a user that lacks the permission the route needs is answered with 403, so a client that starts receiving 401 should sign in again or renew the token with `GET /api/v2/Users/Refresh`.

In Swagger the token is applied by clicking the **Authorize** button in the top right of the screen and pasting in the generated token:

<figure markdown>
![Entering the token in Swagger](../../images/swagger_authorize_button.png)
<figcaption>Entering the token in Swagger</figcaption>
</figure>

## Accessing Historical Data via APIs

APIs can provide both realtime and historical data when an InfluxDB database is configured in the profile. If no InfluxDB database is set up, only realtime data is available.

Historical data is retrieved in three steps, and the first two use `POST /api/v2/TagQuerySet`, which requires the `TagView` permission (**View tags**).

1. Configure an InfluxDB database in the profile.
2. Send `POST /api/v2/TagQuerySet` with a body that holds an optional `srcSetId` and a list of `bindings`. Each binding names a tag `source` and a `store` of `Local` or `Logged`. For the `Logged` store a binding also carries the `timeRangeStart` and `timeRangeStop` of the InfluxDB range, with optional `seriesMode`, `aggregationWindow` and `aggregationFunction` values. The response carries the matching values and a `srcSetId`.
3. Send `GET /api/v2/TagQuerySet/Delta/{sourceSet}` to poll that set, which returns only the values that have changed since the previous poll.

Two further routes return the latest value of one item: `GET /api/v2/DBC/{component}/{message}/{signal}` returns the latest local value of a single DBC signal and needs the `DBCView` permission (**View DBC definitions**), and `GET /api/v2/Tags/Sample/{fullTagPath}` returns the latest sample of a tag.

For more information on configuring InfluxDB see [InfluxDB and Prometheus Logging](../../Components/Loggers/InfluxDB_Prometheus_Logger.md).