---
title: Hosting Custom Applications
description: "Host custom applications using Profinity's integrated web server with optional SSL/TLS support."
---

# Hosting Custom Applications in Profinity

As well as hosting the REST APIs and Swagger interface, Profinity includes an integrated web server that can host a custom application built on those APIs in any modern web technology, including frameworks such as [ReactJS](https://react.dev/) and [Angular](https://angular.io) as well as traditional HTML and JavaScript.

Once the Extensions Web server is enabled in **System Configuration** (see [Extensions Web](../../Administration/System_Config.md#extensions-web)), the application is placed in the `webroot` folder of the [artifacts directory](../../Installation/Artifacts_Directory.md):

```text
{Artifacts}/webroot
```

By default the Profinity web server serves the `index.html` file from this folder when the calling web browser does not provide a URL path.

## Production Configuration and HTTPS

The Profinity web server supports SSL / TLS certificates for production environments. There are two options for providing a certificate: the Windows Certificate Store, or a certificate file and password, which works on Windows, macOS and Linux.

`HttpsRedirect` can be set to force all HTTP traffic to the HTTPS interface, in which case a second, HTTPS, interface must also be provided in the `Urls` option. Consider disabling Swagger in a production environment.

When using a certificate from the Windows Certificate Store, the `CertStoreName`, `CertStoreLocation` and `CertStoreSubject` properties must be provided in the configuration file.
