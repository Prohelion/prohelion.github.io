# Novel sentences, batch 4 (97 sentences)
Paths relative to docs/Profinity_Software/Profinity_Version_2.3/. Sentences are lowercased and stripped of markdown by the detector; find them in the file.

## Components/Loggers/index.md
- the table compares the six loggers, and each component name links to its page.
- rotation, archive, and sftp settings that the file loggers share are on file logger rotation, archive, and sftp settings.
- component direction where the data goes selects data by auto connect default licence
- can file logger out the local file system of the machine running profinity, as native can bus messages the can bus, not tag collections on included in every edition
- can sftp logger out a remote secure file transfer protocol (sftp) server, as native can bus messages the can bus, not tag collections on included in every edition
- tag file logger out the local file system of the machine running profinity, as comma-separated values (csv) or json lines tag collections on included in every edition
- tag sftp logger out a remote sftp server, as csv or json lines tag collections on included in every edition
- influxdb v1 logger out an influxdb v1 server, which profinity sends the data to tag collections on included in every edition
- prometheus logger out served by profinity, which prometheus calls to request the latest values tag collections on included in every edition

## Tags/index.md
- create collections, rules, and dashboard bindings from tags: use the tag explorer context menu to start a collection, a rule, or a dashboard binding from selected tags.
- create a collection: build a restricted collection of cell voltages in the collections editor.
- complete rules.yaml example: read a full rules file with every setting explained.
- email and slack rule actions and webhook and mqtt rule actions: settings for each notification action.
- create a derived tag: convert speed from mph to km/h with an expression.
- tag tree paths and dashboard binds: how nesting a component in a folder of the tag tree affects scopes and binds.
- nest a component in the tag tree: mount a component inside a folder of the tag tree.
- log tags to a file: record tag values to a file with the tag file logger.
- replay a tag log: play a recording back onto your live tags from tag log replay under tag utilities, which requires replay tag changes.

## Components/Industrial_Protocols/OPC_UA_Client.md
- the opc ua client connects to a remote open platform communications unified architecture (opc ua) server and polls the nodes you list into profinity tags.
- use it to bring values from a programmable logic controller (plc), a supervisory control and data acquisition (scada) system or another opc ua server into profinity.
- the opc ua plugin also provides the opc ua server, and the two components can be used on their own or together.
- <figcaption>the opc ua client polls nodes from a remote opc ua server into profinity tags</figcaption>
- add the client to your profile from the industrial protocols group in the component catalogue, as described in adding components to your profile.
- use it only on a trusted network, and where you can, place the server's certificate in the trusted folder instead, as described in opc ua certificates.
- the component has a dashboard showing its status, the number of messages received and sent, and whether it is connected to the server.
- to move a refused certificate into trusted, refer to opc ua certificates.

## Developing_with_Profinity/Scripting/Script_Types/RunScripts.md
- run on demand runs the script when an operator selects run script from the script component's menu. cancel script stops a run that is still going.
- run on time interval runs the script automatically at a fixed interval set with time interval and time interval unit.
- time interval the interval between runs in run on time interval mode, for example every 5 minutes or every hour.
- time interval unit the unit of the interval: seconds, minutes, hours, or days.
- cron schedule a quartz cron expression for run on cron schedule mode.
- auto start script when on, a scheduled script starts by itself. otherwise it is started with start scheduled script and stopped with stop scheduled script.

## Administration/Trial_Desktop_Use_and_Fingerprint.md
- trial licence, desktop use and machine fingerprint
- a profinity instance that has no licence file is either on a one-time 14-day local trial or, on a desktop host, in free personal use.
- a licence file that prohelion signs for the instance's fingerprint replaces both.
- for what each edition includes, refer to licensing, and to apply a file, refer to apply a licence.
- a licence issued for one instance does not apply to another, and profinity rejects an upload of a licence issued for a different machine, reporting the state wronginstance if such a file is placed directly in the licence folder.
- the fingerprint is shown on the license page, with a button to copy it.

## Components/Chargers_and_Power/index.md
- profinity charges a battery pack by controlling a charger and a prohelion battery management unit (bmu) together.
- charger components: choose a tdk power supply, siglent power supply or elcon charger and add it to a profile.
- charger settings: look up the charger and supply limits and the network and can settings.
- start a charge: select the battery, set the current and charge to level, and press start.
- charging troubleshooting: fix the controller messages and a pack that does not engage.

## Installation/Run_as_a_Windows_Service.md
- run profinity as a windows service to start it automatically on boot and restart it if it fails.
- install profinity first, as described in install profinity on windows.
- for what a service is and the licence it needs for remote access, refer to run profinity as a service.
- if the service does not start, read the log in the event viewer.
- a "file not found" error means the installation directory does not match where profinity is installed, so correct the path in the service configuration and start the service again.

