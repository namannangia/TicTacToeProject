import React, { useContext } from "react";
import { data } from "../Common/datacontext";

function Overlay({ firstPlayer, secondPlayer, heading }) {
    const { winner, resetGame } = useContext(data);
    React.useEffect(() => {
        if (winner !== 3) {
            setTimeout(() => {
                document.getElementById("overlayOffline").style.visibility =
                    "visible";
            }, 1250);
        } else
            document.getElementById("overlayOffline").style.visibility =
                "hidden";
    }, [winner]);
    return (
        <div
            id="overlayOffline"
            style={{
                height: "100vh",
                width: "100vw",
                position: "absolute",
                display: "flex",
                top: "0px",
                zIndex: 2,
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
            }}
        >
            <h1
                style={{
                    position: "relative",
                    justifyContent: "center",
                    borderRadius: "40px",
                    display: "flex",
                    width: "95vw",
                    alignContent: "center",
                    justifyItems: "center",
                    textAlign: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    color: "black",
                    padding: "5px 10px",
                    top: "50px",
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
                    resetGame();
                }}
                style={{
                    position: "relative",
                    top: "50px",
                    fontSize: "20px",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.5)",
                    padding: "2% 4%",
                    marginBottom: "2%",
                }}
            >
                Play Again
            </button>
        </div>
    );
}

export default Overlay;
