(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{87:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var a=n(3),i=n(7),r=(n(0),n(94)),o={id:"tech_example",title:"Authentication plugin sample interaction",sidebar_label:"Sample interaction",slug:"tech_example"},c={unversionedId:"auth/tech_example",id:"auth/tech_example",isDocsHomePage:!1,title:"Authentication plugin sample interaction",description:"Below is an example of an entire authentication interaction for a session involving the test authentication plugin as authentication plugin.",source:"@site/docs/auth/tech_example.md",slug:"/auth/tech_example",permalink:"/auth/tech_example",version:"current",sidebar_label:"Sample interaction",sidebar:"docs",previous:{title:"Authentication plugin overview",permalink:"/auth/overview"},next:{title:"Authentication plugin API",permalink:"/auth/api"}},s=[{value:"Setup",id:"setup",children:[]},{value:"Authentication proper",id:"authentication-proper",children:[]}],l={toc:s};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Below is an example of an entire authentication interaction for a session involving the test authentication plugin as authentication plugin."),Object(r.b)("h2",{id:"setup"},"Setup"),Object(r.b)("p",null,"For the authentication process, the entire process starts with a request from the core to setup an authentication session:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-http"},'POST /start_authentication HTTP/1.1\ncontent-type: application/json\naccept: */*\nhost: auth-test:8000\ncontent-length: 135\n\n{\n    "attributes":   ["email"],\n    "continuation": "http://comm-test.idcontact.test.tweede.golf/ui",\n    "attr_url":     "http://comm-test:8000/auth_result"\n}\n')),Object(r.b)("p",null,"Here, the core asked the authentication plugin to setup a session asking for the ",Object(r.b)("inlineCode",{parentName:"p"},"email")," attribute. It further instructs the authentication plugin to send the user to ",Object(r.b)("inlineCode",{parentName:"p"},"http://comm-test.id-contact.test.tweede.golf/ui")," after completing authentication, and send the resulting attributes to ",Object(r.b)("inlineCode",{parentName:"p"},"http://comm-test:8000/auth_result"),"."),Object(r.b)("p",null,"The authentication plugin internally sets up for this authentication session, and returns:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-http"},'HTTP/1.1 200 OK\ncontent-type: application/json\nserver: Rocket\ncontent-length: 192\ndate: Tue, 16 Mar 2021 07:30:00 GMT\n\n{\n    "client_url": "https://auth-test.idcontact.test.tweede.golf/browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZGNvbnRhY3QudGVzdC50d2VlZGUuZ29sZi91aQ==/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0"\n}\n')),Object(r.b)("p",null,"This instructs the core that it needs to send the end-user to ",Object(r.b)("inlineCode",{parentName:"p"},"https://auth-test.id-contact.test.tweede.golf/browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZC1jb250YWN0LnRlc3QudHdlZWRlLmdvbGYvdWk=/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0")," in order to start the authentication process."),Object(r.b)("h2",{id:"authentication-proper"},"Authentication proper"),Object(r.b)("p",null,"After the initial exchange with the core, the core completes setup of the entire ID Contact session, and then redirects the end-user to the authentication session. At this point, the end-users browser will load the ",Object(r.b)("inlineCode",{parentName:"p"},"client_url")," from the authentication plugin:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-http"},"GET /browser/WyJlbWFpbCJd/aHR0cDovL2NvbW0tdGVzdC5pZGNvbnRhY3QudGVzdC50d2VlZGUuZ29sZi91aQ==/aHR0cDovL2NvbW0tdGVzdDo4MDAwL2F1dGhfcmVzdWx0 HTTP/1.0\nHost: auth-test:8000\nConnection: close\nupgrade-insecure-requests: 1\nuser-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36\naccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\nsec-fetch-site: same-site\nsec-fetch-mode: navigate\nsec-fetch-user: ?1\nsec-fetch-dest: document\nreferer: https://poc.idcontact.test.tweede.golf/\naccept-encoding: gzip, deflate, br\naccept-language: en-US,en;q=0.9\n")),Object(r.b)("p",null,"At this point, the authentication plugin can show any UI needed in the process of authenticating the user. Here, because we use the test authenticator, we don't need to do anything like that and can immediately complete the process of the authentication session. First, we redirect the user to the next step in the ID Contact session in our HTTP response:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-http"},"HTTP/1.0 303 See Other\nlocation: http://comm-test.idcontact.test.tweede.golf/ui\nserver: Rocket\ncontent-length: 0\ndate: Tue, 16 Mar 2021 07:30:00 GMT\n")),Object(r.b)("p",null,"Simultaneously, we also report the authentication session result to the ",Object(r.b)("inlineCode",{parentName:"p"},"attr_url")," provided during setup:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-http"},"POST /auth_result HTTP/1.1\ncontent-type: application/jwt\naccept: */*\nhost: comm-test:8000\ncontent-length: 1202\n\neyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAifQ.j9ANvlSvi8AjqQ2NjX0OpqZvmL5pG4kH8O6BEtoui4KukDn2nIfgiGNV7fR3rmWrvZJ2E5qOoNQy6TMYsQYvdA4gdQkQd8VqkXIHGH0AFTBDnTtAVPuAc9iTFiJ5KZzUd_kTDkhrIyX4aWGjhwR4jk7gGdTlXMnR-tK2K9n5C6XTiuM-i-D39lSpsujQmkHzkmGkoqpNRYpulEUphLoov9U0C1yCHO0ZGR1SeWIM0STyh6H0cUPZEWneNOQsVeWGGDAOe1l7EHznr2CP8i_lXCIiSj4hJ8bB5ZxjbOeTYj8XMt7SpTTBAHuFerO6SqCLXa89rHymNgIA12itxrNDAg.BsX5IzSKDzvKz36VOs74wQ.R89gy8vBW0rwslJblj4uQYV-3eP9N_aOxeE23rxA44uxDFF-Q0VyFv-G1TWHVnhJvsw8qoX8JaG8IXr4VK_m7TbJmL6KMA2-_BD8kO-DHQJc4_d6sS-BZ4YYuPjJnSuAoN7znwFdiyyjdq34r8drOBnL2rroPRR62_QkXc4LZBYAWgRQNLoaZmUVsnIFekhSo2wPoODpTP5AJOzfbHXMOMThnW86Mgyc6eM2kvojjnTqsnL3Wt2NZS0ubfzJ8C5nYuGFnfaLUoLUhnYnNGksmInX_2Vb92Ddn5lkOROVaoE-31pZaKffkCyjSks9vpZ-bZPnTvBZfZ6eMK2G1oyeuL4awIJNXI0aR0pW7HREhm6S6nsp7HANtPnUfy2ZdAmTTKP8SSoXVRQHkEZODgGq38rBD2OpjFwQepmqY-Ie5cHAWXw-k3pnnxon45TUXrJh3x3MUdPETSHEoUtpzbueOXtqXjeHtVK8OjU7K25qc7TdcpFtMdo5uZ22KcNVXBjZvxXEigzrumUgOcc8Z5oHo7bujjvgWwuZNv4TppJs2Q6YVb-_AaKWM02WhCDQoMiiaGBbaV-2oifAmzkfw-14DOkzJ-eoZl3JLn7IP0rST2pS_iLztl_QQCynMrN6r0ipm8-XCQU2pOwLGlNOd6_usy0vy1zhck2UQVECz4ZoIJ5WwSdmP6-Iwn21vsxNm6_FFrdYIt7Buu8JGMLLBEfzSg.hCcQGm2i-px5kW2UzPhmkQ\n")),Object(r.b)("p",null,"The content here is a JWT containing the authentication result. This consists of two layers. The outer layer, seen above, is a JWE containing another JWT as payload in the following manner:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-json"},'{\n    "typ": "JWT",\n    "cty": "JWT",\n    "enc": "A128CBC-HS256",\n    "alg": "RSA-OAEP"\n}\n.\n{\n    "njwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpZC1jb250YWN0LWF0dHJpYnV0ZXMiLCJzdGF0dXMiOiJzdWNjZXMiLCJhdHRyaWJ1dGVzIjp7ImVtYWlsIjoiYmxhIn0sImlhdCI6MTYxNTg3OTgwMCwiZXhwIjoxNjE1ODgwMTAwfQ.T4VliaytEhlf2PwOiKL0GY4IcmXd64A8Gl2P9w6Tl1mQzzAqnF8TV7IjrUSu3tvs1hAS3gR-WqAhxSKzv0WuzrewXv_uvkdabJ4HTTRsALbUk13jt1C4A5wCR-3tP4H6sV5M5ODdT83wFb1_huoU_GtnXCVdQwmQMtO5wteMA_XOHEv6ExCaBKPr8NQ6Txd5SHsUG48gZfWmSDSYB9mzD99CdfEQUxebvQ9x3hUQffRsIsE6MqNakD8h0W8qlabnPxZ2fe7Tn8AlZzTFNu3EW35JdvENJQ2r71QxJOdEVHxoBREBlFGpCAjXH1x6aRWi_GfUD8s5zEkB_xA1_InesQ"\n}\n')),Object(r.b)("p",null,"The inner JWS ",Object(r.b)("inlineCode",{parentName:"p"},"njwt")," contains the actual authentication result:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-json"},'{\n    "typ": "JWT",\n    "alg": "RS256"\n}\n.\n{\n    "sub":"id-contact-attributes",\n    "status":"succes",\n    "attributes": {\n        "email": "bla"\n    },\n    "iat": 1615879800,\n    "exp": 1615880100\n}\n')),Object(r.b)("p",null,"The receiver of the attributes acknowledges receipt of the message, but doesn't provide any further feedback."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"HTTP/1.1 200 OK\nserver: Rocket\ncontent-length: 0\ndate: Tue, 16 Mar 2021 07:30:00 GMT\n")))}u.isMDXComponent=!0},94:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),u=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(n),d=a,b=p["".concat(o,".").concat(d)]||p[d]||h[d]||r;return n?i.a.createElement(b,c(c({ref:t},l),{},{components:n})):i.a.createElement(b,c({ref:t},l))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<r;l++)o[l]=n[l];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);