# Wave 4 GC report: comparison tables on four category landing pages

Pages edited (all under docs/Profinity_Software/Profinity_Version_2.3/Components/): Loggers/index.md, Historians/index.md, Publishers_and_Subscribers/index.md, Industrial_Protocols/index.md. No file created. Lint: 0 errors, 0 warnings on all four.

Existing facts: all kept. Historians, Publishers and Industrial protocols extend the existing table (existing columns and cell text unchanged). Loggers had no table; one was added after the existing bullets, which stay as they were. One sentence added to Historians ("All three allow the history to be read back through the APIs, and all three have the Designated tag historian reader setting ...") and one to Loggers ("The table compares the six loggers.").

## Source ledger (P = page under Components/)

### Loggers table (6 columns max 4 used)
- CAN File Logger, native CAN messages, local file system: File_Loggers.md "CAN File Logger | Writes native CAN bus messages to the local file system of the machine running Profinity."
- CAN SFTP Logger: "Transmits native CAN bus messages to a remote SFTP server."
- TAG File Logger: "Writes the values of the tags in the selected tag collections to the local file system, as comma-separated values (CSV) or JSON Lines."
- TAG SFTP Logger: "Transmits those tag values to a remote SFTP server, as CSV or JSON Lines."
- Auto Connect On for the four: File_Loggers.md "All four loggers have **Auto Connect**, which is on by default".
- InfluxDB v1 Logger: InfluxDB_Prometheus_Logger.md "the **InfluxDB v1 Logger**, for InfluxDB v1 servers"; "send the values of the tags in selected tag collections to a time-series database"; "InfluxDB expects its data to be pushed to it" (used for "which Profinity sends the data to"); table "**Auto Connect** | On | Starts the logger when the profile is loaded."
- Prometheus Logger: same page "Prometheus treats Profinity as a source of data and calls it to request the latest values"; "The **Collections** setting selects the tag collections that are served"; "**Auto Connect** | On | Starts the logger automatically when the profile is loaded."
- Links: File_Loggers.md#logger-variants (heading "Logger variants"), InfluxDB_Prometheus_Logger.md#influxdb-v1-logger (explicit id), #prometheus (heading "Prometheus").

### Historians table
- Intro sentence, read back through APIs: InfluxDB_Historians.md "allow that history to be read back out through the APIs"; TAG_SQL_Historian.md "allows that history to be read back out through the APIs". Designated setting present on all: InfluxDB_Historians.md settings table and TAG_SQL_Historian.md "Designated tag historian reader" row.
- v2 settings: InfluxDB_Historians.md "For the v2 historian, enter **InfluxDB Bucket**, **InfluxDB Organisation** and **InfluxDB Token**"; table rows each "Required" (Bucket, Organisation, Token "Required, and stored encrypted").
- v3 settings: "For the v3 historian, enter **InfluxDB Database** and **InfluxDB Token**"; Database row "Required."
- Interval v2/v3: "**Logging Interval (Sec)** | 10 | The interval, in seconds, at which data is sent. The minimum is 1."
- SQL: TAG_SQL_Historian.md "**Database Provider** ... Defaults to SQLite."; "**Connection String** ... Required, and stored encrypted at rest."; "**Update Interval (Seconds)** ... Defaults to 10, and accepts 10 to 86400."

### Publishers and subscribers table
- MQTT Publisher data format: MQTT_Publisher.md "**JSON** publishes a flat object of tag key to numeric value"; "**Payload** ... **JSON** ... or **Sparkplug B**". Auto Connect: "**Auto Connect** | On | Starts the publisher automatically when the profile is loaded." Retry: "The publisher keeps trying to connect every 5 seconds."
- Webhook Publisher: Webhook_Publisher.md "Each publish sends one POST containing a JSON array of the samples in that batch"; "**Auto Connect** | On"; "the publisher makes up to three attempts in total"; "If all three attempts fail, the batch is not retried further".
- MQTT Subscriber: MQTT_Subscriber.md "writes the incoming metrics into the profile tag tree as read-only tags"; "The subscriber supports scalar metric types only"; "**Auto Connect** ... On by default."; "The subscriber keeps trying to connect every 5 seconds".

### Industrial protocols table
- Component names: BACnet.md "The **BACnet Device** component"; EtherNet_IP.md "The **EtherNet/IP PLC** component"; Modbus.md "The **Modbus Device** component"; OPC_UA.md table "**OPC UA Client**", "**OPC UA Server**"; S7.md "The **S7 PLC** component".
- Connects to: BACnet.md "It connects to one BACnet device on your network"; "The component supports BACnet/IP only, not BACnet MS/TP". EtherNet_IP.md "It connects to one PLC". Modbus.md "It connects to one Modbus slave over Transmission Control Protocol (TCP) or over a serial line using Remote Terminal Unit (RTU) framing". OPC_UA.md "Connects to a remote OPC UA server"; "Listens for OPC UA clients". S7.md "It connects to one PLC".
- Point map columns: BACnet **Object type**, **Instance**; EtherNet/IP **PLC tag**; Modbus **Table**, **Address**; OPC UA **NodeId**; S7 **Area**, **DB number**, **Offset** (each page's Point map table). OPC UA server: "The server exposes the readable scalar tags in the profile's tag tree."
- Auto Connect Off: BACnet "Off by default."; EtherNet_IP "Off by default."; Modbus "Off by default."; OPC_UA client "Off by default." and server "Off by default."; S7 "Off by default."

## Conflicts between sources
1. Auto Connect timing. Within the 13 component pages of these four categories every page says "when the profile is loaded" or "when the profile loads", so no conflict arises in these tables. The known conflict is outside them: CAN_Bus_Protocols/Virtual_CAN_Adapter.md and CAN_Bus_Adapters.md say "automatically when Profinity starts". The four tables state only the default (On or Off) and say nothing about when it connects, so nothing is chosen between the two wordings.
2. Auto Connect default differs by category (On for loggers, publishers and subscriber, Off for protocol components). This is not a conflict; each page states its own default.
3. InfluxDB v2/v3 are called "loggers" in one place: InfluxDB_Historians.md log message `Failed to start the InfluxDB logger`, while Loggers/index.md and Historians/index.md say they are historians, not loggers. Tables follow the landing-page wording.
4. Retry wording differs in kind (every 5 seconds, "Reconnect delay (ms)" default 2000, three attempts). They describe different components, so no cell merges them.

## Cells deliberately not written (Not stated, or column dropped)
- Licence column on Loggers: File_Loggers.md says the four file loggers are "included in every edition", but InfluxDB_Prometheus_Logger.md states no licence for the InfluxDB v1 or Prometheus loggers. Column dropped rather than mark two rows "Not stated".
- Auto Connect and reconnect column on Historians: neither historian page documents an Auto Connect setting (only SQL "retries every 5 seconds"). Column dropped.
- Reconnect column on Loggers: only the InfluxDB v1 and Prometheus section states "retries every 5 seconds"; file loggers state none. Dropped.
- Reconnect delay and poll interval on protocols: identical defaults across the client components (2000 ms, 1000 ms; OPC UA client request timeout differs), but the OPC UA Server has no such setting, so dropped.
- Licence on Publishers and Protocols: already stated in the text on each landing page, not repeated.

## Questions for the product owner
- Does the InfluxDB v1 Logger or Prometheus Logger need a licensed feature? The pages are silent.
- Do the historians have Auto Connect and a reconnect interval for InfluxDB? Not stated on InfluxDB_Historians.md.
- Does the SQL historian have an Allow Retrieval setting? Only the InfluxDB page lists it; the table does not mention it.
