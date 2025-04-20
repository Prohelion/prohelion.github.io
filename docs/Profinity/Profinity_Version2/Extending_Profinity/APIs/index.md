---
title: Profinity Rest APIs
---

# Profinity Rest APIs

Profinity V2 is a fully API native application with a modern architecture. It supports API security and an open interface model based around REST & JSON.  This allows you to build custom application using the Profinity APIs to provide additional capabilities to your solutions, Custom User Interfaces or just extend the out of the box functionality to meet your needs.

As well as supporting Restful APIs, Profinity's overall solution allows you to build completely custom User Interfaces based on Profinity and host those interfaces either externally or within the Profinity solution.

!!! info "Important Information Regarding Profinity Rest APIs"
    Prohelions API solution is currently evolving rapidly as we develop new capabilities. Please be aware of this when developing solutions based on Profinity's APIs, as available APIs and models may evolve rapidly from release to release. 

!!! danger "Profinity APIs are Powerful"
    While our APIs support security and can be encrypted, be aware that by using Profinity's APIs you need to be careful with what power you are proving the user to ensure that they do not accidentally damage your environment or equipment.


# Scripting vs APIs

Profinity offers two completely different ways, Scripting and APIs that you can extend it's capabilities to meet the requirements of your applications.  Why would you choose one over the other?

<center>

| Scripting                                                                | APIs                                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Supports Python, Javascript and C#                                       | Support any Programming Language that can call REST APIs and JSON              |
| Are built in to Profinity and require no external frameworks or hosting  | Run outside of Profinity in your own environment, APP or cloud                 |
| Can be developed quickly and easily, to solve simple problems            | Can be as rich and complex as you want your app to be and still use Profinity  |
| Can run headless (no user interaction, scheduled or triggered by CAN)    | Requires you to write the logic for how your app uses the API                  |
| Script runs inside Profinity                                             | If scripted, your scripts run outside Profinity and can be distributed         |

</center>

Ultimately the decision on how to extend Profinity is up to you, but with two choices you have the flexibility to find the model that suits your needs best.

# Using Profinity APIs

Profinity V2 itself is built around our APIs so as of V2 all APIs are running all the time.  

To see the [Swagger](https://swagger.io) interface for Profinity, simply go to the URL that Profinity is running on and add `/swagger`, so for example if Profinity is running on `localhost:18080`, then `http://localhost:18080/swagger`, should take you to the Swagger UI.

<figure markdown>
![Showing the Profinity APIs](../../images/swagger.png)
<figcaption>Showing the Profinity APIs</figcaption>
</figure>
<br>


## Profinity API Security

To use Swagger calls in the GUI, you will need to generate and then provide your Bearer token to the API's if you wish to test them using Swagger.  To generate the Bearer token, in the Swagger GUI execute a call against the `/Users/Authenticate` API and then apply the returned Bearer token by clicking on the Authorise button in the top right of the Swagger API.  

To get a security token call a Profinity instance on the `/users/authenticate` endpoint with a POST request containing the username and password you wish to adopt for your API usage as the JSON body.  For example

### Post request on http://localhost:18080/users/authenticate

```json
{
  "username": "admin",
  "password": "password"
}
```
!!! warning "HTTPs is required for password security"
    Note that calling this API on a http connection does leave you exposed to network scanning which could expose your password.  For custom applications running on the Profinity server the localhost address can be used that does not expose this risk.  If your application is calling Profinity across a network, we would recommend https for API usage.

Profinity will respond to this request if your username and password are valid with a security token like this

```json
{
    "token": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzm9yZy93cy8yMDA1LzA1kZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJTeXN0ZW1SZWFkIiwiU3lzdGVtVXBkYXRlIiwiQ2d32thhcmdpbmciLCJDYW5Tdd1ZW5kUmVjZWl2ZSJdLCJleHAiOjE3NDUwNzkzOTAsImlzcyI6Ind3dy5wcm9oZWxpb24uY29tIiwiYXVkIjoid3d3LnByb2hlbGlvbi5jb20ifQ.9abNWiI32gNOaNHNvdMnIGCRHyRc7tExeVZlYtAm4r0"
}
```

<figure markdown>
![Generating a Authorization token via Swagger](../../images/swagger_authentication.png)
<figcaption>Generating a Authorization token via Swagger</figcaption>
</figure>
<br>


The contents of this token should then be passed in each subsequent request as a Bearer Token, check the documentation of your client side tools to determine how best to achieve this with the tool you are using to call Profinity.

In Swagger this token is applied by using the Authorize button in the top right of the screen and pasting in the token you have generated

<figure markdown>
![Entering the token in Swagger](../../images/swagger_authorize_button.png)
<figcaption>Entering the token in Swagger</figcaption>
</figure>
<br>


## Accessing Historical Data via APIs

APIs can provide both realtime and historical data, when a InfluxDB database is configured in the profile.  If no InfluxDB is setup, then only realtime data is available.

The __/api/v2/CAN/{Message}/{Signal}__ api is used to get historical data.  To use this API request a DBC Message and Signal as well as a InfluxDB time range that you wish to retrieve the data for.  The API will then call InfluxDB and retrieve all of the data stored across that time frame for this signal.

For more information on configuring InfluxDB see the [InfluxDB and Prometheus Integration](../../Components/Loggers/InfluxDB_Prometheus_Integration.md) section of this documentation.