# ID Contact
*The rendered webdocs can be found at [docs.idcontact.nl](https://docs.idcontact.nl)*

This repository contains PlantUML diagrams that can be rendered using PlantUML in [docs/diagrams](docs/diagrams). To do so, you can paste the file contents in [PlantUML's online render service](https://www.plantuml.com/plantuml/). There are OpenAPI specifications available in [docs/openapi](docs/openapi).

## Overview
*Note: this description is currently highly in flux*

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

#### Example flow: Athentication before communication
In this flow, the citizen clicks a button on a web page that opens the core widget. The button is configured to start a session with some predefined purpose, which is sent over to the core. The core returns a set of available authentication plugins as well as a number of communication plugins that can be used to finish the desired process. Also, the core creates an `attrRequest`, containing information on which of the citizen's attributes are needed in order to complete the session.

The citizen can now choose their preferred authentication method as well as the method of communication they want to use. Using this information, the ID-Contact core first sets up a session with the communication plugin. This yields two URLs: a `commUrl` and an `attrUrl`. These URLs are sent to the authentication plugin in order to set up the authentication, redirecting the citizen to the authenticaion plugin's interface. Upon completion of the authentication, the authentication plugin uses the `attrUrl` as a location to send over the necessary attributes to the communication plugin. Then, the authentication plugin uses the `commUrl` to redirect the citizen to the communication interface.

At this point, the communication plugin can assign an agent to the session and send over the attributes to them. The agent and the citizen are now ready to start their conversation. After the session ends, the attributes can manually be deleted by the agent. If they fail to do so, the attributes are deleted automatically after some time out.

Please refer to [the global sequence diagram](docs/diagrams/global-sequence.puml) for more details.

#### Alternative flow: Start authentication while in conversation
This flow is particularly suitable for chat and videocall channels. In this flow, the ID-contact session is only set up after the conversation starts. As opposed to flow the previous flow, this flow starts with the user just choosing a communication method with the core widget, at which time the conversation is set up immediately. In this flow, the choice of authentication platform would be presented in the communication widget, instead of the core widget. If the process cannot be handled by the current communication platform the session started with, the available communication methods are presented as well.

The citizen starts a conversation using the communication plugin's ui. Once the purpose of the session is clear, the communication plugin asks the core wich authentication and communication methods are available, and receives an `attrRequest`. Then, the communication plugin presents the citizen with the authentication methods that are available. Given the citizen's preference as well as the `attrRequest`, the communication plugin generates the `commUrl`,`attrUrl`, and redirects the citizen to the authentication plugin's UI. After authenticating, the `commUrl` takes the citizen back to the communication UI. From here on, the flow continues like the previously described flow.

## Notes

- Communication plugin receives the attributes in every case. Whether the underlying communication platform receives the attributes as well, depends on how the communication plugin implements sending the attributes over to the agent. Note that having the attributes pass through the communication platform could result in security concerns.
