---
id: auth_during_comm
title: Authenticating during a communication session
sidebar_label: Authentication during communication
slug: auth_during_comm
---

There may be circumstances where there is a need to authenticate an end user when they are already in a communication session. This is supported by ID Contact using the authentication during communication flow. Such a flow has two major differences to a regular flow:
 1. The communication plugin, rather than an external initiator, is responsible for working with the core to initiate the authentication.
 2. The ID Contact core does not separately call the communication plugin to setup a new communication session, instead using information provided during the start request

This document will be devoted primarily to describing the responsibilities of the communication plugin as initiator in this flow. Details on the regular plugin interactions in ID Contact sessions can be found in the [communication plugin](../comm/overview.md) and the [authentication plugin](../auth/overview.md) documentation. For context on how a full ID Contact session is initiated, see the [full session documentation](./full)

## Session overview

An authentication during communication session consists of 4 steps:
 1. Unauthenticated communication
 2. End user choice gathering and initiation of authentication
 3. Authentication
 4. Resumption of communication

Steps 1, 3 and 4 are mostly plugin specific, and any generic parts are covered elsewhere in this documentation. Here, we will focus on the actions of the communication plugin needed during step 2. During this step, the communication plugin fetches the available authentication options, lets the user choose one of these, and then signals the core with the necessary information to start authentication. Finally, it redirects the end user to the starting point of the authentication flow.

## Requesting authentication options

At the start of step 2, the communication plugin needs to fetch a list of authentication options for the current purpose. For this, the plugin can use the core's [`session_options` endpoint](../core_api). For example, if the indicated purpose were `personal_question`, the initiator would send a get request:
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
For an authentication during communication session, the communication plugin can disregard the `comm_methods` information provided.

## Initiating authentication

Once the end user has chosen the method of authentication, the communication plugin can initiate the authentication using the core's [`start` endpoint](../core_api). Rather than specifying the communication method as a tag, the communication plugin indicates that it already has a communication session by directly providing a `comm_url` at which the communication can be resumed after authentication, and, if desired, a separate `attr_url` at which the authentication results should be provided.

Continuing the above example, assuming the end user has chosen `irma` as authentication method, that communication should be resumed at `https://example.com/chat` and that the attributes should be sent to `https://example.com/attributes/a12345`. Then the communication plugin will make a request similar to
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
    "purpose":"personal_question",
    "comm_url":"https://example.com/chat",
    "attr_url":"https://example.com/attributes/a12345"
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
After this, the communication plugin should redirect the end user to the specified `client_url`. After authentication has completed the end user will be redirected to `http://example.com/` and the plugin will receive the attributes on `https://example.com/attributes/a12345` as documented in the [communication plugin documentation](../comm/overview.md)
