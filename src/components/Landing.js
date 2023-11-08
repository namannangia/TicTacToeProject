import React, { useState } from "react";
import "../styles//Landing.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
function Landing({ setSocket, socket, setLoading }) {
    const [url, seturl] = useState("https://tictactoe25.adaptable.app");
    const navigate = useNavigate();
    React.useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected");
            navigate("/login");
            socket.on("disconnect", () => {
                console.log("Disconnected");
            });
        });
    }, [socket]);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100vw",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>Enter Server details</h1>
            <p>Leave blank if not known</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {" "}
                <input
                    style={{ width: "20vw" }}
                    type="password"
                    onChange={(e) => {
                        seturl(e.target.value);
                    }}
                    value={url}
                    placeholder="Enter backend url"
                />
            </div>
            <div
                onClick={() => {
                    if (!(url === "")) {
                        console.log("Trying to connect");
                        setSocket(io.connect(url));
                    }
                }}
                style={{
                    fontSize: "2rem",
                    textDecoration: "underline dashed 2px",
                    textUnderlineOffset: 3,
                    cursor: "pointer",
                }}
            >
                LOGIN
            </div>
        </div>
    );
}

export default Landing;
