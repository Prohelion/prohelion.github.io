---
title: Install Profinity with Docker
description: "Install and run Profinity in Docker containers with Docker Compose or the one-line installer, update the image, and prepare for production."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Install Profinity with Docker

Run Profinity in a Docker container on most devices that can run Docker, including macOS and Linux machines and single-board computers such as the Raspberry Pi and BeagleBone Black.
Prohelion publishes the Profinity image for `linux/amd64`, `linux/arm64`, and `linux/arm/v7`, and Docker pulls the variant that matches the host processor.
For Windows, refer to [Install Profinity on Windows](./Windows_Installation.md), and for Linux and macOS without Docker, refer to [Install Profinity on Linux and macOS](./Zip_Installation.md).

A container binds all network interfaces, so other machines can reach it.
Opening the web interface from another machine, and creating user accounts and roles, need the **Profinity Server** licensed feature, which the Server and Enterprise editions include.
A new installation that is not a Desktop host starts a one-time 14-day local trial with the Server features and then drops to the unlicensed feature set, so apply a licence file under **ADMIN > License** before the trial ends, as described in [Apply a licence](./Applying_a_Licence.md).
To upgrade a 2.2 container, read [Upgrade from Profinity 2.2](./Upgrade_From_2_2.md) first.

You need Docker on the target device, on an x86-64, 64-bit ARM, or 32-bit ARM (ARMv7) processor, and Docker Compose, which Docker Desktop includes and which is available as a plugin on Linux.
You also need a suitable CAN adapter for the target device.
To install with a single script instead of a compose file, refer to [Install with the one-line installer](#install-with-the-one-line-installer).

## Install with Docker Compose

1. On the target device, create a new empty directory.
2. In the new directory, create a file named `docker-compose.yml` with these contents:

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

3. Make sure the host directory mounted at `PROFINITY_HOME` is writable by the `app` user, because the container runs as that non-root user.
4. In the directory that holds the compose file, run `docker compose up -d`.
5. Open `http://localhost:18080` on the local machine, or `http://[your IP address]:18080` from another machine.

The sign-in page opens, as described under [Sign in](#sign-in).

The compose file publishes three ports:

| Port | Purpose |
|------|---------|
| `18080` | HTTP web interface |
| `18443` | HTTPS web interface |
| `4876` | Tritium CAN to Ethernet bridge, an IANA-assigned port that the bridge protocol uses for both UDP and TCP and that is not configurable |

Docker publishes a port as TCP unless the mapping ends in `/udp`, so add `- 4876:4876/udp` when a Tritium adapter is reached through the published ports.
On Linux hosts, use host networking (`network_mode: host`) where multicast adapter discovery or [Profinity Mobile](../Mobile/index.md) server discovery is required, because UDP broadcasts do not leave a Docker bridge network.

The artefacts directory inside the container is whatever `PROFINITY_HOME` names.
With the mount above, the configuration is in `/app/Prohelion/config`, the profiles in `/app/Prohelion/profiles`, and the logs in `/app/Prohelion/logs`, which appear on the host under `$HOME/Prohelion`.
The one-line installer uses `PROFINITY_HOME=/var/lib/prohelion/profinity` mounted from a local `data` directory, which is also the default artefacts path on Linux.
Either path is valid, provided that the environment variable and the mount destination match.

!!! warning "Set PROFINITY_HOME to your mount path"
    If `PROFINITY_HOME` does not name the container path of your mounted volume, Profinity writes its configuration and profiles inside the container, and they are lost when the image is replaced.
    Compose files written for 2.2 that mount `/root/Prohelion/Profinity/...` need their mounts moved to the new `PROFINITY_HOME` path, because the automatic migration from legacy operating system locations is skipped whenever `PROFINITY_HOME` is set.
    The sub-folders beneath the artefacts directory use lowercase names (`config`, `profiles`, `logs`), and Linux file systems are case-sensitive, so mounts must target those names.
    Refer to [Artefacts directory](./Artifacts_Directory.md).

To check where Profinity stores its files, open a shell in the running container with `docker compose exec profinity bash`, and run `ls -la /app/Prohelion/`.

## Start and stop Profinity

Run these commands from the directory that holds the `docker-compose.yml` file.
Docker Compose, not Profinity, starts the container on boot, and the `restart: always` line in the compose file restarts the container whenever Docker starts, so configure Docker to start on boot.

| Command | Effect |
|---------|--------|
| `docker compose up` | Starts Profinity in the foreground |
| `docker compose up -d` | Starts Profinity in the background (detached mode) |
| `docker compose stop` | Stops the containers and keeps them, so `docker compose start` can restart them |
| `docker compose down` | Stops the containers and removes them, so you run `docker compose up` again to recreate them |
| `docker compose logs -f` | Follows the log output |

Refer to the [Docker Compose reference](https://docs.docker.com/compose/reference/) for more commands.

## Sign in

The container serves HTTP with the default credentials below, so follow the [Security guide](./Security.md) to enable HTTPS before you expose it beyond a trusted network.
The browser opens the Profinity sign-in page.

<figure markdown>
![The Profinity sign-in page](../images/login_page.png)
<figcaption>Profinity sign-in page</figcaption>
</figure>

A fresh installation has only the administrator user active.
Sign in with the username `admin` and the password `password`, and Profinity asks for a new password at the first sign-in.
Choose one as described in the [Security guide](./Security.md#default-credentials).
After you sign in, the Profinity homepage appears.

<figure markdown>
![The Profinity homepage](../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

## Update the image

Docker does not update a running container, so the `latest` tag only moves when you pull a newer image.
To move to a newer Profinity image, run these commands in the directory that holds the compose file:

```bash
docker compose pull
docker compose up -d
```

Configuration and profiles are kept as long as `PROFINITY_HOME` names the container path of your mounted volume.

Prohelion also provides a compose file that pairs the image with an automatic updater (Watchtower), which replaces the container whenever a new image appears.
An unattended update discards any data that is not in a host-mounted volume, so check that `PROFINITY_HOME` matches the mount before you enable it.

## Install with the one-line installer

Prohelion provides three helper scripts for Docker hosts.
`install-docker.sh` creates `~/profinity-docker`, or the folder named by `--dir`, writes a compose file, pulls the image, and starts Profinity.
The `--image` option, or the `PROFINITY_DOCKER_IMAGE` variable, selects a different image than the default `prohelion/profinity:latest`.
Afterwards, `~/profinity-docker/profinity.sh` runs `docker compose up -d` and waits for the HTTP port to answer, and `~/profinity-docker/update.sh` runs `docker compose pull` and `docker compose up -d`.

1. Download the installer from the Profinity release on GitHub, with its checksum.
   `install-docker.sh` writes `profinity.sh` and `update.sh` itself, so it is the only file you need.

    ```bash
    curl -fsSL -o install-docker.sh https://github.com/Prohelion/Profinity/releases/latest/download/install-docker.sh
    curl -fsSL -o install-docker.sh.sha256 https://github.com/Prohelion/Profinity/releases/latest/download/install-docker.sh.sha256
    ```

2. Verify the checksum and run the installer:

    ```bash
    sha256sum -c install-docker.sh.sha256 && bash install-docker.sh --dir ~/profinity-docker
    ```

    On macOS, use `shasum -a 256 -c install-docker.sh.sha256` in place of `sha256sum -c`.

## Expose devices to the container

Docker does not expose all devices to containers.
Expose additional devices to Docker so that SocketCAN can be accessed natively, and use `network_mode: host` on Linux so that components that use UDP broadcasting can be discovered.
Refer to the [Docker Compose documentation](https://docs.docker.com/compose/) for how to expose these devices.

## Troubleshooting

- The profile and configuration are back to their defaults after an image update: `PROFINITY_HOME` did not match the container-side mount path, so the data was written to the container and lost when it was replaced. Set the variable to the mount path and restore the files from your backup.
- Profinity fails to start with a permission error on the mounted directory: the `app` user cannot write to it, so change the ownership or permissions of the host directory.
- A Tritium adapter is not found: publish port `4876` for UDP as well as TCP, or use host networking.
- The host's SocketCAN interfaces are not visible inside the container: expose them to Docker, as described under [Expose devices to the container](#expose-devices-to-the-container).

## Run Profinity in production

For production environments, and deployments that run many Profinity instances, configure Profinity with environment variables so that one compose file can serve every instance.
The compose files, `.env` files, and environment-specific deployment examples are in [Environment variables](./Environment_Variables.md#docker).
