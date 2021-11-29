---
id: setup
title: Setup for local testing
sidebar_label: Local testing setup
slug: setup
---

This guide aims to provide a complete introduction to setting up a first ID Contact environment. It provides guidance on an initial setup and configuration for the core, an authentication plugin and a communication plugin.

The resulting setup can be used as a starting point for further experimentation with the ID Contact ecosystem. In particular, our use here of the test authentication and communication plugins makes this setup particularly well suited for as a starting point for a development environment for new ID Contact plugins.

## Design

As ID Contact is quite flexible, before we start setting up the various components we will first need to decide on what we want. In this tutorial we will make it our goal to set up a single flow, test_purpose, for which users need to reveal their test_attribute. We want to enable the test authentication plugin for this flow, as well as the test communication plugin, but won't focus on further plugins.

Thus, we will need to setup 3 components:
 - The ID Contact core.
 - The ID Contact authentication test plugin.
 - The ID Contact communication test plugin.

And configure these to work with the test_purpose purpose, and the test_attribute attribute. Furthermore, as all of these are http servers, we will need to assign them ports in order to avoid conflict. We will use the following assignment:
 - Core: port 8000
 - Authentication test plugin: 8001
 - Communication test plugin: 8002

## Key material

The authentication information exchanged between authentication and communication plugins is encrypted and signed. For this, we will need keys for the plugins to use to encrypt/decrypt and to sign/verify. These are just standard PEM encoded RSA public/private keypairs, and you can generate them yourself if you want using .e.g. openSSL.

However, for ease of reference we provide here an RSA keypair for testing:
```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5/wRrT2T4GGvuQYcWjLr
/lFe51sTV2FLd3GAaMiHN8Q/VT/XEhP/kZ6042l1Bj2VpZ2yMxv294JKwBCINc34
8VLYd+DfkMnJ4yX9LZHK2Wke6tCWBB9mYgGjMwCNdXczbl96x1/HevaTorvk91rz
Cvzw6vV08jtprAyN5aYMU4I0/cVJwi03bh/skraAB110mQSqi1QU/2z6Hkuf7+/x
/bACxviWCyPCd/wkXNpFhTcRlfFeyKcy0pwFx1OLCDJ1qY7oU+z1wcypeOHeiUSx
riSHlWaT24ke+J78GGVmnCZdu/MRuun5hvgaiWxnhIBmExJY6vRuMlwkbRqOft5Q
TQIDAQAB
-----END PUBLIC KEY-----
```
```
-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDn/BGtPZPgYa+5
BhxaMuv+UV7nWxNXYUt3cYBoyIc3xD9VP9cSE/+RnrTjaXUGPZWlnbIzG/b3gkrA
EIg1zfjxUth34N+QycnjJf0tkcrZaR7q0JYEH2ZiAaMzAI11dzNuX3rHX8d69pOi
u+T3WvMK/PDq9XTyO2msDI3lpgxTgjT9xUnCLTduH+yStoAHXXSZBKqLVBT/bPoe
S5/v7/H9sALG+JYLI8J3/CRc2kWFNxGV8V7IpzLSnAXHU4sIMnWpjuhT7PXBzKl4
4d6JRLGuJIeVZpPbiR74nvwYZWacJl278xG66fmG+BqJbGeEgGYTEljq9G4yXCRt
Go5+3lBNAgMBAAECggEARY9EsaCMLbS83wrhB37LWneFsHOTqhjHaypCaajvOp6C
qwo4b/hFIqHm9WWSrGtc6ssNOtwAwphz14Fdhlybb6j6tX9dKeoHui+S6c4Ud/pY
ReqDgPr1VR/OkqVwxS8X4dmJVCz5AHrdK+eRMUY5KCtOBfXRuixsdCVTiu+uNH99
QC3kID1mmOF3B0chOK4WPN4cCsQpfOvoJfPBcJOtyxUSLlQdJH+04s3gVA24nCJj
66+AnVkjgkyQ3q0Jugh1vo0ikrUW8uSLmg40sT5eYDN9jP6r5Gc8yDqsmYNVbLhU
pY8XR4gtzbtAXK8R2ISKNhOSuTv4SWFXVZiDIBkuIQKBgQD3qnZYyhGzAiSM7T/R
WS9KrQlzpRV5qSnEp2sPG/YF+SGAdgOaWOEUa3vbkCuLCTkoJhdTp67BZvv/657Q
2eK2khsYRs02Oq+4rYvdcAv/wS2vkMbg6CUp1w2/pwBvwFTXegr00k6IabXNcXBy
kAjMsZqVDSdQByrf80AlFyEsOQKBgQDvyoUDhLReeDNkbkPHL/EHD69Hgsc77Hm6
MEiLdNljTJLRUl+DuD3yKX1xVBaCLp9fMJ/mCrxtkldhW+i6JBHRQ7vdf11zNsRf
2Cud3Q97RMHTacCHhEQDGnYkOQNTRhk8L31N0XBKfUu0phSmVyTnu2lLWmYJ8hyO
yOEB19JstQKBgQC3oVw+WRTmdSBEnWREBKxb4hCv/ib+Hb8qYDew7DpuE1oTtWzW
dC/uxAMBuNOQMzZ93kBNdnbMT19pUXpfwC2o0IvmZBijrL+9Xm/lr7410zXchqvu
9jEX5Kv8/gYE1cYSPhsBiy1PV5HE0edeCg18N/M1sJsFa0sO4X0eAxhFgQKBgQC7
iQDkUooaBBn1ZsM9agIwSpUD8YTOGdDNy+tAnf9SSNXePXUT+CkCVm6UDnaYE8xy
zv2PFUBu1W/fZdkqkwEYT8gCoBS/AcstRkw+Z2AvQQPxyxhXJBto7e4NwEUYgI9F
4cI29SDEMR/fRbCKs0basVjVJPr+tkqdZP+MyHT6rQKBgQCT1YjY4F45Qn0Vl+sZ
HqwVHvPMwVsexcRTdC0evaX/09s0xscSACvFJh5Dm9gnuMHElBcpZFATIvFcbV5Y
MbJ/NNQiD63NEcL9VXwT96sMx2tnduOq4sYzu84kwPQ4ohxmPt/7xHU3L8SGqoec
Bs6neR/sZuHzNm8y/xtxj2ZAEw==
-----END PRIVATE KEY-----
```
**Note that, since the private key of this key pair is publicly known, this particular key pair should NEVER be used outside of testing/development environments.**

