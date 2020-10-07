---
title: ArrowPoint Telemetry Config
tags: [ArrowPoint, Telemetry, Config]
keywords: ArrowPoint, Telemetry, Config
last_updated: November 22, 2019
summary:
sidebar: arrowpoint_sidebar
permalink: ArrowTelemetry_Config.html
folder: ArrowPoint
---

## Introduction
There are two main ways that the Telemetry system is configured. Firstly the actual application itself is configured via the use of an application.properties file that is located in the source code. This file is loaded by Spring Boot as part of the application initialization and used to configure the application behaviors. The second way the application is configured is to change the CANbus ids that are used to track devices in your vehicle, this change is documented separately below.


## Changing the application.properties
The Telemetry system is configured via the use of a properties file which is stored in the telemetry code based under the directory
```
[Install Directory]\ArrowPoint-Telemetry\src\main\resources\application.properties
```


| Telemetry Configuration | Details | 
|-------|--------|---------|
| **Application** | |
| telemetry.username=admin | Username for the login page |
| telemetry.password=password | Password for the login page |
| | |
| **[Splunk]** | |
| enable.splunk.connector = true | Enable the splunk connector to relay telemetry information to Splunk (true / false) |
| splunk.host=splunkenterprise |Name of the host running Splunk, in the Docker configuration this container is called splunkenterprise. If you have installed Splunk seperately this should be the hostname of your host |
| splunk.port=8089 | Port that the Splunk API interface is running on, by default this is 8089 |
| splunk.username=admin | Splunk admin username |
| splunk.password=password | Splunk admin password |
| splunk.owner=admin | Splunk data owner typically also admin |
| splunk.scheme=https | Protocol used to relay data to Splunk, by default this should be https |
| splunk.tcpwriter.port=9999 | Data is relayed by the Splunk TCP writer, this is the default port for that component |
| | |
| **Weather Data Connection** | |
| enable.weather.connector = false | Enable the weather station data connector |
| weather.host = 192.168.1.42 | IP address of the weather station TCP to Serial Bridge |
| weather.port = 100 | Telnet port for connecting to the weather station |
|  weather.timeout = 1000 |  Timeout value for the Telnet Connection|
|weather.poll.interval = 5000 | Poll interval for the weather station in milli-seconds |
| | |
| **GPS Connection Listener** | |
| enable.gps.connector = false | Enable the GPS connection |
| gps.host = 192.168.1.60 | Host for the GPS connection (this is typically the IP address of the server running the telemetry application) |
|gps.port = 11123 | Port that the conenctor run on (note that this port should be setup to handle inbound connections) |
| | |
| **Telemetry Data Forwarder** | |
| enable.data.forward = false |Enable the telemtry data forwarder, which will forward telemetry data to another telemetery instance |
| data.forward.cron = 0 * * * * * | CRON schedule on which the latest data will be forwarded |
| data.forward.url = | URL to which the data should be forwarded, the url should end in the url forward-data.json for example http://ec2-33-159-9-132.eu-central-1.compute.amazonaws.com:9000/forward-data.json |
| | |
| **Alerting and Lights** | |
| enable.alerts = true |Enable the external lighting system for alerting |
| alerts.dir = C:/config/alerts/ | Directory to find the alert script files |
| alerts.values.file = C:/config/alerts/Alert_Values.csv |Values to alert on |
| alerts.flags.file = C:/config/alerts/Flag_Values.csv | CANbus Flag Messages |
| | |
| **Route** | |
| enable.route = false | Enable the routing functionality for tracking vehicle progress |
| route.file = C:/config/route/routedata.csv | Route file containing the route information |
| | |
| **UDP Receive and Broadcast** | |
| udp.host = 239.255.60.60 | Host IP address used to broardcast UDP packets for tranmitting sourced data like the weather data and placing it on to the CANbus IP network |
| udp.port = 4876 | What port should the UDP traffic be broardcast on |
| udp.local.address = 127.0.0.1 | Local address use for UDP broardcasts |
| | |
| **Can File Loader** | |
| can.loader.directory = file:///tmp | Directory where CANbus files that you want to bulk load should be placed |
| can.loader.pattern = *.csv |Extension of the CANbus files |
| can.loader.poll.interval = 5000 | How often should the system check this folder for bulk loads |
| | |
| **Infrastructure Configuration** | These settings should only be changed if you are looking to change how the application itself behaves, they do not change the functional behaviour of the application. The [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html) is the best source of information on these settings |
| spring.application.name=Prohelion Telemetry |  |
| spring.mvc.favicon.enabled = false |  |
| server.port = 9000 |  |
| server.servlet.contextPath=/ |  |
| server.servlet.session.timeout=3600 |  |
| | |
| **Thymeleaf Configuration** |  |
| spring.thymeleaf.cache=false |  |
| spring.thymeleaf.enabled=true |  |
| spring.thymeleaf.prefix=classpath:/templates/ |  |
| spring.thymeleaf.suffix=.html |  |
| | |
| **DataSource Configuration** |  |
| jdbc.driverClassName=org.postgresql.Driver |  |
| jdbc.url = jdbc:postgresql://timescaledb:5432/teamarrow |  |
| jdbc.user = teamarrow |  |
| jdbc.pass =**REMOVE**|  |
| init-db = false |  |
| | |
| **Hibernate Configuration** |  |
| hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect |  |
| hibernate.show_sql=false |  |
| hibernate.hbm2ddl.auto=validate |  |
| | |
| **Debugging Configuration** |  |
| logging.level.org.springframework.web=INFO |  |
| logging.level.org.hibernate=ERROR |  |
| | |
| **Use for SQL debugging** |  |
| #logging.level.org.hibernate.SQL=INFO |  |
| #logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE |  |
| #logging.level.org.springframework.transaction.interceptor=TRACE |  |

