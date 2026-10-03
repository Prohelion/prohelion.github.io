---
title: System Configuration
description: "Configure Profinity web server, HTTPS certificates, scripting, and extension web server settings."
---

# System Configuration

The `System Configuration` menu is located in the `ADMIN` tab and contains the configuration options for the core Profinity instance. The Application Configuration, Profinity Web, and Extensions Web groups are described below, and the logging options are described in [Logs](Logs_Config.md#system-logs-configuration).

!!! warning "Changes to the system config"
    Modifying any parameters in the `System Configuration` menu triggers a reboot of Profinity. If using the web client, wait around 15 seconds after saving the changes before reloading the page. On the desktop client, the page reloads automatically after the engine reboots.

## Application Configuration

| Parameter                          | Description |
|------------------------------------|--|
|`Maximum number of retained Packets`| Profinity retains CAN Packets for use in the CAN Utilities, and this parameter sets the number of packets retained. |
|`Custom Update Server`              | Profinity supports the use of Custom Update Servers for release management. If you are running the standard version of Profinity, leave this field blank. |
|`Enable Scripting`                  | This field must be selected for the Profinity instance to support scripting. Scripting requires security considerations and as such is not activated by default. |

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
|`IP Address for Http`               | The IP address Profinity runs on for HTTP. By default this is localhost (127.0.0.1) or all IP addresses (0.0.0.0), however a specific IP address can be set if required. |
|`IP Port for Http`                  | The port used for HTTP (default is 18080). Setting this below 1024 requires admin permissions. |
|`IP Address for Https`              | Same as the HTTP address but for HTTPS (127.0.0.1 or 0.0.0.0). |
|`IP Port for Https`                 | Same as the HTTP port but for HTTPS. |
|`Redirect all Http traffic to Https`| Forces the system to use HTTPS for all traffic. |
|`Windows Cert Store`                | When using HTTPS on Windows, you can specify a certificate from the Windows Certificate Store. This is typically used when you have a certificate installed in your system's certificate store. |
|`Windows Cert Store Location`       | The location of the certificate store. Common values are: `CurrentUser` (for user-specific certificates) or `LocalMachine` (for system-wide certificates). |
|`Windows Cert Store Subject`        | The subject name of the certificate as it appears in the Windows Certificate Store. This should match exactly with the certificate's subject name. |
|`Cert File`                         | Alternative to using the Windows Certificate Store, you can specify a certificate file (typically .pfx or .p12 format) for HTTPS. |
|`Cert File Password`                | If using a certificate file, provide the password used to protect the certificate file. |

!!! tip "Finding Certificate Information on Windows"
    To find the correct certificate store location and subject name:

    1. Open Windows Certificate Manager (`certmgr.msc`)
    2. Navigate to the appropriate store (Personal, Trusted Root, etc.)
    3. Find your certificate and double-click it
    4. The subject name is listed in the "Subject" field
    5. The store location is shown in the certificate manager's navigation tree

## Extensions Web

Profinity's web server can be extended to run your custom applications and provides access to the same APIs that Profinity itself uses for all functionality. This extension is handled through the Extensions Web configuration options.

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
|`IP Address for Http`               | The IP address the extensions web server runs on for HTTP. By default this is localhost (127.0.0.1) or all IP addresses (0.0.0.0), however a specific IP address can be set if required. |
|`IP Port for Http`                  | The port used for HTTP (default is 18080). Setting this below 1024 requires admin permissions. |
|`IP Address for Https`              | Same as the HTTP address but for HTTPS (127.0.0.1 or 0.0.0.0). |
|`IP Port for Https`                 | Same as the HTTP port but for HTTPS. |
|`Redirect all Http traffic to Https`| Forces the system to use HTTPS for all traffic. |
|`Windows Cert Store`                | When using HTTPS on Windows, you can specify a certificate from the Windows Certificate Store. This is typically used when you have a certificate installed in your system's certificate store. |
|`Windows Cert Store Location`       | The location of the certificate store. Common values are: `CurrentUser` (for user-specific certificates) or `LocalMachine` (for system-wide certificates). |
|`Windows Cert Store Subject`        | The subject name of the certificate as it appears in the Windows Certificate Store. This should match exactly with the certificate's subject name. |
|`Cert File`                         | Alternative to using the Windows Certificate Store, you can specify a certificate file (typically .pfx or .p12 format) for HTTPS. |
|`Cert File Password`                | If using a certificate file, provide the password used to protect the certificate file. |


