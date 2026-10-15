# Novel sentences, batch 3 (98 sentences)
Paths relative to docs/Profinity_Software/Profinity_Version_2.3/. Sentences are lowercased and stripped of markdown by the detector; find them in the file.

## How_To_Guides/Replay_CAN_Logs.md
- for how to record a log, refer to log / replay can bus messages.
- the replay can logs permission (refer to roles and permissions), which provides the can log replay side-menu entry and also turns on view can data.
- the replayer lists only the can_bus_logs/replay/ folder in the artefacts directory, which sits in a different place on each platform.
- if the log file is not listed, for example a file recorded earlier or on another profinity instance, copy it into the can_bus_logs/replay/ folder, or use the upload can log files control and select the file. the file then appears in the list.
- an uploaded file must have a .csv or .txt extension, otherwise the upload is refused with "your file must have an extension of .txt or .csv".
- the upload is also refused if a log with the same name already exists, so delete the existing log first or rename the new one.
- while a replay plays, the position slider moves to a different point in the log, and you can use it to move the replay to any position in the log.
- pause suspends the replay so that it can be resumed later, and play resumes it.
- stop ends the replay, and loop replays the log continuously.
- recorded tag values are replayed separately with tag log replay, described in replay a tag log.

## Components/Loggers/InfluxDB_v1_Logger.md
- the influxdb v1 logger sends the values of the tags in selected tag collections to an influxdb v1 server.
- <figcaption>the influxdb v1 logger pushes the selected tag collections to an influxdb v1 server</figcaption>
- influxdb both stores and visualises data.
- the v2 and v3 components are registered as the influxdb v2 historian and the influxdb v3 historian, which write data in the same way and additionally allow it to be read back through the apis, and they are documented in influxdb historians.
- the loggers page compares this logger with the others.
- the logging mode setting applies to this logger, the influxdb v2 historian, the influxdb v3 historian and the other collection-based loggers, and nothing is logged until at least one tag collection is selected in collections.
- logging modes defines the three modes, snapshot (the default), on change and everything.
- if it does not, check the profinity system logs for more details, as described in logs.
- if the logger cannot reach influxdb, it shows error, writes the reason to the system logs once, and retries every 5 seconds until the problem clears.

## Profinity_AI/AI_Skills.md
- ai skills is a pack of seven skills for ai coding assistants such as claude code, cursor, codex, and chatgpt that help you build profinity dashboards, rules, collections, scripts, plugins, derived tags, and example apps.
- to install the skills, refer to install ai skills.
- for the list of skills, their requirements, and the tools they support, refer to ai skills reference.
- <figcaption>a skill in your ai tool reads the live schema from the rest api of your profinity instance, and for skills that modify the instance it sends the generated configuration back after you approve</figcaption>
- to do this, connect your tool to the mcp server using how to connect profinity to ai, which gives it the same read-only live data ai chat uses: tags and their history, alert rules, active alerts, and alert history.
- the script and plugin skills work beside the profinity developer kit (profinity.sdk, profinity-script, and profinity-component-pack), which prohelion supplies on request.
- for the next step, refer to install ai skills, to profinity ai for how ai chat and ai skills fit together, and to the profinity rest apis, which the skills use to fetch your live schema and push generated configuration.

## Profinity_AI/Install_AI_Skills.md
- prohelion supplies ai skills as profinity-ai-skills.zip with each profinity release, and you install it into your ai tool with npx.
- for what the skills do and what they need once installed, refer to ai skills and ai skills reference.
- the zip has no wrapping folder, so create the destination folder when you extract.
- extract the zip into a folder, and point npx skills add at that folder:
- after installation, the skills are available in your ai tool, and each skill's skill.md file gives step-by-step instructions, with api reference notes, examples, and schemas beside it in the skill's folder.
- whoever builds the gpt does a short one-time setup from the files in the pack, and others then use it:
- for what a custom gpt can and cannot do, refer to ai skills reference.

## Administration/index.md
- install and manage plugins: upload, enable, disable, and delete plugins.
- choose available components: choose which component types engineers can add to a profile.
- licensing: which features each edition includes, and how the licence limits what is available.
- license page: read the licence state, fingerprint, and licensed features of an instance.
- trial licence, desktop use and machine fingerprint: how the 14-day local trial, desktop free use, and the fingerprint work.

## CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md
- there are two kinds of logger in profinity: loggers that log to file (can file and sftp loggers and tag file and sftp loggers), and loggers that log to timeseries databases such as influxdb and prometheus.
- replayed messages are processed as if they had been received from the bus, so they mix with any live traffic.
- refer to how to replay can bus logs for the procedure, the replay can logs permission, the replay controls and the warning about live traffic.
- to log tag values instead, refer to log tags to a file.
- to send packets to the bus, refer to send / receive can bus messages.

## Installation/Docker_One_Line_Installer.md
- install profinity with the docker one-line installer
- install profinity on a docker host with a single script instead of writing a compose file yourself.
- to write the compose file yourself, and for the docker, can adapter, licence, and profinity_home requirements that apply to both methods, refer to install profinity with docker.
- to open the web interface and sign in, refer to sign in.
- to update the installation, run ~/profinity-docker/update.sh, or refer to update the profinity docker image.

## Tags/Create_a_Collection.md
- this procedure gives the engineers on car 1 a collection of its cell voltages that nobody else can see.
- open the collections editor first, as described in tag collections, which lists the permissions it needs.
- choosing restricted also needs the security administration permission, as described under saving and security.
- a rule can use it, as in the cell_over_voltage rule in complete rules.yaml example.
- you can also start a collection from the tag explorer context menu with create collection from tag(s)…, as described in create collections, rules, and dashboard bindings from tags, and start a rule by right-clicking a collection in the editor and choosing create rule from collection….

