---
title: Environment variables
description: "Set Profinity configuration and profile values from environment variables with the ${VARIABLE_NAME} placeholder, and see the variables Profinity reads."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Environment variables

Profinity substitutes environment variables into its configuration file (`config.yaml`) and into [profile](../Administration/Profiles.md) files.
This lets you:

- Use one set of files for development, staging, and production.
- Keep sensitive values out of the files.
- Change a setting without editing a file.

A variable has an effect only where a `${VARIABLE_NAME}` placeholder in one of those files references it.
To set a variable on Windows, Linux, macOS, or Docker, refer to [Set a variable](#set-a-variable).

## Placeholder syntax

A placeholder uses the form `${VARIABLE_NAME}`.
Profinity also supports Docker-style default values with `${VARIABLE_NAME:-default}`.
Profinity uses the value of the variable when it is set and non-empty, and the text after `:-` otherwise.

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
Profinity looks the name up exactly as written.
On Linux and macOS, names are case-sensitive, so `${Profile_Name}` and `${profile_name}` are different variables.
On Windows, names are not case-sensitive, so they are the same variable.

!!! warning "A missing variable stops the file from loading"
    A configuration or profile file that references an undefined or empty variable with no default fails to load.
    Profinity writes the names of the undefined variables to the log.
    Define every variable that has no default before you start Profinity, or give it a default.

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

## Set a variable

Set the variable in the environment of the process that starts Profinity.

### Change a setting from an environment variable

This example moves the Profinity web server to port 8080, and the same steps apply to any other setting.
`config.yaml` is in the `config` folder of the [artefacts directory](./Artifacts_Directory.md).

1. In `config.yaml`, replace the port with a placeholder that has a default: `httpPort: ${HTTP_PORT:-18080}`.
2. Set `HTTP_PORT` to `8080` in the environment of the process that starts Profinity, as described in [Windows](#windows), [Linux and macOS](#linux-and-macos), or [Docker](#docker).
3. Restart Profinity.

Open `http://localhost:8080` in a browser, and the Profinity sign-in page loads on the new port.
If Profinity does not start, confirm that the variable is set in the environment of the process that starts Profinity, and read the [Profinity logs](../Administration/Logs_Config.md).
In Docker, publish the same port number on the host and in the container.

### Windows

In a command prompt, run `set PROFILE_NAME=Production Profile`, and in PowerShell, run `$env:PROFILE_NAME="Production Profile"`.
Either form lasts only for that window.
To set a variable permanently:

1. Open **System Properties**, then **Advanced**, then **Environment Variables**.
2. Add the variable under **User** or **System** variables.
3. Restart Profinity.

When Profinity runs as a [Windows service](./Run_as_a_Service/Run_as_a_Windows_Service.md), add the variable as a **System** variable, because a user variable is not visible to a service that runs as another account.
Restart the service, not only the application, so that it reads the new value.

### Linux and macOS

In a shell, run `export PROFILE_NAME="Production Profile"` to set a variable for that session.
For an interactive run, add the same line to a shell profile file such as `~/.bashrc`, `~/.profile` or `~/.zshrc`.
A service does not read those files.
For the Linux systemd service, add `Environment=` lines to the `[Service]` section of `/etc/systemd/system/profinity.service`, for example `Environment=PROFILE_NAME="Production Profile"`.
Then run `sudo systemctl daemon-reload` and restart the service.
Refer to [Run Profinity as a Linux service](./Run_as_a_Service/Run_as_a_Linux_Service.md).

### Docker

Set variables in a `.env` file next to the compose file, in the `environment` section of the compose file, or with `docker run -e`:

```env
PROFILE_NAME=Production Profile
HTTP_PORT=8080
```

```bash
docker run -e PROFILE_NAME="Production Profile" \
           -e HTTP_PORT="8080" \
           prohelion/profinity:latest
```

Docker Compose [substitutes variables](https://docs.docker.com/compose/environment-variables/) into the compose file as well, so the same variable can set the published port and the setting inside the container:

```yaml
services:
  profinity:
    image: prohelion/profinity:latest
    restart: always
    ports:
      - "${HTTP_PORT:-18080}:${HTTP_PORT:-18080}"
      - "${HTTPS_PORT:-18443}:${HTTPS_PORT:-18443}"
      - "4876:4876"
    environment:
      # The artefacts directory inside the container, which must match the volumes entries
      - PROFINITY_HOME=/app/Prohelion

      - HTTP_ADDRESS=${HTTP_ADDRESS:-0.0.0.0}
      - HTTP_PORT=${HTTP_PORT:-18080}
      - LOG_LEVEL=${LOG_LEVEL:-Info}
      - ENABLE_SCRIPTING=${ENABLE_SCRIPTING:-false}
      - PROFILE_NAME=${PROFILE_NAME:-Docker Profile}
    volumes:
      - ./Prohelion:/app/Prohelion
```

With `HTTP_PORT=8080`, host port 8080 maps to container port 8080, which matches a `config.yaml` that listens on `${HTTP_PORT}`.
The Profinity image declares only ports 18080 and 18443, and Docker publishes only the ports listed under `ports`.

Mount the whole `/app/Prohelion` directory, so that the licence, security keys, and logs survive when the container is replaced.
Keep the `config.yaml` and profile files that hold placeholders in the `config` and `profiles` folders of the mounted directory.
`PROFINITY_HOME` must match the container-side mount path, as described in [Install Profinity with Docker](./Docker/index.md#install-with-docker-compose).
Docker Compose reads a `.env` file in the same folder as the compose file automatically.
To keep one file per environment, name the file explicitly:

```bash
docker compose --env-file .env.production up
docker compose -f docker-compose.prod.yml --env-file .env.production up
```

Docker documents [env files](https://docs.docker.com/compose/environment-variables/#the-env-file) and [compose file overrides](https://docs.docker.com/compose/extends/) in detail.

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

The [Profile folders](../Administration/Profile_Folders.md) page covers the files a profile holds, and [System configuration](../Administration/System_Configuration/index.md) covers the other settings in `config.yaml`.
