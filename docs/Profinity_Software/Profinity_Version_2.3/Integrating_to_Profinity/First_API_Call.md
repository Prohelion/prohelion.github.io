---
title: Make your first API call
description: "Authenticate to the Profinity REST API, then use the returned Bearer token to request the latest sample of a tag from a command line."
type: tutorial
owner: Documentation
last_reviewed: 2026-10-15
---

# Make your first API call

This tutorial signs in to the Profinity REST API with a username and password, then uses the returned Bearer token to request the latest sample of a tag.
At the end you have a token and have sent one authenticated request with `curl`.

## What you need

- A running Profinity instance. The APIs are running whenever Profinity is running. The examples use `localhost:18080`.
- The username and password of a Profinity user with the **View tags** permission.
- The full path of a tag. The Tag Explorer shows tag paths, and `GET /api/v2/Tags` lists them (add `?flat=true` for a flat list).

For a long-running or unattended client, use a [service account](../Administration/Users_and_Access/Service_Accounts.md) token instead.
A service account token is already a Bearer token, so you can skip to [Call an endpoint with the token](#call-an-endpoint-with-the-token).
For two-factor authentication and password changes at sign-in, refer to [Authenticate to the Profinity REST API](APIs/API_Authentication.md#sign-in-with-a-username-and-password).

## Get a token

1. Send a POST request to `http://localhost:18080/api/v2/Users/Authenticate`.
2. Put the username and password in the JSON body:

    ```json
    {
      "username": "admin",
      "password": "password"
    }
    ```

    An application that calls Profinity across a network should use HTTPS, because calling this API over HTTP can expose the password to network scanning.
    Custom applications running on the Profinity server can use the `localhost` address, which does not carry this risk.

    !!! warning "Keep passwords out of scripts"
        Do not put a real password in a script, in shell history, or in a file under version control.
        For an application that runs unattended, use a service account instead.

3. Read the `token` field in the response.
   Profinity responds to a non-browser client with a JSON body like this (the `permissions` list is abbreviated):

    ```json
    {
        "token": "eyJhbGciOi...",
        "refreshToken": "...",
        "username": "admin",
        "id": "admin",
        "permissions": ["TagView", "..."]
    }
    ```

## Call an endpoint with the token

Pass the contents of the `token` field in each request as a Bearer token.
From a command line, this request returns the latest sample of a tag:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Sample/<full-tag-path>
```

Replace `<token>` with the token and `<full-tag-path>` with the full path of the tag, for example `MyBMS/DBC/MessageName/SignalName`.

The response is a JSON object like this (the values are examples):

```json
{
    "fullTagId": "MyBMS/DBC/MessageName/SignalName",
    "utcTimestamp": "2026-10-21T01:23:45.6789012Z",
    "quality": "Good",
    "reason": "ok",
    "value": 3.31
}
```

The `fullTagId` field is the path you requested, `utcTimestamp` is when the sample was taken, and `quality` and `value` give its state and reading.
The call returns 404 unless the tag's quality is Good or Stale, and the tag must be visible to the user.
If the sample appears, the call worked.
For the 401 and 403 responses and for renewing a token that is still valid, refer to [Authenticate to the Profinity REST API](APIs/API_Authentication.md#pass-the-token-in-requests).

## Next steps

- Open the Swagger page, the interactive API page on your Profinity instance, by adding `/swagger` to the URL that Profinity is running on.
  It lists every route and the parameters it accepts.
  To try routes there, apply a token with the **Authorize** button, as described in [Authenticate to the Profinity REST API](APIs/API_Authentication.md#pass-the-token-in-requests).
- Refer to [Read real-time and historical tag data](APIs/Read_Tag_Data.md) for historical data, and [Profinity REST APIs](APIs/index.md) for the OpenAPI document.
- Refer to the [Endpoint Reference](APIs/Endpoint_Reference.md) for the routes that complement the screens described elsewhere in the documentation.
