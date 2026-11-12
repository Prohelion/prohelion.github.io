---
title: Hosting custom applications
description: "Host a custom web application from Profinity's integrated web server and secure it with HTTPS certificates for production use."
type: concept
owner: Documentation
last_reviewed: 2026-10-14
---

# Hosting custom applications

Profinity includes an integrated web server that hosts a custom application built on the [Profinity REST APIs](../../Integrating_to_Profinity/APIs/index.md), in any modern web technology.
The same server publishes the APIs, and publishes the Swagger interface, which is the interactive API page on your Profinity instance, when **Enable Swagger on API** is on.
That setting is off by default.
Frameworks such as [ReactJS](https://react.dev/) and [Angular](https://angular.io) work, as do traditional HTML and JavaScript.

The Extensions Web server needs the Profinity Server licensed feature, which the Server and Enterprise editions include.
Refer to [Licensing](../../Licensing.md) for what each edition includes.
It is disabled by default, so enable it in **System Configuration** first, as described in [Extensions Web](../../Administration/System_Configuration/Extensions_Web.md).
Then place the application in the `webroot` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md):

```text
{Artifacts}/webroot
```

When a browser requests the server without a URL path, Profinity serves the `index.html` file from this folder.
With the default ports, open the application at `http://<host>:19080/`.
`<host>` is the name or address of the Profinity machine.

## Production configuration and HTTPS

The Extensions Web server supports Secure Sockets Layer / Transport Layer Security (SSL/TLS) certificates for production environments.
A certificate comes from either the Windows Certificate Store or a certificate file with its password.
The certificate file option works on Windows, macOS, and Linux.

When a certificate comes from the Windows Certificate Store, provide all of **Windows cert store**, **Windows cert store location**, and **Windows cert store subject**.
Profinity validates that the named store and certificate exist.

The options are the same as on the **Web** tab, described in [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md), including the certificate options. Refer to [Extensions Web](../../Administration/System_Configuration/Extensions_Web.md) for the **Enable Swagger on API** setting.

These settings are on the **Extensions web** tab.
The **Web** tab has its own copy of the same settings for the Profinity web interface, with default ports 18080 and 18443.

Saving the configuration with **Redirect all HTTP traffic to HTTPS** enabled while **Enable HTTPS** is off is rejected with the message "You can only redirect traffic if Https is enabled".
Turn off **Enable Swagger on API** in a production environment that does not need it.

An application hosted here calls the same [Profinity REST APIs](../../Integrating_to_Profinity/APIs/index.md) that Profinity itself uses.
For the HTTPS certificate options in full, refer to [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md).
