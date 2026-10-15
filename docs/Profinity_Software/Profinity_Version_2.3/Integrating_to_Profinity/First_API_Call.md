---
title: Make your first API call
description: "Authenticate to the Profinity REST API, then use the returned Bearer token to request the latest sample of a tag from a command line."
type: tutorial
owner: Documentation
last_reviewed: 2026-10-15
---

# Make your first API call

This tutorial authenticates to the Profinity REST API and then uses the returned Bearer token to request the latest sample of a tag.
At the end you have a token and have sent one authenticated request with `curl`.

## What you need

- A running Profinity instance. The APIs are running whenever Profinity is running. The examples use `localhost:18080`.
- The username and password of the Profinity user that the API calls run as. The user should be a dedicated account that holds only the permissions the client needs, and for this tutorial it needs the **View tags** permission.
  User accounts are created in **Users & Groups**, which is shown only when the licence includes the Profinity Server feature, as described in [Managing users](../Administration/Users_and_Access/Manage_Users.md).
- The full path of a tag. The Tag Explorer shows tag paths, and `GET /api/v2/Tags` lists them (add `?flat=true` for a flat list).

## Get a token

1. Send a POST request to `http://localhost:18080/api/v2/Users/Authenticate`, with the username and password of the Profinity user that the API calls run as in the JSON body.
   For example:

    ```json
    {
      "username": "admin",
      "password": "password"
    }
    ```

    An application that calls Profinity across a network should use HTTPS, because calling this API over HTTP can expose the password to network scanning.
    Custom applications running on the Profinity server can use the `localhost` address, which does not carry this risk.

2. Read the `token` field in the response.
   If the username and password are valid, Profinity responds to a non-browser client with a JSON body like this (the `permissions` list is abbreviated):

    ```json
    {
        "token": "eyJhbGciOi...",
        "refreshToken": "...",
        "username": "admin",
        "id": "admin",
        "permissions": ["TagView", "..."]
    }
    ```

    A user who must complete two-factor authentication or change a password first receives a `preAuthToken` with `requiresTwoFactor` or `requiresPasswordChange` set instead of a `token`, which is completed through `/api/v2/Users/Authenticate/TwoFactor` or `/api/v2/Users/Current/ChangePassword`.

## Call an endpoint with the token

Pass the contents of the `token` field in each request as a Bearer token.
From a command line, this request returns the latest sample of a tag:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Sample/{fullTagPath}
```

Replace `<token>` with the token and `{fullTagPath}` with the full path of the tag.
The response includes the `fullTagId`, `utcTimestamp`, `quality`, and `value` of the sample.
The call returns 404 unless the tag's quality is Good or Stale, and the tag must be visible to the user.

For the 401 and 403 responses and for renewing a token that is still valid, refer to [Profinity REST APIs](APIs/index.md#profinity-api-security).

## Next steps

- The Swagger page, available by adding `/swagger` to the URL that Profinity is running on, lists every route and the parameters it accepts.
  To try routes there, apply a token with the **Authorize** button, as described in [Profinity REST APIs](APIs/index.md#profinity-api-security).
  That page also covers historical data and the OpenAPI document.
- The [Endpoint Reference](APIs/Endpoint_Reference.md) lists the routes that complement the screens described elsewhere in the documentation.
- For a client that runs for a long time, use a [service account](../Administration/Users_and_Access/Service_Accounts.md), whose token never expires.
