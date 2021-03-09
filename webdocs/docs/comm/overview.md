---
id: overview
title: Communication plugin overview
sidebar_label: Overview
slug: overview
---

Communication plugins are responsible for managing the entire process of an end-user communicating with an agent. If a communication plugin involves some form of scheduling, ID Contact considers this process started from the moment the meeting is scheduled right up until the actual meeting has occured and is finished.

## Communication plugin flow

An ID Contact communication session starts with a request by the ID Contact core to setup a communication session for a specific purpose. The communication plugin then indicates where to send the end-user to start communication, and how it wants to receive the attributes.

Once the user lands on the communication page, the communication plugin is responsible for further handling of the entire communication session. Attributes can (if indicated by the plugin) be delivered separately, in which case the communication plugin should not assume it already has received these at this point in time.

The communication plugin is responsible for all further activity in the session, and can close it of its own volition. The ID Contact core does not need to be kept up to date on the session status. An exception to this occurs when the authentication plugin indicates a need for [session feedback](#session-feedback)

## Session feedback

Some authentication plugins might need to be kept up-to-date on the current state of the complete ID Contact session and whether the user has indicated a desire to logout. If this is the case, the communication plugin will receive an URL to which it must send such updates along with the attributes.

When indicated, a communication plugin must:
 - Send activity indications each time the user has meaningfull interaction with the communication plugin which should extend authentication session duration.
 - Display a Logout button, and upon clicking, send a logout update.
It is up to the communication plugin to decide what entails a "meaningfull interaction" for its communication method.

Any updates to the session state url must be generated and sent server-side, as the update URL may not be reachable publicly.

## Implementation options

### Unauthenticated communication

A communication plugin may support unauthenticated communication sessions. For such a session, the user will be immediately redirected to the commmunication landing page, and the communication plugin will not receive any attributes.

The communication plugin can, either of its own volition or on instruction of an agent, decide to authenticate the user at a later moment during the flow. This can be done with [authentication during communication](#authentication-during-communication)

### Authentication during communication

The communication plugin can ask the ID Contact core to (re-)authenticate a user during a communication session. This can be used for unauthenticated sessions, or when a significant pause has occured in a session.

For this, it needs to provide the appropriate purpose and a URL for the end user to continue the communication on after authentication, as well as an indication how it wants to receive the attributes. It then receives an authentication url to which it needs to redirect the end user to start the authentication flow. After authentication is complete, the end-user will be redirected to the communication plugin, which will also then receive the attributes.

Communication plugins should use authentication during communication if their plugin has some form of scheduling with significant periods of time between scheduling and the actual appointment, or when the communication plugin cannot guarantee identity of the user is preserved among all its steps. This is to prevent leaking of personal information should a session be accidentally leaked.

### Attribute reception

A communication plugin can receive the end-user attributes in one of 3 ways:
 1) Immediately during the initial request to setup a communication session
 2) Through query parameters received when the end-user lands on the communication page
 3) Through a separate endpoint specified during the initial setup exchange with the core.
All communication methods should implement at least one of the above methods.

For authentication during communication, the communication plugin must support at least one of methods 2, 3.
