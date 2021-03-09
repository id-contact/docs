import React from 'react';

const repo = "https://raw.githubusercontent.com/id-contact/docs/master";
const puml_server = "https://www.plantuml.com";

export default function PlantUML({diagram}) {
    return <img src={`${puml_server}/plantuml/proxy?src=${repo}${diagram}`}/>
}