## Setting up the authentication test plugin

We start by setting up the authentication test plugin. First, we clone the auth-test repository into our working directory, and move to it:
```bash
git clone https://github.com/id-contact/auth-test
cd auth-test
```

Next, we will need to configure this plugin. For this, we create a config file `config.toml` in the auth-test directory.

We need to tell the plugin where it is located, and on which port we want it to listen:
```toml
[global]
server_url = "http://localhost:8001"
internal_url = "http://localhost:8001"
port = 8001
```
As per our design above, we set the port to 8001 to give space for the other two servers.

Then, we need to tell it about the attributes in our system, and what test values it should provide for them:
```toml
[global.attributes]
test_attribute = "test_attribute_value"
```
You can add aditional attribute tags here with their corresponding values.

Finally, the plugin needs to know which keys to use to encrypt and sign authentication results. For this, we will just use the example keys mentioned above.
```
[global.encryption_pubkey]
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

[global.signing_privkey]
type = "RSA"
key = """
-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDn/BGtPZPgYa+5
BhxaMuv+UV7nWxNXYUt3cYBoyIc3xD9VP9cSE/+RnrTjaXUGPZWlnbIzG/b3gkrA
EIg1zfjxUth34N+QycnjJf0tkcrZaR7q0JYEH2ZiAaMzAI11dzNuX3rHX8d69pOi
u+T3WvMK/PDq9XTyO2msDI3lpgxTgjT9xUnCLTduH+yStoAHXXSZBKqLVBT/bPoe
S5/v7/H9sALG+JYLI8J3/CRc2kWFNxGV8V7IpzLSnAXHU4sIMnWpjuhT7PXBzKl4
4d6JRLGuJIeVZpPbiR74nvwYZWacJl278xG66fmG+BqJbGeEgGYTEljq9G4yXCRt
Go5+3lBNAgMBAAECggEARY9EsaCMLbS83wrhB37LWneFsHOTqhjHaypCaajvOp6C
qwo4b/hFIqHm9WWSrGtc6ssNOtwAwphz14Fdhlybb6j6tX9dKeoHui+S6c4Ud/pY
ReqDgPr1VR/OkqVwxS8X4dmJVCz5AHrdK+eRMUY5KCtOBfXRuixsdCVTiu+uNH99
QC3kID1mmOF3B0chOK4WPN4cCsQpfOvoJfPBcJOtyxUSLlQdJH+04s3gVA24nCJj
66+AnVkjgkyQ3q0Jugh1vo0ikrUW8uSLmg40sT5eYDN9jP6r5Gc8yDqsmYNVbLhU
pY8XR4gtzbtAXK8R2ISKNhOSuTv4SWFXVZiDIBkuIQKBgQD3qnZYyhGzAiSM7T/R
WS9KrQlzpRV5qSnEp2sPG/YF+SGAdgOaWOEUa3vbkCuLCTkoJhdTp67BZvv/657Q
2eK2khsYRs02Oq+4rYvdcAv/wS2vkMbg6CUp1w2/pwBvwFTXegr00k6IabXNcXBy
kAjMsZqVDSdQByrf80AlFyEsOQKBgQDvyoUDhLReeDNkbkPHL/EHD69Hgsc77Hm6
MEiLdNljTJLRUl+DuD3yKX1xVBaCLp9fMJ/mCrxtkldhW+i6JBHRQ7vdf11zNsRf
2Cud3Q97RMHTacCHhEQDGnYkOQNTRhk8L31N0XBKfUu0phSmVyTnu2lLWmYJ8hyO
yOEB19JstQKBgQC3oVw+WRTmdSBEnWREBKxb4hCv/ib+Hb8qYDew7DpuE1oTtWzW
dC/uxAMBuNOQMzZ93kBNdnbMT19pUXpfwC2o0IvmZBijrL+9Xm/lr7410zXchqvu
9jEX5Kv8/gYE1cYSPhsBiy1PV5HE0edeCg18N/M1sJsFa0sO4X0eAxhFgQKBgQC7
iQDkUooaBBn1ZsM9agIwSpUD8YTOGdDNy+tAnf9SSNXePXUT+CkCVm6UDnaYE8xy
zv2PFUBu1W/fZdkqkwEYT8gCoBS/AcstRkw+Z2AvQQPxyxhXJBto7e4NwEUYgI9F
4cI29SDEMR/fRbCKs0basVjVJPr+tkqdZP+MyHT6rQKBgQCT1YjY4F45Qn0Vl+sZ
HqwVHvPMwVsexcRTdC0evaX/09s0xscSACvFJh5Dm9gnuMHElBcpZFATIvFcbV5Y
MbJ/NNQiD63NEcL9VXwT96sMx2tnduOq4sYzu84kwPQ4ohxmPt/7xHU3L8SGqoec
Bs6neR/sZuHzNm8y/xtxj2ZAEw==
-----END PRIVATE KEY-----
"""
```

