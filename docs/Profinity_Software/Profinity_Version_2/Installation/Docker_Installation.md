---
title: Docker Installation
---

!!! tip "Profinity V2 IS NOW IN GENERAL RELEASE"
    Profinity V2 is available now in General Release.  If you have any issues or feedback please report it via our support portal or via the Feedback form in the Profinity Admin menu.

# Installing Profinity On Docker

!!! info "Available Profinity Releases"
    Profinity is currently available on [Windows machines](./Windows_Installation.md) as a standard desktop application, for selected [Unix Platforms (including macOS and Linux)](./Zip_Installation.md) and as a [Docker container](./Docker_Installation.md) for Docker enabled environments and Cloud setups.

## Installation using Docker

Profinity can be deployed onto most devices capable of running Docker, including macOS and Linux machines as well as several single-board computers such as Raspberry Pi, BeagleBone Black, etc.

### Prerequisites

The following items are required to be able to install Profinity:

- Docker installed on the target device
- A device capable of running ASP .Net 9, with Docker support from Microsoft
- Docker Compose installed on the target device (included with Docker Desktop, available as plugin on Linux machines)
- A suitable CAN adaptor for the target device

### Simple Setup

!!! warning "Profinity V2 is currently in Early Adopter Release"
    When using Profinity V2 on the Docker Early Adopter Program you are going to be working with us up on the development release.  As such things could change rapidly and in unexpected ways!  Please contact Prohelion Support if you have issues or provide us [Feedback](../Administration/Feedback.md) in Profinity.

On the target device, create a new empty directory and a file titled `docker-compose.yml` in the new directory. The contents of the `docker-compose.yml` file should be

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
        - 5000:5000
        - 4876:4876
```

For more information about Docker Compose, see the [official Docker documentation](https://docs.docker.com/compose/).

### Using Environment Variables for Configuration

Profinity supports environment variable substitution in both configuration and profile files, making it easy to create flexible Profinity Docker deployments that can be configured without modifying the container image.

#### Environment Variable Support

Profinity automatically processes environment variables in the format `${VARIABLE_NAME}` when loading Profinity configuration (Config.yaml) and profile files. This allows you to:

- **Configure different environments** (development, staging, production) using the same Docker image
- **Keep sensitive information** out of your Docker configuration files
- **Share configuration templates** across different deployments
- **Easily modify settings** without rebuilding containers

For detailed information about environment variables, see the [Environment Variables](../Extending_Profinity/Configuration/Environment_Variables.md) documentation.

#### Docker Compose with Environment Variables

You can configure Profinity using environment variables in your `docker-compose.yml` file. Docker Compose supports [environment variable substitution](https://docs.docker.com/compose/environment-variables/) in compose files, allowing you to use variables for port mapping and service configuration.

```yaml
services:
  profinity:
    image: prohelion/profinity:latest
    restart: always
    ports:
      - "${HTTP_PORT:-18080}:18080"
      - "${HTTPS_PORT:-18443}:18443"
      - "${API_PORT:-5000}:5000"
      - "${UDP_PORT:-4876}:4876"
    environment:
      # Profinity Configuration
      - CONFIG_NAME=${CONFIG_NAME:-Production Configuration}
      - HTTP_ADDRESS=${HTTP_ADDRESS:-0.0.0.0}
      - HTTP_PORT=${HTTP_PORT:-18080}
      - LOG_LEVEL=${LOG_LEVEL:-Info}
      - ENABLE_SCRIPTING=${ENABLE_SCRIPTING:-true}
      
      # Profile Configuration
      - PROFILE_NAME=${PROFILE_NAME:-Docker Profile}
      - ADAPTER_IP=${ADAPTER_IP:-192.168.1.100}
      - ADAPTER_PORT=${ADAPTER_PORT:-8080}
    volumes:
      - ./profiles:/app/profiles
      - ./config:/app/config
```

For more information about Docker Compose environment variables, see the [official Docker documentation](https://docs.docker.com/compose/environment-variables/).

!!! info "Docker Volumes"
    The `volumes` section mounts local directories into the container, allowing Profinity to persist configuration and profile data. For more information about Docker volumes, see the [official Docker documentation](https://docs.docker.com/storage/volumes/).

#### Environment File (.env)

Docker Compose automatically loads environment variables from a `.env` file in the same directory as your `docker-compose.yml`. This is the recommended way to manage environment-specific configuration.

Create a `.env` file in the same directory as your `docker-compose.yml`:

```env
# Profinity Configuration
CONFIG_NAME=Production Configuration
HTTP_ADDRESS=0.0.0.0
HTTP_PORT=18080
LOG_LEVEL=Info
ENABLE_SCRIPTING=true

# Profile Configuration
PROFILE_NAME=Docker Profile
ADAPTER_IP=192.168.1.100
ADAPTER_PORT=8080

