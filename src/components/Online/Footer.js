import React, { useContext } from "react";
import { data } from "../Common/datacontext";

function Footer({ chance, username, secondPlayer, firstPlayer }) {
    const { isOn } = useContext(data);
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
                {sessionStorage.getItem("user") === secondPlayer
                    ? chance
                        ? "Opponent's Turn"
                        : "Your Turn"
                    : chance
                    ? "Your Turn"
                    : "Opponent's Turn"}
            </h1>
            <h3
                style={{
                    margin: "0px",
                    fontWeight: "400",
                    fontVariant: "small-caps",
                }}
            >
                {/* should move now! */}
            </h3>
        </div>
    );
}

export default Footer;
