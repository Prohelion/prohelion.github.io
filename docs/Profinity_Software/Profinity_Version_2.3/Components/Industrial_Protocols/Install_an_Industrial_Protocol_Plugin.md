---
title: Install an industrial protocol plugin
description: Obtain a BACnet, EtherNet/IP, Modbus, OPC UA or S7 protocol plugin from Prohelion, install it, and add its components to a profile.
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Install an industrial protocol plugin

Use this procedure to make the BACnet, EtherNet/IP, Modbus, OPC UA or S7 components available in Profinity.
You need an edition with the **Industrial Protocols** licensed component group, which is an add-on to your Desktop, Server, or Enterprise edition.

The plugins are not included in the standard Profinity installation.
Each one brings data in as ordinary Profinity tags, and the Open Platform Communications Unified Architecture (OPC UA) plugin can also expose Profinity's tag tree to third-party clients.

<figure markdown>
![The BACnet, EtherNet/IP, Modbus, OPC UA and S7 protocol plugins each poll values into Profinity tags, and the OPC UA server exposes Profinity's tag tree to third-party clients](../../images/diagram-protocol-plugins.png)
<figcaption>Protocol plugins and Profinity tags</figcaption>
</figure>

!!! info "Licence required"
    The protocol plugins also require the **Industrial Protocols** licensed component group, an add-on to your Desktop, Server, or Enterprise edition.
    Installing a plugin does not make its components available without it.
    To check your instance, refer to [Licensing](../../Licensing.md), where the group is listed as **Industrial Protocols** under **Licensed component groups**.

To install a plugin:

1. [Contact Prohelion](https://www.prohelion.com/contact-us/) to arrange access to the protocols you need. Prohelion supplies the plugins on request.
2. Install each plugin like any other dynamic-link library (DLL) [plugin](../../Administration/Install_and_Manage_Plugins.md).
3. Add its components from the **Industrial Protocols** group, as described in [How to add a component to your profile](../../How_To_Guides/Add_Component_to_Profile.md).

To check that it worked, confirm that the **Industrial Protocols** group is listed under **Licensed component groups** in [Licensing](../../Licensing.md), and that the plugin's components appear in the **Industrial Protocols** group of the component catalogue.

For what each component connects to, refer to [Industrial protocol components](Industrial_Protocol_Components.md).
Then open the page for your protocol from the [Industrial protocols](index.md) list to configure it.
