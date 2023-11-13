import React from "react";
import { data } from "../Common/datacontext";
import { theme } from "../Common/themecontext";

function Footer({ secondPlayer, firstPlayer }) {
    const { isOn } = React.useContext(theme);
    const { chance } = React.useContext(data);
    return (
        <div
            style={{
                flex: 1,
                marginBottom: "40px",
                backgroundColor: isOn ? "#F6F4EB" : "#164863",
            }}
        >
            <h1
                style={{
                    color: !isOn ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                    fontWeight: "400",
                    fontVariant: "small-caps",
                    visibility: secondPlayer !== "" ? "visible" : "hidden",
                }}
            >
                {chance ? "X's" : "O's"} Turn
            </h1>
        </div>
    );
}

export default Footer;
