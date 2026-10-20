---
title: Hosting custom applications
description: "Host a custom web application from Profinity's integrated web server and secure it with HTTPS certificates for production use."
type: concept
owner: Documentation
last_reviewed: 2026-10-14
---

# Hosting custom applications

As well as hosting the [REST APIs](../../Integrating_to_Profinity/APIs/index.md) and the Swagger interface, Profinity includes an integrated web server that hosts a custom application built on those APIs in any modern web technology.
Frameworks such as [ReactJS](https://react.dev/) and [Angular](https://angular.io) work, as do traditional HTML and JavaScript.

The Extensions Web server needs a licence that includes the Profinity Server feature and is disabled by default, so enable it in **System Configuration** first, as described in [Extensions Web](../../Administration/System_Configuration/Extensions_Web.md).
The application is then placed in the `webroot` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md):

```text
{Artifacts}/webroot
```

When a browser requests the server without a URL path, Profinity serves the `index.html` file from this folder, so with the default ports an application is opened at `http://<host>:19080/`, where `<host>` is the name or address of the Profinity machine.

## Production configuration and HTTPS

The Profinity web server supports Secure Sockets Layer / Transport Layer Security (SSL/TLS) certificates for production environments.
A certificate comes from either the Windows Certificate Store or a certificate file with its password, and the certificate file option works on Windows, macOS, and Linux.
When a certificate comes from the Windows Certificate Store, **Windows Cert Store**, **Windows Cert Store Location**, and **Windows Cert Store Subject** must all be provided, and Profinity validates that the named store and certificate exist.

| Setting | Effect |
|---------|--------|
| **Cert File** | The certificate file. |
| **Cert File Password** | The password for the certificate file. |
| **Cert Key File** | Optional. |
| **IP Port for Http** | The HTTP port. The default is 19080. |
| **IP Port for Https** | The HTTPS port. The default is 19443. |
| **Redirect all Http traffic to Https** | Forces all HTTP traffic to the HTTPS interface. |
| **Enable Swagger on API** | Publishes the Swagger interface on this server. This setting is on the Extensions Web tab. |

These settings are on the Extensions Web tab.
The Web tab has its own copy of the same settings for the Profinity web interface, with default ports 18080 and 18443.

Saving the configuration with **Redirect all Http traffic to Https** enabled while HTTPS is disabled is rejected with the message "You can only redirect traffic if Https is enabled".
Turn off **Enable Swagger on API** in a production environment that does not need it.

An application hosted here calls the same [APIs](../../Integrating_to_Profinity/APIs/index.md) that Profinity itself uses, and the [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md) tab describes the HTTPS certificate options in full.