Combined, this gives us the following for `config.toml`:
```toml
[global]
server_url = "http://localhost:8001"
internal_url = "http://localhost:8001"
port = 8001

[global.attributes]
test_attribute = "test_attribute_value"

[global.encryption_pubkey]
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

[global.signing_privkey]
type = "RSA"
key = """
-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDn/BGtPZPgYa+5
BhxaMuv+UV7nWxNXYUt3cYBoyIc3xD9VP9cSE/+RnrTjaXUGPZWlnbIzG/b3gkrA
EIg1zfjxUth34N+QycnjJf0tkcrZaR7q0JYEH2ZiAaMzAI11dzNuX3rHX8d69pOi
u+T3WvMK/PDq9XTyO2msDI3lpgxTgjT9xUnCLTduH+yStoAHXXSZBKqLVBT/bPoe
S5/v7/H9sALG+JYLI8J3/CRc2kWFNxGV8V7IpzLSnAXHU4sIMnWpjuhT7PXBzKl4
4d6JRLGuJIeVZpPbiR74nvwYZWacJl278xG66fmG+BqJbGeEgGYTEljq9G4yXCRt
Go5+3lBNAgMBAAECggEARY9EsaCMLbS83wrhB37LWneFsHOTqhjHaypCaajvOp6C
qwo4b/hFIqHm9WWSrGtc6ssNOtwAwphz14Fdhlybb6j6tX9dKeoHui+S6c4Ud/pY
ReqDgPr1VR/OkqVwxS8X4dmJVCz5AHrdK+eRMUY5KCtOBfXRuixsdCVTiu+uNH99
QC3kID1mmOF3B0chOK4WPN4cCsQpfOvoJfPBcJOtyxUSLlQdJH+04s3gVA24nCJj
66+AnVkjgkyQ3q0Jugh1vo0ikrUW8uSLmg40sT5eYDN9jP6r5Gc8yDqsmYNVbLhU
pY8XR4gtzbtAXK8R2ISKNhOSuTv4SWFXVZiDIBkuIQKBgQD3qnZYyhGzAiSM7T/R
WS9KrQlzpRV5qSnEp2sPG/YF+SGAdgOaWOEUa3vbkCuLCTkoJhdTp67BZvv/657Q
2eK2khsYRs02Oq+4rYvdcAv/wS2vkMbg6CUp1w2/pwBvwFTXegr00k6IabXNcXBy
kAjMsZqVDSdQByrf80AlFyEsOQKBgQDvyoUDhLReeDNkbkPHL/EHD69Hgsc77Hm6
MEiLdNljTJLRUl+DuD3yKX1xVBaCLp9fMJ/mCrxtkldhW+i6JBHRQ7vdf11zNsRf
2Cud3Q97RMHTacCHhEQDGnYkOQNTRhk8L31N0XBKfUu0phSmVyTnu2lLWmYJ8hyO
yOEB19JstQKBgQC3oVw+WRTmdSBEnWREBKxb4hCv/ib+Hb8qYDew7DpuE1oTtWzW
dC/uxAMBuNOQMzZ93kBNdnbMT19pUXpfwC2o0IvmZBijrL+9Xm/lr7410zXchqvu
9jEX5Kv8/gYE1cYSPhsBiy1PV5HE0edeCg18N/M1sJsFa0sO4X0eAxhFgQKBgQC7
iQDkUooaBBn1ZsM9agIwSpUD8YTOGdDNy+tAnf9SSNXePXUT+CkCVm6UDnaYE8xy
zv2PFUBu1W/fZdkqkwEYT8gCoBS/AcstRkw+Z2AvQQPxyxhXJBto7e4NwEUYgI9F
4cI29SDEMR/fRbCKs0basVjVJPr+tkqdZP+MyHT6rQKBgQCT1YjY4F45Qn0Vl+sZ
HqwVHvPMwVsexcRTdC0evaX/09s0xscSACvFJh5Dm9gnuMHElBcpZFATIvFcbV5Y
MbJ/NNQiD63NEcL9VXwT96sMx2tnduOq4sYzu84kwPQ4ohxmPt/7xHU3L8SGqoec
Bs6neR/sZuHzNm8y/xtxj2ZAEw==
-----END PRIVATE KEY-----
"""
```

