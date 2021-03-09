---
id: tech_example
title: Communication plugin sample interaction
sidebar_label: Sample interaction
slug: tech_example
---

Below is an example of an entire communication interaction for a session involving the test communication plugin as communication plugin.

## Setup

For our communication plugin, a session starts with a request from the ID-Contact core to setup a communication session:
```http
POST /start_communication HTTP/1.1
content-type: application/json
accept: */*
host: comm-test:8000
content-length: 25

{
    "purpose":"report_move"
}
```
Here, the core indicates to us that it wants to setup a session for the `report_move` purpose, and that it does not yet have any attributes for this session. After some setup, the communication plugin responds:
```http
HTTP/1.1 200 OK
content-type: application/json
server: Rocket
content-length: 111
date: Fri, 05 Mar 2021 07:34:06 GMT

{
    "client_url":"http://comm-test.id-contact.test.tweede.golf/ui",
    "attr_url":"http://comm-test:8000/auth_result"
}
```
This response tells the core that, once ready, the end user needs to be sent to `http://comm-test.id-contact.test.tweede.golf/ui` to initiate the actual communication. Furthermore, we tell the core that we want to receive attributes separately on the internal `http://comm-test:8000/auth_result` url. For an actual communication plugin, you may want to include some form of session token or state allowing you to correlate these URLs to this request. As our test communication plugin does no correlation, that is not done here.

## Initiation of communication

After setup, the communication plugin has no further jobs until the client gets redirected to it:
```http
GET /ui HTTP/1.0
Host: comm-test:8000
Connection: close
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
sec-fetch-site: cross-site
sec-fetch-mode: navigate
sec-fetch-user: ?1
sec-fetch-dest: document
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.9
```
At this point, we can take control of the end-users experience, and provide it with the communication UI needed:
```http
HTTP/1.0 200 OK
content-type: text/plain; charset=utf-8
server: Rocket
content-length: 23
date: Fri, 05 Mar 2021 07:34:06 GMT

Communication plugin UI
```

## Authentication result reception

Simultaneously, we also receive authentication session result to the `attr_url` provided during setup:
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
