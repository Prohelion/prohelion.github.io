---
title: ArrowPoint Telemetry Setup
tags: [ArrowPoint, Telemetry, Setup]
keywords: ArrowPoint, Telemetry, Setup
last_updated: November 22, 2019
summary:
sidebar: arrowpoint_sidebar
permalink: ArrowTelemetry_Setup.html
folder: ArrowPoint
---

## Introduction
The ArrowPoint Telemetry system is designed to very light weight in terms of physical infrastructure.

In a race environment TeamArrow runs the entire system on a single i7 laptop with an SSD hard drive. However, since the solution does store substantial amounts of information we would recommend at a minimum a 256GB SSD with 100GB free storage for a race environment.

The system has been tested on Windows 10 and Amazon EC2 Unix, but should run on any form of Unix that supports Docker (including Apple Laptops). As the system is passive apart from a couple of key features, it is possible to run two instances of the solution on two laptops and achieve high availability. Laptops make much more sense than dedicated hardware or PCs in a race environment as the battery in a laptop is fundamentally built in and the power supply problems are much simpler in a chase car when running low power electronics.

## Pre-requirements
* Windows 10 or Linux OS
* [Docker Desktop](https://www.docker.com/products/docker-desktop)– If you are planning to use the Docker container model
    * If you are not using docker you will also need to install Postgres 10, PgAdmin and optionally Splunk
* [Java 8 or higher](https://www.oracle.com/technetwork/java/javase/downloads/index.html) we would suggest you download the Java Development Kit or JDK
* [Apache Maven](https://maven.apache.org/)
* [Git](https://git-scm.com/) – We would suggest [Atlassian SourceTree](https://www.sourcetreeapp.com/) if you are new to Git as it is a bit easier to use than Git on the command line
* [Spring Tool Suite](https://spring.io/tools3/sts/all) – If you want to change the code or contribute to the project



## Docker based Install
The software infrastructure required to run the ArrowPoint Telemetry system is complex and the simplest way to install the solution is using Docker. Docker is a container management solution designed to provide containers for applications or in our case application components such as a database or Splunk. The containers then run on a docker instance which is installed on your PC. Prohelion has prepared Docker containers with the right setup for your database and Splunk configuration. While you can setup these manually, it’s complex and we wouldn’t recommended it. If you are not wanting to use Docker then please see the Docker Free Installation information below.

To install the ArrowPoint Telemetry system download a copy of the code from the [GitHub repository](https://github.com/Prohelion/ArrowPoint-Telemetry) by cloning the code or downloading a release zip.

In the root directory of your download you will find a file called

```shell
docker-compose.yml
```

This file contains the configuration information to run the software in Docker.

## Known Issue
Docker does not support UDP traffic on its virtual network. As such the telemetry system cannot receive traffic from the CANbus devices such as the Tritum Wavesculpter. To get around this issue the infrastructure required to run the Telemetry system runs in Docker apart from the core application which runs as a stand alone Spring Boot Application and hence can access the UDP network directly.

## Installation Steps

<table>
<colgroup>
<col width="10%" />
<col width="90%" />
</colgroup>
<thead>
<tr class="header">
<th>Step</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td markdown="span">1</td>
<td markdown="span">Install Docker.</td>
</tr>
<tr>
<td markdown="span">2</td>
<td markdown="span">	
Modify the hosts file on your machine to include the name of the three hosts used in the system. Information on how to modify your host file can be found on the following [article from how to geek](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/).

If you are just running the whole configuration on one machine then the hosts file should look like this

```
127.0.0.1	timescaledb
127.0.0.1	splunkenterprise
127.0.0.1	telemetry
```

If you are running the different components on different machines then the host file change should occur on the machine that you are running the telemetry system on (the one you start in step 4 below) and should reflect the IP addresses of the machines where docker (as started in step 3 below) is running.
</td>
</tr>
<tr>
<td markdown="span">3</td>
<td markdown="span">Run the Docker configuration. Note the first time you run this command the system will need to download a lot of images from docker. It's worthwhile doing this on a high speed network as you are probably going to be downloading 100's of MBs worth of images.
<code class="codeblock">
docker-compose up
</code>
Once this command is complete the back end of the system ([timescaledb](https://www.timescale.com/), [splunk](https://www.splunk.com/), [pgadmin](https://www.pgadmin.org/)) will be up and running locally on your machine.
</td>
</tr>
<tr>
<td markdown="span">4</td>
<td markdown="span">Run the main application, note again the first time you run this application a bunch of files will need to be downloaded from maven repositories, this is a one off event.
<code class="codeblock">
StartTelemetry.cmd 
</code>
Or you can run the command below in the same directory as the pom.xml file
<code class="codeblock">
mvn spring-boot:run
</code>
</td>
</tr>
<tr>
<td markdown="span">5</td>
<td markdown="span">To simulate some CANbus traffic to see the system operating you can run the command
<code class="codeblock">
carUtilities.cmd
</code>
Select option 3 to replay a log file and then use the canlog.csv file which is included in the home directory of the project and say Y for yes to loop the file
<code class="codeblock">
Prohelion Car Testing Utilities

What utility would you like to run?

0) Exit
1) Cruise Control Test
2) Cruise Control Step Test
3) CanBus Log Replayer

Make your selection > 3

Prohelion Log Replayer V1.0
Note: Filenames should entered using Java form
D:/temp/car-park-test.csv
Enter the log you wish to replay > canlog.csv
Do you wish to loop the file (Y/N) > Y
</code>
You should then see the CANbus log being replayed with many items like this
<code class="codeblock">
Delay = 0 : CanPackey time = 09:23:58.792   , id =  0x501 , data= 0x3F0B17E5457A0000
</code>
</td>
</tr>
<tr>
<td markdown="span">6</td>
<td markdown="span">Open the appropriate console by going to the following URL:
<br/>
ArrowPoint Console : [http://localhost:9000](http://localhost:9000) - Login: admin / passw0rd!
<br/>
Splunk Console: [http://localhost:8000](http://localhost:8000) - Login: admin / passw0rd!
<br/>
PgAdmin Console: [http://localhost:5080](http://localhost:5080) - Login: admin@prohelion.com / passw0rd!
</td>
</tr>
</tbody>
</table>
{% include links.html %}