We are now ready to start the plugin with
```bash
ROCKET_CONFIG=config.toml cargo run
```
which will build and then run the plugin.

## Setting up the communication test plugin

In a second terminal in our main directory, clone and enter the directory of the test communication plugin:
```bash
git clone https://github.com/id-contact/comm-test
cd comm-test
```

This plugin also needs configuration, so we make a config file `config.toml`, this time in the comm-test directory.

We again start with the basics: which port the server should use and where it is:
```toml
[global]
server_url = "http://localhost:8002"
internal_url = "http://localhost:8002"
port = 8002
```
As per our design above, we set the port to 8002 to give space for the other two servers.

The only other information the communication test plugin needs are the keys to decrypt and verify authentication results. Again, using the example keys from above, we get
```
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

[global.decryption_privkey]
type = "RSA"
key = """
-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDn/BGtPZPgYa+5
BhxaMuv+UV7nWxNXYUt3cYBoyIc3xD9VP9cSE/+RnrTjaXUGPZWlnbIzG/b3gkrA
EIg1zfjxUth34N+QycnjJf0tkcrZaR7q0JYEH2ZiAaMzAI11dzNuX3rHX8d69pOi
u+T3WvMK/PDq9XTyO2msDI3lpgxTgjT9xUnCLTduH+yStoAHXXSZBKqLVBT/bPoe
S5/v7/H9sALG+JYLI8J3/CRc2kWFNxGV8V7IpzLSnAXHU4sIMnWpjuhT7PXBzKl4
4d6JRLGuJIeVZpPbiR74nvwYZWacJl278xG66fmG+BqJbGeEgGYTEljq9G4yXCRt
Go5+3lBNAgMBAAECggEARY9EsaCMLbS83wrhB37LWneFsHOTqhjHaypCaajvOp6C
qwo4b/hFIqHm9WWSrGtc6ssNOtwAwphz14Fdhlybb6j6tX9dKeoHui+S6c4Ud/pY
ReqDgPr1VR/OkqVwxS8X4dmJVCz5AHrdK+eRMUY5KCtOBfXRuixsdCVTiu+uNH99
QC3kID1mmOF3B0chOK4WPN4cCsQpfOvoJfPBcJOtyxUSLlQdJH+04s3gVA24nCJj
66+AnVkjgkyQ3q0Jugh1vo0ikrUW8uSLmg40sT5eYDN9jP6r5Gc8yDqsmYNVbLhU
pY8XR4gtzbtAXK8R2ISKNhOSuTv4SWFXVZiDIBkuIQKBgQD3qnZYyhGzAiSM7T/R
WS9KrQlzpRV5qSnEp2sPG/YF+SGAdgOaWOEUa3vbkCuLCTkoJhdTp67BZvv/657Q
2eK2khsYRs02Oq+4rYvdcAv/wS2vkMbg6CUp1w2/pwBvwFTXegr00k6IabXNcXBy
kAjMsZqVDSdQByrf80AlFyEsOQKBgQDvyoUDhLReeDNkbkPHL/EHD69Hgsc77Hm6
MEiLdNljTJLRUl+DuD3yKX1xVBaCLp9fMJ/mCrxtkldhW+i6JBHRQ7vdf11zNsRf
2Cud3Q97RMHTacCHhEQDGnYkOQNTRhk8L31N0XBKfUu0phSmVyTnu2lLWmYJ8hyO
yOEB19JstQKBgQC3oVw+WRTmdSBEnWREBKxb4hCv/ib+Hb8qYDew7DpuE1oTtWzW
dC/uxAMBuNOQMzZ93kBNdnbMT19pUXpfwC2o0IvmZBijrL+9Xm/lr7410zXchqvu
9jEX5Kv8/gYE1cYSPhsBiy1PV5HE0edeCg18N/M1sJsFa0sO4X0eAxhFgQKBgQC7
iQDkUooaBBn1ZsM9agIwSpUD8YTOGdDNy+tAnf9SSNXePXUT+CkCVm6UDnaYE8xy
zv2PFUBu1W/fZdkqkwEYT8gCoBS/AcstRkw+Z2AvQQPxyxhXJBto7e4NwEUYgI9F
4cI29SDEMR/fRbCKs0basVjVJPr+tkqdZP+MyHT6rQKBgQCT1YjY4F45Qn0Vl+sZ
HqwVHvPMwVsexcRTdC0evaX/09s0xscSACvFJh5Dm9gnuMHElBcpZFATIvFcbV5Y
MbJ/NNQiD63NEcL9VXwT96sMx2tnduOq4sYzu84kwPQ4ohxmPt/7xHU3L8SGqoec
Bs6neR/sZuHzNm8y/xtxj2ZAEw==
-----END PRIVATE KEY-----
"""
```