## Changing the CANbus ID's in the Telemetry Application
Changing the CANbus IDs is currently a bit complex and requires a few steps. The actual IDs are stored and managed from the Timescale DB (postgres) instance that runs behind the Telemetry system in docker. The docker system automatically runs the setup scripts to create these IDs when the instance is first created. You will find those setup scripts in /docker/TimescaleDB directory.

The build script builds an init.sql file based on a DDL stored elsewhere in the code
```
del init.sql
type ..\..\data_model\ddl\postgres.sql > init.sql
type ..\..\data_model\ddl\functions.sql >> init.sql
type ..\..\data_model\ddl\referencedata.sql >> init.sql

docker build --no-cache -t prohelion/timescaledb-with-data:0.4 .

rem del *.sql
```

*  postgres.sql sets up the structures, this generally should not need to be changed
*  fuctions.sql set up a set of functions in the database to help us manage the data, again this should not need to be changed
*  referencedata.sql is where all the CANbus ID's are setup and defined. This file will likely need to change for your configuration

The following example show how a single CANbus data_pnt 'Flash Serial' is configured.
*  The device type sets up if the device is analog or digital
*  The device itself is defined (in this case it is the BMS DC2DC board)
*  The device has a thing that can be measured, this will have CanId (in this case it is 100 hex)
*  The measurement has two components, both are integers, one 'Flash Serial' exists at CAN_DATA_OFFST 0 and the other 'Device Id' at CAN_DATA_OFFST 4

```
insert into dev_type(DEV_TYPE_ID, DEV_TYPE) values (1, 'Analog');
insert into dev_type(DEV_TYPE_ID, DEV_TYPE) values (2, 'Binary');

insert into dev(DEV_ID, DEV_NAME, DEV_ABBREV) values (10, 'BMS DC-DC Board', 'BMS-DC-DC');

insert into msrmnt(MSRMNT_ID, MSRMNT_NAME, MSRMNT_TYPE, CAN_ID, DEV_ID_FK, DEV_TYPE_ID_FK, REPRTNG_FRQ) values (80, 'BMS DC-DC Heartbeat', 'DC-DC_Heartbeat', hex_to_int('100'), 10, 1, 1);

-- DC-DC
insert into data_pnt(DATA_PNT_ID, DATA_PNT_CAN_ID, NAME, DESCR, DATA_LEN, CAN_DATA_OFFST, DATA_TYPE, LOW_ERR_THRHLD, LOW_WRNG_THRHLD, HIGH_WRNG_THRHLD, HIGH_ERR_THRHLD, MSRMNT_ID_FK, UNITS) values (1, hex_to_int('1004'), 'Flash Serial', 'Flash Serial', 4,  4 ,'int', 0, 0, 0, 0, 80, 'NA');
insert into data_pnt(DATA_PNT_ID, DATA_PNT_CAN_ID, NAME, DESCR, DATA_LEN, CAN_DATA_OFFST, DATA_TYPE, LOW_ERR_THRHLD, LOW_WRNG_THRHLD, HIGH_WRNG_THRHLD, HIGH_ERR_THRHLD, MSRMNT_ID_FK, UNITS) values (2, hex_to_int('1000'), 'Device Id', 'Device Id', 4,  0 ,'int', 0, 0, 0, 0, 80, 'NA');
```

Once the changes have been made, you will need to rebuild your docker file using **/docker/TimescaleDB/build.cmd** and then restart the application. What we should now see is that the information shows up in the menu and options like so.

## Changing the CANbus ID's in Splunk
Splunk uses a lookup table to convert raw CANbus Ids to text names. Currently if you change your CANbus IDs then you will need to regenerate this lookup file and provide it to Splunk. You can do this buy running the following SQL against the timescaledb database from within PgAdmin which you can access via [http://localhost:5080](http://localhost:5080).

```
SELECT data_pnt_can_id, data_pnt_name, dev_name, msrmnt_name FROM public.splunk_lookup_data;
```

The resulting file should be exported saved as DataPoint_CanID.csv and then loaded in to Splunk in the data lookup table files menu [http://localhost:8000/en-GB/manager/launcher/data/lookup-table-files](http://localhost:8000/en-GB/manager/launcher/data/lookup-table-files).

An example file is included with the code in the directory \ArrowPoint-Telemetry\config\lookups if you are looking for an example of how this file should appear.

Once the file has been loaded, Spunk should work as expected.


{% include links.html %}