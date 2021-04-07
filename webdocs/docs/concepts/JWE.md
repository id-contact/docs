---
id: jwt
title: JWTs
sidebar_label: JWTs
slug: jwt
---

In ID-Contact, we use JSON Web Tokens (JWT) to communicate attributes between the various components. This allows passing of attributes and attribute values through components that aren't necessarily trusted.

## Introduction to JWTs, JWEs and JWSs

Before we go into how JWTs are used in ID-Contact, it is important to go over what JWTs are, and what the various names for them mean. First, note that JWTs come in two flavours: JSON Web Encryption (JWE) and JSON Web Signature (JWS). Both are JWTs, but each focuses on a different security goal.

### JWEs

A JWE is a JSON Web Token whose actual contents are encrypted. Its primary goal is to hide the actual content of the token from unauthorized parties. In other words, JWEs ensure confidentiality.

### JWSs

A JWS is a JSON Web Token whose contents are signed. It's primary goal is to ensure that the content of the token cannot be altered. In other words, JWSs ensure authenticity.

## JWTs in ID-Contact

In ID-Contact, we use JWTs to provide authenticity and confidentiality during transmission of authentication results. At it's core, this JWT is intended to transmit the claims:
```json
"status":     "succes",
"attributes": {
    "attr_1": "attr_value_1",
    "attr_2": "attr_value_2"
}
```
with, optionally, also a session URL:
```json
"session_url":"http://example.com"
```

In the first layer, this claim is wrapped in a JWS to provide authenticity. This gives a total object
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
which, encoded and signed, becomes the token
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpZC1jb250YWN0LWF0dHJpYnV0ZXMiLCJzdGF0dXMiOiJzdWNjZXMiLCJhdHRyaWJ1dGVzIjp7ImVtYWlsIjoiYmxhIn0sImlhdCI6MTYxNTg3OTgwMCwiZXhwIjoxNjE1ODgwMTAwfQ.T4VliaytEhlf2PwOiKL0GY4IcmXd64A8Gl2P9w6Tl1mQzzAqnF8TV7IjrUSu3tvs1hAS3gR-WqAhxSKzv0WuzrewXv_uvkdabJ4HTTRsALbUk13jt1C4A5wCR-3tP4H6sV5M5ODdT83wFb1_huoU_GtnXCVdQwmQMtO5wteMA_XOHEv6ExCaBKPr8NQ6Txd5SHsUG48gZfWmSDSYB9mzD99CdfEQUxebvQ9x3hUQffRsIsE6MqNakD8h0W8qlabnPxZ2fe7Tn8AlZzTFNu3EW35JdvENJQ2r71QxJOdEVHxoBREBlFGpCAjXH1x6aRWi_GfUD8s5zEkB_xA1_InesQ
```

To also achieve confidentiality, we make this the payload of a JWE:
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
which, encoded and encrypted, results in the final JWT that is exchanged:
```
eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAifQ.j9ANvlSvi8AjqQ2NjX0OpqZvmL5pG4kH8O6BEtoui4KukDn2nIfgiGNV7fR3rmWrvZJ2E5qOoNQy6TMYsQYvdA4gdQkQd8VqkXIHGH0AFTBDnTtAVPuAc9iTFiJ5KZzUd_kTDkhrIyX4aWGjhwR4jk7gGdTlXMnR-tK2K9n5C6XTiuM-i-D39lSpsujQmkHzkmGkoqpNRYpulEUphLoov9U0C1yCHO0ZGR1SeWIM0STyh6H0cUPZEWneNOQsVeWGGDAOe1l7EHznr2CP8i_lXCIiSj4hJ8bB5ZxjbOeTYj8XMt7SpTTBAHuFerO6SqCLXa89rHymNgIA12itxrNDAg.BsX5IzSKDzvKz36VOs74wQ.R89gy8vBW0rwslJblj4uQYV-3eP9N_aOxeE23rxA44uxDFF-Q0VyFv-G1TWHVnhJvsw8qoX8JaG8IXr4VK_m7TbJmL6KMA2-_BD8kO-DHQJc4_d6sS-BZ4YYuPjJnSuAoN7znwFdiyyjdq34r8drOBnL2rroPRR62_QkXc4LZBYAWgRQNLoaZmUVsnIFekhSo2wPoODpTP5AJOzfbHXMOMThnW86Mgyc6eM2kvojjnTqsnL3Wt2NZS0ubfzJ8C5nYuGFnfaLUoLUhnYnNGksmInX_2Vb92Ddn5lkOROVaoE-31pZaKffkCyjSks9vpZ-bZPnTvBZfZ6eMK2G1oyeuL4awIJNXI0aR0pW7HREhm6S6nsp7HANtPnUfy2ZdAmTTKP8SSoXVRQHkEZODgGq38rBD2OpjFwQepmqY-Ie5cHAWXw-k3pnnxon45TUXrJh3x3MUdPETSHEoUtpzbueOXtqXjeHtVK8OjU7K25qc7TdcpFtMdo5uZ22KcNVXBjZvxXEigzrumUgOcc8Z5oHo7bujjvgWwuZNv4TppJs2Q6YVb-_AaKWM02WhCDQoMiiaGBbaV-2oifAmzkfw-14DOkzJ-eoZl3JLn7IP0rST2pS_iLztl_QQCynMrN6r0ipm8-XCQU2pOwLGlNOd6_usy0vy1zhck2UQVECz4ZoIJ5WwSdmP6-Iwn21vsxNm6_FFrdYIt7Buu8JGMLLBEfzSg.hCcQGm2i-px5kW2UzPhmkQ
```