Combined, this gives us the following for `config.toml`:
```toml
[global]
server_url = "http://localhost:8002"
internal_url = "http://localhost:8002"
port = 8002

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

[global.decryption_privkey]
type = "RSA"
key = """
-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDn/BGtPZPgYa+5
BhxaMuv+UV7nWxNXYUt3cYBoyIc3xD9VP9cSE/+RnrTjaXUGPZWlnbIzG/b3gkrA
EIg1zfjxUth34N+QycnjJf0tkcrZaR7q0JYEH2ZiAaMzAI11dzNuX3rHX8d69pOi
u+T3WvMK/PDq9XTyO2msDI3lpgxTgjT9xUnCLTduH+yStoAHXXSZBKqLVBT/bPoe
S5/v7/H9sALG+JYLI8J3/CRc2kWFNxGV8V7IpzLSnAXHU4sIMnWpjuhT7PXBzKl4
4d6JRLGuJIeVZpPbiR74nvwYZWacJl278xG66fmG+BqJbGeEgGYTEljq9G4yXCRt
Go5+3lBNAgMBAAECggEARY9EsaCMLbS83wrhB37LWneFsHOTqhjHaypCaajvOp6C
qwo4b/hFIqHm9WWSrGtc6ssNOtwAwphz14Fdhlybb6j6tX9dKeoHui+S6c4Ud/pY
ReqDgPr1VR/OkqVwxS8X4dmJVCz5AHrdK+eRMUY5KCtOBfXRuixsdCVTiu+uNH99
QC3kID1mmOF3B0chOK4WPN4cCsQpfOvoJfPBcJOtyxUSLlQdJH+04s3gVA24nCJj
66+AnVkjgkyQ3q0Jugh1vo0ikrUW8uSLmg40sT5eYDN9jP6r5Gc8yDqsmYNVbLhU
pY8XR4gtzbtAXK8R2ISKNhOSuTv4SWFXVZiDIBkuIQKBgQD3qnZYyhGzAiSM7T/R
WS9KrQlzpRV5qSnEp2sPG/YF+SGAdgOaWOEUa3vbkCuLCTkoJhdTp67BZvv/657Q
2eK2khsYRs02Oq+4rYvdcAv/wS2vkMbg6CUp1w2/pwBvwFTXegr00k6IabXNcXBy
kAjMsZqVDSdQByrf80AlFyEsOQKBgQDvyoUDhLReeDNkbkPHL/EHD69Hgsc77Hm6
MEiLdNljTJLRUl+DuD3yKX1xVBaCLp9fMJ/mCrxtkldhW+i6JBHRQ7vdf11zNsRf
2Cud3Q97RMHTacCHhEQDGnYkOQNTRhk8L31N0XBKfUu0phSmVyTnu2lLWmYJ8hyO
yOEB19JstQKBgQC3oVw+WRTmdSBEnWREBKxb4hCv/ib+Hb8qYDew7DpuE1oTtWzW
dC/uxAMBuNOQMzZ93kBNdnbMT19pUXpfwC2o0IvmZBijrL+9Xm/lr7410zXchqvu
9jEX5Kv8/gYE1cYSPhsBiy1PV5HE0edeCg18N/M1sJsFa0sO4X0eAxhFgQKBgQC7
iQDkUooaBBn1ZsM9agIwSpUD8YTOGdDNy+tAnf9SSNXePXUT+CkCVm6UDnaYE8xy
zv2PFUBu1W/fZdkqkwEYT8gCoBS/AcstRkw+Z2AvQQPxyxhXJBto7e4NwEUYgI9F
4cI29SDEMR/fRbCKs0basVjVJPr+tkqdZP+MyHT6rQKBgQCT1YjY4F45Qn0Vl+sZ
HqwVHvPMwVsexcRTdC0evaX/09s0xscSACvFJh5Dm9gnuMHElBcpZFATIvFcbV5Y
MbJ/NNQiD63NEcL9VXwT96sMx2tnduOq4sYzu84kwPQ4ohxmPt/7xHU3L8SGqoec
Bs6neR/sZuHzNm8y/xtxj2ZAEw==
-----END PRIVATE KEY-----
"""
```

