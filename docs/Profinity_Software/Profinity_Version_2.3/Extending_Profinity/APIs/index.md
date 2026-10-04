---
title: Profinity REST APIs
description: "Overview of Profinity's REST API architecture, security authentication with Bearer tokens, and accessing realtime and historical data."
---

# Profinity REST APIs

Profinity V2 is a fully API native application with a modern architecture. It supports API security and an open interface model based around REST and JSON, which allows custom applications to use the Profinity APIs to add capabilities to a solution, to provide custom user interfaces, or to extend the out-of-the-box functionality.

As well as supporting RESTful APIs, Profinity allows completely custom user interfaces to be built on top of it and hosted either externally or within Profinity itself (see [Hosting](../Hosting/index.md)).

!!! info "Important Information Regarding Profinity REST APIs"
    Prohelion's API solution is currently evolving rapidly as Prohelion develops new capabilities, so the available APIs and models can change substantially from release to release. Allow for this when developing solutions based on the Profinity APIs.

!!! danger "API Users Can Damage Equipment"
    The Profinity APIs support security and can be encrypted, but an API user can change system and equipment state. Grant API access only to the users and applications that need it, and limit what each of them can do, so that nobody can accidentally damage the environment or equipment.

## Using Profinity APIs

Profinity V2 is built around its own APIs, so as of V2 all APIs are running whenever Profinity is running.

The [Swagger](https://swagger.io) interface for Profinity is available by adding `/swagger` to the URL that Profinity is running on, so for example if Profinity is running on `localhost:18080`, the Swagger UI is at `http://localhost:18080/swagger`.

<figure markdown>
![Showing the Profinity APIs](../../images/swagger.png)
<figcaption>Showing the Profinity APIs</figcaption>
</figure>
<br>


## Profinity API Security

Profinity APIs require a Bearer token, so testing them from the Swagger GUI means generating a token first and then providing it to Swagger. To generate the token, execute a call against the `/api/v2/Users/Authenticate` API in the Swagger GUI and apply the returned token with the **Authorize** button in the top right of the Swagger page.

To get a security token from any other client, send a POST request to the `/api/v2/Users/Authenticate` endpoint of the Profinity instance, with the username and password of the Profinity user that the API calls will run as in the JSON body. For example:

### Post request on http://localhost:18080/api/v2/Users/Authenticate

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
    "token": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzm9yZy93cy8yMDA1LzA1kZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJTeXN0ZW1SZWFkIiwiU3lzdGVtVXBkYXRlIiwiQ2d32thhcmdpbmciLCJDYW5Tdd1ZW5kUmVjZWl2ZSJdLCJleHAiOjE3NDUwNzkzOTAsImlzcyI6Ind3dy5wcm9oZWxpb24uY29tIiwiYXVkIjoid3d3LnByb2hlbGlvbi5jb20ifQ.9abNWiI32gNOaNHNvdMnIGCRHyRc7tExeVZlYtAm4r0",
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
<br>


A browser client receives the same session as cookies and a body without the token, and a user who must complete two-factor authentication or change a password first receives a `preAuthToken` with `requiresTwoFactor` or `requiresPasswordChange` set instead of a `token`, which is completed through `/api/v2/Users/Authenticate/TwoFactor` or `/api/v2/Users/Current/ChangePassword`. A token that is still valid can be renewed with `GET /api/v2/Users/Refresh`.

The contents of the `token` field must be passed in each subsequent request as a Bearer token, and the documentation of the client-side tool calling Profinity describes how to do this for that tool.

In Swagger the token is applied by clicking the **Authorize** button in the top right of the screen and pasting in the generated token:

<figure markdown>
![Entering the token in Swagger](../../images/swagger_authorize_button.png)
<figcaption>Entering the token in Swagger</figcaption>
</figure>
<br>


## Accessing Historical Data via APIs

APIs can provide both realtime and historical data when an InfluxDB database is configured in the profile. If no InfluxDB database is set up, only realtime data is available.

Historical data is retrieved with `POST /api/v2/TagQuerySet`, which requires the `TagView` permission. The request body holds an optional `srcSetId` and a list of `bindings`, and each binding names a tag `source`, a `store` of `Local` or `Logged`, and for the `Logged` store the `timeRangeStart` and `timeRangeStop` of the InfluxDB range together with optional `seriesMode`, `aggregationWindow` and `aggregationFunction` values. The response carries the matching values and a `srcSetId`, and `GET /api/v2/TagQuerySet/Delta/{sourceSet}` then returns only the values that have changed since the previous poll for that set. The latest local value of a single DBC signal is available from `GET /api/v2/DBC/{component}/{message}/{signal}`, and the latest sample of a tag from `GET /api/v2/Tags/Sample/{fullTagPath}`.

For more information on configuring InfluxDB see [InfluxDB and Prometheus Logging](../../Components/Loggers/InfluxDB_Prometheus_Logger.md).