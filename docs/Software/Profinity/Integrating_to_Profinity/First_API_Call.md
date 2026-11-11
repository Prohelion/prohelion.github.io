---
title: Make your first API call
description: "Authenticate to the Profinity REST API, then use the returned Bearer token to request the latest sample of a tag from a command line."
type: tutorial
owner: Documentation
last_reviewed: 2026-11-11
---

# Make your first API call

In this tutorial you sign in to the Profinity Representational State Transfer (REST) API from a command line, and use the token it returns to read the latest value of a tag.
At the end you have a token and a JSON response that holds the tag's current value.

## What you need

- A running Profinity instance on the same computer, which answers at `http://localhost:18080`. The API runs whenever Profinity runs.
- The user name and password of a Profinity user with the **View tags** permission.
- The full path of a tag that currently has a value, such as `MyBMS/DBC/MessageName/SignalName`. **TAG EXPLORER** shows each tag's path and current value.
- `curl`, which macOS, Linux, and Windows include, and on Windows, PowerShell.

The tutorial uses `localhost`, so the password does not cross the network.
An application on another computer needs HTTPS, as described in [Authenticate to the Profinity REST API](APIs/API_Authentication.md#sign-in-with-a-username-and-password).

## Get a token

1. Run the command for your operating system. Replace `<username>` and `<password>` with the user's sign-in details.

    === "macOS or Linux"

        ```bash
        curl -X POST http://localhost:18080/api/v2/Users/Authenticate \
          -H "Content-Type: application/json" \
          -d '{"username": "<username>", "password": "<password>"}'
        ```

    === "Windows"

        Run this command in PowerShell:

        ```powershell
        Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Users/Authenticate -ContentType "application/json" -Body '{"username": "<username>", "password": "<password>"}'
        ```

        PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

2. Find the `token` field in the response. The response looks like this, with the `permissions` list shortened:

    ```json
    {
        "token": "eyJhbGciOi...",
        "refreshToken": "...",
        "username": "admin",
        "id": "admin",
        "permissions": ["TagView", "..."]
    }
    ```

3. Copy the value of `token`, without the quotation marks.

If the response holds a `token`, you have signed in.

!!! warning "Keep passwords out of scripts"
    Do not put a real password in a script, in shell history, or in a file under version control.
    For an application that runs unattended, use a [service account](../Administration/Users_and_Access/Service_Accounts.md), whose token does not expire.

## Call an endpoint with the token

1. Run the command for your operating system. Replace `<token>` with the token you copied, and `<tag path>` with the full path of your tag.

    === "macOS or Linux"

        ```bash
        curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Sample/<tag path>
        ```

    === "Windows"

        Run this command in PowerShell, where `curl.exe` is needed because `curl` there is a name for another command:

        ```powershell
        curl.exe -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Sample/<tag path>
        ```

2. Check the response. It is a JSON object like this, with your tag's values:

    ```json
    {
        "fullTagId": "MyBMS/DBC/MessageName/SignalName",
        "utcTimestamp": "2026-10-21T01:23:45.6789012Z",
        "quality": "Good",
        "reason": "ok",
        "value": 3.31
    }
    ```

`fullTagId` is the path you asked for, `utcTimestamp` is when the sample was taken, and `quality` and `value` give its state and reading.
If the response shows your tag's value, the call worked.

| What you see | Cause | What to do |
|---|---|---|
| `404` | The path does not match a tag, the tag has no Good or Stale value at the moment, or the user cannot see the tag. | Copy the path from **TAG EXPLORER**, check that the tag shows a value there, and check that the user can see its component. |
| `401` | The token is missing, mistyped, or has expired. | Get a new token, as in [Get a token](#get-a-token). For the other causes, refer to [Fix 401 and 403 responses](APIs/API_Authentication.md#fix-401-and-403-responses). |
| `403` | The user does not have the **View tags** permission. | Give the user a role that holds **View tags**. |

## Next steps

- Read a window of past values with [Read real-time and historical tag data](APIs/Read_Tag_Data.md).
- Open the Swagger page, which lists every route and its parameters, by adding `/swagger` to the Profinity address. Apply your token there with **Authorize**, as described in [Pass the token in requests](APIs/API_Authentication.md#pass-the-token-in-requests).
- Look up a route in the [Endpoint Reference](APIs/Endpoint_Reference.md).
