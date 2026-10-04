---
title: Environment Variables
description: "Configure Profinity using environment variable substitution in configuration and profile files for flexible deployments."
---

# Environment Variables in Profinity

Profinity supports environment variable substitution in both configuration files and profile files, allowing flexible, environment-specific configurations to be created without hardcoding values.

## Table of Contents

- [Overview](#overview)
- [Syntax](#syntax)
    - [Basic Usage](#basic-usage)
    - [Default Values](#default-values)
    - [Variable Naming Rules](#variable-naming-rules)
- [Supported File Types](#supported-file-types)
    - [Configuration Files](#configuration-files)
    - [Profile Files](#profile-files)
- [Setting Environment Variables](#setting-environment-variables)
    - [Windows](#windows)
    - [Linux/macOS](#linuxmacos)
    - [Docker Deployment](#docker-deployment)
- [Variable Behaviour](#variable-behaviour)
    - [Defined Variables](#defined-variables)
    - [Undefined Variables](#undefined-variables)
    - [Mixed Values](#mixed-values)
- [Complete Examples](#complete-examples)
    - [Configuration File Example](#configuration-file-example)
    - [Profile File Example](#profile-file-example)
- [More Information](#more-information)

## Overview

Environment variables allow:

- **Different settings** across development, staging, and production environments.
- **Sensitive information** to be kept out of configuration files.
- **Configuration templates** to be shared across teams.
- **Settings to be modified** without editing files.

## Syntax

Environment variables use the `${VARIABLE_NAME}` syntax and are automatically substituted when Profinity loads configuration or profile files. Profinity also supports Docker-style default values using the `${VARIABLE_NAME:-default}` syntax.

### Basic Usage

```yaml
# Example configuration with environment variables
Name: ${PROFILE_NAME}
Description: Production configuration
Components:
  Adapter1:
    IpAddress: ${ADAPTER_IP}
    Port: ${ADAPTER_PORT}
    Timeout: ${ADAPTER_TIMEOUT:-2000}  # Uses 2000 if ADAPTER_TIMEOUT is not set
```

### Default Values

Profinity supports default values for environment variables using the `${VARIABLE_NAME:-default}` syntax. If the environment variable is not set or is empty, the default value is used instead.

**Examples:**

```yaml
# Variable without default - must be set
IpAddress: ${ADAPTER_IP}

# Variable with default value
Port: ${ADAPTER_PORT:-8080}  # Uses 8080 if ADAPTER_PORT is not set

# Variable with empty default
Timeout: ${ADAPTER_TIMEOUT:-}  # Uses empty string if ADAPTER_TIMEOUT is not set

# Variable with default in Logs section
RollsizeMB: ${LOG_ROLLSIZE:-100}  # Uses 100 if LOG_ROLLSIZE is not set

# Boolean with default (the key under AppSettings.Scripts)
Enabled: ${ENABLE_SCRIPTING:-false}  # Uses false if ENABLE_SCRIPTING is not set
```

**Behaviour:**
- If the environment variable is set and has a value, that value is used
- If the environment variable is not set or is empty, the default value (after the `:-`) is used
- Variables without defaults must be set, or the configuration will fail to load

### Variable Naming Rules

Environment variable names must:

| Requirement | Description | Example |
|-------------|-------------|---------|
| **Use word characters only** | Letters, numbers, and underscores, and the first character must not be a number | `${PROFILE_NAME}`, `${VAR123}` |
| **Be enclosed in brackets** | Must use `${}` syntax | `${ADAPTER_IP}` |
| **Be case-sensitive** | Uppercase and lowercase matter | `${Profile_Name}` ≠ `${profile_name}` |

**Valid examples:**
- `${PROFILE_NAME}`
- `${ADAPTER_IP}`
- `${BMU1_BASE_ADDRESS}`
- `${_UNDERSCORE_VAR}`
- `${VAR123}`

**Invalid examples:**
- `${VAR-WITH-DASH}` (hyphens not allowed)
- `${VAR WITH SPACES}` (spaces not allowed)
- `${VAR.WITH.DOTS}` (dots not allowed)

## Supported File Types

Environment variables are supported in both Profinity Config and Profile files, enabling flexible deployment across different environments.

### Configuration Files

Environment variables work in the main Profinity configuration file (`config.yaml`):

```yaml
Name: ${CONFIG_NAME}
AppSettings:
  ProfinityServer:
    HttpAddress: ${HTTP_ADDRESS}
    HttpPort: ${HTTP_PORT}
  Logs:
    LogLevel: ${LOG_LEVEL}
    RollsizeMB: ${LOG_ROLLSIZE:-100}  # Default to 100 if not set
  Scripts:
    Enabled: ${ENABLE_SCRIPTING:-false}  # Default to false if not set
Options:
  WebServer:
    Enabled: true
    HttpAddress: ${HTTP_ADDRESS}
    HttpPort: ${HTTP_PORT}
```

### Profile Files

Environment variables are also supported in profile files for component configuration:

```yaml
Name: ${PROFILE_NAME}
Description: ${PROFILE_DESCRIPTION}
Version: ${PROFILE_VERSION}
Components:
  Tritium1:
    Protocol: UDP
    AdapterIpAddress: ${ADAPTER_IP}
    BusNo: ${BUS_NUMBER}
    UdpTTL: ${UDP_TTL}
    Type: TritiumAdapter
  SocketCan1:
    BusName: can0
    IpAddress: ${SOCKET_IP}
    Port: ${SOCKET_PORT}
    Timeout: ${SOCKET_TIMEOUT}
    Type: ProhelionSocketCANdAdapter
  BMU1:
    ParallelStrings: ${BMU_PARALLEL_STRINGS}
    MilliValid: ${BMU_MILLI_VALID}
    BaseAddress: ${BMU1_BASE_ADDRESS}
    Type: ProhelionBMU
```

## Setting Environment Variables

Environment variables can be set in several ways, depending on the operating system and deployment method.

### Windows

#### Command Prompt
```cmd
set PROFILE_NAME=Production Profile
set ADAPTER_IP=192.168.1.100
set ADAPTER_PORT=8080
```

#### PowerShell
```powershell
$env:PROFILE_NAME="Production Profile"
$env:ADAPTER_IP="192.168.1.100"
$env:ADAPTER_PORT="8080"
```

#### System Environment Variables
1. Open **System Properties** → **Advanced** → **Environment Variables**
2. Add variables to **User** or **System** variables
3. **Restart Profinity** for changes to take effect

### Linux/macOS

#### Bash/Shell
```bash
export PROFILE_NAME="Production Profile"
export ADAPTER_IP="192.168.1.100"
export ADAPTER_PORT="8080"
```

#### Persistent Configuration
Add the variables to a shell profile file (`~/.bashrc`, `~/.profile`, or `~/.zshrc`):

```bash
echo 'export PROFILE_NAME="Production Profile"' >> ~/.bashrc
echo 'export ADAPTER_IP="192.168.1.100"' >> ~/.bashrc
echo 'export ADAPTER_PORT="8080"' >> ~/.bashrc
```

### Docker Deployment

#### Environment File (.env)
Create a `.env` file in the project directory:

```env
PROFILE_NAME=Production Profile
ADAPTER_IP=192.168.1.100
ADAPTER_PORT=8080
BMU_PARALLEL_STRINGS=2
BMU_MILLI_VALID=750
```

#### Docker Run Command
```bash
docker run -e PROFILE_NAME="Production Profile" \
           -e ADAPTER_IP="192.168.1.100" \
           -e ADAPTER_PORT="8080" \
           prohelion/profinity:latest
```

#### Docker Compose
```yaml
services:
  profinity:
    image: prohelion/profinity:latest
    environment:
      - PROFINITY_HOME=/app/Prohelion
      - PROFILE_NAME=Production Profile
      - ADAPTER_IP=192.168.1.100
      - ADAPTER_PORT=8080
    env_file:
      - .env
    volumes:
      - $HOME/Prohelion:/app/Prohelion:rw
```

`PROFINITY_HOME` must match the container-side mount path, as described in [Docker Installation](./Docker_Installation.md). The variables in the `environment` section only affect the files that reference them with the `${VARIABLE_NAME}` syntax, such as `config.yaml` and the profile files stored in the mounted volume.

## Variable Behaviour

Environment variables are processed when Profinity loads configuration or profile files.

### Defined Variables

When an environment variable is defined and has a value, it is replaced automatically:

```yaml
# Original configuration
IpAddress: ${ADAPTER_IP}

# With ADAPTER_IP=192.168.1.100
IpAddress: 192.168.1.100
```

### Undefined Variables

When an environment variable without a default value is not defined or is empty, Profinity cannot read the file that references it. The file fails to load, and the names of the undefined variables are written to the log:

```yaml
# Original configuration
IpAddress: ${UNDEFINED_IP}

# Result when UNDEFINED_IP is not defined: the file fails to load
```

!!! warning "Configuration Loading Errors"
    A configuration or profile file that references an undefined variable with no default value fails to load, so define every variable that has no default before starting Profinity, or give it a default with the `${VARIABLE_NAME:-default}` syntax.

### Mixed Values

Environment variables can be combined with static values in the same configuration:

```yaml
Components:
  SocketCan1:
    BusName: can0  # Static value
    IpAddress: ${DEVICE1_IP}  # Environment variable
    Port: ${DEVICE1_PORT}  # Environment variable
    Timeout: 2000  # Static value
  SocketCan2:
    BusName: can1  # Static value
    IpAddress: 192.168.1.100  # Static value
    Port: ${DEVICE2_PORT}  # Environment variable
    Timeout: ${DEVICE2_TIMEOUT}  # Environment variable
```

## Complete Examples

These examples demonstrate how to use environment variables in both configuration and profile files.

### Configuration File Example

**config.yaml:**
```yaml
Name: ${CONFIG_NAME}
Description: ${CONFIG_DESCRIPTION}
Version: 1
ReadOnly: false
AppSettings:
  ProfinityServer:
    HttpAddress: ${HTTP_ADDRESS}
    HttpPort: ${HTTP_PORT}
    HttpsRedirect: false
    Enabled: true
  Logs:
    RollsizeMB: ${LOG_ROLLSIZE:-100}  # Default to 100 if not set
    MaxLogFiles: ${MAX_LOG_FILES:-10}  # Default to 10 if not set
    LogLevel: ${LOG_LEVEL}
  Scripts:
    Enabled: ${ENABLE_SCRIPTING:-false}  # Default to false if not set
Options:
  WebServer:
    Enabled: true
    HttpAddress: ${HTTP_ADDRESS}
    HttpPort: ${HTTP_PORT}
    HttpsRedirect: false
    RestAPI:
      Enabled: true
```

**Corresponding environment variables:**
```env
CONFIG_NAME=Production Configuration
CONFIG_DESCRIPTION=Main production configuration
HTTP_ADDRESS=0.0.0.0
HTTP_PORT=8080
LOG_ROLLSIZE=100
MAX_LOG_FILES=10
LOG_LEVEL=Info
```

### Profile File Example

**profile.yaml:**
```yaml
Name: ${PROFILE_NAME}
Description: ${PROFILE_DESCRIPTION}
Version: ${PROFILE_VERSION}
ReadOnly: false
Components:
  Tritium1:
    Protocol: UDP
    TritiumProtocolVersion: V1
    AdapterIpAddress: ${ADAPTER_IP}
    BusNo: ${BUS_NUMBER}
    UdpTTL: ${UDP_TTL}
    AutoConnect: false
    Type: TritiumAdapter
  SocketCan1:
    BusName: can0
    IpAddress: ${SOCKET_IP}
    Port: ${SOCKET_PORT}
    Timeout: ${SOCKET_TIMEOUT}
    AutoConnect: false
    Type: ProhelionSocketCANdAdapter
  BMU1:
    ParallelStrings: ${BMU_PARALLEL_STRINGS}
    MilliValid: ${BMU_MILLI_VALID}
    BaseAddress: ${BMU1_BASE_ADDRESS}
    Type: ProhelionBMU
    SendControllerHeartbeat: true
```

**Corresponding environment variables:**
```env
PROFILE_NAME=Production Profile
PROFILE_DESCRIPTION=Main production profile with all components
PROFILE_VERSION=2
ADAPTER_IP=192.168.1.50
BUS_NUMBER=14
UDP_TTL=64
SOCKET_IP=10.0.0.100
SOCKET_PORT=5678
SOCKET_TIMEOUT=3000
BMU_PARALLEL_STRINGS=2
BMU_MILLI_VALID=750
BMU1_BASE_ADDRESS=101
```

## More Information

For additional information on Profinity configuration and profiles, see:

- [Profinity Profiles](../Administration/Profiles.md) - Detailed profile management
- [System Configuration](../Administration/System_Config.md) - System-level configuration options
- [Getting Started with Profiles](../Getting_Started/Profiles.md) - Basic profile concepts
