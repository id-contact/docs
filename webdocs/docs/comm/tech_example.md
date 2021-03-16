---
id: tech_example
title: Communication plugin sample interaction
sidebar_label: Sample interaction
slug: tech_example
---

Below is an example of an entire communication interaction for a session involving the test communication plugin as communication plugin.

## Setup

For our communication plugin, a session starts with a request from the ID Contact core to setup a communication session:
```http
POST /start_communication HTTP/1.1
content-type: application/json
accept: */*
host: comm-test:8000
content-length: 25

{
    "purpose": "report_move"
}
```
Here, the core indicates to us that it wants to setup a session for the `report_move` purpose, and that it does not yet have any attributes for this session. After some setup, the communication plugin responds:
```http
HTTP/1.1 200 OK
content-type: application/json
server: Rocket
content-length: 110
date: Tue, 16 Mar 2021 07:30:00 GMT

{
    "client_url": "http://comm-test.idcontact.test.tweede.golf/ui",
    "attr_url":   "http://comm-test:8000/auth_result"
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
user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36
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
date: Tue, 16 Mar 2021 07:30:00 GMT

Communication plugin UI
```

## Authentication result reception

Simultaneously, we also receive authentication session result to the `attr_url` provided during setup:
```http
POST /auth_result HTTP/1.1
content-type: application/jwt
accept: */*
host: comm-test:8000
content-length: 1202

eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAifQ.j9ANvlSvi8AjqQ2NjX0OpqZvmL5pG4kH8O6BEtoui4KukDn2nIfgiGNV7fR3rmWrvZJ2E5qOoNQy6TMYsQYvdA4gdQkQd8VqkXIHGH0AFTBDnTtAVPuAc9iTFiJ5KZzUd_kTDkhrIyX4aWGjhwR4jk7gGdTlXMnR-tK2K9n5C6XTiuM-i-D39lSpsujQmkHzkmGkoqpNRYpulEUphLoov9U0C1yCHO0ZGR1SeWIM0STyh6H0cUPZEWneNOQsVeWGGDAOe1l7EHznr2CP8i_lXCIiSj4hJ8bB5ZxjbOeTYj8XMt7SpTTBAHuFerO6SqCLXa89rHymNgIA12itxrNDAg.BsX5IzSKDzvKz36VOs74wQ.R89gy8vBW0rwslJblj4uQYV-3eP9N_aOxeE23rxA44uxDFF-Q0VyFv-G1TWHVnhJvsw8qoX8JaG8IXr4VK_m7TbJmL6KMA2-_BD8kO-DHQJc4_d6sS-BZ4YYuPjJnSuAoN7znwFdiyyjdq34r8drOBnL2rroPRR62_QkXc4LZBYAWgRQNLoaZmUVsnIFekhSo2wPoODpTP5AJOzfbHXMOMThnW86Mgyc6eM2kvojjnTqsnL3Wt2NZS0ubfzJ8C5nYuGFnfaLUoLUhnYnNGksmInX_2Vb92Ddn5lkOROVaoE-31pZaKffkCyjSks9vpZ-bZPnTvBZfZ6eMK2G1oyeuL4awIJNXI0aR0pW7HREhm6S6nsp7HANtPnUfy2ZdAmTTKP8SSoXVRQHkEZODgGq38rBD2OpjFwQepmqY-Ie5cHAWXw-k3pnnxon45TUXrJh3x3MUdPETSHEoUtpzbueOXtqXjeHtVK8OjU7K25qc7TdcpFtMdo5uZ22KcNVXBjZvxXEigzrumUgOcc8Z5oHo7bujjvgWwuZNv4TppJs2Q6YVb-_AaKWM02WhCDQoMiiaGBbaV-2oifAmzkfw-14DOkzJ-eoZl3JLn7IP0rST2pS_iLztl_QQCynMrN6r0ipm8-XCQU2pOwLGlNOd6_usy0vy1zhck2UQVECz4ZoIJ5WwSdmP6-Iwn21vsxNm6_FFrdYIt7Buu8JGMLLBEfzSg.hCcQGm2i-px5kW2UzPhmkQ
```
The content here is a JWT containing the authentication result. This consists of two layers. The outer layer, seen above, is a JWE containg another JWT as payload in the following manner:
```json
{
    "typ": "JWT",
    "cty": "JWT",
    "enc": "A128CBC-HS256",
    "alg": "RSA-OAEP"
}
.
{
    "njwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpZC1jb250YWN0LWF0dHJpYnV0ZXMiLCJzdGF0dXMiOiJzdWNjZXMiLCJhdHRyaWJ1dGVzIjp7ImVtYWlsIjoiYmxhIn0sImlhdCI6MTYxNTg3OTgwMCwiZXhwIjoxNjE1ODgwMTAwfQ.T4VliaytEhlf2PwOiKL0GY4IcmXd64A8Gl2P9w6Tl1mQzzAqnF8TV7IjrUSu3tvs1hAS3gR-WqAhxSKzv0WuzrewXv_uvkdabJ4HTTRsALbUk13jt1C4A5wCR-3tP4H6sV5M5ODdT83wFb1_huoU_GtnXCVdQwmQMtO5wteMA_XOHEv6ExCaBKPr8NQ6Txd5SHsUG48gZfWmSDSYB9mzD99CdfEQUxebvQ9x3hUQffRsIsE6MqNakD8h0W8qlabnPxZ2fe7Tn8AlZzTFNu3EW35JdvENJQ2r71QxJOdEVHxoBREBlFGpCAjXH1x6aRWi_GfUD8s5zEkB_xA1_InesQ"
}
```
The inner JWS `njwt` contains the actual authentication result:
```json
{
    "typ": "JWT",
    "alg": "RS256"
}
.
{
    "sub":"id-contact-attributes",
    "status":"succes",
    "attributes": {
        "email": "bla"
    },
    "iat": 1615879800,
    "exp": 1615880100
}
```
