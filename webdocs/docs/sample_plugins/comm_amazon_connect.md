---
id: amazon_connect
title: Amazon Connect
sidebar_label: Amazon Connect (telephony)
slug: amazon_connect
---

The amazon connect plugin is intended as a sample plugin illustrating an approach to implementing a telephony plugin with minimal interaction required from the actual telephony flow. The plugin consists of 3 parts, only one of which is actually specific to amazon connect:
- The plugin backend, which is responsible for talking to the rest of the ID Contact ecosystem
- The attribute display, which is responsible for displaying attributes in an iframe embedded in the service employee software
- The modifications to the amazon connect flow, which are responsible for capturing the dtmf code and instructing the iframe to show the correct session's data.

Within this design split, a call flow looks as follows
1. The core contacts the plugin backend to start a session
2. The plugin backend generates a DTMF code, and stores that together with the session purpose in it's database
3. The plugin backend responds to the core with a telephone url containing the amazon connect telephone number and the DTMF code, together with an attribute url containing a session identifier.
4. An authentication plugin contacts the plugin backend on the previously provided session id with an authentication result.
5. The plugin backend stores this authentication result with the session.
6. The end user starts calling the amazon connect phone number.
7. Amazon connect answers and asks for the DTMF code.
8. Amazon connect then sends that DTMF code, together with the phone session id to the plugin backend.
9. The plugin backend uses the DTMF code to find the session, and associates the phone session id with it.
10. An agent gets assigned to the phone call by amazon connect
11. The agents ui sends the phone session id to the attribute display iframe
12. The attribute display iframe ask the plugin backend for the authentication results and displays these in the iframe.

Note that the actual involvement from the phone flow that differs from a non-authenticated call is only in the reception of the dtmf code and in a small modification to the agent ui to update an iframe on agent state changes.

## Plugin backend

The plugin backend is the main rust binary in the repository. It is the server that talks directly to the rest of the ID Contact ecosystem.

### Configuration

The plugin backend is configured through the [rocket configuration system](https://rocket.rs/master/guide/configuration/), and is configured similarly to the [test communication plugin](../configuration/comm_test.md)

| key                | environment variable      | description                                                           | default        |
| ------------------ | ------------------------- | --------------------------------------------------------------------- | -------------- |
| address            | ROCKET_ADDRESS            | IP address for server to use                                          | `127.0.0.1`    |
| port               | ROCKET_PORT               | Port for server to listen on                                          | `8000`         |
| internal_url       | ROCKET_INTERNAL_URL       | URL on which the server can be reached by other ID Contact components |                |
| workers            | ROCKET_WORKERS            | Number of threads to use for serving responses                        | cpu core count |
| keep_alive         | ROCKET_KEEP_ALIVE         | HTTP persistence keep alive timeout                                   | `5`            |
| log_level          | ROCKET_LOG_LEVEL          | Log level (`off`/`critical`/`normal`/`debug`)                         | `normal`       |
| phonenumber        | ROCKET_PHONENUMBER        | Phone number of amazon connect flow                                   |                |
| dtmf_length        | ROCKET_DTMF_LENGTH        | Number of digits in generated DTMF codes                              |                |
| result_length      | ROCKET_RESULT_LENGTH      | Number of characters in authentication result report code             |                |
| decryption_privkey | ROCKET_DECRYPTION_PRIVKEY | Private key used for decrypting authentication results                |                |
| signature_pubkey   | ROCKET_SIGNATURE_PUBKEY   | Public key used for verifying the signature on authentication results |                |

The cryptographic key parameters consists of the following subkeys specifying the actual key type and key material

| key  | description                                                                |
| ---- | -------------------------------------------------------------------------- |
| type | What type of key this is (`RSA` for RSA keys, `EC` for eliptic curve keys) |
| key  | PEM encoding of the actual key                                             |

## Attribute display

The attribute display is a simple react application contained fully in the `attribute-ui` folder. It takes the session id as a query parameter and uses that to fetch authentication results from the backend and display these.

### Configuration

The attribute display code is configured through the file `attribute-ui/config.js`. This contains translations for the purpose tags in `window.TRANSLATIONS`, as well as the url on which the plugin backend can be found in `window.SERVER_URL`.

## Amazon connect integration

The actual amazon connect integration consists of two sub-parts: A lambda which is called during the amazon connect flow to link the phone session id to the dtmf code (in `aws_funcs/assign_id.js`), and an amazon connect service center UI (in `amazon-connect-ui`).

The service center UI is a very thin wrapper page around the amazon-connect-streams API, adding only an extra iframe to the page and some code for updating that iframe's src attribute depending on the current session the agent is in.

### Configuration

The lambda and amazon connect flow must be configured through amazon's interfaces for this. The service center ui has a configuration file `amazon-connect-ui/config.js` which should contain the url of the attribute ui in `AttributeURL`, and the amazon connect streams url as `AmazonConnectURL`.