We are now ready to start the plugin with
```bash
ROCKET_CONFIG=config.toml cargo run
```
which will build and then run the plugin.

## Setting up the core

Finally, in a third terminal, clone and enter the core's directory:
```bash
git clone https://github.com/id-contact/core
cd core
```

The core already has a complete `config.toml`, but it is not suitable for our needs, so we will replace it.

First, we again tell the server what port to use and where it is.
```toml
[global]
server_url = "http://localhost:8000"
internal_url = "http://localhost:8000"
port = 8000
```

Then, we configure a `ui_tel_url`, which points to a generic UI for rendering telephone numbers along with authentication codes for use in telephony-based communication plugins. We're not using such a plugin for now, so we pass an empty value:
```toml
ui_tel_url = ""
```

Next, we need to give it an internal secret. This is used to temporarily sign session data so that end users cannot manipulate that. Here we just use a simple test value.
```toml
internal_secret = "sample_secret_12345678901234567890"
```

Next, we need to tell the core about our authenticaton method:
```toml
[[global.auth_methods]]
tag = "auth_test"
name = "Test Authenticator"
image_path = ""
start = "http://localhost:8001"
```

and our communication method:
```
[[global.comm_methods]]
tag = "comm_test"
name = "Test Communicator"
image_path = ""
start = "http://localhost:8002"

```
If we wanted to add more of these, we would just repeat with more plugin blocks. We leave the image paths empty here as we won't need them for our testing.

