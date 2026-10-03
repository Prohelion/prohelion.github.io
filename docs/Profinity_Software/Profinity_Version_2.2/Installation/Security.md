---
title: Security Guide
---

# Security Guide

!!! danger "Profinity Controls Critical Hardware"
    Profinity is used to control and monitor critical hardware including battery management systems, motor controllers, charging systems, and other safety-critical components. **Security must be treated with the utmost seriousness.** Improper security configuration can lead to equipment damage, safety hazards, or system failures.

This guide covers essential security considerations for deploying and operating Profinity. For detailed information on specific features, refer to the relevant documentation sections.

## Table of Contents

- [Overview](#overview)
- [HTTPS Configuration](#https-configuration)
- [Docker Security](#docker-security)
- [Scripting Security](#scripting-security)
- [User Account Security](#user-account-security)
- [Kiosk Mode Security](#kiosk-mode-security)
- [Production Deployment Checklist](#production-deployment-checklist)
- [Related Documentation](#related-documentation)

## Overview

Profinity V2 is a powerful system that provides control over critical automotive and energy systems. When configuring Profinity, you must consider:

- **Network Security**: Protecting Profinity from unauthorized network access
- **User Access Control**: Limiting user permissions to only what is necessary
- **Script Security**: Understanding the security implications of running scripts
- **Production Hardening**: Configuring Profinity securely for production environments

## HTTPS Configuration

### Why HTTPS is Critical

When Profinity is accessed over a network (not just localhost), all communication should use HTTPS to prevent unauthorized access and protect credentials and data. Without HTTPS, usernames, passwords, API tokens, and sensitive system data can be intercepted.

### Configuring HTTPS

Profinity supports HTTPS configuration through the [System Configuration](../Administration/System_Config.md) interface. You can use either:

- **Windows Certificate Store**: For Windows deployments using certificates installed in the system certificate store
- **Certificate Files**: For cross-platform deployments using `.pfx` or `.p12` certificate files

### Production Recommendations

- **Enable HTTPS Redirect**: Configure "Redirect all Http traffic to Https" to force all connections to use encrypted communication
- **Use Valid Certificates**: Use certificates from trusted Certificate Authorities (CAs) for production deployments
- **Restrict HTTP Access**: For production, consider binding HTTP to localhost only and requiring HTTPS for remote access
- **Certificate Management**: Implement proper certificate renewal procedures to avoid service disruptions

For detailed HTTPS configuration instructions, see the [System Configuration](../Administration/System_Config.md) documentation.

## Docker Security

When deploying Profinity using Docker, consider these security best practices:

### Container Security

- **Run as Non-Root**: Configure Docker containers to run with non-root user privileges where possible
- **Resource Limits**: Set appropriate CPU and memory limits to prevent resource exhaustion attacks
- **Network Isolation**: Use Docker networks to isolate Profinity containers from other services
- **Image Security**: Only use official Profinity images from trusted sources (Prohelion repositories)

### Volume Mounting

- **Sensitive Data**: Ensure that mounted volumes containing profiles, configurations, or logs have appropriate file system permissions
- **Read-Only Mounts**: Consider mounting configuration files as read-only where appropriate to prevent accidental modification
- **Backup Security**: Secure backup locations and ensure backups of sensitive data are encrypted

### Network Exposure

- **Port Binding**: Only expose necessary ports to the host system
- **Firewall Configuration**: Use host-level firewalls to restrict access to Profinity ports
- **Reverse Proxy**: Consider using a reverse proxy (nginx, Traefik, etc.) with additional security features for production deployments

For Docker deployment details, see the [Docker Installation](./Docker_Installation.md) documentation.

## Scripting Security

!!! warning "Scripts Run with Full Profinity Permissions"
    Profinity scripts execute with the same security permissions as the Profinity engine itself. This means scripts can Access all system resources available to Profinity, Send and receive CAN bus messages, Modify system configuration, Control connected hardware (batteries, chargers, motor controllers)

### Security Implications

- **Code Review**: Always review script code before deployment, especially scripts from external sources
- **Minimal Permissions**: When running Profinity as a service, configure it with the minimum necessary OS-level permissions
- **Script Source Control**: Implement proper version control and review processes for scripts in production
- **Enable Only When Needed**: Scripting is disabled by default and must be explicitly enabled in System Configuration

### Best Practices

- Only enable scripting when necessary for your use case
- Regularly audit active scripts for security and functionality
- Isolate critical scripts from general script access where possible
- Document all scripts and their purposes for security reviews

For detailed information about scripting capabilities and security considerations, see the [Scripting](../Extending_Profinity/Scripting/index.md) documentation.

## User Account Security

### Default Credentials

!!! danger "Change Default Credentials Immediately"
    Fresh installations of Profinity include a default administrator account:
    - Username: `admin`
    - Password: `password`
    
    **These default credentials must be changed immediately** after installation. Leaving default credentials active exposes your system to unauthorized access.

### User Account Best Practices

1. **Change Default Passwords**: Immediately change the default admin password after installation
2. **Create Dedicated Users**: Create user accounts for each person or system that needs access
3. **Use Strong Passwords**: Enforce strong password policies appropriate for your organization
4. **Regular Password Updates**: Implement password rotation policies for production systems
5. **Disable Unused Accounts**: Disable or remove user accounts that are no longer needed

### Security Roles

Profinity provides granular security roles to limit user access:

- **Administrator**: Full system access (use sparingly)
- **Read System Settings**: Read-only access to view dashboards and system information
- **Change System Settings**: Can modify system and component configurations
- **Charge Battery Packs**: Permission to control battery charging operations
- **Send and Receive CAN**: Can inject and receive CAN bus messages (high risk)

### Role Assignment Guidelines

- **Principle of Least Privilege**: Assign users only the minimum permissions needed for their role
- **Monitoring Accounts**: Create read-only accounts for monitoring and dashboards
- **Separate Admin Accounts**: Avoid sharing administrator accounts; create individual accounts for each administrator
- **Regular Audits**: Periodically review user accounts and permissions to ensure they remain appropriate

For detailed information on user management and roles, see the [Managing Users](../Administration/Manage_Users.md) documentation.

## Kiosk Mode Security

Kiosk Mode allows automatic authentication without manual login, which is convenient but requires careful security configuration.

### Security Considerations

- **Non-Administrator Users Only**: Kiosk Mode is restricted to non-administrator users for security
- **Limited Permissions**: Only kiosk-safe roles (SystemRead, CANReceive, DBCViewer) can be used with Kiosk Mode
- **Physical Access Control**: Kiosk Mode devices should be physically secured as they bypass login requirements
- **Network Isolation**: Consider network isolation for devices using Kiosk Mode, especially in production environments

### Best Practices

- Use dedicated user accounts specifically for kiosk mode
- Disable Kiosk Mode when not needed (e.g., when profiles are not active)
- Regularly review kiosk user permissions to ensure they remain minimal
- Monitor kiosk mode access through system logs

For detailed Kiosk Mode configuration and security best practices, see the [Kiosk Mode](../Administration/Kiosk_Mode.md) documentation.

## Production Deployment Checklist

Before deploying Profinity in a production environment:

- [ ] Change default administrator password
- [ ] Configure HTTPS with valid certificates
- [ ] Enable HTTPS redirect (disable HTTP for remote access)
- [ ] Create individual user accounts (no shared accounts)
- [ ] Assign users minimum necessary permissions
- [ ] Review and audit all active scripts
- [ ] Configure firewall rules to restrict access
- [ ] Enable logging and monitoring
- [ ] Implement backup procedures for configurations and profiles
- [ ] Document security configuration and access procedures
- [ ] If using Docker, configure appropriate container security
- [ ] Disable scripting if not required
- [ ] Review and disable Kiosk Mode if not needed

## Related Documentation

- [System Configuration](../Administration/System_Config.md) - HTTPS and security settings
- [Managing Users](../Administration/Manage_Users.md) - User accounts and security roles
- [Kiosk Mode](../Administration/Kiosk_Mode.md) - Kiosk Mode configuration and security
- [Scripting](../Extending_Profinity/Scripting/index.md) - Scripting security considerations
- [Docker Installation](./Docker_Installation.md) - Docker deployment security
