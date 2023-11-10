import React from "react";
import "../../styles/Landing2.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
function Landing({ socketURL }) {
    const navigate = useNavigate();
    const [online, setOnline] = React.useState(false);
    React.useEffect(() => {
        axios
            .get(socketURL)
            .then((res) => {
                if (res.data.code === 200) setOnline(true);
            })
            .catch((Err) => console.log("Error", Err));
    }, []);
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
                    <button
                        className="Landin2button"
                        onClick={() => {
                            navigate("/offline");
                        }}
                    >
                        OFFLINE mode
                    </button>
                </div>
                <div
                    style={{
                        flex: 1,
                        alignContent: "center",
                    }}
                    onClick={() => {
                        navigate("/ai");
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
                        disabled={!online}
                        onClick={() => {
                            setTimeout(() => {
                                if (online) navigate("/online");
                                else
                                    toast.error(
                                        "Server unavailable. Please try agin."
                                    );
                            }, 250);
                        }}
                        className="Landin2button"
                    >
                        {online ? "Online mode 🟢" : "Online mode  🔴"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Landing;
