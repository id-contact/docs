In ID Contact, communication plugins are responsible for all the communication between the end-user and agents. They are also responsible for presenting any attributes received to the agent.

# Lifecycle of a conversation

From the perspective of a communication plugin, an ID contact session starts with a request from the core to start preparing a communication channel for the user. At this point, the plugin should make sufficient preparations to be able to provide a unique link for the end-user to go to for communication (this need not be an URL, but can be any type of URI, for example, tel urls are also allowed), as well as prepare an end point to receive a users attribute 

## Early reception of attributes

In some scenarios, the core will already have the attributes provided by the user when initiating the request to communicate with your plugin. You can elect to support receiving the attributes during the request to prepare a communication channel, which will eliminate an additional round of communication between the communication plugin and the core.

## Attributes via client

If your communication method uses an URI with scheme https as starting point, it is also possible to elect to receive the disclosed attributes via the end user's URL. These attributes will be signed and encrypted, so this is still completely secure. The attribute JWE is then attached as a query parameter to the end user URL provided by the communication plugin.
