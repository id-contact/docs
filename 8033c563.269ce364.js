(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{82:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var r=n(3),a=n(7),o=(n(0),n(94)),i={id:"jwt",title:"JWTs",sidebar_label:"JWTs",slug:"jwt"},s={unversionedId:"concepts/jwt",id:"concepts/jwt",isDocsHomePage:!1,title:"JWTs",description:"In ID-Contact, we use JSON Web Tokens (JWT) to communicate attributes between the various components. This allows passing of attributes and attribute values through components that aren't necessarily trusted.",source:"@site/docs/concepts/JWE.md",slug:"/concepts/jwt",permalink:"/concepts/jwt",version:"current",sidebar_label:"JWTs"},c=[{value:"Introduction to JWTs, JWEs and JWSs",id:"introduction-to-jwts-jwes-and-jwss",children:[{value:"JWEs",id:"jwes",children:[]},{value:"JWSs",id:"jwss",children:[]}]},{value:"JWTs in ID-Contact",id:"jwts-in-id-contact",children:[]}],u={toc:c};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"In ID-Contact, we use JSON Web Tokens (JWT) to communicate attributes between the various components. This allows passing of attributes and attribute values through components that aren't necessarily trusted."),Object(o.b)("h2",{id:"introduction-to-jwts-jwes-and-jwss"},"Introduction to JWTs, JWEs and JWSs"),Object(o.b)("p",null,"Before we go into how JWTs are used in ID-Contact, it is important to go over what JWTs are, and what the various names for them mean. First, note that JWTs come in two flavours: JSON Web Encryption (JWE) and JSON Web Signature (JWS). Both are JWTs, but each focuses on a different security goal."),Object(o.b)("h3",{id:"jwes"},"JWEs"),Object(o.b)("p",null,"A JWE is a JSON Web Token whose actual contents are encrypted. Its primary goal is to hide the actual content of the token from unauthorized parties. In other words, JWEs ensure confidentiality."),Object(o.b)("h3",{id:"jwss"},"JWSs"),Object(o.b)("p",null,"A JWS is a JSON Web Token whose contents are signed. It's primary goal is to ensure that the content of the token cannot be altered. In other words, JWSs ensure authenticity."),Object(o.b)("h2",{id:"jwts-in-id-contact"},"JWTs in ID-Contact"),Object(o.b)("p",null,"In ID-Contact, we use JWTs to provide authenticity and confidentiality during transmission of authentication results. At it's core, this JWT is intended to transmit the claims:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-json"},'"status":     "succes",\n"attributes": {\n    "attr_1": "attr_value_1",\n    "attr_2": "attr_value_2"\n}\n')),Object(o.b)("p",null,"with, optionally, also a session URL:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-json"},'"session_url":"http://example.com"\n')),Object(o.b)("p",null,"In the first layer, this claim is wrapped in a JWS to provide authenticity. This gives a total object"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-json"},'{\n    "typ": "JWT",\n    "alg": "RS256"\n}\n.\n{\n    "sub":"id-contact-attributes",\n    "status":"succes",\n    "attributes": {\n        "email": "bla"\n    },\n    "iat": 1615879800,\n    "exp": 1615880100\n}\n')),Object(o.b)("p",null,"which, encoded and signed, becomes the token"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpZC1jb250YWN0LWF0dHJpYnV0ZXMiLCJzdGF0dXMiOiJzdWNjZXMiLCJhdHRyaWJ1dGVzIjp7ImVtYWlsIjoiYmxhIn0sImlhdCI6MTYxNTg3OTgwMCwiZXhwIjoxNjE1ODgwMTAwfQ.T4VliaytEhlf2PwOiKL0GY4IcmXd64A8Gl2P9w6Tl1mQzzAqnF8TV7IjrUSu3tvs1hAS3gR-WqAhxSKzv0WuzrewXv_uvkdabJ4HTTRsALbUk13jt1C4A5wCR-3tP4H6sV5M5ODdT83wFb1_huoU_GtnXCVdQwmQMtO5wteMA_XOHEv6ExCaBKPr8NQ6Txd5SHsUG48gZfWmSDSYB9mzD99CdfEQUxebvQ9x3hUQffRsIsE6MqNakD8h0W8qlabnPxZ2fe7Tn8AlZzTFNu3EW35JdvENJQ2r71QxJOdEVHxoBREBlFGpCAjXH1x6aRWi_GfUD8s5zEkB_xA1_InesQ\n")),Object(o.b)("p",null,"To also achieve confidentiality, we make this the payload of a JWE:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-json"},'{\n    "typ": "JWT",\n    "cty": "JWT",\n    "enc": "A128CBC-HS256",\n    "alg": "RSA-OAEP"\n}\n.\n{\n    "njwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpZC1jb250YWN0LWF0dHJpYnV0ZXMiLCJzdGF0dXMiOiJzdWNjZXMiLCJhdHRyaWJ1dGVzIjp7ImVtYWlsIjoiYmxhIn0sImlhdCI6MTYxNTg3OTgwMCwiZXhwIjoxNjE1ODgwMTAwfQ.T4VliaytEhlf2PwOiKL0GY4IcmXd64A8Gl2P9w6Tl1mQzzAqnF8TV7IjrUSu3tvs1hAS3gR-WqAhxSKzv0WuzrewXv_uvkdabJ4HTTRsALbUk13jt1C4A5wCR-3tP4H6sV5M5ODdT83wFb1_huoU_GtnXCVdQwmQMtO5wteMA_XOHEv6ExCaBKPr8NQ6Txd5SHsUG48gZfWmSDSYB9mzD99CdfEQUxebvQ9x3hUQffRsIsE6MqNakD8h0W8qlabnPxZ2fe7Tn8AlZzTFNu3EW35JdvENJQ2r71QxJOdEVHxoBREBlFGpCAjXH1x6aRWi_GfUD8s5zEkB_xA1_InesQ"\n}\n')),Object(o.b)("p",null,"which, encoded and encrypted, results in the final JWT that is exchanged:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAifQ.j9ANvlSvi8AjqQ2NjX0OpqZvmL5pG4kH8O6BEtoui4KukDn2nIfgiGNV7fR3rmWrvZJ2E5qOoNQy6TMYsQYvdA4gdQkQd8VqkXIHGH0AFTBDnTtAVPuAc9iTFiJ5KZzUd_kTDkhrIyX4aWGjhwR4jk7gGdTlXMnR-tK2K9n5C6XTiuM-i-D39lSpsujQmkHzkmGkoqpNRYpulEUphLoov9U0C1yCHO0ZGR1SeWIM0STyh6H0cUPZEWneNOQsVeWGGDAOe1l7EHznr2CP8i_lXCIiSj4hJ8bB5ZxjbOeTYj8XMt7SpTTBAHuFerO6SqCLXa89rHymNgIA12itxrNDAg.BsX5IzSKDzvKz36VOs74wQ.R89gy8vBW0rwslJblj4uQYV-3eP9N_aOxeE23rxA44uxDFF-Q0VyFv-G1TWHVnhJvsw8qoX8JaG8IXr4VK_m7TbJmL6KMA2-_BD8kO-DHQJc4_d6sS-BZ4YYuPjJnSuAoN7znwFdiyyjdq34r8drOBnL2rroPRR62_QkXc4LZBYAWgRQNLoaZmUVsnIFekhSo2wPoODpTP5AJOzfbHXMOMThnW86Mgyc6eM2kvojjnTqsnL3Wt2NZS0ubfzJ8C5nYuGFnfaLUoLUhnYnNGksmInX_2Vb92Ddn5lkOROVaoE-31pZaKffkCyjSks9vpZ-bZPnTvBZfZ6eMK2G1oyeuL4awIJNXI0aR0pW7HREhm6S6nsp7HANtPnUfy2ZdAmTTKP8SSoXVRQHkEZODgGq38rBD2OpjFwQepmqY-Ie5cHAWXw-k3pnnxon45TUXrJh3x3MUdPETSHEoUtpzbueOXtqXjeHtVK8OjU7K25qc7TdcpFtMdo5uZ22KcNVXBjZvxXEigzrumUgOcc8Z5oHo7bujjvgWwuZNv4TppJs2Q6YVb-_AaKWM02WhCDQoMiiaGBbaV-2oifAmzkfw-14DOkzJ-eoZl3JLn7IP0rST2pS_iLztl_QQCynMrN6r0ipm8-XCQU2pOwLGlNOd6_usy0vy1zhck2UQVECz4ZoIJ5WwSdmP6-Iwn21vsxNm6_FFrdYIt7Buu8JGMLLBEfzSg.hCcQGm2i-px5kW2UzPhmkQ\n")))}l.isMDXComponent=!0},94:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return O}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),l=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=l(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=l(n),b=r,O=d["".concat(i,".").concat(b)]||d[b]||p[b]||o;return n?a.a.createElement(O,s(s({ref:t},u),{},{components:n})):a.a.createElement(O,s({ref:t},u))}));function O(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=b;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var u=2;u<o;u++)i[u]=n[u];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);