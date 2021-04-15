---
id: comm_test
title: Communication test plugin configuration options
sidebar_label: Communication test plugin
slug: comm_test
---

This document describes the configuration options available for the communication test plugin. A complete sample configuration can be found in the plugin's [github repository](https://github.com/id-contact/comm-test/config.sample.toml). For a guide on how to setup this plugin in an ID Contact development setup, see the [setup guide](../setup.md)

## General configuration structure

The authentication test plugin is based on [Rocket](rocket.rs), and its configuration system is based on the system provided by Rocket. We will describe here the properties needed by an end-user, a complete overview can be found in [the rocket documentation](https://rocket.rs/master/guide/configuration/).

This configuration system is based on 3 tiers:
 - Defaults baked into the server
 - Configuration provided through the configuration file specified in the `ROCKET_CONFIG` environment variable (or the default filename `Rocket.toml`)
 - Configuration overrides provided through environment variables with names starting with `ROCKET_`.

Within this structures, defaults have the lowest priority (are used only when no other source defines that particular setting), and environment variables have the highest priority (always override whatever value the other layers have for a setting).

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

Any provided configuration file is interpreted as [TOML](toml.io). This is a configuration file format somewhat similar to INI files, but with a more constrained specification. For example:
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

| key          | environment variable | description                                                           | default        |
| ------------ | -------------------- | --------------------------------------------------------------------- | -------------- |
| address      | ROCKET_ADDRESS       | IP address for server to use                                          | `127.0.0.1`    |
| port         | ROCKET_PORT          | Port for server to listen on                                          | `8000`         |
| server_url   | ROCKET_SERVER_URL    | URL on which the server is reachable                                  |                |
| internal_url | ROCKET_INTERNAL_URL  | URL on which the server can be reached by other ID Contact components |                |
| workers      | ROCKET_WORKERS       | Number of threads to use for serving responses                        | cpu core count |
| keep_alive   | ROCKET_KEEP_ALIVE    | HTTP persistence keep alive timeout                                   | `5`            |
| log_level    | ROCKET_LOG_LEVEL     | Log level (`off`/`critical`/`normal`/`debug`)                         | `normal`       |

The `port` and `address` parameters together determine the interface on which the server will listen for responses. The `server_url` parameter indicates via which URL the server can be reached by external parties. This can be different than the `address`, `port` configuration, and even include a path prefix. The internal URL specifies the URL on which other components of the ID Contact system can find this plugin. This may be different from the external URL.

`workers` and `keep_alive` influence the resource utilization of the server. For most use cases, the default values will be fine, but if neccessary these can be tuned.

The ammount of logging done by the server is determined through the `log_level` parameter. The values listed give progressively more detailed information.

## Plugin behaviour

| key          | environment variable | description                                                                           | default |
| ------------ | -------------------- | ------------------------------------------------------------------------------------- | ------- |
| use_attr_url | ROCKET_USE_ATTR_URL  | Whether or not to use a separate attribute URL for transfering authentication results | `true`  |


ID Contact allows for two methods of transfering the authentication result to the communication plugin:
 - Out of band, through a separate attribute URL
 - In band, as part of the URL the end user opens to start the communication session.
The `use_attr_url` setting indicates which method this plugin should choose to use.

## Cryptographic keys

| key                | environment variable      | description                                                           | default |
| ------------------ | ------------------------- | --------------------------------------------------------------------- | ------- |
| decryption_privkey | ROCKET_DECRYPTION_PRIVKEY | Private key used for decrypting authentication results                |         |
| signature_pubkey   | ROCKET_SIGNATURE_PUBKEY   | Public key used for verifying the signature on authentication results |         |

These encryption parameters consists of the following subkeys specifying the actual key type and key material

| key  | description                                                                |
| ---- | -------------------------------------------------------------------------- |
| type | What type of key this is (`RSA` for RSA keys, `EC` for eliptic curve keys) |
| key  | PEM encoding of the actual key                                             |

In a configuration file, this results in the following configuration for an RSA encryption key:
```toml
[global.signature_pubkey]
type = "RSA"
key = """
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5/wRrT2T4GGvuQYcWjLr
/lFe51sTV2FLd3GAaMiHN8Q/VT/XEhP/kZ6042l1Bj2VpZ2yMxv294JKwBCINc34
8VLYd+DfkMnJ4yX9LZHK2Wke6tCWBB9mYgGjMwCNdXczbl96x1/HevaTorvk91rz
Cvzw6vV08jtprAyN5aYMU4I0/cVJwi03bh/skraAB110mQSqi1QU/2z6Hkuf7+/x
/bACxviWCyPCd/wkXNpFhTcRlfFeyKcy0pwFx1OLCDJ1qY7oU+z1wcypeOHeiUSx
riSHlWaT24ke+J78GGVmnCZdu/MRuun5hvgaiWxnhIBmExJY6vRuMlwkbRqOft5Q
TQIDAQAB
-----END PUBLIC KEY-----
"""
```
