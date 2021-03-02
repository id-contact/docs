In ID-Contact, authentication plugins are responsible for managing the entire process of having an end user authenticating.

# Authentication lifecycle

From the perspective of an authentication plugin, a session starts with a request by the core to authenticate a user and receive a specified set of attributes. At this point, the authentication plugin also receives an attribute URL to send the results to, and a client URL to send the end user to after completing authentication.

The authentication plugin can then provide an URL to which the end user needs to be redirected to start the authentication flow.

After completing the authentication, the plugin should send the results to the attribute URL, and redirect the end user to the client URL.

## Attributes via client URL

In some scenarios, the core will not provide you with an attribute URL. In that case, the results of the session should be communicated via the URL the end user is redirected to. Your plugin can choose to only support this mode, in which case the core can be configured to compensate.
