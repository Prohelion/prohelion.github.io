---
title: Extensions Web
description: "Configure the second web server that hosts custom applications and the Profinity API."
---

# Extensions Web

!!! warning "Saving restarts Profinity"
    Saving changes on any System Configuration tab restarts Profinity. See [System Configuration](index.md) for what to expect.

Profinity can run a second, separate web server that serves custom applications and provides access to the same APIs that Profinity itself uses for all functionality. This second server is configured through the Extensions Web tab, is disabled by default, and requires a licence that includes the Profinity Server feature.

By using the Extensions Web, Profinity can be configured to run custom Kiosk applications and custom web applications for vehicles, among others.

<figure markdown>
![Extensions web menu](../../images/extensions_web.png)
<figcaption>Extensions web menu</figcaption>
</figure>

The HTTP, HTTPS and certificate options are the same as on the [Web tab](Profinity_Web.md) (see [HTTPS certificates](Profinity_Web.md#https-certificates)), except for the default ports (19080 for HTTP and 19443 for HTTPS, so that they do not collide with the main Profinity Web ports) and these additional options:

| Parameter                          | Description |
|------------------------------------|--|
|`Enable Profinity Web Server`       | Enable or disable the Profinity web server for extensions |
|`Enable Profinity API`              | Enable or disable the Profinity API in that instance of the Web Server for extensions |
|`Enable Swagger on API`             | Enable or disable [Swagger UI](https://swagger.io/tools/swagger-ui/) for API documentation. It can only be enabled when the Profinity API is enabled. |
