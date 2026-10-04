---
title: System Configuration
description: "Configure Profinity web server, HTTPS certificates, scripting, and extension web server settings."
---

# System Configuration

The **System Configuration** pill is located on the **ADMIN** page, which is opened by selecting **ADMIN** in the side menu, and contains the configuration options for the core Profinity instance. The Application Configuration, Profinity Web, and Extensions Web groups are described below, and the logging options are described in [Logs](Logs_Config.md#system-logs-configuration).

!!! warning "Changes to the system config"
    Saving changes in the `System Configuration` menu triggers a reboot of Profinity, whereas enabling or disabling components on the **Components & Plugins** page applies immediately without a restart. After the save, Profinity shows a "Restarting, please wait..." message and checks the engine every two seconds, then refreshes the settings automatically once the engine is running again, so the page does not need to be reloaded manually. If the engine has not returned to the running state within 60 seconds, Profinity reports that the restart is taking longer than expected, and the System Information page shows the current engine state.

## Application Configuration

| Parameter                          | Description |
|------------------------------------|--|
|`Maximum number of retained Packets`| Profinity retains CAN Packets for use in the CAN Utilities, and this parameter sets the number of packets retained. |
|`Custom Update Server`              | Profinity supports the use of Custom Update Servers for release management. If you are running the standard version of Profinity, leave this field blank. |
|`Enable Scripting`                  | This field must be selected for the Profinity instance to support scripting. Scripting requires security considerations and as such is not activated by default, and it can only be enabled when the Profinity licence includes the Scripting feature. |

Enabling the [MCP Server](../Extending_Profinity/MCP_Server.md) is configured from the **Profinity AI** settings page, not from System Configuration — see [Profinity AI settings](Security/AI_Assistant.md).

<figure markdown>
![Profinity System Configuration](../images/app_configuration.png)
<figcaption>Profinity System Configuration</figcaption>
</figure>

## Profinity Web

The Profinity Web menu allows you to configure all the parameters that control how Profinity offers its web server connections to users. Profinity supports both HTTP and HTTPS connections as well as custom HTTPS certificates.

<figure markdown>
![Profinity web menu](../images/profinity_web.png)
<figcaption>Profinity web menu</figcaption>
</figure>

| Parameter                          | Description |
|------------------------------------|--|
|`IP Address for Http`               | The IP address Profinity runs on for HTTP. The default is all IP addresses (0.0.0.0), however localhost (127.0.0.1) or a specific IP address can be set if required. |
|`IP Port for Http`                  | The port used for HTTP (default is 18080). Setting this below 1024 requires admin permissions. |
|`Enable Https`                      | Enable or disable the HTTPS server, which is enabled by default. |
|`IP Address for Https`              | Same as the HTTP address but for HTTPS (127.0.0.1 or 0.0.0.0). |
|`IP Port for Https`                 | Same as the HTTP port but for HTTPS (default is 18443). |
|`Redirect all Http traffic to Https`| Forces the system to use HTTPS for all traffic. |
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

## Extensions Web

Profinity can run a second, separate web server that serves custom applications and provides access to the same APIs that Profinity itself uses for all functionality. This second server is configured through the Extensions Web options, is disabled by default, and requires a licence that includes the Profinity Server feature.

By using the Extensions Web, Profinity can be configured to run custom Kiosk applications and custom web applications for vehicles, among others.

<figure markdown>
![Extensions web menu](../images/extensions_web.png)
<figcaption>Extensions web menu</figcaption>
</figure>

| Parameter                          | Description |
|------------------------------------|--|
|`Enable Profinity Web Server`       | Enable or disable the Profinity web server for extensions |
|`Enable Profinity API`              | Enable or disable the Profinity API in that instance of the Web Server for extensions |
|`Enable Swagger on API`             | Enable or disable [Swagger UI](https://swagger.io/tools/swagger-ui/) for API documentation |
|`IP Address for Http`               | The IP address the extensions web server runs on for HTTP. The default is all IP addresses (0.0.0.0), however localhost (127.0.0.1) or a specific IP address can be set if required. |
|`IP Port for Http`                  | The port used for HTTP (default is 19080, so that it does not collide with the main Profinity Web port of 18080). Setting this below 1024 requires admin permissions. |
|`Enable Https`                      | Enable or disable the HTTPS server for extensions, which is enabled by default. |
|`IP Address for Https`              | Same as the HTTP address but for HTTPS (127.0.0.1 or 0.0.0.0). |
|`IP Port for Https`                 | Same as the HTTP port but for HTTPS (default is 19443). |
|`Redirect all Http traffic to Https`| Forces the system to use HTTPS for all traffic. |
|`Windows Cert Store`                | When using HTTPS on Windows, you can specify a certificate from the Windows Certificate Store. This is typically used when you have a certificate installed in your system's certificate store. |
|`Windows Cert Store Location`       | The location of the certificate store. Common values are: `CurrentUser` (for user-specific certificates) or `LocalMachine` (for system-wide certificates). |
|`Windows Cert Store Subject`        | The subject name of the certificate as it appears in the Windows Certificate Store. This should match exactly with the certificate's subject name. |
|`Cert File`                         | Alternative to using the Windows Certificate Store, you can specify a certificate file (typically .pfx or .p12 format) for HTTPS. |
|`Cert File Password`                | If using a certificate file, provide the password used to protect the certificate file. |
|`Cert Key File`                     | The private key file (`.pem` or `.key`) when the certificate is in PEM format, which is optional because, when it is not specified, Profinity looks for a file named `privkey.pem` in the same folder as the certificate. |


