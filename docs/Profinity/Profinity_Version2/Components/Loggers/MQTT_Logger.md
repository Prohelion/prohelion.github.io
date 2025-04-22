---
title: MQTT Logger
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the documentation public.  To get access to the Profinity V2 installers, please log a support request at the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals) requesting access to the Early Adopter release.

# MQTT Logger

Profinity provides the ability to log CAN Bus data to an MQTT broker, allowing you to integrate your data with other systems and applications. MQTT (Message Queuing Telemetry Transport) is a lightweight messaging protocol designed for low-bandwidth, high-latency networks, making it ideal for IoT applications.

## What is MQTT?

MQTT is a publish-subscribe messaging protocol that allows devices to communicate with each other over a network. It is designed to be lightweight and efficient, making it suitable for use in constrained environments. MQTT uses a broker to manage messages between clients, ensuring reliable delivery and efficient communication.

## Setting Up an MQTT Server

To use the MQTT logger in Profinity, you need to set up an MQTT broker. There are several options available:

- **Local MQTT Broker**: You can run an MQTT broker on your local machine or network. Popular options include [Mosquitto](https://mosquitto.org/) and [HiveMQ](https://www.hivemq.com/).
- **Cloud MQTT Services**: Services like [AWS IoT](https://aws.amazon.com/iot/), [Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/), and [Google Cloud IoT](https://cloud.google.com/iot) provide MQTT support.

## Configuring the MQTT Logger

To log your CAN Bus data to an MQTT broker, add an MQTT device to your profile and configure the following options:

| Setting               | Purpose                                                               |
| --------------------- | --------------------------------------------------------------------- |
| MQTT Broker URL       | The URL of your MQTT broker.                                          |
| MQTT Topic            | The topic to which the data will be published.                        |
| MQTT Access Token     | Access token for authentication.                                      |
| MQTT Device ID        | A unique identifier for the device.                                   |

Once these settings have been configured, you should be able to see data flowing to your MQTT broker. If you encounter any issues, check the [Logs](../../Getting_Started/Profinity_Log.md) for more details.