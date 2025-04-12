---
title: Windows Installation
---

# Installing Profinity

Profinity is currently available on [Windows machines](./Windows_Installation.md) as a standard desktop application, for selected [Unix Platforms (including macOS and Linux)](./Zip_Installation.md) and as a [Docker container](./Docker_Installation.md) for Docker enabled environments and Cloud setups.

## Installation on Windows

Installing Profinity on your Windows machine is relatively simple due to the Profinity Setup Wizard.


[Download Profinity :material-download:](https://github.com/Prohelion/Profinity/releases/latest/download/Profinity.install.msi){ .md-button }


1. Download the installer using the above link
2. Open the downloaded file `Profinity.Install.msi`
3. Follow the prompts in the Profinity Setup Wizard

Launching the Profinity desktop client will take you directly to the Profinity homepage.

<figure markdown>
![Profinity Homepage](../../images/homepage.png)
<figcaption>Profinity homepage</figcaption>
</figure>

!!! info "Available Ports for Windows"
    Even when Profinity is just being run as a Desktop application, it still connects to all available TCP interfaces on the running machine on port 18080 by default.  If you do not want your Profinity instance to be accessed remotely, change the default IP address that Profinity runs on to localhost (127.0.0.1) in the [System Configuration](../../Admin/system_config.md).

### Starting and Stopping Profinity

A a Windows Desktop application, Profinity is started by running the application from the Start Menu.  

To stop Profinity, shutdown the Application.

### Accessing a Desktop Application Instance via a Web Browser

With Profinity Desktop running, you can also access it as a web application if the Profinity instances is running on an address other than 127.0.0.1.  

To do so open the URL defined in the [Admin / System Configuration / Web panel](../../Admin/system_config.md) (i.e., `http://profinity:18080`) to access the Profinity web client. For users that followed the default setup procedure, the default URL is `http://localhost:18080` on the local machine or the IP address of the machine and `http://[Your IP Address]:18080` if accessed remotely.

Connecting to the Profinity web client will direct you to the Profinity login page. 

<figure markdown>
![Profinity login page](../../images/login_page.png)
<figcaption>Profinity login page</figcaption>
</figure>

A fresh install of Profinity will only have the administrator user active. To log in, use the following login details.

Username: `admin`

Password: `password`