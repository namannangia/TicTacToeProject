import React, { useState } from "react";
import "../styles//Landing.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
function Landing({ setSocket, socket, setLoading }) {
    const [url, seturl] = useState("http://localhost");
    const [port, setPort] = useState("3000");
    const navigate = useNavigate();
    React.useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected");
            navigate("/login");
            socket.on("disconnect", () => {
                console.log("Disconnected");
            });
        });

        socket.on("notif", (obj) => {
            switch (obj.code) {
                case 102:
                    //waiting for more players
                    toast.info(obj.message, {
                        isLoading: true,
                    });
                    break;
                case 409:
                    //username Conflict
                    //OR
                    //Move Conflict
                    toast.error(obj.message);
                    setLoading(false);
                    break;
                case 503:
                    //room full
                    toast.error(obj.message);
                    setLoading(false);
                    break;
                case 403:
                    //Move forbidden
                    toast.error(obj.message);
                    break;
                default:
                    break;
            }
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
                    type="text"
                    onChange={(e) => {
                        seturl(e.target.value);
                    }}
                    value={url}
                    placeholder="Enter backend url"
                />
                <input
                    type="text"
                    onChange={(e) => {
                        setPort(e.target.value);
                    }}
                    value={port}
                    width={2}
                    placeholder="Enter port number"
                />
            </div>
            <div
                onClick={() => {
                    if (!(url === "" || port === "")) {
                        console.log("Trying to connect");
                        setSocket(io.connect(url + ":" + port));
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
