import React from "react";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { customAlphabet } from "nanoid";
import { generateUsername } from "friendly-username-generator";

function SplashScreen({
    setPage,
    setRoomKey,
    roomKey,
    username,
    setUsername,
    socket,
}) {
    const nanoid2 = customAlphabet("1234567890", 4);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        socket.on("notif", (msg) => {
            toast.info(msg);

            if (msg.toString().includes("is Full.")) {
                setLoading(false);
            }
        });
    }, []);
    React.useEffect(() => {
        if (loading) document.getElementById("randomImg").style.opacity = "0.2";
    }, [loading]);
    React.useEffect(() => {
        if (roomKey.toString().length >= 5)
            setRoomKey((e) => e.toString().substring(0, 4));
    }, [roomKey]);
    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                width: "100vw",
                height: "100vh",
                flexDirection: "column",
                backgroundColor: "",
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
                    Live <span id="theSpan">❤️</span>
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
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    type="text"
                    disabled={loading}
                    value={username}
                    placeholder="Enter Username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="number"
                    disabled={loading}
                    value={roomKey}
                    placeholder="Enter Room Key"
                    onChange={(e) => {
                        setRoomKey(e.target.value);
                    }}
                />
                <button
                    id="randomBtn"
                    onClick={() => {
                        if (username === "")
                            setUsername(
                                generateUsername({
                                    useRandomNumber: false,
                                })
                            );
                        if (roomKey === "")
                            setRoomKey(
                                Math.floor(Math.random() * (9999 - 1111 + 1)) +
                                    1111
                            );
                        document.getElementById("randomBtn").style.visibility =
                            "hidden";
                    }}
                    disabled={loading}
                    style={{ textAlign: "center", verticalAlign: "center" }}
                >
                    <img
                        height={20}
                        id="randomImg"
                        width={20}
                        style={{ marginRight: "7px" }}
                        alt="GenerateRandom"
                        src={require("../assets/random.png")}
                    />{" "}
                    Random
                </button>
                <button
                    type="submit"
                    id="splashSubmitBtn"
                    disabled={loading}
                    onClick={() => {
                        if (username === "")
                            toast.error("Username cannot be empty");
                        if (roomKey === "")
                            toast.error("Room Key cannot be empty");
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
                                }
                            }
                        );
                    }}
                >
                    Login {"›"}
                </button>
            </form>
        </div>
    );
}

export default SplashScreen;
