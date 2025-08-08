---
title: Bridge Configuration
---

# Bridge Configuration

The bus number and CAN bitrate used by a bridge are user settable.  To set a parameter on a specific bridge, open a TCP connection and transmit a single packet with

- the S bit set in the flags bitfield,
- the length field set to 3 when setting bitrate, 8 when setting bus number,
- the upper two bits of the data field set to __10b__,
- the remaining bits of the upper data byte set to __0x05__ when setting the bitrate, or __0x0E__ when setting the bus number, and
- the following data bytes set to the desired parameter value, stored as an unsigned integer.  When setting the bus number, the full 7-byte bus identifier must be sent, consisting of either:
    - Protocol v1: the 52 bit protocol version with 4 bit bus number, or
    - Protocol v2: the 40 bit protocol version with 16 bit bus number

as shown in Figure 2, see [CAN-UDP Bridging](CAN_UDP_Bridging.md). When setting the bitrate, the new rate in kbps should be sent as a two byte integer.
