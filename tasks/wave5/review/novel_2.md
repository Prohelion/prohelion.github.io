# Novel sentences, batch 2 (98 sentences)
Paths relative to docs/Profinity_Software/Profinity_Version_2.3/. Sentences are lowercased and stripped of markdown by the detector; find them in the file.

## Components/Loggers/CAN_File_and_SFTP_Loggers.md
- the can file logger and the can sftp logger record native can bus messages to a file, which the can file logger stores on the local file system of the machine running profinity and the can sftp logger transmits to a remote secure file transfer protocol (sftp) server.
- each is added to a profile as its own component under loggers and is included in every edition.
- <figcaption>the can file logger records can bus messages to log files on the local file system, and the can sftp logger transmits them to an sftp server</figcaption>
- both loggers have auto connect, which is on by default, so a logger begins logging when the profile loads and needs no further action.
- they record the bus, so they do not use tag collections.
- the can file logger has no destination setting.
- it creates its files under the profinity can bus log directory (can_bus_logs/), in a folder named after the profile and the component.
- refer to the artefacts directory for where that directory sits on each platform.
- the can sftp logger needs the remote server settings described in file logger rotation, archive, and sftp settings, which also covers rotating, archiving, and compressing the log files.
- a can file logger shows this link as file logs repository.
- to take the same data further, refer to how to configure data logging.

## How_To_Guides/Add_Component_to_Profile.md
- add a component to the active profile from the sidebar or homepage to monitor a can bus device, then check its status and connect it.
- you need profinity v2 installed and running, a loaded profile, and the modify components permission, which allows components to be added (roles and permissions).
- some component types also need a licence that includes the feature behind them, because a component type that is not licensed shows as unavailable, such as a historian.
- the add component page groups the component types by category.
- the filter options are on the left-hand side of the page, and the component types filter limits the list to one category:
- select + add component in the sidebar or on the homepage. a page opens that lists every component type that can be added, including hardware devices, data loggers and custom scripts. some can bus adapters in profinity can be auto-discovered, and a discovered adapter that is available in your configuration is shown at the top of the screen.
- select the type to add. profinity prompts for a component name, which must be unique in the profile, a can id or address where the device needs one, the setting that starts the component automatically, and any settings specific to that component type. the properties required differ for each component.
- each component has a coloured indicator on its icon that displays the operational status of the device.

## Components/Historians/index.md
- component direction stores data in selects data by licence interval setting
- influxdb v2 historian out, and read back through the apis an influxdb v2 server, using a bucket and organisation collections historians feature logging interval (sec), default 10, minimum 1
- influxdb v3 historian out, and read back through the apis an influxdb v3 server, using a database collections historians feature logging interval (sec), default 10, minimum 1
- tag sql historian out, and read back through the apis a sql database: sqlite, sql server / azure sql, postgresql, mysql, or oracle collections historians feature update interval (seconds), default 10, from 10 to 86400
- the influxdb v2 historian needs influxdb bucket, influxdb organisation and influxdb token, all required, and the influxdb v3 historian needs influxdb database and influxdb token, both required.
- the tag sql historian needs a database provider, which defaults to sqlite, and a required connection string.
- an influxdb v1 server needs the influxdb v1 logger, which is a logger rather than a historian and is documented under influxdb v1 logger.

## Installation/Linux_and_macOS_Archive_Installation.md
- install profinity from an archive on linux and macos
- install profinity from a downloaded archive when you are trying it, running it interactively, or installing without root or systemd.
- to install on a linux server or embedded device, or on any host where profinity should start on boot, use the bootstrap installer instead.
- to have profinity start on boot, configure the extracted files as a service by following run profinity as a service.
- to open the web interface and sign in, refer to open the web interface.
- on linux, create the artefacts directory and set its ownership before the first start, or set profinity_home to a writable path, as described in where profinity stores its data.
- profinity fails to start with a permission error on /var/lib/prohelion: refer to troubleshooting.

