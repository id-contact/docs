(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{72:function(t,e,n){"use strict";n.r(e),n.d(e,"frontMatter",(function(){return a})),n.d(e,"metadata",(function(){return c})),n.d(e,"toc",(function(){return s})),n.d(e,"default",(function(){return b}));var r=n(3),i=n(7),o=(n(0),n(85)),a={id:"attributes",title:"Attributes",sidebar_label:"Attributes",slug:"attributes"},c={unversionedId:"concepts/attributes",id:"concepts/attributes",isDocsHomePage:!1,title:"Attributes",description:"In ID Contact, we organise an end-users identifying information in attributes. An attribute is a single piece of information about that user, such as their name, their place of birth, or an identification number such as the dutch BSN.",source:"@site/docs/concepts/Attributes.md",slug:"/concepts/attributes",permalink:"/docs/concepts/attributes",version:"current",sidebar_label:"Attributes",sidebar:"docs",previous:{title:"ID Contact",permalink:"/docs/"},next:{title:"Purposes",permalink:"/docs/concepts/purposes"}},s=[{value:"Attribute Tags",id:"attribute-tags",children:[]},{value:"Communication of attributes between components",id:"communication-of-attributes-between-components",children:[]}],u={toc:s};function b(t){var e=t.components,n=Object(i.a)(t,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"In ID Contact, we organise an end-users identifying information in attributes. An attribute is a single piece of information about that user, such as their name, their place of birth, or an identification number such as the dutch BSN."),Object(o.b)("h2",{id:"attribute-tags"},"Attribute Tags"),Object(o.b)("p",null,"A specific attribute is identified by its attribute tag. This is a string which is used internally to identify which attributes are requested from an authentication plugin, and to identify which attribute is which in attributes provided to communication plugins."),Object(o.b)("p",null,"There is no pre-defined meaning of attribute tags, so authentication plugins need to be flexible in how they map their source of information onto attributes. Ideally, this is something that can be configured for the plugin."),Object(o.b)("h2",{id:"communication-of-attributes-between-components"},"Communication of attributes between components"),Object(o.b)("p",null,"In order to reduce attack surface, attributes are stored signed and encrypted in a JWT when transfered between plugins in the ID Contact eco system. This reduces risk of attributes being read by parties not needing to obtain that information. It also allows us to, when neccessary or convenient, route this information via the end users client."))}b.isMDXComponent=!0},85:function(t,e,n){"use strict";n.d(e,"a",(function(){return p})),n.d(e,"b",(function(){return d}));var r=n(0),i=n.n(r);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var u=i.a.createContext({}),b=function(t){var e=i.a.useContext(u),n=e;return t&&(n="function"==typeof t?t(e):c(c({},e),t)),n},p=function(t){var e=b(t.components);return i.a.createElement(u.Provider,{value:e},t.children)},l={inlineCode:"code",wrapper:function(t){var e=t.children;return i.a.createElement(i.a.Fragment,{},e)}},f=i.a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,a=t.parentName,u=s(t,["components","mdxType","originalType","parentName"]),p=b(n),f=r,d=p["".concat(a,".").concat(f)]||p[f]||l[f]||o;return n?i.a.createElement(d,c(c({ref:e},u),{},{components:n})):i.a.createElement(d,c({ref:e},u))}));function d(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,a=new Array(o);a[0]=f;var c={};for(var s in e)hasOwnProperty.call(e,s)&&(c[s]=e[s]);c.originalType=t,c.mdxType="string"==typeof t?t:r,a[1]=c;for(var u=2;u<o;u++)a[u]=n[u];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);