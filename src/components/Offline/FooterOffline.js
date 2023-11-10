import React, { useState } from "react";

function Footer({ chance, secondPlayer, firstPlayer }) {
    const [text, setText] = useState(secondPlayer);
    return (
        <div
            style={{
                flex: 1,
                marginBottom: "40px",
                backgroundColor: "#FAF8ED",
            }}
        >
            <h1
                style={{
                    margin: "50px 0px 0px 0px",
                    fontWeight: "400",
                    fontVariant: "small-caps",
                    visibility: secondPlayer !== "" ? "visible" : "hidden",
                }}
            >
                {chance ? "Blue's" : "Green's"} Turn
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
