import React, { useState } from "react";

function Overlay({
    winner,
    resetGame,
    socket,
    username,
    firstPlayer,
    secondPlayer,
}) {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                position: "absolute",
                display: "flex",
                top: "0px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.8)",
                visibility: winner !== 3 ? "visible" : "hidden",
            }}
        >
            <h1
                style={{
                    justifyContent: "center",
                    display: "flex",
                    width: "95vw",
                    alignContent: "center",
                    justifyItems: "center",
                    textAlign: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    color: "black",
                    padding: "5px 10px",
                }}
            >
                {winner === 1
                    ? firstPlayer + " ( X ) wins ! "
                    : winner === 0
                    ? secondPlayer + " ( O ) wins !"
                    : winner === 2
                    ? "It's a Tie 😅"
                    : "Waiting "}
            </h1>
            <br />{" "}
            <button
                onClick={() => {
                    resetGame(true);
                }}
                style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.5)",
                    padding: "1% 2%",
                    marginBottom: "2%",
                }}
            >
                Play Again
            </button>
        </div>
    );
}

export default Overlay;
