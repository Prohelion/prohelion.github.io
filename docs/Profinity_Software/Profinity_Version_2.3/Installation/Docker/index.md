---
title: Install Profinity with Docker
description: "Install and start Profinity in a Docker container with Docker Compose, sign in, and give the container access to the host's CAN interfaces."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Install Profinity with Docker

Run Profinity in a Docker container on most devices that can run Docker, including macOS and Linux machines and single-board computers such as the Raspberry Pi and BeagleBone Black.
Prohelion publishes the Profinity image for `linux/amd64`, `linux/arm64`, and `linux/arm/v7`, and Docker pulls the variant that matches the host processor.

A container binds all network interfaces, so other machines can reach it.
A new installation starts a one-time 14-day local trial with the Server features.
When the trial ends, Profinity keeps answering on its published ports in [restricted mode](../../Licensing.md#when-a-licence-is-missing-or-has-expired), where only sign-in, the **License** page, and the logs work.
Apply a licence file under **ADMIN > License**, as described in [Apply a licence](../Applying_a_Licence.md).
For who can sign in, refer to [Who can sign in, by installation type](../Applying_a_Licence.md#who-can-sign-in).

To upgrade a 2.2 container, read [Upgrade from Profinity 2.2](../Upgrading/Upgrade_From_2_2.md) first.

You need:

- Docker on the target device, on an x86-64, 64-bit ARM, or 32-bit ARM (ARMv7) processor
- Docker Compose, which Docker Desktop includes and which is available as a plugin on Linux
- A suitable CAN adapter for the target device

To install with a single script instead of a compose file, refer to [Install Profinity with the Docker one-line installer](./Docker_One_Line_Installer.md).
To move an existing installation to a newer image, refer to [Update the Profinity Docker image](./Update_Docker_Image.md).

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
          # PROFINITY_HOME must match the container-side mount path in volumes, otherwise the
          # security keys and profiles are written to the container's writable layer and are
          # lost when the image is updated
          environment:
            - PROFINITY_HOME=/app/Prohelion
          volumes:
            - $HOME/Prohelion:/app/Prohelion:rw
    ```

3. On Linux, create the data directory and give the container user ownership of it, because the container runs as the non-root `app` user (ID 1654) and Docker otherwise creates the directory owned by `root`:

    ```bash
    mkdir -p "$HOME/Prohelion"
    sudo chown 1654:1654 "$HOME/Prohelion"
    ```

4. In the directory that holds the compose file, run `docker compose up -d`.
5. Open `http://localhost:18080` on the local machine, or `http://<your-ip-address>:18080` from another machine.

In the second address, replace `<your-ip-address>` with the address of the machine that runs Docker.
The sign-in page opens, as described under [Sign in](#sign-in).

The compose file publishes ports `18080`, `18443`, and `4876`, and sets `PROFINITY_HOME` to the path of the mounted volume.
For what each port does, what the data directory holds and why `PROFINITY_HOME` must match the mount path, refer to [Docker ports and data directory](./Docker_Ports_and_Data_Directory.md).
To check where Profinity stores its files, open a shell in the running container with `docker compose exec profinity bash`, and run `ls -la /app/Prohelion/`.
The listing includes the `config`, `profiles`, and `logs` folders.

## Start and stop Profinity

Run these commands from the directory that holds the `docker-compose.yml` file.
Docker Compose, not Profinity, starts the container on boot.
The `restart: always` line in the compose file restarts the container whenever Docker starts, so configure Docker to start on boot.

| Command | Effect |
|---------|--------|
| `docker compose up` | Starts Profinity in the foreground |
| `docker compose up -d` | Starts Profinity in the background (detached mode) |
| `docker compose stop` | Stops the containers and keeps them, so `docker compose start` can restart them |
| `docker compose down` | Stops the containers and removes them, so you run `docker compose up` again to recreate them |
| `docker compose logs -f` | Follows the log output |

Refer to the [Docker Compose reference](https://docs.docker.com/compose/reference/) for more commands.

## Sign in

The container serves HTTP with the default credentials, so follow the [Security guide](../Security.md) to enable HTTPS before you expose it beyond a trusted network.
The browser opens the Profinity sign-in page.

<figure markdown>
![The Profinity sign-in page](../../images/login_page.png)
<figcaption>Profinity sign-in page</figcaption>
</figure>

On a fresh installation, sign in as `admin` with the password `password`, and choose a new password when Profinity asks for one at first sign-in.
For the accounts on each installation type, refer to [Who can sign in, by installation type](../Applying_a_Licence.md#who-can-sign-in), and for how to choose the password, refer to the [Security guide](../Security.md#default-credentials).
After you sign in, the Profinity homepage appears.

<figure markdown>
![The Profinity welcome page, headed "Welcome to Profinity Version 2.3", with Documentation, Add Component and Help shortcuts.](../../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

## Expose devices to the container

Docker does not expose all devices to containers.
SocketCAN is the Linux kernel's CAN interface, which Profinity can read natively when it runs in Docker, as described in [CAN bus adapters](../../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md).
To use the host's SocketCAN interfaces, run the container on the host network.
On a Linux host, remove the `#` from the `network_mode: host` line in the `docker-compose.yml` file from the installation steps, then run `docker compose up -d` again.
The container then sees the host's CAN interfaces, and components that use UDP broadcasting can be discovered.
With host networking, Docker ignores the `ports` entries, because the container uses the host's ports directly.
Host networking is also what [Profinity Mobile](../../Mobile/index.md) server discovery needs, because UDP broadcasts do not leave a Docker bridge network.

## Run Profinity in production

For production environments, and deployments that run many Profinity instances, configure Profinity with environment variables so that one compose file can serve every instance.
The compose files, `.env` files, and environment-specific deployment examples are in [Environment variables](../Environment_Variables.md#docker).
If the installation does not behave as described here, refer to [Troubleshoot Profinity in Docker](./Troubleshoot_Docker_Installation.md).
