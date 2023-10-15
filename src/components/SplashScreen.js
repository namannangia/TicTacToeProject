import React from "react";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

function SplashScreen({
    setPage,
    setRoomKey,
    roomKey,
    username,
    setUsername,
    socket,
}) {
    const [loading, setLoading] = React.useState(false);
    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                width: "100vw",
                height: "100vh",
                flexDirection: "column",
                backgroundColor: "rgba(0,255,0,0.2)",
            }}
        >
            <ToastContainer position="top-right" />
            <div style={{ flex: 1, maxHeight: "20%" }}>
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
                </h1>
            </div>
            <form
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading((e) => !e);
                    socket.timeout(1000).emit(
                        "setInitial",
                        {
                            username: username,
                            roomKey: roomKey,
                        },
                        (err, val) => {
                            if (err) {
                                toast.error("Connection timed out");
                                setLoading((e) => !e);
                            } else setPage((e) => !e);
                        }
                    );
                }}
            >
                <input
                    type="text"
                    required={true}
                    disabled={loading}
                    value={username}
                    placeholder="Enter Username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="text"
                    disabled={loading}
                    required={true}
                    value={roomKey}
                    placeholder="Enter Room Key"
                    onChange={(e) => {
                        setRoomKey(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    id="splashSubmitBtn"
                    disabled={loading}
                    onMouseUp={() => {
                        document.getElementById(
                            "splashSubmitBtn"
                        ).style.boxShadow =
                            "5px 5px 10px 2px rgba(0, 0, 0, 0.4)";
                    }}
                    onMouseDown={() => {
                        document.getElementById(
                            "splashSubmitBtn"
                        ).style.boxShadow = "none";
                    }}
                >
                    Login {"›"}
                </button>
            </form>
        </div>
    );
}

export default SplashScreen;
