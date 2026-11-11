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

A variable in your own files has an effect only where a `${VARIABLE_NAME}` placeholder in one of those files references it.
Profinity also reads the variables in [Variables Profinity reads](#variables-profinity-reads) directly.
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

This `profile.yaml`, which sits in the `profiles/<profile name>/` folder, takes the connection settings of an InfluxDB v2 historian from environment variables, so the token never appears in the file:

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

The example reads five variables, and none has a default, so set each one before you start Profinity: `PROFILE_DESCRIPTION` is the profile description, `INFLUXDB_URL` is the address of the InfluxDB server, `INFLUXDB_ORG` is its organisation, `INFLUXDB_BUCKET` is the bucket to write to, and `INFLUXDB_ADMIN_TOKEN` is the access token.
The same syntax works for any component setting in a profile file.

## Set a variable

Set the variable in the environment of the process that starts Profinity, then restart Profinity so that it reads the new value.
The sections for [Windows](#windows), [Linux and macOS](#linux-and-macos) and [Docker](#docker) each end with the restart command.

### Change a setting from an environment variable

This example moves the Profinity web server to port 8080, and the same steps apply to any other setting.
`config.yaml` is in the `config` folder of the [artefacts directory](./Artifacts_Directory.md).

1. In `config.yaml`, replace the port with a placeholder that has a default: `httpPort: ${HTTP_PORT:-18080}`.
2. Set `HTTP_PORT` to `8080` in the environment of the process that starts Profinity, as described in [Windows](#windows), [Linux and macOS](#linux-and-macos), or [Docker](#docker).
3. Restart Profinity, using the restart command in the section for your platform.

Open `http://localhost:8080` in a browser, and the Profinity sign-in page loads on the new port.

| What you see | Cause | What to do |
|--------------|-------|------------|
| Profinity does not start after you add a placeholder. | The variable is not set in the environment of the process that starts Profinity. | Set the variable as described in the section for your platform, restart Profinity, and read the [Profinity logs](../Administration/Logs_Config.md). |
| The page does not load on the new port in Docker. | The host and container port numbers differ. | Publish the same port number on the host and in the container. |

### Windows

In a command prompt, run `set PROFILE_NAME=Production Profile`, and in PowerShell, run `$env:PROFILE_NAME="Production Profile"`.
Either form lasts only for that window.
To set a variable permanently:

1. Select **System Properties > Advanced > Environment Variables**.
2. Add the variable under **User** or **System** variables.
3. Restart Profinity.

When Profinity runs as a [Windows service](./Run_as_a_Service/Run_as_a_Windows_Service.md), add the variable as a **System** variable, because a user variable is not visible to a service that runs as another account.
Restart the service, not only the application, so that it reads the new value. Restart it from the **Services** app, or run Profinity again if you run the application directly.

### Linux and macOS

In a shell, run `export PROFILE_NAME="Production Profile"` to set a variable for that session.
For an interactive run, add the same line to a shell profile file such as `~/.bashrc`, `~/.profile` or `~/.zshrc`.
A service does not read those files.

For the Linux systemd service, add `Environment=` lines to the `[Service]` section of `/etc/systemd/system/profinity.service`, for example `Environment=PROFILE_NAME="Production Profile"`.
Then run `sudo systemctl daemon-reload` and `sudo systemctl restart profinity`.
If you set up the macOS service as described in [Run as a macOS Service](Run_as_a_Service/Run_as_a_macOS_Service.md), run `sudo launchctl stop com.profinity.service`, then `sudo launchctl start com.profinity.service`.
Refer to [Run Profinity as a Linux service](./Run_as_a_Service/Run_as_a_Linux_Service.md).

### Docker

Set variables in a `.env` file next to the compose file, in the `environment` section of the compose file, or with `docker run -e`:

```env
PROFILE_NAME=Production Profile
HTTP_PORT=8080
```

Profinity reads `HTTP_PORT` only through a placeholder in `config/config.yaml`, so add `httpPort: ${HTTP_PORT:-18080}` to that file first, as in [Change a setting from an environment variable](#change-a-setting-from-an-environment-variable).

=== "macOS and Linux"

    ```bash
    docker run -p 8080:8080 \
               -v "$PWD/Prohelion:/var/lib/prohelion/profinity" \
               -e PROFILE_NAME="Production Profile" \
               -e HTTP_PORT="8080" \
               prohelion/profinity:latest
    ```

=== "Windows PowerShell"

    ```powershell
    docker run -p 8080:8080 `
               -v "${PWD}/Prohelion:/var/lib/prohelion/profinity" `
               -e PROFILE_NAME="Production Profile" `
               -e HTTP_PORT="8080" `
               prohelion/profinity:latest
    ```

The `-v` option mounts a host folder at the artefacts directory, `/var/lib/prohelion/profinity` inside the container.
Profinity reads `HTTP_PORT` and `PROFILE_NAME` only through placeholders in the files in that directory, so `config/config.yaml` needs `httpPort: ${HTTP_PORT:-18080}`, as in [Change a setting from an environment variable](#change-a-setting-from-an-environment-variable).
With that placeholder, the `-p 8080:8080` option publishes port `8080` on the host and in the container, and the web interface answers on `http://localhost:8080`.
Without the placeholder, Profinity listens on port 18080.

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
      - HTTP_ADDRESS=${HTTP_ADDRESS:-0.0.0.0}
      - HTTP_PORT=${HTTP_PORT:-18080}
      - LOG_LEVEL=${LOG_LEVEL:-Info}
      - ENABLE_SCRIPTING=${ENABLE_SCRIPTING:-false}
      - PROFILE_NAME=${PROFILE_NAME:-Docker Profile}
    volumes:
      - $HOME/Prohelion:/var/lib/prohelion/profinity
```

With `HTTP_PORT=8080`, host port 8080 maps to container port 8080, which matches a `config.yaml` that listens on `${HTTP_PORT}`. `HTTPS_PORT` works the same way only if `config.yaml` also has `httpsPort: ${HTTPS_PORT:-18443}`. Profinity does not read `HTTPS_PORT` on its own, so without that placeholder Compose publishes the new port while Profinity still listens on 18443.
The Profinity image declares only ports 18080 and 18443, and Docker publishes only the ports listed under `ports`. Port `4876` is the Tritium CAN bridge port, which uses TCP and UDP. Keep it only if you use a Tritium adapter, and then publish it for the protocols the adapter uses, as described in [Docker ports and data directory](./Docker/Docker_Ports_and_Data_Directory.md).

Mount the whole `/var/lib/prohelion/profinity` directory, so that the licence, security keys, and logs survive when the container is replaced.
Keep the `config.yaml` and profile files that hold placeholders in the `config` and `profiles` folders of the mounted directory, as described in [Install Profinity with Docker](./Docker/index.md#install-with-docker-compose).

Docker Compose reads a `.env` file in the same folder as the compose file automatically.
To keep one file per environment, name the file explicitly:

```bash
docker compose --env-file .env.production up -d
```

To apply a changed variable to a running container, run `docker compose up -d` again, which recreates the container with the new value.

Docker documents [env files](https://docs.docker.com/compose/environment-variables/#the-env-file) in detail.

## Variables Profinity reads

Besides the variables that your own files reference, Profinity and its install scripts read these variables.

| Variable | Type | Read by | Default | Effect |
|----------|------|---------|---------|--------|
| `PROFINITY_HOME` | Path | Profinity, `profinity.sh` | `%LOCALAPPDATA%\Prohelion\Profinity` on Windows, `~/Library/Application Support/Prohelion/Profinity` on macOS, `/var/lib/prohelion/profinity` on Linux | Moves the [artefacts directory](./Artifacts_Directory.md) away from its default and turns off automatic migration from older locations. Set it only for an exception, such as several instances on one host |
| `PROFINITY_INSTALL_ROOT` | Path | `profinity.sh`, `update.sh` | The folder that holds the script | Overrides the install root, which otherwise is the folder that holds the script |
| `PROFINITY_DOTNET_INSTALL_URL` | URL | `profinity.sh` | The `dotnet-install.sh` URL pinned in the script | Overrides the address that `profinity.sh` downloads the .NET installer from when the host has no .NET runtime |
| `PROFINITY_FILES_BASE` | URL | `install.sh`, `update.sh` | `https://files.prohelion.com/profinity` | Overrides the file server that releases are downloaded from |
| `PROFINITY_DOCKER_IMAGE` | Image name | `install-docker.sh` | `prohelion/profinity:latest` | Sets the Docker image that the one-line Docker installer uses |

The [Profile folders](../Administration/Profile_Folders.md) page covers the files a profile holds, and [System configuration](../Administration/System_Configuration/index.md) covers the other settings in `config.yaml`.
