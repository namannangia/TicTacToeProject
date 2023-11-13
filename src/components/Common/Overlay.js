import React from "react";
import "../../styles/Overlay.css";
import { useNavigate } from "react-router-dom";
function Overlay({ heading, resetGame }) {
    const navigate = useNavigate();
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
                visibility: heading !== "" ? "visible" : "hidden",
            }}
        >
            <h1
                style={{
                    position: "relative",
                    margin: "5% 5%",
                    justifyContent: "center",
                    borderRadius: "100px",
                    display: "flex",
                    width: "75vw",
                    textAlign: "center",
                    backgroundColor: "black",
                    color: "white",
                    padding: "0px 10px",
                    top: "40px",
                    border: "5px solid white",
                    textOverflow: "clip",
                    paddingBottom: "10px",
                }}
            >
                {heading}
            </h1>
            <br />
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    width: window.innerWidth < 450 ? "75vw" : "70vh",
                }}
            >
                <button
                    onClick={() => {
                        resetGame(true);
                    }}
                    style={{
                        position: "relative",
                        margin: "20px 0px",
                        top: "60px",
                        fontSize: "20px",
                        border: "5px solid white",
                        cursor: "pointer",
                        color: "white",
                        backgroundColor: "black",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.5)",
                        padding: "2% 4%",
                    }}
                >
                    Play Again
                </button>
                <button
                    onClick={() => {
                        resetGame(true);
                        navigate("/");
                    }}
                    style={{
                        position: "relative",
                        margin: "20px 0px",
                        border: "5px solid white",
                        top: "60px",
                        fontSize: "20px",
                        color: "white",
                        cursor: "pointer",
                        backgroundColor: "black",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.5)",
                        padding: "2% 4%",
                    }}
                >
                    Home
                </button>
            </div>
        </div>
    );
}

export default Overlay;
