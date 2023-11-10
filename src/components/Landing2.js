import React from "react";
import "../styles/Landing2.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Landing2({ socket }) {
    const navigate = useNavigate();
    if (socket.connected !== true)
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
                // paddingTop: "5%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    width: "200px",
                    // overflow: "hidden",
                }}
            >
                <h1>Game Mode</h1>
                <div
                    style={{
                        flex: 1,
                        alignContent: "center",
                    }}
                >
                    <button className="Landin2button" onClick={() => {}}>
                        OFFLINE mode
                    </button>
                </div>
                <div
                    style={{
                        flex: 1,
                        alignContent: "center",
                    }}
                >
                    <button className="Landin2button">V/S AI mode</button>
                </div>
                <div
                    style={{
                        flex: 1,
                        alignContent: "center",
                    }}
                >
                    <button
                        onClick={() => {
                            setTimeout(() => {
                                if (socket.connected) navigate("/login");
                                else
                                    toast.error(
                                        "Server unavailable. Please try agin."
                                    );
                            }, 250);
                        }}
                        className="Landin2button"
                    >
                        Online mode 🟢
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Landing2;