## Installation/Run_as_a_macOS_Service.md
- run profinity as a launchd service on macos to start it automatically on boot and restart it if it fails.
- install profinity first, as described in install profinity on linux and macos.
- a service serves the web interface to other machines, and opening it from another machine needs the profinity server licensed feature, as described in run profinity as a service.
- to check that the service is running, run sudo launchctl list grep com.profinity.service, which lists the service when it is loaded.
- if the service does not start, read the log in the console application.
- a "file not found" error means the path to profinity.sh in the plist does not match where profinity is installed, so correct the path in the service configuration and start the service again.

## Components/Loggers/Prometheus_Logger.md
- the prometheus logger serves the values of the tags in selected tag collections to prometheus.
- <figcaption>the prometheus logger serves the selected tag collections to a prometheus server that calls profinity to request the latest values</figcaption>
- prometheus stores data only and has no graphing capability out of the box, so it is usually coupled with a tool such as grafana for visualisation.
- if the logger cannot open its prometheus endpoint (for example the port is in use), it shows error, writes the reason to the profinity system logs (refer to logs) once, and retries every 5 seconds until the problem clears.
- for the steps to set up logging, refer to how to configure data logging.

## Profinity_AI/AI_Skills_Reference.md
- this page lists the seven skills in ai skills, what they need to work, and the ai tools that can use them.
- to install them, refer to install ai skills.
- a skill that saves a dashboard, rule, or collection needs the matching permission for the signed-in user, such as modify dashboards, modify tag rules, or modify tag collections (refer to roles and permissions).
- the dashboard, rules, collections, derived tag, and app gpts can read and save through the rest api, but the script and plugin gpts cannot, so they give you the commands to run yourself.
- to build a custom gpt, refer to install ai skills.

## CAN_Utilities/Send_Receive_CAN_Bus_Messages.md
- a packet sent from profinity goes on to the live can bus and is acted on by every connected device.
- read the warning in how to send and receive can bus messages before you send one.
- the scheduled can packets list at the bottom of the screen shows every scheduled packet, and the + icon opens the schedule editor to define a packet.
- to send, schedule, stop, and restore packets, refer to how to send and receive can bus messages.

## Components/Publishers_and_Subscribers/index.md
- component selects data by data format retries
- mqtt publisher tag collections json, a flat object of tag key to numeric value, or sparkplug b keeps trying to connect every 5 seconds
- webhook publisher tag collections a json array of samples, in one post for each publish when the destination returns a status other than a success code, cannot be reached, or takes longer than 10 seconds to respond, makes up to three attempts in total, and if all three fail the batch is not retried further
- mqtt subscriber topic filter sparkplug b metrics, scalar types only, written as read-only tags keeps trying to connect every 5 seconds

## Integrating_to_Profinity/MCP_Server/index.md
- the mcp server provides ten read-only tools: get_all_components, search_tags, get_tag_catalog, get_tag_sample_by_canonical_id, get_tag_samples, get_tag_series, get_tag_series_batch, get_alert_rules, get_active_alerts and get_alert_history.
- refer to mcp tool reference for the parameters and return values of each tool.
- a tool omits a tag or alert the calling user cannot view and never reports it as an error, so a response that looks smaller than expected usually reflects the caller's own permissions.
- mcp tool reference: parameters and return values of the ten tools

## Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md
- the parameters that manual configuration asks for are in can bus adapter settings.
- if a can to ethernet bridge does not appear in the discovered category, refer to if a can to ethernet bridge is not found.
- for the adapter status colours and the bit rate that every can device must share, refer to can bus adapter troubleshooting.

## Components/Tag_Relays/index.md
- component runs on role default protocol auto connect
- tag relay sender the site instance that owns the tags exports a snapshot of the tags in selected collections at a fixed interval, over https or mqtt. https on by default
- tag relay receiver the central instance mounts the incoming tags as read-only tags under a prefix that identifies the sending site. mqtt on by default, with the mqtt protocol

