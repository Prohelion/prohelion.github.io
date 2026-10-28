---
title: Tags
description: "Set the limits on the in-memory tag history buffer, including points per tag, total points and time to live, on the Tags tab."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Tags

Saving changes on any System Configuration tab restarts Profinity.
Refer to [System Configuration](index.md) for what to expect.

Profinity keeps a rolling in-memory history of recent tag values, which is used for dashboard charts and for the recent-history queries described under [Application Config](Application_Config.md).
The Tags tab sets the limits on that buffer, so that it cannot grow without bound on a busy instance.

| Parameter | Default | Description |
|-----------|---------|-------------|
| `Max Points Per Tag` | 1500 | The most samples kept for a single tag. When it is exceeded the oldest samples for that tag are removed. |
| `Max Total Points (All Tags)` | 100000 | The most samples kept across all tags. |
| `Share eviction budget across tags` | Enabled | When enabled, the total limit is enforced by dropping the oldest samples across all tags, rather than per tag. |
| `Point TTL (Minutes)` | 60 | Samples older than this are pruned. |
| `Max Dynamically Tracked Tags` | 200 | The most tags tracked on demand, such as by a dashboard that has just opened. When it is exceeded the least recently used are dropped. |
| `Dynamic Track Inactivity TTL (Minutes)` | 45 | A dynamically tracked tag that nobody has used for this long is removed. |

TTL stands for time to live.
