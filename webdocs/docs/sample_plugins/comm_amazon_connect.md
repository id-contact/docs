---
id: amazon_connect
title: Amazon Connect
sidebar_label: Amazon Connect (telephony)
slug: amazon_connect
---

The Amazon Connect plugin is intended as a sample plugin, illustrating an approach to implement a telephony plugin. The plugin has minimal interaction required from the actual telephony flow. It consists of 3 parts, only one of which is actually specific to Amazon Connect:
- The plugin backend, which is responsible for talking to the rest of the ID Contact ecosystem
- The attribute display, which is responsible for displaying attributes in an iframe embedded in the interface for the service employee
- The modifications to the amazon connect flow, which are responsible for capturing the DTMF code and instructing the iframe to show the correct session data.

Within this design split, a call flow looks as follows:
1. The core contacts the plugin backend to start a session
2. The plugin backend generates a DTMF code, and stores that together with the session purpose in it's database
3. The plugin backend responds to the core with a phone URL containing the amazon connect phone number and the DTMF code, together with an attribute URL containing a session identifier.
4. An authentication plugin contacts the plugin backend on the previously provided session identifier with an authentication result.
5. The plugin backend stores this authentication result together with the session.
6. The end user starts calling the amazon connect phone number.
7. Amazon connect answers and asks for the DTMF code.
8. Amazon connect then sends that DTMF code, together with the phone session identifier to the plugin backend.
9. The plugin backend uses the DTMF code to find the session, and associates the phone session identifier with it.
10. An agent gets assigned to the phone call by amazon connect
11. The agents ui sends the phone session identifier to the attribute display iframe
12. The attribute display iframe ask the plugin backend for the authentication results and displays these in the iframe.

Note that the actual involvement from the phone flow that differs from a non-authenticated call is only in the reception of the dtmf code and in a small modification to the agent ui to update an iframe on agent state changes.

## Plugin backend

The plugin backend is the main rust binary in the repository. It is the server that talks directly to the rest of the ID Contact ecosystem.

## Attribute display

The attribute display is a simple react application contained fully in the `attribute-ui` folder. It takes the session identifier as a query parameter and uses that to fetch authentication results from the backend and display these.

## Amazon connect integration

The actual amazon connect integration consists of two subparts: A lambda which is called during the amazon connect flow to link the phone session identifier to the dtmf code (in `aws_funcs/assign_id.js`), and an amazon connect service center UI (in `amazon-connect-ui`).

The service center UI is a very thin wrapper page around the amazon-connect-streams API, adding only an extra iframe to the page and some code for updating that iframe's src attribute depending on the current session the agent is in.
