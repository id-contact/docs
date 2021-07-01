---
id: full
title: Full ID Contact session
sidebar_label: Full
slug: full
---

A full ID Contact session consists of 3 steps. This section intends to describe those steps from the perspective of the session initiator, outline it's responsibilities and protocol messages. Details on the plugin interactions in the ID Contact session can be found in the [communication plugin](../comm/overview.md) and the [authentication plugin](../auth/overview.md) documentation.

## Session overview

A full session consists of three major parts:
 1. End user choice gathering and initiation
 2. Authentication
 3. Communication

Step 1 starts at the point where an end user has indicated a desire to communicate for a given purpose. At this point, the initiator software queries the core for the options for authentication and communication methods. It then has the end user choose the desired communication and authentication methods, and passes those choices through to the core. Its responsibilities end at this point with transference of the end user to the authentication plugin using the URL provided by the core.

Step 2 consists of the end user authenticating themselves to the authentication plugins. At the end of this process, the authentication plugin provides the results of the authentication to the communication plugin, and hands the end user over using the URL(s) provided by the core.

In Step 3 the communication plugin is finally responsible for setting up a communication channel between end user and a customer service agent, as well as providing the customer service agent with the necessary authentication results as provided by the authentication plugin.

The initiators responsibilities for the session stops after step 1 of the above process. Below, we will go into details on the steps needed to be taken by the initiator during the choice gathering and initiation step.

## Requesting authentication and communication options

At the start of step 1, the end user has indicated in some way interest in communicating for a specified purpose. The first step for the initiator software is to fetch a list of authentication and communication options. For this, the initiator can use the core's [`session_options` endpoint](../core_api). For example, if the indicated purpose were `personal_question`, the initiator would send a get request:
```http
GET /session_options/personal_question HTTP/1.0
Host: core:8000
Connection: close
accept: */*
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.9
```
And get a response similar to
```http
HTTP/1.0 200 OK
content-type: application/json
server: Rocket
content-length: 288
date: Thu, 01 Jul 2021 08:27:43 GMT

{
    "auth_methods":[
        {
            "tag":"irma",
            "name":"IRMA",
            "image_path":"/static/irma.svg"
        },
        {
            "tag":"digid",
            "name":"DigiD",
            "image_path":"/static/digid.svg"
        }
    ],
    "comm_methods":[
        {
            "tag":"call",
            "name":"Call",
            "image_path":"/static/phone.svg"
        },
        {
            "tag":"chat",
            "name":"Chat",
            "image_path":"/static/chat.svg"
        }
    ]
}
```

## Initiating session

The initiator then presents the authentication and communication options to the end user and lets them choose their preferred authentication and communication method. Once this has been completed and the end user has indicated to start the actual session, the initiator uses the core's [`start` endpoint](../core_api). Continuing the above example, if the end user has chosen the `irma` authentication method and the `chat` communication method, the initiator then sends the core
```http
POST /start HTTP/1.0
Host: core:8000
Connection: close
Content-Length: 73
accept: application/json
content-type: application/json
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.9

{
    "auth_method":"irma",
    "comm_method":"chat",
    "purpose":"personal_question"
}
```
and will get a response similar to
```
HTTP/1.0 200 OK
content-type: application/json
server: Rocket
content-length: 388
date: Thu, 01 Jul 2021 08:31:12 GMT

{
    "client_url":"https://auth-irma.idcontact.test.tweede.golf/auth/eyJ1IjoiaHR0cHM6Ly9pcm1hLXNlcnZlci5pZGNvbnRhY3QudGVzdC50d2VlZGUuZ29sZi9pcm1hL3Nlc3Npb24vUmdxamZqVHdKNHpmNEJFTzJMZzMiLCJpcm1hcXIiOiJkaXNjbG9zaW5nIn0=/aHR0cHM6Ly93aWRnZXQuY29tbS1tYXRyaXguaWRjb250YWN0LnRlc3QudHdlZWRlLmdvbGYvP3Nlc3Npb249NWUwOTJmNGJmNDIyZDY1OWEyODU5MTVjMGU3Mjk1MWFmODA4MGZkOWVhNDI0YjIwZTgwOWNiMjRiMDI5NWE4Mw=="
}
```

After receiving this response the initiator finally is responsible for redirecting the end user to the given `client_url`, after which the initiators involvement in the session ceases.
