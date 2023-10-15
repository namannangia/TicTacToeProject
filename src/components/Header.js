import React, { useState } from "react";

function Header({ record, tries, socket, username }) {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    React.useEffect(() => {
        socket.on("userInfo", (player1, player2) => {
            setPlayer1(player1);
            setPlayer2(player2);
        });
    }, []);
    return (
        <h1
            style={{
                fontWeight: "400",
                fontVariant: "small-caps",
                marginBottom: "70px",
                textAlign: "center",
            }}
        >
            Live
            <br /> tic-tac-toe
            <br />
            {player1 === "" || player2 === ""
                ? ""
                : username === player1
                ? "Playing with '" + player2 + "'"
                : "Playing with '" + player1 + "'"}
            {/* {record
                .substring(0, 3)
                .concat(
                    "-",
                    record.substring(3, 6),
                    "-",
                    record.substring(6),
                    " :",
                    tries.toString()
                )} */}
        </h1>
    );
}

export default Header;
