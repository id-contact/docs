---
id: purposes
title: Purposes
sidebar_label: Purposes
slug: purposes
---

In ID-Contact, purpose tags encode the intent with which a user started a combined authentication-communication session. These tags are strings used to communicate that intent internaly between the UI, ID-contact core and its communication plugin.

The core uses the specified purpose to determine which [attributes](Attributes.md) to request from the user via an authentication plugin. It is also provided to the communication plugin, which can use it when selecting an agent for the conversation, as well as to give (via a mapping to some human readable description) the agent handling the communication some up-front information idea as to what the end-user wants from their contact.

There is no pre-defined meaning of purpose tags, so communication plugins need to be flexible in how they handle these. Ideally, communication plugins can be configured to map purpose tags to human readable tags when showing them to their agents.
