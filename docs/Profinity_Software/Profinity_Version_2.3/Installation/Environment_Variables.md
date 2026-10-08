---
title: Environment Variables
description: "Configure Profinity using environment variable substitution in configuration and profile files for production deployments."
---

# Environment Variables in Profinity

Profinity supports environment variable substitution in its configuration file and in [profile](../Administration/Profiles.md) files, so one set of files can serve development, staging and production without hardcoding values, keep sensitive information out of the files, and let you change a setting without editing a file. This page covers the substitution syntax, how to set variables on each platform, and the variables that Profinity and its install scripts read themselves.

## Syntax

Environment variables use the `${VARIABLE_NAME}` syntax and are substituted when Profinity loads the configuration or a profile file. Profinity also supports Docker-style default values with the `${VARIABLE_NAME:-default}` syntax, where Profinity uses the value of the variable when it is set and non-empty, and the text after `:-` otherwise. A variable without a default must be set, or the file fails to load.

```yaml
# Variable without a default: must be set
httpAddress: ${HTTP_ADDRESS}

# Variable with a default: uses 18080 if HTTP_PORT is not set
httpPort: ${HTTP_PORT:-18080}

# Variable with an empty default: uses an empty string if the variable is not set
token: ${INFLUXDB_ADMIN_TOKEN:-}
```

### Variable Naming Rules

A variable name uses only letters, numbers and underscores, must not start with a number, and must be enclosed in `${}`, so `${PROFILE_NAME}`, `${BMU1_BASE_ADDRESS}`, `${_UNDERSCORE_VAR}` and `${VAR123}` are valid, while `${VAR-WITH-DASH}`, `${VAR WITH SPACES}` and `${VAR.WITH.DOTS}` are not. Profinity looks the name up exactly as written, so `${Profile_Name}` and `${profile_name}` are different variables on Linux and macOS, where environment variable names are case-sensitive, and the same variable on Windows, where they are not.

## Supported File Types

Substitution works in the main configuration file (`config.yaml`) and in the profile files (`profile.yaml`). Both files use camelCase keys and `version: "2.3"`.

### Configuration File

The following `config.yaml` takes the active profile, the web server address and port, the log settings and the scripting switch from environment variables:

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

With these environment variables set, Profinity listens on port 8080:

```env
PROFILE_NAME=Production Profile
HTTP_ADDRESS=0.0.0.0
HTTP_PORT=8080
LOG_LEVEL=Info
RETAINED_LOGS=20
```

In Docker, publish the same port number on the host and in the container, as described in [Docker Installation](./Docker_Installation.md).

### Profile File

The following `profile.yaml` takes the connection settings of an InfluxDB v2 historian from environment variables, so that the token never appears in the file:

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

```env
PROFILE_DESCRIPTION=Main production profile
INFLUXDB_ADMIN_TOKEN=example-token
INFLUXDB_ORG=prohelion
INFLUXDB_BUCKET=profinity
INFLUXDB_URL=http://localhost:8086
```

The same syntax works for any component setting in the profile file. See [Profiles](../Administration/Profiles.md) for the profile format.

## Variables Profinity Reads

Besides the variables that your own files reference, Profinity and its install scripts read the following variables.

| Variable | Read by | Effect |
|----------|---------|--------|
| `PROFINITY_HOME` | Profinity, `profinity.sh` | Sets the [artefacts directory](./Artifacts_Directory.md) and turns off automatic migration from older locations |
| `PROFINITY_INSTALL_ROOT` | `profinity.sh`, `update.sh` | Overrides the install root, which otherwise is the folder that holds the script |
| `DOTNET_ROOT` | `profinity.sh` | Sets the .NET install root for the portable edition |
| `PROFINITY_DOTNET_INSTALL_URL` | `profinity.sh` | Overrides the address that the portable edition downloads the .NET installer from |
| `PROFINITY_FILES_BASE` | `install.sh`, `update.sh` | Overrides the file server that releases are downloaded from |
| `PROFINITY_DOCKER_IMAGE` | `install-docker.sh` | Sets the Docker image that the one-line Docker installer uses |

## Setting Environment Variables

### Windows

In a command prompt, run `set PROFILE_NAME=Production Profile`, and in PowerShell, run `$env:PROFILE_NAME="Production Profile"`; either form lasts only for that window. To set a variable permanently, open **System Properties**, then **Advanced**, then **Environment Variables**, add the variable under **User** or **System** variables, and restart Profinity. When Profinity runs as a [Windows service](./Running_As_Service.md#windows-setup), add the variable as a **System** variable, because a user variable is not visible to a service that runs as another account, and restart the service, not only the application, so that it reads the new value.

### Linux and macOS

In a shell, run `export PROFILE_NAME="Production Profile"` to set a variable for that session, or add the same line to a shell profile file such as `~/.bashrc`, `~/.profile` or `~/.zshrc` for an interactive run. A service does not read those files, so for the Linux systemd service add `Environment=` lines to the `[Service]` section of `/etc/systemd/system/profinity.service`, for example `Environment=PROFILE_NAME="Production Profile"`, then run `sudo systemctl daemon-reload` and restart the service. See [Running as a Service](./Running_As_Service.md).

### Docker

In Docker, set variables in a `.env` file next to the compose file, in the `environment` section of the compose file, or with `docker run -e`:

```env
PROFILE_NAME=Production Profile
HTTP_PORT=8080
```

```bash
docker run -e PROFILE_NAME="Production Profile" \
           -e HTTP_PORT="8080" \
           prohelion/profinity:latest
```

```yaml
services:
  profinity:
    image: prohelion/profinity:latest
    environment:
      - PROFINITY_HOME=/app/Prohelion
      - PROFILE_NAME=Production Profile
      - HTTP_PORT=8080
    env_file:
      - .env
    ports:
      - "8080:8080"
    volumes:
      - $HOME/Prohelion:/app/Prohelion:rw
```

`PROFINITY_HOME` must match the container-side mount path, as described in [Docker Installation](./Docker_Installation.md). The variables in the `environment` section only affect the files that reference them with the `${VARIABLE_NAME}` syntax, such as `config.yaml` and the profile files stored in the mounted volume, and the host and container port numbers in the `ports` mapping must match the port that `config.yaml` listens on.

## Variable Behaviour

Profinity processes environment variables when it loads the configuration or a profile file. A defined variable is replaced by its value, so `ipAddress: ${ADAPTER_IP}` becomes `ipAddress: 192.168.1.100` when `ADAPTER_IP=192.168.1.100`, and variables can be mixed with static values in the same file.

!!! warning "A Missing Variable Stops the File From Loading"
    A configuration or profile file that references an undefined or empty variable with no default fails to load, and Profinity writes the names of the undefined variables to the log. Define every variable that has no default before starting Profinity, or give it a default with the `${VARIABLE_NAME:-default}` syntax.

## More Information

- [Profinity Profiles](../Administration/Profiles.md): profile management.
- [System Configuration](../Administration/System_Configuration/index.md): system-level configuration options.
- [Getting Started with Profiles](../Getting_Started/Profiles.md): basic profile concepts.
