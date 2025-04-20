---
title: Hosting Custom Applications
---

As well as hosting the Rest APIs and Swagger interface, Profinity supports an integrated Web Server that can provide hosting for a custom build application based on these APIs in any modern web technology.  This includes language and frameworks such as [ReactJS](https://react.dev/) and [Angular](https://angular.io) as well as traditional HTML / Javascript etc.

Once the Extensions Web Server is enabled in the Administration Console, you can place you application here

`/Documents/Prohelion/Profinity/Webroot`

Or if you are running on MacOs or Linux under your home directory.

`$home/Prohelion/Profinity/Webroot`

By default the Profinity web server will serve the index.html file from this directory if no URL is provided by the calling web browser.

## Production Configuration and HTTPs

The Profinity Web Server supports SSL / TLS style certificates for Production environments.  There are two options available for certificates, either using a Windows Certificate Store or providing a Certificate file and Password, which works on either Windows or MacOS & Linux.

HttpsRedirect can be set for force all HTTP traffic to the HTTPs interface and second HTTPs interface should be provided in the Urls option in this case. You may consider disabling Swagger in a production environment.

When using a certification from a Windows Certificate store you will need to provide the CertStoreName, CertStoreLocation and CertStoreSubject properties in the configuration file