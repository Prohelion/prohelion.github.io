---
title: How to Configure Environment Variables
description: "Configure Profinity using environment variables for flexible deployments across Windows, Linux, macOS, and Docker environments."
---

# How to Configure Environment Variables

Use environment variables to configure Profinity for flexible deployments across different environments. This guide follows one worked example, changing the port of the Profinity web server, which applies to any other setting in the same way.

## Prerequisites

- Profinity 2.3 installed
- Access to `config.yaml`, which is in the `config` folder of the [artefacts directory](../Installation/Artifacts_Directory.md)
- The placeholder syntax described in [Environment Variables](../Installation/Environment_Variables.md)

## How Variables Are Used

Environment variables let one configuration serve several environments, so a setting changes without editing a file. Profinity substitutes a `${VARIABLE_NAME}` placeholder, or a `${VARIABLE_NAME:-default}` placeholder with a default value, when it loads a `config.yaml` or [profile](../Getting_Started/Profiles.md) file. A variable has an effect only where a placeholder references it, and Profinity itself reads `PROFINITY_HOME`, which sets the artefacts directory, and the key-material variables `PROFINITY_JWT_SIGNING_KEY`, `PROFINITY_ENCRYPTION_KEY` and `PROFINITY_JWT_RSA_PRIVATE_KEY_PEM`.

## Set the Variables

### Windows

1. Open **System Properties**, then **Environment Variables**
2. Add new variables or edit existing ones, for example `HTTP_PORT` set to `8080`
3. Click **OK** to save
4. Restart Profinity for changes to take effect

### Linux and macOS

1. Edit your shell profile (`.bashrc`, `.zshrc` or similar)
2. Add `export HTTP_PORT=8080`, or for a service set the variable in the systemd service file
3. Restart Profinity

### Docker

1. Set the variable in `docker-compose.yml`:
   ```yaml
   environment:
     - HTTP_PORT=8080
     - LOG_LEVEL=Info
   ```
2. Or use a `.env` file
3. Restart the containers

## Reference the Variables in config.yaml

In `config.yaml` or a profile file, add a placeholder wherever a value should come from the environment:

```yaml
appSettings:
  profinityServer:
    httpPort: ${HTTP_PORT:-18080}  # Use HTTP_PORT or default to 18080
    httpAddress: ${HTTP_ADDRESS:-0.0.0.0}
  logs:
    logLevel: ${LOG_LEVEL:-Info}
```

A placeholder without a default must have its variable set, or the configuration fails to load.

## Use Variables in Docker Compose

With [Docker](../Installation/Docker_Installation.md), create a `.env` file next to the compose file:

```env
HTTP_PORT=8080
LOG_LEVEL=Info
```

Reference the variables in `docker-compose.yml`:

```yaml
services:
  profinity:
    environment:
      - HTTP_PORT=${HTTP_PORT:-18080}
      - LOG_LEVEL=${LOG_LEVEL:-Info}
```

## Check the Result

Restart Profinity, then open the new port in a browser, for example `http://localhost:8080` for the worked example, and the Profinity login page or home page loads on the new port. A placeholder without a default whose variable is not set stops the configuration from loading, so if Profinity does not start, confirm that the variable is set in the environment of the process that starts Profinity, and see the [Profinity logs](../Getting_Started/Profinity_Log.md). In Docker, publish the same port number on the host and in the container, as described in [Docker Installation](../Installation/Docker_Installation.md).

## Example Environment Variables

The following names are used in the examples in this guide and are not read by Profinity unless a placeholder references them. The defaults apply only where a placeholder specifies them.

| Variable | Setting | Default used in the examples |
|----------|---------|------------------------------|
| `HTTP_PORT` | HTTP server port | `18080` |
| `HTTP_ADDRESS` | Address that the HTTP server listens on | `0.0.0.0` |
| `LOG_LEVEL` | Logging level: `Fatal`, `Error`, `Warn`, `Info`, `Debug` or `Trace` | `Info` |

## Related Documentation

- [Environment Variables](../Installation/Environment_Variables.md) - the full reference for syntax, defaults and supported files
- [Docker Installation](../Installation/Docker_Installation.md) - Docker environment setup
