---
id: digid
title: DigiD
sidebar_label: DigiD
slug: digid
---

The DigiD plugin is designed to authenticate the end-user using the dutch DigiD government authentication, and then fetching further information on the end-user from the dutch BRP through a separate BRP interface.

### Note

This plugin is not yet a complete solution capable of passing all the neccessary audits. It is more intended as a starting point for further future development. **Do NOT use this plugin in any production environment**

For further development, it is important to note is that this plugin currently depends on a heavily modified saml library. Furthermore, logout support is not yet implemented, as is support for authentication levels above `urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport`.

## BRP Connection

This plugin is designed to use a simple lookup API to query the BRP. It gets configured with an URL to use for the BRP lookup. Upon login, it then makes a POST request to that URL with a payload similar to
```
{"bsn":"999993653"}
```

It then expects as a response a (potentially nested) JSON object providing relevant information about the subject. There is no pre-determined schema for this object, as individual pieces of information are extracted by providing a path into this object (see the configuration information below). As an example, an object like
```json
{
    "Persoon": {
        "BSN": {
            "BSN": "999993653"
        },
        "Persoonsgegevens": {
            "Voorletters": "S.",
            "Voornamen": "Suzanne",
            "Voorvoegsel": "",
            "Geslachtsnaam": "Moulin",
            "Achternaam": "Moulin",
            "Naam": "S. Moulin",
            "Geboortedatum": "01-12-1985",
            "Geslacht": "V",
            "NederlandseNationaliteit": "Nee",
            "Geboorteplaats": "Thann",
            "Geboorteland": "Canada"
        },
        "Adres": {
            "Straat": "Boterdiep",
            "Huisnummer": "31",
            "Gemeente": "Rotterdam",
            "Postcode": "3077 AW",
            "Woonplaats": "Rotterdam"
        }
    }
}
```
is a valid way to respond, but other layouts are perfectly fine.

For securing this api, the plugin relies on TLS with client certificate authentication.

## Configuration options

The DigiD plugin uses a fairly simple configuration system. By default its configuration is taken from the `config.json` file in the current working directory of the server upon startup. Configuration from this file can be overwritten using environment variables starting with the prefix `DIGID_`. In the tables below, key will be the key in the json configuration file. Unless otherwise noted, all keys are mandatory, though if a variable is overridden using environment variables it need not be present in the configuration json file.

### General

General information needed by the server, such as where it is publically reachable, and how to connect to its database. Note that the server itself always binds to port 8000 on all interfaces of the local machine. For TLS it is advisable to use a separate reverse proxy in front of this server, and specify that as the route through which the server is publically reachable.

| key                | environment variable     | description                                                                     |
| ------------------ | ------------------------ | ------------------------------------------------------------------------------- |
| ServerURL          | DIGID_SERVERURL          | URL on which end-users can reach this plugin's server.                          |
| DatabaseConnection | DIGID_DATABASECONNECTION | Postgres URL (including database name) for the database this server should use. |

### SAML Configuration

Configuration for the DigiD saml connection

| key                | environment variable  | description                                                                                                              |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| SamlCertificate    | DIGID_SAMLCERTIFICATE | Path of the (public) certificate to include in the servers service provider metadata. Should be in PEM format.           |
| SamlKey            | DIGID_SAMLKEY         | Path of the private key for the saml service provider certificate. Should be in PEM format.                              |
| IDPMetadataURL     | DIGID_IDPMETADATAURL  | URL on which the plugin can find the digid identity provider's metadata.                                                 |
| EntityID           | DIGID_ENTITYID        | (optional) Entity ID to use in the metadata for this plugin's service provider. ServerURL will be used when not present. |

### BRP Connection

Configuration for connecting to BRP service.

| key       | environment variable | description                                                                                               |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| BRPServer | DIGID_BRPSERVER      | URL on which the plugin can query the BRP.                                                                |
| BRPCert   | DIGID_BRPCERT        | Path of the client certificate for the plugin to use contacting the BRP service. Should be in PEM format. |
| BPRKey    | DIGID_BPRKEY         | Path of the private key for the BRP service client certificate. Should be in PEM format.                  |
| CaCerts   | DIGID_CACERTS        | (optional) Path to a file containing a set of root certificates against which to validate the BRP server certificate. Should be in PEM format. |
| BSNMap    |                      | (optional) Map describing which BSNs to replace with other values for BRP resolution. This is needed as the DigiD test BSNs do not occur in the BRP test data. |

### Attribute configuration

The attribute configuration specifies which fields in the object returned by the BRP lookup map to the ID Contact attributes. It consists of a single configuration variable:

| key              | environment variable | description                                                                                |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------ |
| AttributeMapping |                      | Map describing which field in the BRP object to use for each of the ID Contact attributes. |

A value in the object returned by the BRP service is identified by following a `.`-separated path through the object. So in the sample object given above, the path `Persoon.Adres.Woonplaats` first takes the `Persoon` subobject, then the `Adres` subobject of that, then finally indicates we should take the value of the `Woonplaats` key in that object, resulting in the value `Rotterdam`.

## Sample configuration

```json
{
    "SamlCertificate": "keys/saml.cert",
    "SamlKey": "keys/saml.key",
    "ServerURL": "https://auth-digid.{{hostname}}",
    "IDPMetadataURL": "https://samltest.id/saml/idp",
    "JWTSigningKey": "keys/signkey.pem",
    "JWTEncryptionKey": "keys/encryptionkey.pem",
    "CACerts": "ca.pem",
    "BRPCert": "keys/brp.cert",
    "BRPKey": "keys/brp.key",
    "BRPServer": "https://brp-test-url.example.com/",
    "BSNMap": {
        "900221094": "999993653"
    },
    "AttributeMapping": {
        "city": "Persoon.Adres.Woonplaats",
        "fullname": "Persoon.Persoonsgegevens.Naam"
    }
}
```

