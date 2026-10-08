---
title: Security Guide
description: "Implement essential security controls for Profinity production deployments including HTTPS, user accounts, scripting, and kiosk mode."
---

# Security Guide

!!! danger "Profinity Controls Critical Hardware"
    Profinity is used to control and monitor critical hardware including battery management systems, motor controllers, charging systems, and other safety-critical components. Treat security as a priority throughout deployment. Improper security configuration can lead to equipment damage, safety hazards, or system failures.

This guide covers the security controls that matter when deploying and operating Profinity, and links to the pages for each feature.

## Overview

Profinity V2 provides control over critical automotive and energy systems. Securing it involves six areas: [HTTPS](#https-configuration) protects the network path, [Docker](#docker-security) settings isolate the container, the [security files and keys](#protect-the-security-files-and-keys) hold the secrets, [scripting](#scripting-security) controls what code runs with the engine's privileges, [user accounts](#user-account-security) limit who can do what, and [Kiosk Mode](#kiosk-mode-security) controls unattended displays. The [checklist](#production-deployment-checklist) at the end summarises the steps for a production deployment.

## HTTPS Configuration

### HTTPS Protects Credentials in Transit

When Profinity is accessed over a network rather than only through localhost, all communication should use HTTPS, because without it usernames, passwords, API tokens and system data can be intercepted.

### Configuring HTTPS

Profinity supports HTTPS configuration through the [System Configuration](../Administration/System_Configuration/Profinity_Web.md#https-certificates) interface, using either a certificate from the Windows Certificate Store (for Windows deployments) or a `.pfx` or `.p12` certificate file (for cross-platform deployments).

### Production Recommendations

For production, turn on **Redirect all Http traffic to Https** so that every connection uses encryption, use certificates from a trusted Certificate Authority (CA), and plan certificate renewal so that an expiry does not interrupt the service. Binding HTTP to localhost only and requiring HTTPS for remote access keeps credentials off the network, but [Profinity Mobile](../Mobile/index.md) connects over the local network, so keep the HTTPS port reachable from the networks that phones use. For detailed instructions, see the [System Configuration](../Administration/System_Configuration/Profinity_Web.md#https-certificates) documentation.

## Docker Security

The Profinity image runs as the non-root `app` user, so a container already runs without root privileges; keep it that way and make sure the host directory mounted at `PROFINITY_HOME` is writable by that user. Set CPU and memory limits on the container to prevent resource exhaustion, use Docker networks to isolate Profinity from other services, and use only official Profinity images from Prohelion repositories.

Give mounted volumes that hold profiles, configurations or logs file system permissions that match their sensitivity, mount configuration files read-only so that a container cannot modify them accidentally, and encrypt backups of sensitive data and keep them in a secured location. Publish only the ports you need to the host, restrict access to them with a host firewall, and place a reverse proxy such as nginx or Traefik in front of Profinity for production deployments. For deployment details, see the [Docker Installation](./Docker_Installation.md) documentation.

## Protect the Security Files and Keys

`security.yaml` in the `config/` folder of the [artefacts directory](./Artifacts_Directory.md) holds users, roles, two-factor secrets and the keys that sign sessions and encrypt secrets. Restrict read access to that folder to the account that runs Profinity, include `security.yaml` in encrypted backups, and never commit a file that contains real keys to source control. In a Docker container, `security.yaml` and its keys are written to the container's own storage when `PROFINITY_HOME` does not match a mounted volume, and replacing the image then regenerates the keys and resets Profinity to the default administrator account, so always set `PROFINITY_HOME` to the container path of a mounted volume.

## Scripting Security

!!! warning "Scripts Run with Full Profinity Permissions"
    Profinity scripts execute with the same security permissions as the Profinity engine itself. This means scripts can:

    - access all system resources available to Profinity
    - send and receive CAN bus messages
    - modify system configuration
    - control connected hardware (batteries, chargers, motor controllers)

Scripting is switched off by default. An administrator turns it on with **Enable Scripting** under **ADMIN > System Configuration**, and the setting is available only when the licence includes the **Scripting** feature (Desktop, Server and Enterprise editions; an unlicensed instance does not include scripting). Enable it only when the use case needs it, review script code before deployment (especially scripts from external sources), keep production scripts under version control with a review process, and audit active scripts regularly. When Profinity runs as a service, give it the minimum operating system permissions it needs, and document each script and its purpose for security reviews. For details, see the [Scripting](../Developing_with_Profinity/Scripting/index.md) documentation.

## User Account Security

### Default Credentials

!!! danger "Change Default Credentials Immediately"
    Fresh installations of Profinity Server on Linux, macOS and Docker include a default administrator account:

    - Username: `admin`
    - Password: `password`

    Profinity asks for a new password at the first sign-in with these credentials, and leaving the default credentials active exposes the system to unauthorised access.

The Windows desktop application does not create this account, and the desktop user signs in without a password; see [Windows Installation](./Windows_Installation.md).

### User Account Practices

Create an account for each person or system that needs access instead of sharing the administrator account, enforce a password policy that suits the organisation (see [Password Policy](../Administration/System_Configuration/Security/Password_Policy.md)), rotate passwords on production systems, and disable or remove accounts that are no longer needed. Creating user accounts and roles needs the **Profinity Server** licensed feature.

### Sign-In, Two-Factor and Session Controls

Profinity 2.3 offers a site sign-in method (Local or SSO), two-factor authentication for local users, a password policy, a session policy, SIEM export and service accounts with long-lived tokens. Two-factor authentication needs the Server edition, and SSO and SCIM need the Enterprise edition. See [SSO and Sign-In](../Administration/System_Configuration/Security/SSO_and_Sign_In.md), [Two-Factor Authentication](../Administration/System_Configuration/Security/Two_Factor_Authentication.md), [SCIM and SIEM](../Administration/System_Configuration/Security/SCIM_and_SIEM.md) and [Service Accounts](../Administration/Users_and_Access/Service_Accounts.md).

### Security Roles

Profinity 2.3 uses 27 granular permissions grouped into roles, and users receive assigned roles; there are no security groups or per-user permission lists. Assign users only the permissions their work needs, give monitoring accounts read-only roles for dashboards and the Tag Explorer, use individual administrator accounts, and review accounts and role assignments periodically. The **Send CAN messages** permission lets a user inject CAN frames onto the bus, so assign it only to trusted operators. See [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) for the full catalogue and the built-in Administrators role, and [Managing Users](../Administration/Users_and_Access/Manage_Users.md) for user management.

## Kiosk Mode Security

Kiosk Mode signs a selected user in automatically without a login, which is convenient but needs careful configuration. Profinity does not restrict which enabled user is selected, including administrators, so anyone at the kiosk inherits that user's permissions. Use a dedicated user with only the view permissions the display needs, such as a read-only role, review that user's permissions regularly, and monitor kiosk access through the logs. Secure the device physically, because Kiosk Mode bypasses the login page, isolate it on its own network segment in production, and disable Kiosk Mode when it is not needed. See [Kiosk Mode](../Administration/Kiosk_Mode.md) for the configuration.

## Production Deployment Checklist

Before deploying Profinity in a production environment:

- [ ] Change the default administrator password.
- [ ] Configure HTTPS with valid certificates and turn on the HTTPS redirect.
- [ ] Create individual user accounts and assign minimum permissions.
- [ ] Apply a Server licence if you need remote access, users or roles.
- [ ] Restrict read access to `security.yaml` and encrypt backups of it.
- [ ] Review and audit all active scripts, and disable scripting if it is not required.
- [ ] Configure firewall rules to restrict access to Profinity ports.
- [ ] Review the logs on a schedule and forward them to your monitoring system.
- [ ] Back up configurations and profiles on a schedule, and test a restore.
- [ ] Write down the security configuration and who may change it.
- [ ] If using Docker, mount a volume at `PROFINITY_HOME` and follow the [Docker security](#docker-security) guidance.
- [ ] Review Kiosk Mode and disable it if it is not needed.

## Related Documentation

- [System Configuration](../Administration/System_Configuration/index.md): HTTPS and security settings.
- [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md): roles and permissions in 2.3.
- [SSO and Sign-In](../Administration/System_Configuration/Security/SSO_and_Sign_In.md): Local and SSO sign-in.
- [Two-Factor Authentication](../Administration/System_Configuration/Security/Two_Factor_Authentication.md): two-factor policy.
- [Managing Users](../Administration/Users_and_Access/Manage_Users.md): user accounts and role assignment.
- [Kiosk Mode](../Administration/Kiosk_Mode.md): Kiosk Mode configuration and security.
- [Scripting](../Developing_with_Profinity/Scripting/index.md): scripting security considerations.
- [Docker Installation](./Docker_Installation.md): Docker deployment.
