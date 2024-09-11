---
title: Installing Profinity V2
---

# Installing Profinity V2

Profinity V2 is currently available on Windows machines as a standard desktop application and on MacOS and Linux machines as a Docker container.

## Installation on Windows

Installing Profinity on your Windows machine is relatively simple due to the Profinity Setup Wizard.

[Download Profinity :material-download:](https://github.com/Prohelion/Profinity/releases/latest/download/Profinity.install.msi){ .md-button }

1. Download the installer using the above link
2. Open the downloaded file `Profinity.Install.msi`
3. Follow the prompts in the Profinity Setup Wizard

## Installation using Docker

Profinity V2 can be deployed onto most devices capable of running Docker, including Raspberry Pi, BeagleBone Black, etc.

There are two possible methods for setting up Profinity V2 using Docker. The [simple setup procedure](#simple-setup) is recommended for most users. Advanced users may choose to follow the [advanced method](#advanced-setup), 

### Prerequisites

The following items are required to be able to install Profinity V2:

- Docker installed on the target device
- Docker Compose installed on the target device (included with Docker Desktop, available as plugin on Linux machines)
- A suitable CAN adaptor for the target device

### Simple Setup

To 

Create an empty directory and a file titled `docker-compose.yml` in the new directory. The contents of the `docker-compose.yml` file should be

```
services:
  profinity:
      image: prohelion/profinity:develop
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

### Advanced Setup

The advanced setup procedure is an extension of the simple setup procedure that is more tailored towards development use cases.

In addition to 

The `Config.yaml` file provides the global configuration for the Profinity instance. If you have an existing desktop installation of Profinity V2, you can copy the `Config.yaml` file from that installation, but there are several key fields which must be changed:

- `Active Profile`: This field specifies the path to the target Profile. For use in a Docker container, this must be set to `/root/Prohelion/Profinity/Profiles/Default.pprof`
- `ClientId`: This field is a GUID value representing the client ID of this instance of Profinity. The `ClientId` must be unique to each instance of Profinity and should not be shared between instances. This should match the `TransmittingClientId` field inside
- `WebServer`
    - `Urls`: Default value is `http://localhost:18080`, but to ensure the web client works inside a Docker container, this should be updated to `http://[service-name]:18080`, where `[service-name]` is the name of the Profinity service in your `docker-compose.yml` file (e.g., `http://profinity:18080`)
    - `RestAPI`: TO enable the RestAPI and make that service available via the `WebServer` url (e.g., `http://[ip]:18080/swagger/index.html`), set the `Enabled` and `Swagger` fields under `RestApi` to `true`, and set `Enabled` under `WebSite` to `true` 

If you do no have an existing Profinity installation or wish to create the file from scratch, first create an empty file at the directory `./Profinity/Config/Config.yaml`. Then, populate the `Config.yaml` file with the following:

```
Version: 1
ActiveProfile: /root/Prohelion/Profinity/Profiles/Default.pprof
ClientId: TODO
Options:
  BMSCalibration: false
  CMUCalibration: false
  WebServer:
    Urls: http://localhost:5000
    HttpsRedirect: false
    WebSite:
      Enabled: true
    RestAPI:
      Enabled: true
      Swagger: true
AppSettings:
  MaxRetainedCanPackets: 1000
  Logs:
    LogLevel: Trace
    RollsizeMB: 1
    RetainedLogs: 10
```



```
Name: Default Profile
Description: Default Profinity Profile
Version: 2.0.1.0
ReadOnly: false
Remote: false
ProfileDevices:
  SocketCAN Adapter:
    BusName: can0
    AutoConnect: true
    Type: ProhelionSocketCANAdapter
```

### Starting and Stopping Profinity

The Profinity Docker container is started and stopped using commands from the [Docker Compose toolset](https://docs.docker.com/compose/reference/). First, navigate to the original directory (the one containing the `docker-compose.yml` file). Then, to begin Profinity, enter `docker compose up` into the command line.

With Profinity running, open the URL defined in the `Config.yaml` file (i.e., `http://profinity:18080`) to access the Profinity V2 web client. For users that followed the [simple setup procedure](#simple-setup), the default URL is `http://localhost:18080`.

To stop Profinity, enter `docker compose down` into the command line.