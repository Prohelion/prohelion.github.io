---
title: How to Configure Environment Variables
---

# How to Configure Environment Variables

Use environment variables to configure Profinity for flexible deployments across different environments.

## Prerequisites

- Profinity V2 installed
- Access to system configuration files
- Understanding of environment variable syntax

## Steps

### Step 1: Understand Environment Variable Usage

Environment variables allow you to:
- Change configuration without editing files
- Use different settings for different environments
- Deploy the same configuration across multiple systems

### Step 2: Set Environment Variables

**Windows:**
1. Open System Properties → Environment Variables
2. Add new variables or edit existing ones
3. Click **OK** to save
4. Restart Profinity for changes to take effect

**Linux/macOS:**
1. Edit your shell profile (`.bashrc`, `.zshrc`, etc.)
2. Add: `export VARIABLE_NAME=value`
3. Or set in systemd service file (for services)
4. Restart Profinity

**Docker:**
1. Set in `docker-compose.yml`:
   ```yaml
   environment:
     - HTTP_PORT=18080
     - LOG_LEVEL=Info
   ```
2. Or use `.env` file
3. Restart containers

### Step 3: Reference Variables in Config Files

In your `Config.yaml` or `Profile.yaml` files:

```yaml
http:
  port: ${HTTP_PORT:-18080}  # Use HTTP_PORT or default to 18080
  address: ${HTTP_ADDRESS:-0.0.0.0}

logging:
  level: ${LOG_LEVEL:-Info}
```

### Step 4: Use Variables in Docker Compose

Create a `.env` file:

```env
HTTP_PORT=18080
HTTPS_PORT=18443
LOG_LEVEL=Info
PROFILE_NAME=Production Profile
```

Reference in `docker-compose.yml`:

```yaml
services:
  profinity:
    environment:
      - HTTP_PORT=${HTTP_PORT:-18080}
      - LOG_LEVEL=${LOG_LEVEL:-Info}
```

### Step 5: Verify Configuration

1. Check environment variables are set correctly
2. Restart Profinity
3. Verify settings are applied
4. Check logs for configuration details

## Common Environment Variables

- `HTTP_PORT` - HTTP server port (default: 18080)
- `HTTPS_PORT` - HTTPS server port (default: 18443)
- `LOG_LEVEL` - Logging level (Info, Debug, Warning, Error)
- `PROFILE_NAME` - Default profile name
- `CONFIG_NAME` - Configuration name
- `ENABLE_SCRIPTING` - Enable scripting (true/false)

## Related Documentation

- [Environment Variables](../Installation/Environment_Variables.md) - Complete environment variable reference
- [Docker Installation](../Installation/Docker_Installation.md) - Docker environment setup
