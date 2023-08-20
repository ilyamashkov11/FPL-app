import React from "react";
// import Welcome from "./Welcome";

function Greet(props) {
    console.log(props);
    return (
    <div>
        <h1>Hello {props.name} {props.lastname}</h1>
        {props.children}
    </div>);
}

export default Greet;