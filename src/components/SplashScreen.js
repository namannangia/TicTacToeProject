import React from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { generateUsername } from "friendly-username-generator";
import { useNavigate } from "react-router-dom";
import "../styles/splash.css";

function SplashScreen({
    setRoomKey,
    roomKey,
    setSecondPlayer,
    username,
    setUsername,
    socket,
    setFirstPlayer,
    loading,
    setLoading,
}) {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!socket.connected) navigate("/");
        socket.on("start", (callback) => {
            console.log("Game start request received", username);
            callback({ staus: "ok" });
        });
        socket.on("userInfo", (player1, player2) => {
            setSecondPlayer(player2);
            setFirstPlayer(player1);
            setLoading(false);
            navigate("/game");
        });
    }, []);
    React.useEffect(() => {
        document.getElementById("randomImg").style.opacity = loading
            ? "0.2"
            : "1";
    }, [loading]);
    React.useEffect(() => {
        if (roomKey.toString().length >= 5)
            setRoomKey((e) => e.toString().substring(0, 4));
    }, [roomKey]);
    return (
        <div className="splashMainDiv">
            <ToastContainer limit={2} position="top-right" />
            <div className="splashSubDiv">
                <h1 className="splashHeading">
                    Live <span id="theSpan">❤️</span>
                    <br /> tic-tac-toe
                    <br />
                </h1>
            </div>
            <form
                className="splashForm"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    className="splashScreenInput"
                    type="text"
                    disabled={loading}
                    value={username}
                    placeholder="Enter Username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    className="splashScreenInput"
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
                        setUsername(
                            generateUsername({
                                useRandomNumber: false,
                            })
                        );
                        setRoomKey(
                            (
                                Math.floor(Math.random() * (9999 - 1111 + 1)) +
                                1111
                            ).toString()
                        );
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
                    className="splashScreenInput"
                    type="submit"
                    id="splashSubmitBtn"
                    disabled={loading}
                    onClick={() => {
                        if (username.length <= 0 || roomKey.length <= 0) {
                            if (username === "")
                                toast.error("Username cannot be empty");
                            if (roomKey === "")
                                toast.error("Room Key cannot be empty");
                        } else {
                            document.title = document.title.concat(
                                " | " + username
                            );
                            sessionStorage.setItem("user", username);
                            sessionStorage.setItem("roomkey", roomKey);
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
                                        setTimeout(() => {
                                            window.confirm(
                                                "Change server URL?"
                                            );
                                        }, 200);
                                    }
                                }
                            );
                        }
                    }}
                >
                    Login {"›"}
                </button>
            </form>
        </div>
    );
}

export default SplashScreen;
