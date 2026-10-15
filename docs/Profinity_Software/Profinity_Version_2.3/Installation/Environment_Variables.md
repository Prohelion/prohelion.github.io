---
title: Environment variables
description: "Look up the ${VARIABLE_NAME} placeholder syntax for Profinity configuration and profile files, example files, and the variables Profinity reads."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Environment variables

Profinity substitutes environment variables into its configuration file (`config.yaml`) and into [profile](../Administration/Profiles.md) files, so one set of files can serve development, staging, and production, keep sensitive values out of the files, and let you change a setting without editing a file.
A variable has an effect only where a `${VARIABLE_NAME}` placeholder in one of those files references it.
To set a variable on Windows, Linux, macOS, or Docker, refer to [Set environment variables](./Set_Environment_Variables.md).

## Placeholder syntax

A placeholder uses the form `${VARIABLE_NAME}`.
Profinity also supports Docker-style default values with `${VARIABLE_NAME:-default}`, where it uses the value of the variable when it is set and non-empty, and the text after `:-` otherwise.

```yaml
# Variable without a default: must be set
httpAddress: ${HTTP_ADDRESS}

# Variable with a default: uses 18080 if HTTP_PORT is not set
httpPort: ${HTTP_PORT:-18080}

# Variable with an empty default: uses an empty string if the variable is not set
token: ${INFLUXDB_ADMIN_TOKEN:-}
```

A name uses only letters, numbers and underscores, and must not start with a number.
So `${PROFILE_NAME}`, `${BMU1_BASE_ADDRESS}` and `${_UNDERSCORE_VAR}` are valid, while `${VAR-WITH-DASH}`, `${VAR WITH SPACES}` and `${VAR.WITH.DOTS}` are not.
Profinity looks the name up exactly as written, so `${Profile_Name}` and `${profile_name}` are different variables on Linux and macOS, where names are case-sensitive, and the same variable on Windows, where they are not.

!!! warning "A missing variable stops the file from loading"
    A configuration or profile file that references an undefined or empty variable with no default fails to load, and Profinity writes the names of the undefined variables to the log. Define every variable that has no default before starting Profinity, or give it a default.

### In the configuration file

This `config.yaml` takes the active profile, the web server address and port, the log settings and the scripting switch from environment variables:

```yaml
version: "2.3"
activeProfile: ${PROFILE_NAME:-Docker Profile}

appSettings:
  profinityServer:
    httpAddress: ${HTTP_ADDRESS:-0.0.0.0}
    httpPort: ${HTTP_PORT:-18080}
  logs:
    logLevel: ${LOG_LEVEL:-Info}
    rollsizeMB: ${LOG_ROLLSIZE:-10}
    retainedLogs: ${RETAINED_LOGS:-10}
  scripts:
    enabled: ${ENABLE_SCRIPTING:-false}
```

### In a profile file

This `profile.yaml` takes the connection settings of an InfluxDB v2 historian from environment variables, so the token never appears in the file:

```yaml
description: ${PROFILE_DESCRIPTION}
version: "2.3"
kioskModeEnabled: false
useCustomProfileDashboard: false
components:
- component:
    token: ${INFLUXDB_ADMIN_TOKEN}
    organisation: ${INFLUXDB_ORG}
    bucket: ${INFLUXDB_BUCKET}
    url: ${INFLUXDB_URL}
    healthCheck: true
    intervalSec: 10
    logType: Snapshot
    autoStart: false
    type: InfluxDbHistorianV2
    id: InfluxDbLoggerV21
    tagTreeParentPath: /
    name: InfluxDbLogger
```

The same syntax works for any component setting in a profile file.

## Variables Profinity reads

Besides the variables that your own files reference, Profinity and its install scripts read these variables.

| Variable | Read by | Effect |
|----------|---------|--------|
| `PROFINITY_HOME` | Profinity, `profinity.sh` | Sets the [artefacts directory](./Artifacts_Directory.md) and turns off automatic migration from older locations |
| `PROFINITY_INSTALL_ROOT` | `profinity.sh`, `update.sh` | Overrides the install root, which otherwise is the folder that holds the script |
| `DOTNET_ROOT` | `profinity.sh` | Sets the .NET install root for the portable edition |
| `PROFINITY_DOTNET_INSTALL_URL` | `profinity.sh` | Overrides the address that the portable edition downloads the .NET installer from |
| `PROFINITY_FILES_BASE` | `install.sh`, `update.sh` | Overrides the file server that releases are downloaded from |
| `PROFINITY_DOCKER_IMAGE` | `install-docker.sh` | Sets the Docker image that the one-line Docker installer uses |

The [Profiles](../Administration/Profiles.md) page covers the profile format, and [System configuration](../Administration/System_Configuration/index.md) covers the other settings in `config.yaml`.
