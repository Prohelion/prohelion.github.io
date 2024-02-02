---
title: Version Querying
description: Documentation for the Prohelion Vehicle Communications protocol
order: 5
---

# Version Querying

The hardware and firmware version of a given bridge can be queried via the Ethernet interface.  To query a given bridge, open a TCP connection and transmit a single packet with:

*   the <strong>S</strong> bit set in the flags bitfield,
*   the length field set to 8,
*   the upper two bits of the data field set to <strong>00b</strong>,
*   the remaining bits of the upper data byte set to <strong>0x16</strong>, and
*   the remaining data bytes set to zero.

Upon receipt of this packet, the bridge will respond with a UDP packet with:

*   the <strong>H</strong> bit set in the flags bitfield,
*   the length field set to 8,
*   the upper two bits of the data field set to <strong>01b</strong>,
*   the remaining bits of the upper data byte set to <strong>0x16</strong>, and
8   the remaining data bytes containing version information as shown in figure 6, with the HW field containing the hardware version, the FW field the firmware version multiplied by ten, and the build num field the firmware build number.  All fields are little-ending unsigned integers.

![Figure 6:Version information](images/figure6.png)

Figure 6: Version information



