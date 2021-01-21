# ID Contact Components and Responsibilities
`v0.0.1`

An overview of the components of which ID-contact consists, along with each components responsibilities

## Components
 1. Core
 2. Core widget
 3. Authentication plugin
 4. Authentication widget/ui
 5. Communication plugin
 6. Communication widget/ui

## Responsibilities

### 1. Core
- Given a session objective, list available communication methods
- List all available authentication methods
- Sequence the steps in the ID-contact flow
- Yield attribute requirements per session objective

### 2. Core widget
- Present the available communication methods from which the citizen can choose.
- Pass the citizen's preferred communication method to the core
- Present the available authentication methods from which the citizen can choose.
- Pass the citizen's preferred authentication method to the core

### 3. Authentication plugin
- When requested by the core, given a set of attribute requirements and a return URI, start an authentication flow. This yields a URI to which the citizen can be redirected in order to complete the authentication flow.
- After authentication, pass the attributes to the core.
- Host authentication UI if applicable

### 4. Authentication widget
- Present UI for the authentication flow to the citizen. For IRMA, this would be a QR code the citizen can scan, with DigiD this could be a login screen.

### 5. Communication plugin
- When requested by the core, start a communication flow. This yields a URI to which the citizen can be redirected in order to start a conversation.
- Present a sessions atrributes to the agent
- Host communication UI if applicable

### 6. Communication widget
- Present UI that enables the citizen to have a conversation with the agent