# Network Configuration
HTTP_PORT=18080
HTTPS_PORT=18443
API_PORT=5000
UDP_PORT=4876
```

For more information about `.env` files in Docker Compose, see the [official Docker documentation](https://docs.docker.com/compose/environment-variables/#the-env-file).

#### Configuration Files with Environment Variables

Your Profinity configuration files can use environment variables for flexible deployment:

**Config.yaml:**
```yaml
Name: ${CONFIG_NAME}
Description: ${CONFIG_DESCRIPTION}
AppSettings:
  ProfinityServer:
    HttpAddress: ${HTTP_ADDRESS}
    HttpPort: ${HTTP_PORT}
  Logs:
    LogLevel: ${LOG_LEVEL}
    RollsizeMB: ${LOG_ROLLSIZE:-100}
  EnableScripting: ${ENABLE_SCRIPTING:-true}
Options:
  WebServer:
    Enabled: true
    HttpAddress: ${HTTP_ADDRESS}
    HttpPort: ${HTTP_PORT}
```

**Profile.yaml:**
```yaml
Name: ${PROFILE_NAME}
Description: ${PROFILE_DESCRIPTION}
Components:
  Tritium1:
    Protocol: UDP
    AdapterIpAddress: ${ADAPTER_IP}
    BusNo: ${BUS_NUMBER}
    UdpTTL: ${UDP_TTL}
    Type: TritiumAdapter
  BMU1:
    ParallelStrings: ${BMU_PARALLEL_STRINGS}
    MilliValid: ${BMU_MILLI_VALID}
    BaseAddress: ${BMU1_BASE_ADDRESS}
    Type: ProhelionBMU
```

#### Deployment Strategies

You can create different Docker Compose files for different environments. This approach allows you to use the same base configuration while customizing settings for development, staging, and production.

**Development Environment**
```yaml
# docker-compose.dev.yml
services:
  profinity:
    image: prohelion/profinity:latest
    environment:
      - CONFIG_NAME=Development Configuration
      - LOG_LEVEL=Debug
      - ENABLE_SCRIPTING=true
      - PROFILE_NAME=Development Profile
      - ADAPTER_IP=127.0.0.1
    volumes:
      - ./dev-profiles:/app/profiles
      - ./dev-config:/app/config
```

**Production Environment**
```yaml
# docker-compose.prod.yml
services:
  profinity:
    image: prohelion/profinity:latest
    restart: always
    environment:
      - CONFIG_NAME=Production Configuration
      - LOG_LEVEL=Info
      - ENABLE_SCRIPTING=false
      - PROFILE_NAME=Production Profile
      - ADAPTER_IP=${PRODUCTION_ADAPTER_IP}
    volumes:
      - ./prod-profiles:/app/profiles
      - ./prod-config:/app/config
      - ./logs:/app/logs
```

For more information about Docker Compose file overrides, see the [official Docker documentation](https://docs.docker.com/compose/extends/).

#### Environment Variable Reference

For more information on environment variables, see the [Environment Variables](../Extending_Profinity/Configuration/Environment_Variables.md) documentation.

!!! info "Directly Accessing Devices"
    Docker deliberately does not expose all devices through to the containers that run the applications.  In some cases you may wish to expose additional devices to Docker so that you can access things like SocketCAN Natively or discover components that use UDP for broadcasting.  See the [official Docker documentation](https://docs.docker.com/compose/) for how to expose these devices to your Docker container.

### Starting and Stopping Profinity

The Profinity Docker container is started and stopped using commands from the [Docker Compose toolset](https://docs.docker.com/compose/reference/). First, navigate to the original directory (the one containing the `docker-compose.yml` file).

#### Basic Commands

**Start Profinity:**
```bash
docker compose up
```

**Start in background (detached mode):**
```bash
docker compose up -d
```

**Stop Profinity:**
```bash
docker compose down
```

**View logs:**
```bash
docker compose logs -f
```

For more information about Docker Compose commands, see the [official Docker Compose reference](https://docs.docker.com/compose/reference/).

#### Using Environment Files

If you're using multiple `.env` files for different environments:

```bash
# Start with specific environment file
docker compose --env-file .env.production up

# Start with development environment
docker compose --env-file .env.development up

# Use specific compose file with environment file
docker compose -f docker-compose.prod.yml --env-file .env.production up
```

For more information about Docker Compose environment files, see the [official Docker documentation](https://docs.docker.com/compose/environment-variables/#the-env-file).

#### Accessing Profinity

Once started, open the URL defined in your configuration to access the Profinity web client. The default URL is `http://localhost:18080` on the local machine or `http://[Your IP Address]:18080` if accessed remotely.

For environment-specific configurations, the URL will be based on your `HTTP_ADDRESS` and `HTTP_PORT` environment variables.

Connecting to the Profinity web client will direct you to the Profinity login page. 

<figure markdown>
![Profinity login page](../images/login_page.png)
<figcaption>Profinity login page</figcaption>
</figure>

A fresh install of Profinity will only have the administrator user active. To log in, use the following login details.

Username: `admin`

Password: `password`

After logging in, you will arrive at the Profinity homepage.

<figure markdown>
![Profinity Homepage](../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

To stop Profinity, enter `docker compose down` into the command line.