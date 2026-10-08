---
title: Hosting Custom Applications
description: "Host a custom web application from Profinity's integrated web server, with optional HTTPS certificates."
---

# Hosting Custom Applications

As well as hosting the [REST APIs](../../Integrating_to_Profinity/APIs/index.md) and the Swagger interface, Profinity includes an integrated web server that hosts a custom application built on those APIs in any modern web technology, including frameworks such as [ReactJS](https://react.dev/) and [Angular](https://angular.io) as well as traditional HTML and JavaScript.

The Extensions Web server needs a licence that includes the Profinity Server feature and is disabled by default, so enable it in **System Configuration** first (see [Extensions Web](../../Administration/System_Configuration/Extensions_Web.md)). The application is then placed in the `webroot` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md):

```text
{Artifacts}/webroot
```

When a browser requests the server without a URL path, Profinity serves the `index.html` file from this folder, so with the default ports an application is opened at `http://<host>:19080/`, where `<host>` is the name or address of the Profinity machine.

## Production Configuration and HTTPS

The Profinity web server supports Secure Sockets Layer / Transport Layer Security (SSL/TLS) certificates for production environments. A certificate comes from either the Windows Certificate Store or a certificate file with its password (**Cert File**, **Cert File Password** and optionally **Cert Key File**), and the certificate file option works on Windows, macOS and Linux.

The **Redirect all Http traffic to Https** setting forces all HTTP traffic to the HTTPS interface. Saving the configuration with it enabled while HTTPS is disabled is rejected with the message "You can only redirect traffic if Https is enabled". The Extensions Web server listens on port 19080 for HTTP and 19443 for HTTPS by default, and these are set in the **IP Port for Http** and **IP Port for Https** fields. The **Enable Swagger on API** setting on the Extensions Web tab publishes the Swagger interface on this server, so turn it off in a production environment that does not need it.

When a certificate comes from the Windows Certificate Store, **Windows Cert Store**, **Windows Cert Store Location** and **Windows Cert Store Subject** must all be provided, and Profinity validates that the named store and certificate exist.

## Where Next

An application hosted here calls the same [APIs](../../Integrating_to_Profinity/APIs/index.md) that Profinity itself uses, and the [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md) tab describes the HTTPS certificate options in full.
