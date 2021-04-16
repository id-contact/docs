---
id: core
title: Core configuration options
sidebar_label: Core
slug: core
---

This document describes the configuration options available for the ID Contact core. A complete sample configuration can be found in the [github repository](https://github.com/id-contact/core/config.toml). For a guide on how to setup the core for an ID Contact development setup, see the [setup guide](../setup.md)

## General configuration structure

The authentication test plugin is based on [Rocket](https://rocket.rs), and its configuration system is based on the system provided by Rocket. We will describe here the properties needed by an end user, a complete overview can be found in [the rocket documentation](https://rocket.rs/master/guide/configuration/).

This configuration system is based on 3 tiers:
 - Defaults baked into the server
 - Configuration provided through the configuration file specified in the `ROCKET_CONFIG` environment variable (or the default filename `Rocket.toml`)
 - Configuration overrides provided through environment variables with names starting with `ROCKET_`.

Within these structures, defaults have the lowest priority (are used only when no other source defines that particular setting), and environment variables have the highest priority (always override whatever value the other layers have for a setting).

### Profiles

Within files, configuration is further namespaced in Profiles, which can be named by the person making the configuration. At runtime, the `ROCKET_PROFILE` environment variable can then be used to select which namespace to use for the actual configuration, allowing a combination of multiple configurations to be present within a single configuration file.

There are also 4 special configurations, described below, that act sligthly differently:

#### default
The profile `default` is used to provide configuration values as fallbacks for the selected profile. If the selected profile doesn't specify a configuration parameter, the value provided in the `default` profile is used when available.

#### global
The profile `global` is the oposite to `default`. Settings provided in `global` always override no matter what the selected profile contains.

#### debug
The profile `debug` is the default selected profile used on debug builds of the core server (which occurs e.g. when starting the server with `cargo run`), when no profile is specified through `ROCKET_PROFILE`.

#### release
The profile `release` is the default selected profile used on release builds of the core server, when no profile is specified through `ROCKET_PROFILE`. This will be the default for prebuilt binaries when these become availble.

### Configuration file format

Any provided configuration file is interpreted as [TOML](https://toml.io). This is a configuration file format somewhat similar to INI files, but with a more constrained specification. For example:
```toml
[debug]
port = 8001
address = "127.0.0.1"

[release]
port = 80
```
Is a configuration file that sets the parameters `port` and `address` for the debug profile, and only `port` for the release profile.

Some configuration options described below may require values more complicated than a string or a number. In those cases, specific descriptions on how to use those options is given there.

## Basic configuration

| key             | environment variable   | description                                                           | default        |
| --------------- | ---------------------- | --------------------------------------------------------------------- | -------------- |
| address         | ROCKET_ADDRESS         | IP address for server to use                                          | `127.0.0.1`    |
| port            | ROCKET_PORT            | Port for server to listen on                                          | `8000`         |
| server_url      | ROCKET_SERVER_URL      | URL on which the server is reachable                                  |                |
| internal_url    | ROCKET_INTERNAL_URL    | URL on which the server can be reached by other ID Contact components |                |
| internal_secret | ROCKET_INTERNAL_SECRET | Secret used to sign some session data                                  |
| workers         | ROCKET_WORKERS         | Number of threads to use for serving responses                        | cpu core count |
| keep_alive      | ROCKET_KEEP_ALIVE      | HTTP persistence keep alive timeout                                   | `5`            |
| log_level       | ROCKET_LOG_LEVEL       | Log level (`off`/`critical`/`normal`/`debug`)                         | `normal`       |

The `port` and `address` parameters together determine the interface on which the server will listen for responses. The `server_url` parameter indicates via which URL the server can be reached by external parties. This can be different than the `address`, `port` configuration, and even include a path prefix. The internal URL specifies the URL on which other components of the ID Contact system can find this plugin. This may be different from the external URL.

`internal_secret` is used to provide a secret key used by the server to sign session data included in URLs. It should be at least 32 characters long, reasonably random and kept secret. When using multiple instances of the core in a single ID Contact system, this value should be identical among all instances.

`workers` and `keep_alive` influence the resource utilization of the server. For most use cases, the default values will be fine, but if neccessary these can be tuned.

The amount of logging done by the server is determined through the `log_level` parameter. The values listed give progressively more detailed information.

## Authentication methods

| key          | environment variable | description                                                | default |
| ------------ | -------------------- | ---------------------------------------------------------- | ------- |
| auth_methods | ROCKET_AUTH_METHODS  | Array of enabled authentication methods and their settings |         | 

Each authentication method has multiple sub-keys that form the complete description:

| key              | description                                                                                                    | default |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| tag              | Tag used to identify the authentication method in the system                                                   |         |
| name             | Human-readable name of the authentication method                                                               |         |
| image_path       | Path to an icon image for this method, relative to public base URL of the core                                 |         |
| start            | Internal URL the core can use to start a session with this plugin                                              |         |
| disable_attr_url | When enabled, ensures plugin can always return authentication result in-band                                   | `false` |
| shim_tel_url     | When enabled, ensures the plugin doesn't need to deal with telephone scheme urls for the final client redirect | `false` |

In configuration files, authentication methods can best be configured using a section per method. For example,
```toml
[[global.auth_methods]]
tag = "irma"
name = "Gebruik je IRMA app"
image_path = "/static/irma.svg"
start = "http://auth-irma:8000"

[[global.auth_methods]]
tag = "test"
name = "Gebruik Test Plugin"
image_path = "static/test.svg"
shim_tel_url = true
start = "http://auth-test:8000"
```
defines two authentication methods in the global profile, one using an irma plugin, and one for the test plugin.

In order to reduce implementation load for plugin developers, not all ID Contact protocol features are neccessarily provided by all plugins. In those cases, the core can provide compatibility layers. These are enabled through the `disable_attr_url` and `shim_tel_url` parameters. Consult your plugin's documentation for information on whether or not these are neccessary in your setup.

Although configuration of authentication methods through environment variables is possible, this is discouraged for reasons of the complexity of said configuration.

## Communication methods

| key          | environment variable | description                                               | default |
| ------------ | -------------------- | --------------------------------------------------------- | ------- |
| comm_methods | ROCKET_COMM_METHODS  | Array of enabled communication methods and their settings |         | 

Each communication method has multiple sub-keys that form the complete description:

| key                         | description                                                                                  | default |
| --------------------------- | -------------------------------------------------------------------------------------------- | ------- |
| tag                         | Tag used to identify the authentication method in the system                                 |         |
| name                        | Human-readable name of the authentication method                                             |         |
| image_path                  | Path to an icon image for this method, relative to public base URL of the core               |         |
| start                       | Internal URL the core can use to start a session with this plugin                            |         |
| disable_attributes_at_start | When enabled, core will never provide plugin with attributes during start request of session | `false` |

In configuration files, communication methods can best be configured using a section per method. For example,
```toml
[[global.comm_methods]]
tag = "call"
name = "Bellen"
image_path = "/static/phone.svg"
start = "http://comm-call:8000"

[[global.comm_methods]]
tag = "chat"
name = "Chatten"
image_path = "/static/chat.svg"
start = "http://comm-chat:8000"
```
Defines two communication methods in the global profile.

In order to reduce implementation load for plugin developers, not all ID Contact protocol features are neccessarily provided by all plugins. In those cases, the core can provide compatibility layers. This is enabled through the `disable_attributes_at_start` parameter. Consult your plugin's documentation for information on whether or not these are neccessary in your setup.

Although configuration of communication methods through environment variables is possible, this is discouraged for reasons of the complexity of said configuration.

## Purposes

| key      | environment variable | description                                                    | default |
| -------- | -------------------- | -------------------------------------------------------------- | ------- |
| purposes | ROCKET_PURPOSES      | Array of defined purposes and requirements on contact for them |         | 

Each purpose has multiple sub-keys that form the complete description:

| key          | description                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------ |
| tag          | Tag used to identify the purpose in the ID Contact system                                        |
| attributes   | Array of attribute tags for the attributes whose value we need during a session for this purpose |
| allowed_auth | Array of tags of the allowed authentication methods for this purpose                             |
| allowed_comm | Array of tags of the allowed communication methods for this purpose                              |

In configuration files, purposes can best be configured using a section per method. For example,
```toml
[[global.purposes]]
tag = "report_move"
attributes = [ "bsn" ]
allowed_auth = [ "*" ]
allowed_comm = [ "call", "chat" ]

[[global.purposes]]
tag = "request_permit"
attributes = [ "email" ]
allowed_auth = [ "irma", "test" ]
allowed_comm = [ "*" ]

[[global.purposes]]
tag = "request_passport"
attributes = [ "bsn" ]
allowed_auth = [ "*" ]
allowed_comm = [ "call" ]
```
defines three purposes. Note that in both `allowed_auth` and `allowed_comm`, we can use the wildcard `*` if we simply want to enable all communication or authentication methods for this purpose.

A detailed explanation of what attributes and purposes are can be found in the [attributes](../concepts/Attributes.md) and [purposes](../concepts/Purposes.md) concept documentation.