## Administration/Licensing.md
- to apply a licence file, refer to apply a licence, and to read the licence state of an instance, refer to license page.
- when the web server starts, profinity forces any http or https address that is not a loopback address, such as 0.0.0.0, to 127.0.0.1, whatever is entered under profinity web and even if config.yaml holds another value, and records a message beginning "remote web access requires a server license" in the profinity log.
- hardware requirements {#hardware-requirements-and-remote-access}
- refer to trial licence, desktop use and machine fingerprint for how the local trial, desktop use and the fingerprint work, and to apply a licence for the steps to install a licence file.

## Components/Battery_Management_Systems/index.md
- profinity monitors and manages prohelion battery management systems (bms) through the battery management unit (bmu) added to a profile.
- prohelion bmu: choose the bms model, add the bmu to a profile and set its base address, timeout, and control pack option.
- bmu dashboard: read the bmu data, status indicators, state machine and node telemetry.
- update bmu configuration and firmware: change firmware settings, unlock admin parameters and flash the firmware.

## Customising_Profinity/Dashboards/Examples.md
- building blocks for motor controller and battery dashboards are in motor controller and battery examples, and examples of the html, image, and table components are in dashboard component examples.
- tag paths such as dbc/temperature/value are placeholders.
- replace them with tags from the tag explorer or the readouts stay blank.
- full example analyses the complete motor controller dashboard, data binding describes the binding settings used here, dashboard schema validation errors lists validation messages and their fixes, and troubleshooting covers binding problems.

## Tags/Email_and_Slack_Rule_Actions.md
- the email and slack actions send a notification each time a tag rule transitions.
- both need the tag rule actions licensed feature, included in the server and enterprise editions.
- to add one to a profile so that a rule can select it, refer to making an action available.
- for the webhook and mqtt actions, refer to webhook and mqtt rule actions.

## Installation/Docker_Installation.md
- to install with a single script instead of a compose file, refer to install profinity with the docker one-line installer.
- to move an existing installation to a newer image, refer to update the profinity docker image.
- the compose files, .env files, and environment-specific deployment examples are in set environment variables.

## Administration/Choose_Available_Components.md
- the component catalogue half of components & plugins lists every component type that is available and lets you choose which ones engineers see when they add a component to a profile.
- opening the screen requires the view plugins permission, and changing the catalogue requires modify plugins, as described in install and manage plugins.
- the components of a disabled plugin do not appear in the catalogue at all, so enable the plugin again first, as described in install and manage plugins.

## Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Troubleshooting.md
- this page covers the adapter status indicator, a can to ethernet bridge that auto discovery does not find, and the bit rate that every device on a can bus must share.
- the adapters are listed on can bus adapters.
- for the parameters of each adapter, refer to can bus adapter settings.

## Customising_Profinity/Dashboards/Component_Examples.md
- these examples show the html, image, and table components, and every yaml block validates against the dashboard schema.
- tag paths such as dbc/voltage/value and image names such as statusicon.svg are placeholders.
- component reference describes every parameter of each component, and examples builds a dashboard step by step.

## Tags/Create_a_Derived_Tag.md
- this procedure creates a derived tag that converts a vehicle's speed from mph to km/h, grouped under that vehicle.
- open the derived tags editor first, as described in derived tags, which lists the permissions it needs.
- for the formula rules, refer to expression-based derived tags.

## Administration/Kiosk_Mode.md
- kiosk mode is set per profile, by enabling kiosk mode in the profile settings and selecting a kiosk mode user, who must be an enabled user, as described in choosing the kiosk user.
- the steps, together with the browser and operating system setup that opens profinity full screen on the display, are in how to set up profinity as a kiosk application.

## Components/Historians/InfluxDB_Historians.md
- the profinity system logs name the cause, and logs describes where to read them.
- influxdb v1 servers use the influxdb v1 logger, which is described in influxdb v1 logger.

## Getting_Started/Quick_Start.md
- how to add a component to your profile adds further components.
- profinity dashboard development guide shows data from your components and builds your own dashboard.

## Administration/Install_and_Manage_Plugins.md
- use the installed plugins half of components & plugins to install plugins and to switch them on and off.
- the other half of the screen, component catalogue, hides or shows individual component types, as described in choose available components.

## Components/Chargers_and_Power/Charger_Settings.md
- profinity asks for these settings when a charger component is added to a profile.
- to run a charge with these limits, refer to start a charge.

## Customising_Profinity/Dashboards/Schema_Validation_Errors.md
- this page explains how to read and fix the schema validation errors that the dashboard editor reports.
- for data that does not update, performance and problems with a single component, refer to troubleshooting.

## Release_Notes/Breaking_Changes_2_3.md
- these changes in profinity 2.3 can affect an installation, integration, or plugin that works on 2.2.
- read them with upgrade from profinity 2.2 before you upgrade a production system, and refer to the profinity 2.3 release notes for the new features and known issues.

## Administration/Users_and_Access/MFA_Account_Management.md
- reset password, also on the user actions tab of the other user's settings dialog, requires the user to choose a new password at the next sign-in and signs out the user's active sessions, as described in password policy.

## Developing_with_Profinity/Scripting/Script_Types/ServiceScripts.md
- auto start script when on, the service starts by itself.

## Integrating_to_Profinity/index.md
- refer to mcp server for how to connect and authenticate, and to the mcp tool reference for the full list of tools.

## Tags/Tag_Expressions.md
- for the places these expressions are used, refer to collections, alerts log, rules, actions, derived tags and create collections, rules, and dashboard bindings from tags, or return to the tag layer overview.

