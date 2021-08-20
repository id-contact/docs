import React, { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true
});

const Mermaid = ({ children, title }) => {
    useEffect(() => {
        console.log(children);
        mermaid.contentLoaded();
    }, []);
    return <>
        <div className="mermaid">{children}</div>
        {title && <center><p><em>{title}</em></p></center>}
        </>;
};

export default Mermaid;