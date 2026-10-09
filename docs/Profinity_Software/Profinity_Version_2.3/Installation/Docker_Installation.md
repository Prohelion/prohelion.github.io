---
title: Docker Installation
description: "Install and run Profinity in Docker containers, update the image, and use environment variables for production deployments."
---

# Installing Profinity on Docker

!!! info "Available Profinity Releases"
    Profinity is available on [Windows machines](./Windows_Installation.md) as a standard desktop application, for selected [Unix platforms (including macOS and Linux)](./Zip_Installation.md) and as a Docker container for Docker-enabled environments and cloud setups, as described on this page.

## Installation Using Docker

Profinity can be deployed onto most devices capable of running Docker, including macOS and Linux machines as well as several single-board computers such as Raspberry Pi and BeagleBone Black. Prohelion publishes the Profinity image for `linux/amd64`, `linux/arm64` and `linux/arm/v7`, and Docker pulls the variant that matches the host processor.

!!! info "Licence Required for Remote Access and User Accounts"
    A container binds all network interfaces, so other machines can reach it. Opening the Profinity web interface from another machine, and creating user accounts and roles, need the **Profinity Server** licensed feature, which the Server and Enterprise editions include. A new installation that is not a Desktop host starts a one-time 14-day local trial with the Server features and then drops to the unlicensed feature set, so apply a licence file under **ADMIN > License** before the trial ends. See [Licensing](../Administration/Licensing.md). To upgrade a 2.2 container, follow [Upgrading From 2.2](../Release_Notes/2.3.1.md#upgrading-from-22).

### Prerequisites

The following items are required to install Profinity:

- Docker installed on the target device, on an x86-64, 64-bit ARM or 32-bit ARM (ARMv7) processor.
- Docker Compose installed on the target device (included with Docker Desktop, available as a plugin on Linux machines).
- A suitable CAN adapter for the target device.

### Simple Setup

On the target device, create a new empty directory and a file titled `docker-compose.yml` in the new directory. The contents of the `docker-compose.yml` file should be as follows.

```yaml
services:
  profinity:
      image: prohelion/profinity:latest
      restart: always
      #On linux hosts you can run in host mode to enable autodiscovery
      #network_mode: host
      ports:
        - 18080:18080
        - 18443:18443
        - 4876:4876
      # PROFINITY_HOME must match the container-side mount path below, otherwise the
      # security keys and profiles are written to the container's writable layer and are
      # lost when the image is updated
      environment:
        - PROFINITY_HOME=/app/Prohelion
      volumes:
        - $HOME/Prohelion:/app/Prohelion:rw
```

The compose file publishes three ports.

| Port | Purpose |
|------|---------|
| `18080` | HTTP web interface |
| `18443` | HTTPS web interface |
| `4876` | Tritium CAN to Ethernet bridge, an IANA-assigned port that the bridge protocol uses for both UDP and TCP and that is not configurable |

Docker publishes a port as TCP unless the mapping ends in `/udp`, so add `- 4876:4876/udp` when a Tritium adapter is reached through the published ports. On Linux hosts, use host networking (`network_mode: host`) where multicast adapter discovery or [Profinity Mobile](../Mobile/index.md) server discovery is required, because UDP broadcasts do not leave a Docker bridge network. The `latest` tag follows the newest published image; Docker does not update a running container, so see [Updating the Image](#updating-the-image).

The container runs as the non-root `app` user, so the host directory mounted at `PROFINITY_HOME` must be writable by that user.

The Profinity artefacts directory inside the container is whatever `PROFINITY_HOME` names. With the mount above, the configuration is stored in `/app/Prohelion/config`, the profiles in `/app/Prohelion/profiles` and the logs in `/app/Prohelion/logs`, which appear on the host under `$HOME/Prohelion`. The one-line Docker installer (see [One-Line Docker Installer](#one-line-docker-installer)) uses `PROFINITY_HOME=/var/lib/prohelion/profinity` mounted from a local `data` directory, which is also the default artefacts path on Linux, and either path is valid provided that the environment variable and the mount destination match.

For more information about Docker Compose, see the [official Docker documentation](https://docs.docker.com/compose/).

### Starting and Stopping Profinity

The Profinity Docker container is started and stopped using commands from the [Docker Compose toolset](https://docs.docker.com/compose/reference/). First, navigate to the directory containing the `docker-compose.yml` file.

!!! info "Configure Docker, Not Profinity, to Start on Boot"
    When Profinity runs inside Docker, Docker rather than Profinity is configured as a service, so configure Docker to start the Profinity container automatically on startup. The `restart: always` line in the compose file restarts the container whenever Docker starts. See the Docker documentation for details.

`docker compose up` starts Profinity in the foreground, and `docker compose up -d` starts it in the background (detached mode). `docker compose stop` stops the running containers but keeps them, so they can be restarted later with `docker compose start`, and `docker compose down` stops the containers and removes them, so `docker compose up` must be run again to recreate and start them. `docker compose logs -f` follows the log output.

For more information about Docker Compose commands, see the [official Docker Compose reference](https://docs.docker.com/compose/reference/).

### Accessing Profinity

Once started, open the URL defined in the Profinity configuration to access the Profinity web client. The default URL is `http://localhost:18080` on the local machine or `http://[Your IP Address]:18080` from another machine. The container serves HTTP with the default credentials below, so follow the [Security Guide](./Security.md) to enable HTTPS before exposing it beyond a trusted network.

Connecting to the Profinity web client directs the browser to the Profinity login page.

<figure markdown>
![Profinity login page](../images/login_page.png)
<figcaption>Profinity login page</figcaption>
</figure>

A fresh install of Profinity has only the administrator user active. To log in, use the following login details. Profinity asks for a new password at the first sign-in, so choose one as described in the [Security Guide](./Security.md#default-credentials).

Username: `admin`

Password: `password`

After logging in, the Profinity homepage is shown.

<figure markdown>
![Profinity Homepage](../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

### Updating the Image

Docker does not update a running container, so to move to a newer Profinity image, run `docker compose pull` followed by `docker compose up -d` in the directory that holds the `docker-compose.yml` file. Configuration and profiles are kept as long as `PROFINITY_HOME` names the container path of your mounted volume; if it does not, Profinity writes them inside the container and they are lost when the image is replaced. The compose file Prohelion publishes pairs the image with an automatic updater (Watchtower), which replaces the container whenever a new image appears, so check that the volume is mounted before you enable it.

### One-Line Docker Installer

Prohelion also provides three helper scripts for Docker hosts. `install-docker.sh` creates `~/profinity-docker` (or the folder named by `--dir`), writes a compose file, pulls the image and starts Profinity, and `--image` (or the `PROFINITY_DOCKER_IMAGE` variable) selects a different image than the default `prohelion/profinity:latest`. Afterwards `~/profinity-docker/profinity.sh` runs `docker compose up -d` and waits for the HTTP port to answer, and `~/profinity-docker/update.sh` runs `docker compose pull` and `docker compose up -d`.

Download the installer from the Profinity release on GitHub and verify its checksum before you run it. `install-docker.sh` writes `profinity.sh` and `update.sh` itself, so it is the only file you need:

```bash
curl -fsSL -o install-docker.sh https://github.com/Prohelion/Profinity/releases/latest/download/install-docker.sh
curl -fsSL -o install-docker.sh.sha256 https://github.com/Prohelion/Profinity/releases/latest/download/install-docker.sh.sha256
sha256sum -c install-docker.sh.sha256 && bash install-docker.sh --dir ~/profinity-docker
```

On macOS, use `shasum -a 256 -c install-docker.sh.sha256` in place of `sha256sum -c`.

### Troubleshooting

If the profile and configuration are back to their defaults after an image update, `PROFINITY_HOME` did not match the container-side mount path, so the data was written to the container and lost when it was replaced; set the variable to the mount path and restore the files from your backup. If Profinity fails to start with a permission error on the mounted directory, the `app` user cannot write to it, so change the ownership or permissions of the host directory. If a Tritium adapter is not found, publish port `4876` for UDP as well as TCP or use host networking, and if the host's SocketCAN interfaces are not visible inside the container, expose them to Docker as described under Directly Accessing Devices.

## Complex Setup for Production Deployments

Environment variables are optional, but for production environments and deployments that run many Profinity instances they are the simplest way to configure the product.

### Using Environment Variables for Configuration

Profinity supports environment variable substitution in configuration and profile files, so one compose file can serve many instances. For detailed information about environment variables, including default values and syntax, see the [Environment Variables](./Environment_Variables.md) documentation.

#### Docker Compose with Environment Variables

Profinity can be configured using environment variables in the `docker-compose.yml` file. Docker Compose supports [environment variable substitution](https://docs.docker.com/compose/environment-variables/) in compose files, allowing variables to be used for port mapping and service configuration.

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

      # Profinity Configuration
      - HTTP_ADDRESS=${HTTP_ADDRESS:-0.0.0.0}
      - HTTP_PORT=${HTTP_PORT:-18080}
      - LOG_LEVEL=${LOG_LEVEL:-Info}
      - ENABLE_SCRIPTING=${ENABLE_SCRIPTING:-false}
      
      # Profile Configuration
      - PROFILE_NAME=${PROFILE_NAME:-Docker Profile}
      - ADAPTER_IP=${ADAPTER_IP:-192.168.1.100}
      - ADAPTER_PORT=${ADAPTER_PORT:-8080}
    volumes:
      - ./profiles:/app/Prohelion/profiles
      - ./config:/app/Prohelion/config
```

The published port on the host and the port inside the container use the same variable, so `HTTP_PORT=8080` publishes host port 8080 to container port 8080, which matches a `config.yaml` that listens on `${HTTP_PORT}` (see [Environment Variables](./Environment_Variables.md)). The Profinity image only declares ports 18080 and 18443, but Docker publishes any port the container listens on.

For more information about Docker Compose environment variables, see the [official Docker documentation](https://docs.docker.com/compose/environment-variables/).

!!! info "Docker Volumes in 2.3"
    The `volumes` section mounts local directories into the container. Profinity resolves the artefacts directory inside the container from `PROFINITY_HOME` when it is set, and otherwise from the platform default, which is `/var/lib/prohelion/profinity` on Linux. The sub-folders beneath the artefacts directory use lowercase names (`config`, `profiles`, `logs`), and Linux file systems are case-sensitive, so mounts should target those names. Compose files written for 2.2 that mount `/root/Prohelion/Profinity/...` need their mounts moved to the new `PROFINITY_HOME` path, because the automatic migration from legacy operating system locations is skipped whenever `PROFINITY_HOME` is set. See [Artefacts Directory](./Artifacts_Directory.md).

!!! tip "Check Where Profinity Stores Profiles"
    To verify where Profinity is storing profiles and config files, open a shell in the running container:
    ```bash
    docker compose exec profinity bash
    ls -la /app/Prohelion/
    ```
    This shows the actual directory structure used by Profinity inside the container.

#### Environment File (.env)

Docker Compose automatically loads environment variables from a `.env` file in the same directory as the `docker-compose.yml` file. Prohelion recommends this file for environment-specific configuration.

Create a `.env` file in the same directory as the `docker-compose.yml` file:

```env
# Profinity Configuration
HTTP_ADDRESS=0.0.0.0
LOG_LEVEL=Info
ENABLE_SCRIPTING=false

# Profile Configuration
PROFILE_NAME=Docker Profile
ADAPTER_IP=192.168.1.100
ADAPTER_PORT=8080

# Network Configuration
HTTP_PORT=18080
HTTPS_PORT=18443
```

For more information about `.env` files in Docker Compose, see the [official Docker documentation](https://docs.docker.com/compose/environment-variables/#the-env-file).

!!! tip "Using Environment Variables in Config and Profile Files"
    When using environment variables with Docker, they can be referenced directly in the Profinity `config.yaml` file and the profile files. These files should be placed in the mounted volume directories that map to `/app/Prohelion/config` and `/app/Prohelion/profiles` inside the container. When Profinity starts in Docker, it substitutes the environment variables in these files with the values from the `.env` file or the Docker Compose `environment` section.
    
    For complete examples and detailed information about using environment variables in the `config.yaml` file and the profile files, including syntax, default values, and variable naming rules, see the [Environment Variables](./Environment_Variables.md) documentation.

#### Using Environment Files with Docker Compose

When multiple `.env` files are used for different environments:

```bash
# Start with specific environment file
docker compose --env-file .env.production up

# Start with development environment
docker compose --env-file .env.development up

# Use specific compose file with environment file
docker compose -f docker-compose.prod.yml --env-file .env.production up
```

For more information about Docker Compose environment files, see the [official Docker documentation](https://docs.docker.com/compose/environment-variables/#the-env-file).

#### Deployment Strategies

Different Docker Compose files can be created for different environments, which allows the same base configuration to be used while customising settings for development, staging, and production.

**Development Environment**
```yaml
# docker-compose.dev.yml
services:
  profinity:
    image: prohelion/profinity:latest
    environment:
      - PROFINITY_HOME=/app/Prohelion
      - LOG_LEVEL=Debug
      - ENABLE_SCRIPTING=true
      - PROFILE_NAME=Development Profile
      - ADAPTER_IP=127.0.0.1
    volumes:
      - ./dev-profiles:/app/Prohelion/profiles
      - ./dev-config:/app/Prohelion/config
```

**Production Environment**
```yaml
# docker-compose.prod.yml
services:
  profinity:
    image: prohelion/profinity:latest
    restart: always
    environment:
      - PROFINITY_HOME=/app/Prohelion
      - LOG_LEVEL=Info
      - ENABLE_SCRIPTING=false
      - PROFILE_NAME=Production Profile
      - ADAPTER_IP=${PRODUCTION_ADAPTER_IP}
    volumes:
      - ./prod-profiles:/app/Prohelion/profiles
      - ./prod-config:/app/Prohelion/config
      - ./logs:/app/Prohelion/logs
```

For more information about Docker Compose file overrides, see the [official Docker documentation](https://docs.docker.com/compose/extends/).

!!! info "Directly Accessing Devices"
    Docker does not expose all devices to containers. Expose additional devices to Docker so that SocketCAN can be accessed natively, and use `network_mode: host` on Linux so that components that use UDP broadcasting can be discovered.  See the [official Docker documentation](https://docs.docker.com/compose/) for how to expose these devices to the Docker container.
