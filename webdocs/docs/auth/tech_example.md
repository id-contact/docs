---
id: tech_example
title: Authentication plugin sample interaction
sidebar_label: Sample interaction
slug: tech_example
---

Below is an example of an entire authentication interaction for a session involving the test authentication plugin as authentication plugin.

## Setup

For the authentication process, the entire process starts with a request from the core to setup an authentication session:
```http
POST /start_authentication HTTP/1.1
content-type: application/json
accept: */*
host: auth-test:8000
content-length: 136

{
    "attributes":   ["email"],
    "continuation": "http://comm-test.id-contact.test.tweede.golf/ui",
    "attr_url":     "http://comm-test:8000/auth_result"
}
```
Here, the core asked the authentication plugin to setup a session asking for the `email` attribute. It further instructs the authentication plugin to send the user to `http://comm-test.id-contact.test.tweede.golf/ui` after completing authentication, and send the resulting attributes to `http://comm-test:8000/auth_result`.

The authentication plugin internally sets up for this authentication session, and returns:
```http
HTTP/1.1 200 OK
content-type: application/json
server: Rocket
content-length: 193
date: Fri, 05 Mar 2021 07:34:06 GMT

{
    "client_url": "https://auth-test.id-contact.test.tweede.golf/browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZC1jb250YWN0LnRlc3QudHdlZWRlLmdvbGYvdWk=/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0"
}
```
This instructs the core that it needs to send the end-user to `https://auth-test.id-contact.test.tweede.golf/browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZC1jb250YWN0LnRlc3QudHdlZWRlLmdvbGYvdWk=/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0` in order to start the authentication process.

## Authentication proper

After the initial exchange with the core, the core completes setup of the entire ID Contact session, and then redirects the end-user to the authentication session. At this point, the end-users browser will load the `client_url` from the authentication plugin:
```http
GET /browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZC1jb250YWN0LnRlc3QudHdlZWRlLmdvbGYvdWk=/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0 HTTP/1.0
Host: auth-test:8000
Connection: close
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
sec-fetch-site: same-site
sec-fetch-mode: navigate
sec-fetch-user: ?1
sec-fetch-dest: document
referer: https://poc.id-contact.test.tweede.golf/
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.9
```

At this point, the authentication plugin can show any UI needed in the process of authenticating the user. Here, because we use the test authenticator, we don't need to do anything like that and can immediately complete the process of the authentication session. First, we redirect the user to the next step in the ID Contact session in our HTTP response:
```http
HTTP/1.0 303 See Other
location: http://comm-test.id-contact.test.tweede.golf/ui
server: Rocket
content-length: 0
date: Fri, 05 Mar 2021 07:34:06 GMT
```

Simultaneously, we also report the authentication session result to the `attr_url` provided during setup:
```http
POST /auth_result HTTP/1.1
content-type: application/json
accept: */*
host: comm-test:8000
content-length: 1228

{
    "status":"succes",
    "attributes":"eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAifQ.MPsMulGweRiFn-bGa8xC_MYal6Ozw93fjSv7FHCzGP2tViSC5zZNkbyUIl4f8FYBvoaN4t8QalpWVEdK3M-KyefTSW8YSmqFmastN_DEoISB4vPWTRrqT_xx3lM425dLYfIyMcosn9Tro8vLpJ-D74tkb-_WOZzv8mS63nQ5viCFURrapR1vTDZls8Qzx8DfywHCoFK4hwri8dZRQkPopLqp0ojQiAEyTnanGmRzjUM9wwrciNgG1b8V0plYhzB5MBpIscvVbeVqoKMfpBNBDJFRtgCbXrCbRj5g3ursIkflzbZAh5igSTCgNtgZ7TGPnoCmkf_VLBojx6SSN3Nl2g.oi6jthGyKogzcvdTW50byQ.GRoVEXg26eMKpMaek7ETHDgcF8aRl4icoKZCpUj69F9pl14dABpGwWKeoCveWhB6u8I4j1OhFPSDrBcbZwcXHI6bsgGnxzSWrgvDb9p5RtRrV9LCLGMPCjMHBWkEEQt4vRak_Qs6XCbB5QsRLG_EdUiNu9I2BDGh4WfpA_Q7xAwzGu-u6exhCXwQ9agaSSfqq8op8pRiqM5bBUgcyCBr_x_IslzZ3rTvUD98tCL6PJ2JYykO0K_NDq9jbt1U2yoRQiLixip6rX2Qy5ih8QNOYjiOIYy08A5JkbqlGRej-7DISIlqq0IiqfdxgWYDY0d2LFwbMy9RxskJ3pTWdToqpB515ROqqVKFRROMQISaUZlqbrZmWGuW--Nwhm-aqj2Eud5w3SKj_z4MeXCzzIqdRs0msY53QCS9v-3URX1RMW-P2YRjn9IDYHuRljutGU7hex40S4skHkAnciDeOz-2zzlXdesTOi4gc1yOjymy3oiIQ29eAZPFGqDnYZItI8564sN9iTWuMtZyYV52pdo2fY6aFU5289kJEJrtL4CKsSWr2QOpzbmXwA6aJA8AC68c9s65ci1T6aJQOmoboBE9kvudeo4_AYSR1bTn-GawUBQ-dVxmiE6K4P_1vSnstB9j.2KVp-bKtE3GrhX2UstY6LQ"
}
```
First, the line `"status":"succes"` reports that overall, the authentication session was completed succesfully. The JWT in the `attributes` field then contains the disclosed attributes. This consists of two layers. The outer layer, seen above, is a JWE containg another JWT as payload in the following manner:
```json
{
    "typ":"JWT",
    "cty":"JWT",
    "enc":"A128CBC-HS256",
    "alg":"RSA-OAEP"
}
.
{
    "njwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpZC1jb250YWN0LWF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVzIjp7ImVtYWlsIjoiYmxhIn19.uGaKC065Tdaj9C_GqLfUHxRCbhqU22BxuikrLqwuMUt5JHStC0J6R5KBCdpVvGl8-DBLURjJ1svwe7-uN9On5plQdFbiwx3fwMD2Q0jiM2FGaf-wzeqOGqUwa9V27lqDkrAV-QfzXm8rBx6Cjk-MTtqZzBDUA44TfCVHHnk2LJCywN9SuoMCrfW00ZsOJYDyVLAliFeT6dbrSATAiUYcFz7LHSp485oOR41iFw1da4C0xDHip0oK5FJT6HZ4iw5FsX9KvC-e-oYaIPVu1oMWWpnilig2Xg0PySfwP3raKt_LdUbuwjYFPh5xxZyRMEFfXHJzpRrnig6kxSywXjyIIw"
}
```
The inner JWS `njwt` contains the actual attributes:
```json
{
  "typ": "JWT",
  "alg": "RS256"
}
.
{
  "sub": "id-contact-attributes",
  "attributes": {
    "email": "bla"
  }
}
```

The receiver of the attributes acknowledges receipt of the message, but doesn't provide any further feedback.
```
HTTP/1.1 200 OK
server: Rocket
content-length: 0
date: Fri, 05 Mar 2021 07:34:06 GMT
```