## Tags/Actions.md
- the settings of each action are described in email and slack rule actions and webhook and mqtt rule actions.
- a script uses it to log, branch, or pass values on, and the webhook and mqtt actions send the same list as the triggeringtags array of their json message, described in webhook and mqtt rule actions.
- for the rest of the tag layer, refer to tag layer, tag expressions, collections, and derived tags.

## Components/Battery_Management_Systems/BMU_Dashboard.md
- the bmu dashboard shows the data of a prohelion battery management system (bms), and appears as a tab in the sidebar once a prohelion bmu is added to the profile.
- the top section of the dashboard shows data from the bmu, and clicking the more details banner expands it to display telemetry from the cell management units (cmus).
- to change the settings that the bmu dashboard shows, refer to update bmu configuration and firmware.

## Components/Loggers/File_Logger_Rotation_Archive_and_SFTP.md
- file logger rotation, archive, and sftp settings
- the can file and sftp loggers and the tag file and sftp loggers share the settings on this page for rotating, archiving, and compressing log files, and for connecting to an sftp server.
- if a transfer fails, profinity writes "failed to transfer archived tag log via sftp" to the profinity system logs (refer to logs) for the tag sftp logger, so check the host, port, credentials, and remote directory there.

## Mobile/Connect_Profinity_Mobile_to_a_Server.md
- to connect profinity mobile to a server, check the discovery settings on the profinity engine, then select the server from the app's discovery list.
- you need the app installed on the phone (refer to profinity mobile).
- if the discovery list is empty or sign-in does not complete, refer to troubleshoot profinity mobile.

## Tags/Rules_YAML_Example.md
- the rules visual editor writes rules to a file, shown here in full so that every setting is in one place, and the file can also be edited directly.
- it assumes a collection with the id cellvoltages, as created in create a collection, and two actions named opsslack and opsemail that were added as described under making an action available.
- for the editor, evaluation settings and permissions, refer to tag rules.

## Developing_with_Profinity/Scripting/Script_Types/Rule_Scripts.md
- drop (default) discards the new firing while the current one is still running.
- queue holds a bounded backlog, up to queue depth (1 to 100, default 8), and runs it once the current firing completes.

## Release_Notes/index.md
- profinity 2.3 release notes: editions and licensing, profinity ai, derived tags, publishers and subscribers, role-based access control (rbac), single sign-on (sso) and multi-factor authentication (mfa), mobile, linux artefacts path, and known issues.
- profinity 2.3 breaking changes: what changes for existing installations, integrations, and plugins, including the security file format, licensing, rest api errors and data locations.

## Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Settings.md
- these are the parameters that profinity asks for when a can bus adapter is added manually.
- for the status colours of an adapter and the bit rate that every device on the bus must share, refer to can bus adapter troubleshooting.

## Components/Motor_Controller/Update_WaveSculptor_Configuration_and_Firmware.md
- update wavesculptor configuration and firmware
- configure a wavesculptor and flash its firmware from the firmware utilities tab in the component settings.

## Installation/Update_Docker_Image.md
- to move to a newer profinity image, use the compose file from install profinity with docker.
- in the directory that holds the compose file, pull the newer image:

## Administration/System_Configuration/Profinity_Web.md
- the full rule is in the remote web access warning on licensing.

## Administration/System_Configuration/Security/Two_Factor_Authentication.md
- a signed-in local user manages their own authenticator from the two-factor authentication pill on the admin page, as described in mfa account management.

## Customising_Profinity/Dashboards/Visual_Editor.md
- refer to the profinity dashboard development guide for the yaml structure, and to dashboard schema validation errors for the validation messages.

## Installation/Environment_Variables.md
- to set a variable on windows, linux, macos, or docker, refer to set environment variables.

## Tags/Collections.md
- you build and manage them in the visual editor, and create a collection walks through an example.

## Components/Motor_Controller/WaveSculptor_Dashboard.md
- the wavesculptor dashboard decodes the can messages of a wavesculptor and appears as a tab in the sidebar once the controller is added to the profile.

