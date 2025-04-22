---
title: System Logs
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the documentation public.  To get access to the Profinity V2 installers, please log a support request at the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals) requesting access to the Early Adopter release.

# Profinity System Logs

Profinity has a built-in logging mechanism that captures information about the operation of the system and is designed to assist in system issue diagnosis. To access the system logs, navigate to the `ADMIN` tab, then select `Logs`.  

!!! info "Expanding Log Lines"
    If a log line goes off the right hand side of the page because it is too big, you can click on the line to expand that log message.

<figure markdown>
![Profinity Log](../images/system_logs.png)
<figcaption>Profinity System Logs</figcaption>
</figure>

Each log entry contains a timestamp, a message level (e.g., `Info`, `Warn`, `Error`, etc.), and a message description. To help diagnose particular issues, the scope of the system logs can be changed to only include particular message levels. More information about varying the displayed log levels can be found in the [Admin](../Administration/Logs_Config.md#system-logs-configuration) section.