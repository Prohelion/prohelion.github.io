# Novel sentences, batch 1 (98 sentences)
Paths relative to docs/Profinity_Software/Profinity_Version_2.3/. Sentences are lowercased and stripped of markdown by the detector; find them in the file.

## Components/Loggers/Tag_File_and_SFTP_Loggers.md
- the tag file logger and the tag sftp logger write the values of the tags in selected tag collections to a file as comma-separated values (csv) or json lines.
- the tag file logger writes the file to the local file system of the machine running profinity, and the tag sftp logger transmits it to a remote secure file transfer protocol (sftp) server.
- each is added to a profile as its own component under loggers and is included in every edition.
- <figcaption>the tag file logger writes the values in tag collections to log files on the local file system, and the tag sftp logger transmits them to an sftp server</figcaption>
- both loggers have auto connect, which is on by default, so a logger begins logging when the profile loads and needs no further action.
- the tag file logger has no destination setting.
- it creates its files under the profinity tag log directory (tag_logs/), in a folder named after the profile and the component.
- refer to the artefacts directory for where that directory sits on each platform.
- the tag sftp logger needs the remote server settings described in file logger rotation, archive, and sftp settings, which also covers rotating, archiving, and compressing the log files.
- both loggers log the values of the tags in the collections selected in collections, and only samples of good quality are written.
- logging modes describes how the modes behave across all collection-based components.
- a tag file logger shows this link as tag logs repository.

## Installation/index.md
- install profinity on linux and macos: the bootstrap installer, with update, data location, and sign-in.
- install profinity from an archive on linux and macos: a downloaded archive, started with the profinity.sh script.
- install profinity with docker: run profinity in containers with docker compose, expose can devices, and prepare for production.
- install profinity with the docker one-line installer: install in docker with a single script.
- update the profinity docker image: move a docker installation to a newer image, by hand or with watchtower.
- set environment variables: set configuration and profile values from the environment on each platform.
- environment variables: the placeholder syntax and the variables profinity reads.
- run profinity as a service: start automatically on linux, macos, or windows, with a page for each system.

## Components/Industrial_Protocols/OPC_UA_Server.md
- the opc ua server listens for open platform communications unified architecture (opc ua) clients and exposes this profile's tag tree to them as a read-only address space.
- use it to let third-party opc ua clients, such as a supervisory control and data acquisition (scada) or historian system, read the live values held in this profinity profile.
- the opc ua plugin also provides the opc ua client, and the two components can be used on their own or together.
- <figcaption>the opc ua server exposes the profinity tag tree to third-party opc ua clients as a read-only address space</figcaption>
- add the server to your profile from the industrial protocols group in the component catalogue, as described in adding components to your profile.
- for where the server keeps its certificates and how to trust one explicitly, refer to opc ua certificates.
- the component has a dashboard showing its status, the number of messages received and sent, and whether it is listening.

## How_To_Guides/Send_Receive_CAN_Bus.md
- the send / receive can bus messages page is the full can utilities reference.
- select the + icon in the scheduled can packets list at the bottom of the screen. to start from a received packet instead, double-click it or select it in the can activity panel, then select the open in schedule editor + icon at the top of the page. this opens the packet editor.
- enter the can id (hex or decimal), and select the endian byte order (little endian by default). the schedule editor reference explains why little endian is the default.
- to send a packet manually at any time, including a packet that is not set up on a schedule, select it in the scheduled can packets list and select the send arrow button, or press the space key. the packet is sent immediately.
- a scheduled packet is saved with the profile, so if you change profile or restart profinity the saved packets are not lost, and they are restored.
- packets do not start automatically after a profile change or a restart of profinity, and you need to restart them manually.

## Installation/Run_as_a_Linux_Service.md
- run profinity as a systemd service on linux to start it automatically on boot and restart it if it fails.
- install profinity first, as described in install profinity on linux and macos.
- a service serves the web interface to other machines, and opening it from another machine needs the profinity server licensed feature, as described in run profinity as a service.
- set environment variables for a service as environment= lines in the service section of the unit, because a service does not read ~/.bashrc, as described in set environment variables.
- if the service does not start, read the log with journalctl -u profinity.service.
- a "file not found" error means the path to profinity.sh in the unit does not match where profinity is installed. correct the path in the service configuration and start the service again.

## Components/Industrial_Protocols/index.md
- the opc ua plugin has one page for each component, and opc ua certificates covers the certificate folders that both components use.
- opc ua client client that polls values from a remote opc ua server into profinity tags enterprise and supervisory control and data acquisition (scada) system integration
- opc ua server read-only server that exposes profinity's tag tree to third-party opc ua clients enterprise and scada system integration
- opc ua opc ua client a remote opc ua server nodeid
- opc ua opc ua server listens for opc ua clients not applicable, because it exposes the readable scalar tags in the profile's tag tree

## Installation/Set_Environment_Variables.md
- set an environment variable for profinity so that a ${variable_name} placeholder in config.yaml or a profile file takes its value from the environment.
- for the placeholder syntax, the example files, and the variables that profinity and its install scripts read, refer to environment variables.
- set http_port to 8080 in the environment of the process that starts profinity, as described in windows, linux and macos, or docker.
- refer to run profinity as a linux service.
- profinity_home must match the container-side mount path, as described in install profinity with docker.

