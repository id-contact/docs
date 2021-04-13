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
content-length: 135

{
    "attributes":   ["email"],
    "continuation": "http://comm-test.idcontact.test.tweede.golf/ui",
    "attr_url":     "http://comm-test:8000/auth_result"
}
```
Here, the core asked the authentication plugin to setup a session asking for the `email` attribute. It further instructs the authentication plugin to send the user to `http://comm-test.id-contact.test.tweede.golf/ui` after completing authentication, and send the resulting attributes to `http://comm-test:8000/auth_result`.

The authentication plugin internally sets up for this authentication session, and returns:
```http
HTTP/1.1 200 OK
content-type: application/json
server: Rocket
content-length: 192
date: Tue, 16 Mar 2021 07:30:00 GMT

{
    "client_url": "https://auth-test.idcontact.test.tweede.golf/browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZGNvbnRhY3QudGVzdC50d2VlZGUuZ29sZi91aQ==/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0"
}
```
This instructs the core that it needs to send the end-user to `https://auth-test.id-contact.test.tweede.golf/browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZC1jb250YWN0LnRlc3QudHdlZWRlLmdvbGYvdWk=/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0` in order to start the authentication process.

## Authentication proper

After the initial exchange with the core, the core completes setup of the entire ID Contact session, and then redirects the end-user to the authentication session. At this point, the end-users browser will load the `client_url` from the authentication plugin:
```http
GET /browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZGNvbnRhY3QudGVzdC50d2VlZGUuZ29sZi91aQ==/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0 HTTP/1.0
Host: auth-test:8000
Connection: close
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
sec-fetch-site: same-site
sec-fetch-mode: navigate
sec-fetch-user: ?1
sec-fetch-dest: document
referer: https://poc.idcontact.test.tweede.golf/
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.9
```

At this point, the authentication plugin can show any UI needed in the process of authenticating the user. Here, because we use the test authenticator, we don't need to do anything like that and can immediately complete the process of the authentication session. First, we redirect the user to the next step in the ID Contact session in our HTTP response:
```http
HTTP/1.0 303 See Other
location: http://comm-test.idcontact.test.tweede.golf/ui
server: Rocket
content-length: 0
date: Tue, 16 Mar 2021 07:30:00 GMT
```

Simultaneously, we also report the authentication session result to the `attr_url` provided during setup:
```http
POST /auth_result HTTP/1.1
content-type: application/jwt
accept: */*
host: comm-test:8000
content-length: 1202

eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAifQ.j9ANvlSvi8AjqQ2NjX0OpqZvmL5pG4kH8O6BEtoui4KukDn2nIfgiGNV7fR3rmWrvZJ2E5qOoNQy6TMYsQYvdA4gdQkQd8VqkXIHGH0AFTBDnTtAVPuAc9iTFiJ5KZzUd_kTDkhrIyX4aWGjhwR4jk7gGdTlXMnR-tK2K9n5C6XTiuM-i-D39lSpsujQmkHzkmGkoqpNRYpulEUphLoov9U0C1yCHO0ZGR1SeWIM0STyh6H0cUPZEWneNOQsVeWGGDAOe1l7EHznr2CP8i_lXCIiSj4hJ8bB5ZxjbOeTYj8XMt7SpTTBAHuFerO6SqCLXa89rHymNgIA12itxrNDAg.BsX5IzSKDzvKz36VOs74wQ.R89gy8vBW0rwslJblj4uQYV-3eP9N_aOxeE23rxA44uxDFF-Q0VyFv-G1TWHVnhJvsw8qoX8JaG8IXr4VK_m7TbJmL6KMA2-_BD8kO-DHQJc4_d6sS-BZ4YYuPjJnSuAoN7znwFdiyyjdq34r8drOBnL2rroPRR62_QkXc4LZBYAWgRQNLoaZmUVsnIFekhSo2wPoODpTP5AJOzfbHXMOMThnW86Mgyc6eM2kvojjnTqsnL3Wt2NZS0ubfzJ8C5nYuGFnfaLUoLUhnYnNGksmInX_2Vb92Ddn5lkOROVaoE-31pZaKffkCyjSks9vpZ-bZPnTvBZfZ6eMK2G1oyeuL4awIJNXI0aR0pW7HREhm6S6nsp7HANtPnUfy2ZdAmTTKP8SSoXVRQHkEZODgGq38rBD2OpjFwQepmqY-Ie5cHAWXw-k3pnnxon45TUXrJh3x3MUdPETSHEoUtpzbueOXtqXjeHtVK8OjU7K25qc7TdcpFtMdo5uZ22KcNVXBjZvxXEigzrumUgOcc8Z5oHo7bujjvgWwuZNv4TppJs2Q6YVb-_AaKWM02WhCDQoMiiaGBbaV-2oifAmzkfw-14DOkzJ-eoZl3JLn7IP0rST2pS_iLztl_QQCynMrN6r0ipm8-XCQU2pOwLGlNOd6_usy0vy1zhck2UQVECz4ZoIJ5WwSdmP6-Iwn21vsxNm6_FFrdYIt7Buu8JGMLLBEfzSg.hCcQGm2i-px5kW2UzPhmkQ
```
The content here is a JWT containing the authentication result. This consists of two layers. The outer layer, seen above, is a JWE containing another JWT as payload in the following manner:
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

The receiver of the attributes acknowledges receipt of the message, but doesn't provide any further feedback.
```
HTTP/1.1 200 OK
server: Rocket
content-length: 0
date: Tue, 16 Mar 2021 07:30:00 GMT
```
