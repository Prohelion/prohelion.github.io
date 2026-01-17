---
title: Environment Variables
---

# Environment Variables in Profinity

Profinity supports environment variable substitution in both configuration files and profile files, allowing you to create flexible, environment-specific configurations without hardcoding values.

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
- [Variable Behavior](#variable-behavior)
    - [Defined Variables](#defined-variables)
    - [Undefined Variables](#undefined-variables)
    - [Mixed Values](#mixed-values)
- [Complete Examples](#complete-examples)
    - [Configuration File Example](#configuration-file-example)
    - [Profile File Example](#profile-file-example)
- [More Information](#more-information)

## Overview

Environment variables enable you to:

- **Use different settings** across development, staging, and production environments
- **Keep sensitive information** out of configuration files
- **Share configuration templates** across teams
- **Easily modify settings** without editing files

This functionality makes Profinity configurations flexible and maintainable across different environments and deployments.

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

Profinity supports default values for environment variables using the `${VARIABLE_NAME:-default}` syntax. If the environment variable is not set or is empty, the default value will be used instead.

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

# Boolean with default
EnableScripting: ${ENABLE_SCRIPTING:-true}  # Uses true if ENABLE_SCRIPTING is not set
```

**Behavior:**
- If the environment variable is set and has a value, that value is used
- If the environment variable is not set or is empty, the default value (after the `:-`) is used
- Variables without defaults must be set, or the configuration will fail to load

### Variable Naming Rules

Environment variable names must:

| Requirement | Description | Example |
|-------------|-------------|---------|
| **Use word characters only** | Letters, numbers, and underscores | `${PROFILE_NAME}`, `${VAR123}` |
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

Environment variables work in the main Profinity configuration file (`Config.yaml`):

```yaml
Name: ${CONFIG_NAME}
AppSettings:
  ProfinityServer:
    HttpAddress: ${HTTP_ADDRESS}
    HttpPort: ${HTTP_PORT}
  Logs:
    LogLevel: ${LOG_LEVEL}
    RollsizeMB: ${LOG_ROLLSIZE:-100}  # Default to 100 if not set
  EnableScripting: ${ENABLE_SCRIPTING:-true}  # Default to true if not set
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

Environment variables can be set using various methods depending on your operating system and deployment method.

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
Add to your shell profile file (`~/.bashrc`, `~/.profile`, or `~/.zshrc`):

```bash
echo 'export PROFILE_NAME="Production Profile"' >> ~/.bashrc
echo 'export ADAPTER_IP="192.168.1.100"' >> ~/.bashrc
echo 'export ADAPTER_PORT="8080"' >> ~/.bashrc
```

### Docker Deployment

#### Environment File (.env)
Create a `.env` file in your project directory:

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
           profinity
```

#### Docker Compose
```yaml
version: '3.8'
services:
  profinity:
    image: profinity
    environment:
      - PROFILE_NAME=Production Profile
      - ADAPTER_IP=192.168.1.100
      - ADAPTER_PORT=8080
    env_file:
      - .env
```

## Variable Behavior

Environment variables are processed when Profinity loads configuration or profile files. Understanding how they behave is crucial for successful deployment.

### Defined Variables

When an environment variable is defined and has a value, it will be automatically replaced:

```yaml
# Original configuration
IpAddress: ${ADAPTER_IP}

# With ADAPTER_IP=192.168.1.100
IpAddress: 192.168.1.100
```

### Undefined Variables

When an environment variable is not defined or is empty, the placeholder remains unchanged:

```yaml
# Original configuration
IpAddress: ${UNDEFINED_IP}

# Result (variable not defined)
IpAddress: ${UNDEFINED_IP}
```

!!! warning "Configuration Loading Errors"
    If an undefined variable results in invalid values (like `${UNDEFINED_IP}` for an IP address field), the configuration or profile will fail to load with an appropriate error message.

### Mixed Values

You can combine environment variables with static values in the same configuration:

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

**Config.yaml:**
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
  EnableScripting: ${ENABLE_SCRIPTING:-true}  # Default to true if not set
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

**Profile.yaml:**
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
