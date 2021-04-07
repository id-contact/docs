---
id: overview
title: Authentication plugin overview
sidebar_label: Overview
slug: overview
---

Authentication plugins are responsible for managing the entire authentication process for an end-user, from setting up what to ask to delivering the authenticated information back to the ID Contact ecosystem.

## Authentication plugin flow

The authentication part of a flow starts with a request by the ID Contact core for a plugin to set up an authentication flow. At this point, the core tells the authentication plugin which [attributes](../concepts/Attributes.md) are needed from the end user, where to deliver those attributes, and where to send the user after the authentication flow.

The authentication plugin is then expected to provide the Core with a URL which the end-user can use to initiate the authentication flow. Once the user has navigated to this URL, it is the responsibility of the authentication plugin to guide them through the process of authentication, and, upon completion, send them on to the indicated location after completion of the authentication flow.

At completion, the authentication plugin is also responsible for sending the results of the session (whether successful or failed) to the rest of the ID Contact ecosystem. Unless it needs to maintain [session state](#session-updates), its involvement in any flow finishes after doing this.

## Implementation options

### Session result delivery

There are two routes through which your plugin can be asked to deliver the authentication result:
 1. Through query parameters on the URL to which it redirects the end-user after completion of the session
 2. Through a separate URL to which the attributes need to be sent through a POST request.

Your plugin MUST support at least option 1. If your plugin also supports option 2, the POST request with the resulting attributes MUST be done server-side, as the given URL may be internal.

### Session updates

Although the primary design of ID Contact assumes that a user identifies itself just for a single communication session, and does not presume a login/logout state, this might not be suitable for all authentication and identification methods.

If your authentication method requires managing of a session state that includes getting updates on the status of the conversation and user intent to logout, this can be indicated to the ID Contact ecosystem. During reporting of attributes, the authentication plugin can provide an additional URL on which it desires to receive  updates on the session status. The communication infrastructure will then be instructed to provide such updates, as well as display a button for the user to indicate a desire to log out.

The authentication URL must assume session update events are generated server-side, and cannot use those updates to set or receive cookies from the end-user.
