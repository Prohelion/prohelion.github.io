---
title: Set environment variables
description: "Set an environment variable for Profinity on Windows, Linux, macOS, or Docker, with a worked example that changes the web server port."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Set environment variables

Set an environment variable for Profinity so that a `${VARIABLE_NAME}` placeholder in `config.yaml` or a profile file takes its value from the environment.
For the placeholder syntax, the example files, and the variables that Profinity and its install scripts read, refer to [Environment variables](./Environment_Variables.md).

## Change a setting from an environment variable

This example moves the Profinity web server to port 8080, and the same steps apply to any other setting.
`config.yaml` is in the `config` folder of the [artefacts directory](./Artifacts_Directory.md).

1. In `config.yaml`, replace the port with a placeholder that has a default: `httpPort: ${HTTP_PORT:-18080}`.
2. Set `HTTP_PORT` to `8080` in the environment of the process that starts Profinity, as described in [Windows](#windows), [Linux and macOS](#linux-and-macos), or [Docker](#docker).
3. Restart Profinity.

Open `http://localhost:8080` in a browser, and the Profinity sign-in page loads on the new port.
If Profinity does not start, confirm that the variable is set in the environment of the process that starts Profinity, and read the [Profinity logs](../Administration/Logs_Config.md).
In Docker, publish the same port number on the host and in the container.

## Windows

In a command prompt, run `set PROFILE_NAME=Production Profile`, and in PowerShell, run `$env:PROFILE_NAME="Production Profile"`.
Either form lasts only for that window.
To set a variable permanently:

1. Open **System Properties**, then **Advanced**, then **Environment Variables**.
2. Add the variable under **User** or **System** variables.
3. Restart Profinity.

When Profinity runs as a [Windows service](./Run_as_a_Windows_Service.md), add the variable as a **System** variable, because a user variable is not visible to a service that runs as another account.
Restart the service, not only the application, so that it reads the new value.

## Linux and macOS

In a shell, run `export PROFILE_NAME="Production Profile"` to set a variable for that session, or add the same line to a shell profile file such as `~/.bashrc`, `~/.profile` or `~/.zshrc` for an interactive run.
A service does not read those files.
For the Linux systemd service, add `Environment=` lines to the `[Service]` section of `/etc/systemd/system/profinity.service`, for example `Environment=PROFILE_NAME="Production Profile"`, then run `sudo systemctl daemon-reload` and restart the service.
Refer to [Run Profinity as a Linux service](./Run_as_a_Linux_Service.md).

## Docker

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
      # The artefacts directory inside the container, which must match the volume below
      - PROFINITY_HOME=/app/Prohelion

      - HTTP_ADDRESS=${HTTP_ADDRESS:-0.0.0.0}
      - HTTP_PORT=${HTTP_PORT:-18080}
      - LOG_LEVEL=${LOG_LEVEL:-Info}
      - ENABLE_SCRIPTING=${ENABLE_SCRIPTING:-false}
      - PROFILE_NAME=${PROFILE_NAME:-Docker Profile}
    volumes:
      - ./profiles:/app/Prohelion/profiles
      - ./config:/app/Prohelion/config
```

With `HTTP_PORT=8080`, host port 8080 maps to container port 8080, which matches a `config.yaml` that listens on `${HTTP_PORT}`.
The Profinity image declares only ports 18080 and 18443, but Docker publishes any port the container listens on.

Keep the `config.yaml` and profile files that hold placeholders in the mounted volume folders that map to `/app/Prohelion/config` and `/app/Prohelion/profiles`.
`PROFINITY_HOME` must match the container-side mount path, as described in [Install Profinity with Docker](./Docker_Installation.md#install-with-docker-compose).
Docker Compose reads a `.env` file in the same folder as the compose file automatically, and to keep one file per environment, name it explicitly:

```bash
docker compose --env-file .env.production up
docker compose -f docker-compose.prod.yml --env-file .env.production up
```

Docker documents [env files](https://docs.docker.com/compose/environment-variables/#the-env-file) and [compose file overrides](https://docs.docker.com/compose/extends/) in detail.

The [Profiles](../Administration/Profiles.md) page covers the profile format, and [System configuration](../Administration/System_Configuration/index.md) covers the other settings in `config.yaml`.
