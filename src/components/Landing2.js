import React from "react";
import "../styles/Landing2.css";
import { useNavigate } from "react-router-dom";
function Landing2() {
    const navigate = useNavigate();
    if (sessionStorage.getItem("user")) navigate("/login");
    return (
        <div
            className="Landing2"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // width: "200px",
                textAlign: "center",
                paddingTop: "5%",
            }}
        >
            <div
                style={{
                    flex: 1,
                    width: "200px",
                }}
            >
                <h1>Game Mode</h1>
                <div
                    style={{
                        alignContent: "center",
                    }}
                >
                    <button disabled={true} className="Landin2button">
                        Single player
                    </button>
                </div>

                <div
                    style={{
                        alignContent: "center",
                    }}
                >
                    <button
                        onClick={() => {
                            navigate("/login");
                        }}
                        className="Landin2button"
                    >
                        Multiplayer{" "}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Landing2;
