---
id: jwt
title: JWTs
sidebar_label: JWTs
slug: jwt
---

In ID-Contact, we use JSON Web Tokens (JWT) to communicate attributes between the various components. This allows passing of attributes and attribute values through components that aren't neccessarily trusted.

## Introduction to JWTs, JWEs and JWSs

Before we go into how JWTs are used in ID-Contact, it is important to go over what JWTs are, and what the various names for them mean. First, note that JWTs come in two flavors: JSON Web Encryption (JWE) and JSON Web Signature (JWS). Both are JWTs, but each focusses on a different security goal.

### JWEs

A JWE is a JSON Web Token whose actual contents are encrypted. It's primary goal is to hide the actual content of the token from unauthorized parties. In other words, JWEs ensure confidentiality.

### JWSs

A JWS is a JSON Web Token whose contents are signed. It's primary goal is to ensure that the content of the token cannot be altered. In other words, JWSs ensure authenticity.

## JWTs in ID-Contact

In ID-Contact, we use JWTs to provide authenticity and confidentiality during transmission of attribute values. At it's core, this JWT is intended to transmit the claim:
```json
"attributes": {
    "attr_1": "attr_value_1",
    "attr_2": "attr_value_2"
}
```

In the first layer, this claim is wrapped in a JWS to provide authenticity. This gives a total object
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
which, encoded and signed, becomes the token
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpZC1jb250YWN0LWF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVzIjp7ImVtYWlsIjoiYmxhIn19.uGaKC065Tdaj9C_GqLfUHxRCbhqU22BxuikrLqwuMUt5JHStC0J6R5KBCdpVvGl8-DBLURjJ1svwe7-uN9On5plQdFbiwx3fwMD2Q0jiM2FGaf-wzeqOGqUwa9V27lqDkrAV-QfzXm8rBx6Cjk-MTtqZzBDUA44TfCVHHnk2LJCywN9SuoMCrfW00ZsOJYDyVLAliFeT6dbrSATAiUYcFz7LHSp485oOR41iFw1da4C0xDHip0oK5FJT6HZ4iw5FsX9KvC-e-oYaIPVu1oMWWpnilig2Xg0PySfwP3raKt_LdUbuwjYFPh5xxZyRMEFfXHJzpRrnig6kxSywXjyIIw
```

To also achieve confidentiality, we make this the payload of a JWE:
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
which, encoded and encrypted, results in the final JWT that is exchanged:
```
eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAifQ.MPsMulGweRiFn-bGa8xC_MYal6Ozw93fjSv7FHCzGP2tViSC5zZNkbyUIl4f8FYBvoaN4t8QalpWVEdK3M-KyefTSW8YSmqFmastN_DEoISB4vPWTRrqT_xx3lM425dLYfIyMcosn9Tro8vLpJ-D74tkb-_WOZzv8mS63nQ5viCFURrapR1vTDZls8Qzx8DfywHCoFK4hwri8dZRQkPopLqp0ojQiAEyTnanGmRzjUM9wwrciNgG1b8V0plYhzB5MBpIscvVbeVqoKMfpBNBDJFRtgCbXrCbRj5g3ursIkflzbZAh5igSTCgNtgZ7TGPnoCmkf_VLBojx6SSN3Nl2g.oi6jthGyKogzcvdTW50byQ.GRoVEXg26eMKpMaek7ETHDgcF8aRl4icoKZCpUj69F9pl14dABpGwWKeoCveWhB6u8I4j1OhFPSDrBcbZwcXHI6bsgGnxzSWrgvDb9p5RtRrV9LCLGMPCjMHBWkEEQt4vRak_Qs6XCbB5QsRLG_EdUiNu9I2BDGh4WfpA_Q7xAwzGu-u6exhCXwQ9agaSSfqq8op8pRiqM5bBUgcyCBr_x_IslzZ3rTvUD98tCL6PJ2JYykO0K_NDq9jbt1U2yoRQiLixip6rX2Qy5ih8QNOYjiOIYy08A5JkbqlGRej-7DISIlqq0IiqfdxgWYDY0d2LFwbMy9RxskJ3pTWdToqpB515ROqqVKFRROMQISaUZlqbrZmWGuW--Nwhm-aqj2Eud5w3SKj_z4MeXCzzIqdRs0msY53QCS9v-3URX1RMW-P2YRjn9IDYHuRljutGU7hex40S4skHkAnciDeOz-2zzlXdesTOi4gc1yOjymy3oiIQ29eAZPFGqDnYZItI8564sN9iTWuMtZyYV52pdo2fY6aFU5289kJEJrtL4CKsSWr2QOpzbmXwA6aJA8AC68c9s65ci1T6aJQOmoboBE9kvudeo4_AYSR1bTn-GawUBQ-dVxmiE6K4P_1vSnstB9j.2KVp-bKtE3GrhX2UstY6LQ
```