## Administration/Profiles.md
- the steps to create a profile, from + add profile to adding components, are in how to create a new profile.
- to import a profile pack prepared on another instance of profinity instead, open the profile pill, select upload profile pack and choose the zip file.
- the profile does not need to be active when you change its settings, and the steps are in how to set up profinity as a kiosk application.
- anyone at a kiosk inherits the permissions of its kiosk mode user, so choose a user with only the permissions the display needs, as described in kiosk mode.

## Components/Motor_Controller/index.md
- profinity monitors prohelion wavesculptor22 and wavesculptor200 motor controllers over can.
- wavesculptor motor controller: add a wavesculptor to a profile and set its name, timeout, and base address.
- wavesculptor dashboard: read the bus data, limit indicators and error indicators.
- update wavesculptor configuration and firmware: run wsconfig and flash the firmware from a windows desktop instance.

## Installation/Running_As_Service.md
- each operating system has its own procedure:
- run profinity as a linux service: a systemd unit that runs profinity.sh.
- run profinity as a macos service: a launchd plist.
- run profinity as a windows service: the profinityservice.cmd script.

## Tags/Nest_a_Component_in_the_Tag_Tree.md
- by default each component mounts at the root of the tag tree under its own name, and the tag tree path setting gives it a parent folder so that its tags nest under that location instead.
- to see what nesting does to scopes, dashboard binds, and historian data, refer to tag tree paths and dashboard binds.
- in the component identifier section of the component's settings dialog, go to tag tree path, directly below name.
- enter the parent folder as a slash-separated path, for example vehicles/car1.

## Mobile/index.md
- <figcaption>the profinity engine broadcasts a udp heartbeat that fills the discovery list in profinity mobile, and the app then connects to the chosen server over https and shows its web interface</figcaption>
- to set up discovery and connect a phone, refer to connect profinity mobile to a server.
- if no servers appear, refer to troubleshoot profinity mobile.

## Administration/License_Page.md
- the license page under admin shows the licence state of an instance, its fingerprint, and which features and component groups are licensed and available.
- to change the licence, refer to apply a licence.
- for what each edition includes, refer to licensing, and for the trial and the fingerprint, refer to trial licence, desktop use and machine fingerprint.

## Components/Chargers_and_Power/Start_a_Charge.md
- start a charge from the dashboard of a charger component that is in the same profile as a prohelion bms with control pack switched on (refer to charger components).
- before a first charge, set the limits described in charger settings.
- if a charge does not start, refer to charging troubleshooting.

## Customising_Profinity/Dashboards/Motor_Controller_and_Battery_Examples.md
- these blocks build a motor controller dashboard and a battery monitoring dashboard, and every yaml block validates against the dashboard schema.
- tag paths such as dbc/stateofcharge/socpercent and image names such as batteryicon.svg are placeholders.
- examples builds a dashboard from a hello world template, and full example analyses the finished motor controller dashboard.

## Tags/Log_Tags_to_a_File.md
- add the logger to your profile as a component.
- in collections, select the tag collections to record.
- to play a recording back, refer to replay a tag log.

## Administration/Logs_Config.md
- the levels that are recorded are set by log level on the logging tab of system configuration, which helps diagnose particular issues by limiting the system logs to particular message levels.
- log rollover size (mb) and retained logs are set on the same tab, and logging describes the log levels and these settings.

## Components/Historians/TAG_SQL_Historian.md
- the columns follow the same field set as the tag change file logger described in tag file and sftp loggers, so history written by either can be interpreted in the same way.
- if the settings save but no rows arrive, the profinity system logs (refer to logs) show one of two messages:

## Getting_Started/index.md
- how to add a component to your profile: add hardware devices and protocol adapters from the dashboard interface.
- profinity dashboard development guide: see component data on the built-in dashboards, and build your own.

## Components/Battery_Management_Systems/Update_BMU_Configuration_and_Firmware.md
- change the firmware configuration of a prohelion bmu, unlock its admin parameters, or flash its firmware from the change settings button at the top-right of the bmu dashboard.
- each d1000 gen2 parameter has a user or admin permission level, listed in the configuration parameters pages linked in the model reference table on the bmu dashboard page, and the m48 gen1 parameters are in its software specifications page.

## Components/Industrial_Protocols/OPC_UA_Certificates.md
- the opc ua client and the opc ua server keep their application certificates in the opcua_pki folder inside the profinity data folder of the account that runs profinity, in the own, trusted, issuer and rejected sub-folders.
- the trust all server certificates setting of the opc ua client and the trust all client certificates setting of the opc ua server skip certificate validation instead, and are described on the opc ua client and opc ua server pages.

## Installation/Linux_and_macOS_Installation.md
- start profinity with /opt/profinity/profinity.sh to test the configuration, or start it as a service as described in run profinity as a service.
- to stop it as a service on linux, run sudo systemctl stop profinity, as described in run profinity as a linux service.

## Tags/Replay_a_Tag_Log.md
- to record a log, refer to log tags to a file.
- replayed values are applied to the same tags that live devices write to. disconnect or stop the live source first, or the live and replayed values compete.

## Customising_Profinity/Dashboards/FAQ.md
- open it in the visual editor, read the entries under schema validation issues, and refer to dashboard schema validation errors for each error message and its fix.

## Installation/Artifacts_Directory.md
- the linux service layout and launcher are described in run profinity as a linux service, and docker volume mounts in install profinity with docker.

## Release_Notes/2.3.1.md
- anyone upgrading from 2.2 should read upgrade from profinity 2.2 and profinity 2.3 breaking changes before they upgrade a production system.

## Components/Chargers_and_Power/Charging_Troubleshooting.md
- to run a charge once the fault is fixed, refer to start a charge.

