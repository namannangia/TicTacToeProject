import React, { useState } from "react";

function Footer({ chance, username, socket }) {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    React.useEffect(() => {
        socket.on("userInfo", (player1, player2) => {
            setPlayer1(player1);
            setPlayer2(player2);
        });
    }, []);
    return (
        <div style={{ flex: 1, marginBottom: "40px" }}>
            <h1
                style={{
                    margin: "50px 0px 0px 0px",
                    fontWeight: "400",
                    fontVariant: "small-caps",
                    visibility:
                        player1 !== "" && player2 !== "" ? "visible" : "hidden",
                }}
            >
                {username === player1
                    ? chance
                        ? "Your Turn"
                        : player2 + "'s Turn"
                    : !chance
                    ? "Your Turn"
                    : player1 + "'s TUrn"}
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
