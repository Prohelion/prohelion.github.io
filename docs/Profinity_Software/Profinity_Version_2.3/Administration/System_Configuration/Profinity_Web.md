---
title: Profinity Web
description: "Configure the main Profinity HTTP and HTTPS web server and its certificates."
---

# Profinity Web

!!! warning "Saving restarts Profinity"
    Saving changes on any System Configuration tab restarts Profinity. See [System Configuration](index.md) for what to expect.

The Web tab allows you to configure all the parameters that control how Profinity offers its web server connections to users. Profinity supports both HTTP and HTTPS connections as well as custom HTTPS certificates.

<figure markdown>
![Profinity web menu](../../images/profinity_web.png)
<figcaption>Profinity web menu</figcaption>
</figure>

| Parameter                          | Description |
|------------------------------------|--|
|`IP Address for Http`               | The IP address Profinity runs on for HTTP. The default is all IP addresses (0.0.0.0), however localhost (127.0.0.1) or a specific IP address can be set if required. |
|`IP Port for Http`                  | The port used for HTTP (default is 18080). Setting this below 1024 requires admin permissions. |
|`Enable Https`                      | Enable or disable the HTTPS server, which is enabled by default. |
|`IP Address for Https`              | Same as the HTTP address but for HTTPS (127.0.0.1 or 0.0.0.0). |
|`IP Port for Https`                 | Same as the HTTP port but for HTTPS (default is 18443). |
|`Redirect all Http traffic to Https`| Forces the system to use HTTPS for all traffic. It can only be enabled when HTTPS is enabled. |

The certificate options are shared with the Extensions Web tab and are described in [HTTPS certificates](#https-certificates) below.

## HTTPS certificates

These options apply to both the Web and [Extensions Web](Extensions_Web.md) tabs, and each server has its own copy of them.

| Parameter                          | Description |
|------------------------------------|--|
|`Windows Cert Store`                | When using HTTPS on Windows, you can specify a certificate from the Windows Certificate Store. This is typically used when you have a certificate installed in your system's certificate store. |
|`Windows Cert Store Location`       | The location of the certificate store. Common values are: `CurrentUser` (for user-specific certificates) or `LocalMachine` (for system-wide certificates). |
|`Windows Cert Store Subject`        | The subject name of the certificate as it appears in the Windows Certificate Store. This should match exactly with the certificate's subject name. |
|`Cert File`                         | Alternative to using the Windows Certificate Store, you can specify a certificate file (typically .pfx or .p12 format) for HTTPS. |
|`Cert File Password`                | If using a certificate file, provide the password used to protect the certificate file. |
|`Cert Key File`                     | The private key file (`.pem` or `.key`) when the certificate is in PEM format, which is optional because, when it is not specified, Profinity looks for a file named `privkey.pem` in the same folder as the certificate. |

!!! tip "Finding Certificate Information on Windows"
    To find the correct certificate store location and subject name:

    1. Open Windows Certificate Manager (`certmgr.msc`)
    2. Navigate to the appropriate store (Personal, Trusted Root, etc.)
    3. Find your certificate and double-click it
    4. The subject name is listed in the "Subject" field
    5. The store location is shown in the certificate manager's navigation tree
