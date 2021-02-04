# ID Contact
This repository contains PlantUML diagrams that can be rendered using PlantUML in [docs/diagrams](docs/diagrams). To do so, you can paste the file contents in [PlantUML's online render service](https://www.plantuml.com/plantuml/). There are OpenAPI specifications available in [docs/openapi](docs/openapi).

## Overview

ID contact is an ecosystem of components that work together to set up an authenticated communication session between a client and an agent. ID Contact is set up in order for municipalities in the Netherlands to enable agents to verify the identity of citizens they are communicating with. It enables authentication using any authentiction method, and communication over any channel, be it live chat, telephone, or videocalls. 

ID contact links together arbitrary authentication methods with arbitrary communication methods. The ID contact ecosystem consists of a core, a set of authentication plugins and a set of communication plugins, as well as a number of UI components to allow users to authenticate, verify, and communicate. 

### ID Contact Core
The core is responsible for setting up an ID-contact session and deciding which process can be handled using which communication method. It also presents a list of authentication methods the client can use to disclose their identity. 

Along with the core comes a widget, a web component which fetches the available authentication and communication methods, from which the user can choose. Depending on the configuration, the user is either sent off to the communication method directly, or is first routed to an authentication service. 

### Authentication plugins
The authentication plugins are a glue layer between ID-contact an some arbitrary authentication service. Their responsibility is to set up an authentication flow, and send any attributes, like date of birth or address, over to a communication plugin after encryption. The authentication plugin hosts any user interface needed for a client to complete the flow. After the authentication flow is completed, the client is redirected to the communication plugin.

### Communication plugins
The communication plugins handle incoming ID-contact sessions and pass them on to some arbitrary communication platform. The plugin enables verifying and decrypting incominig attributes, queueing sessions, and matching sessions with agents. It also presents the sessions attributes to the assigned agent, and presents an interface or some other method to set up the actual conversation.

### Flow
ID Contact aims to be flexible in not only supporting arbitrary authentication an communication methods, but also being flexible in the flow that clients need to complete in order to set up a session. ID contact supports both authentication beforehand, as well as redirecting to an authentication service while in a conversation. 
