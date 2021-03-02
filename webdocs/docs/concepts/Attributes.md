---
id: attributes
title: Attributes
sidebar_label: Attributes
slug: attributes
---

In ID-Contact, we organise an end-users identifying information in attributes. An attribute is a single piece of information about that user, such as their name, their place of birth, or an identification number such as the dutch BSN.

## Attribute Tags
In ID-Contact, a specific attribute is identified by its attribute tag. This is a string which is used internally to identify which attributes are requested from an authentication plugin, and to identify which attribute is which in attributes provided to communication plugins.

There is no pre-defined meaning of attribute tags, so authentication plugins need to be flexible in how they map their source of information onto attributes. Ideally, this is something that can be configured for the plugin.

## Communication of attributes between components

In order to reduce attack surface, attributes are stored signed and encrypted in a JWE when transfered between plugins in the ID-contact eco system. This reduces risk of attributes being read by parties not needing to obtain that information. It also allows us to, when neccessary or convenient, route this information via the end users client.