## Customising_Profinity/Dashboards/Data_Binding.md
- this page covers how a binding names a tag, which tags a dashboard can use, and the binding modes.
- refer to binding settings and targets for the settings of a binding, and to transform and map values for scaling, type conversion and text mapping.
- <figcaption>a binding connects a tag to a dashboard component, and the component updates when the tag changes</figcaption>
- binding settings and targets lists every binding setting, conditional styling shows how visible, enabled and color bindings change the look of a component, and examples and the annotated full example show complete dashboards.

## Customising_Profinity/Dashboards/Transform_and_Map_Values.md
- binding settings change the value that a component shows without changing the tag.
- this page covers type conversion with totype, scaling with gain and offset, inversion with invert, and text mapping with maptotext.
- refer to binding settings and targets for the full list of binding settings.
- conditional styling uses text mapping to drive lamp colours and labels, and examples holds complete dashboards.

## Components/CAN_Bus_Protocols/index.md
- can bus adapters: choose between the prohelion and tritium can to ethernet bridges, peak usb, socketcan, socketcand, and the ewert energy candapter, and add one with auto discovery.
- can bus adapter settings: look up the parameters and defaults of each adapter.
- can bus adapter troubleshooting: fix a yellow or red status, a bridge that is not found, or a bit rate mismatch.

## Customising_Profinity/Dashboards/Troubleshooting.md
- this page explains how to diagnose and fix problems with data that does not update or display, performance, and individual components.
- for schema validation errors by their message, refer to dashboard schema validation errors.
- check that tableheaders has the structure shown under the headersinfo error, that each accessorkey matches a data property name, and that the data array is bound.

## Tags/Tag_Tree_Path.md
- to set the path, refer to nest a component in the tag tree.
- in the profile's collections and rules, write a scope as the full path from the root of the tag tree, so the tags of a charger component with a tag tree path of vehicles/car1 are scoped with vehicles/car1/charger.
- on a dashboard belonging to that charger component, the relative bind dbc/bmsinfo/flag resolves to vehicles/car1/charger/dbc/bmsinfo/flag.

## Components/Battery_Management_Systems/Prohelion_BMU.md
- the settings below, and the bmu data, firmware configuration and firmware flashing described on the linked pages, apply to every model in the table, except where a section names a specific model.
- the bmu dashboard describes the bmu data and the node telemetry.
- to change the firmware settings, unlock the admin parameters or flash the firmware, refer to update bmu configuration and firmware.

## Customising_Profinity/Dashboards/Binding_Settings_Reference.md
- a binding is an object in the bind list of a component, and the settings on this page control which tag it reads, which property it drives and how the value is read.
- data binding explains how a binding names a tag and the binding modes, and transform and map values shows totype, gain, offset, invert and maptotext in use.
- component reference lists the targets of each component.

## Mobile/Troubleshoot_Profinity_Mobile.md
- this page lists the discovery, certificate, and sign-in problems that profinity mobile can show, with the remedy for each.
- to set up discovery first, refer to connect profinity mobile to a server.
- for the server-side discovery settings, refer to discovery.

## Tags/Webhook_and_MQTT_Rule_Actions.md
- both actions need the tag rule actions licensed feature, included in the server and enterprise editions.
- to add one to a profile so that a rule can select it, refer to making an action available.
- for the email and slack actions, refer to email and slack rule actions.

## Developing_with_Profinity/Scripting/Script_Types/TagChangeScripts.md
- drop (default) discards the new change while the current one is still running.
- queue holds a bounded backlog, up to queue depth (1 to 100), and runs it once the current call completes.

## Tags/Rules.md
- this page covers writing rules, and complete rules.yaml example shows a full rules.yaml with every setting explained.
- both are configured in the rules visual editor or in rules.yaml, and a complete example of each is shown in complete rules.yaml example.

## Components/Chargers_and_Power/Charger_Components.md
- every charger asks for its own limits and the limits of the supply that feeds it, which charger settings lists.
- to run a charge from the dashboard, refer to start a charge, and for the messages and faults that stop one, refer to charging troubleshooting.

## Components/Motor_Controller/WaveSculptor.md
- the wavesculptor dashboard page describes the data, limit indicators and error indicators.
- to configure the controller or flash its firmware, refer to update wavesculptor configuration and firmware.

## Integrating_to_Profinity/MCP_Server/Tool_Reference.md
- the mcp server provides ten read-only tools for tag discovery, tag values and history, and alert state.
- refer to mcp server for how to connect a client, authenticate, and troubleshoot a connection.

## Administration/System_Configuration/Security/SSO_and_Sign_In.md
- saving the security tab restarts profinity and interrupts active sessions, as described in system configuration, so plan the cutover to sso for a maintenance window.

## Administration/System_Configuration/index.md
- saving changes in system configuration restarts profinity and interrupts all active sessions, whereas enabling or disabling components on the choose available components page applies immediately without a restart.

## Developing_with_Profinity/Scripting/Script_Types/ReceiveScripts.md
- queue keeps a short backlog of up to queue depth packets (a default of 8, from 1 to 100) and runs them afterwards. this is the setting the shipped receive templates recommend.

## Installation/Windows_Installation.md
- then work through the quick start guide, review the security guide, and run profinity in the background with run profinity as a windows service.

## Tags/Derived_Tags.md
- to create one, refer to create a derived tag.

## Tags/Create_Collections_Rules_and_Bindings_from_Tags.md
- create collections, rules, and dashboard bindings from tags

