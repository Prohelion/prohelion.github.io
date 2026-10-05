---
title: Tags
description: "Limits for the in-memory tag history buffer on the System Configuration Tags tab."
---

# Tags

!!! warning "Saving restarts Profinity"
    Saving changes on any System Configuration tab restarts Profinity. See [System Configuration](index.md) for what to expect.

Profinity keeps a rolling in-memory history of recent tag values, which is used for dashboard charts and for the recent-history queries described under [Application Config](Application_Config.md). The Tags tab sets the limits on that buffer, so that it cannot grow without bound on a busy instance.

| Parameter                          | Description |
|------------------------------------|--|
|`Max Points Per Tag`                | The most samples kept for a single tag (default 1500). When it is exceeded the oldest samples for that tag are removed. |
|`Max Total Points (All Tags)`       | The most samples kept across all tags (default 100000). |
|`Share eviction budget across tags` | When enabled (the default), the total limit is enforced by dropping the oldest samples across all tags, rather than per tag. |
|`Point TTL (Minutes)`               | Samples older than this are pruned (default 60). |
|`Max Dynamically Tracked Tags`      | The most tags tracked on demand, such as by a dashboard that has just opened (default 200). When it is exceeded the least recently used are dropped. |
|`Dynamic Track Inactivity TTL (Minutes)` | A dynamically tracked tag that nobody has used for this long is removed (default 45). |