Finally, we need to specify our purpose and how its flow should look:
```toml
[[global.purposes]]
tag = "test_purpose"
attributes = [ "test_attribute" ]
allowed_auth = [ "auth_test" ]
allowed_comm = [ "comm_test" ]
```

Combined, this gives as content of `config.toml`:
```toml
[global]
server_url = "http://localhost:8000"
internal_url = "http://localhost:8000"
port = 8000
ui_tel_url = ""
internal_secret = "sample_secret_12345678901234567890"

[[global.auth_methods]]
tag = "auth_test"
name = "Test Authenticator"
image_path = ""
start = "http://localhost:8001"

[[global.comm_methods]]
tag = "comm_test"
name = "Test Communicator"
image_path = ""
start = "http://localhost:8002"

[[global.purposes]]
tag = "test_purpose"
attributes = [ "test_attribute" ]
allowed_auth = [ "auth_test" ]
allowed_comm = [ "comm_test" ]
```

We are now ready to start the core with
```bash
ROCKET_CONFIG=config.toml cargo run
```
which will build and then run the core with our above configuration.

## Testing

We can now test our setup by opening a 4th terminal window and using [httpie](https://httpie.io/) to make a test request to the core with the intent to start a session with the testing plugins for our test_purpose:
```bash
http POST http://localhost:8000/start purpose=test_purpose auth_method=auth_test comm_method=comm_test
```

This will show our server response, containing the client url:
```http
HTTP/1.1 200 OK
content-length: 149
content-type: application/json
date: Tue, 13 Apr 2021 12:48:40 GMT
server: Rocket

{
    "client_url": "http://localhost:8001/browser/WyJ0ZXN0X2F0dHJpYnV0ZSJd/aHR0cDovL2xvY2FsaG9zdDo4MDAyL3Vp/aHR0cDovL2xvY2FsaG9zdDo4MDAyL2F1dGhfcmVzdWx0"
}

```

Opening this url in a browser will result in a redirect, which lands you on the test plugin ui:

![Browser showing communication test plugin ui](/img/setup_complete.png)

Meanwhile, the communication test plugin will have logged the decoded authentication result, which will look like
```
Decoded: AuthResult { status: Succes, attributes: Some({"test_attribute": "test_attribute_value"}), session_url: None }
```

Congratulations! Seeing the above indicates that your setup now works correctly. You can experiment further by looking at the configuration options described in the [authentication test plugin](configuration/auth_test.md) and [communication test plugin](configuration/comm_test.md) documentation.
