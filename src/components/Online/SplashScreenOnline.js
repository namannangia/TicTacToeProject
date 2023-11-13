import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { generateUsername } from "friendly-username-generator";
import { useNavigate } from "react-router-dom";
import "../../styles/splash.css";
import MySvg from "../../assets/random.svg";
import { io } from "socket.io-client";
import { data } from "../Common/datacontext";
import DayNightSwitch from "../Common/DayNightSwitch";

function SplashScreenOnline({
    setRoomKey,
    roomKey,
    socketURL,
    setSecondPlayer,
    username,
    setUsername,
    socket,
    setFirstPlayer,
    loading,
    setLoading,
    online,
}) {
    // if (!socket.connected) {
    //     socket = io.connect(socketURL);
    // }
    const { isOn } = useContext(data);
    const navigate = useNavigate();
    React.useEffect(() => {
        socket.on("start", (callback) => {
            callback({ staus: "ok" });
        });
        // setInterval(async () => {
        //     socket.volatile.emit("ping", count);
        //     setcount((e) => e + 100);
        // }, 100);
        socket.on("userInfo", (player1, player2) => {
            setSecondPlayer(player2);
            setFirstPlayer(player1);
            setLoading(false);
            navigate("/online/game");
        });
    }, []);
    React.useEffect(() => {
        document.getElementById("randomImg").style.opacity = loading
            ? "0.2"
            : "1";
    }, [loading]);

    React.useEffect(() => {
        if (roomKey.toString().length === 4) {
            document.getElementById("splashSubmitBtn").focus();
        }
        if (roomKey.toString().length > 4)
            setRoomKey((e) => e.toString().substring(0, 4));
        if (parseInt(roomKey.toString()) < 0) setRoomKey((e) => 0 - e);
    }, [roomKey]);
    return (
        <div
            className="splashMainDiv"
            style={{
                backgroundColor: isOn ? "#F5E8C7" : "#164863",
                transition: "all 0.3s ease-in-out",
            }}
        >
            <ToastContainer limit={2} position="top-right" />{" "}
            <div
                style={{
                    position: "absolute",
                    transition: "all 0.3s ease-in-out",
                    scale: "0.7",
                    left: "5vw",
                    top: "10vh",
                }}
            >
                <DayNightSwitch />
            </div>
            <div
                className="splashSubDiv"
                style={{
                    transition: "all 0.3s ease-in-out",
                    backgroundColor: isOn ? "#F5E8C7" : "#164863",
                    color: !isOn ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                }}
            >
                <h1
                    className="splashHeading"
                    style={{
                        textShadow: !isOn
                            ? "1px 1px 5px cyan"
                            : "1px 1px 5px grey",
                    }}
                >
                    <span style={{ fontStyle: "italic" }}>
                        <img
                            src={`data:image/svg+xml,${encodeURIComponent(
                                '<svg width="32px" height="32px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M100.7 71.48c-1.71-.43-4.23 4.62-13.38 4.33s-26.94-6.45-40.22 4.91c-12.71 10.87-6.06 23.96-8.76 25.12c-2.69 1.15-6.25 0-7.6-.96c-1.35-.96-4.04-2.6-4.52-2.6s-3.37 1.92-3.18 4.62c.19 2.69 2.12 3.66 2.69 3.85c.58.19 4.23-1.25 7.89-.48c3.66.77 5.68 1.83 6.35 2.5c.67.67 9.33 11.55 23.67 11.07c14.34-.48 27.04-8.76 33.58-25.02c6.04-14.99 5.02-26.96 3.48-27.34z" fill="#8bc12d"></path><path d="M76.47 90.21c-6.4 2.06-13.9 3.1-19.22 5.94c-5.3 2.83-11.71 8.05-8.96 10.66c2.77 2.63 7.28-5.37 17.23-8.55c9.96-3.18 14.06-4.73 17.59-7.06c3.53-2.33 6.99-7.2 6-7.77c-1.12-.65-4.3 4.09-12.64 6.78z" fill="#599724"></path><path d="M91.54 40.46c-.06-.03-1.29-1.2-3.54-2.46c-2.7-1.52-6.42-2.95-11.34-3.84c-6.81-1.23-15.6-1.53-23.52 5.33c-7.93 6.86-7.61 17.12-3.94 23.6c2.59 4.57 7.42 9.45 6.64 10.15c-1.15 1.04-7.16-1.52-11.51-6.99c-4.43-5.56-9.55-18.79.82-30.41c8.9-9.98 23.02-10.32 31.41-8.88c12.53 2.15 19.66 8.8 19.66 8.8s-4.66 4.71-4.68 4.7z" fill="#b1e4fe"></path><radialGradient id="IconifyId17ecdb2904d178eab9919" cx="33.437" cy="27.652" r="60.812" gradientUnits="userSpaceOnUse"><stop offset=".367" stop-color="#d9f3fb"></stop><stop offset=".558" stop-color="#d4f1fb"></stop><stop offset=".781" stop-color="#c6ecfc"></stop><stop offset="1" stop-color="#b1e4fe"></stop></radialGradient><path d="M95.4 35.04c5.91 3.79 10.7 10.26 8.81 17.76c-2.65 10.54-27.17 6.72-33.65 5c-6.48-1.72-34.12-8.82-34.51-31.62c-.4-22.8 32.59-24 32.08-21.71c-.47 2.11-18.2 2.73-20.77 14.06s7.5 17.41 14.76 21.55s21.39 6.95 26.94 7.11c3.12.09 4.88-.74 5.06-2.2c.14-1.14-.33-2.41-2.62-4.56l3.9-5.39z" fill="url(#IconifyId17ecdb2904d178eab9919)"></path><path d="M91.54 38.62l-4.29-8.39s2.46.92 6.73 3.6c1.96 1.23 3.73 2.87 3.73 2.87l-6.17 1.92z" fill="#b1e4fe"></path></g></svg>'
                            )}`}
                            alt=""
                        />
                        Drift
                    </span>
                    <br /> tic-tac-toe
                </h1>
            </div>
            <div
                style={{
                    display: "flex",
                    flex: 5,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <form
                    className="splashForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                        }}
                    >
                        <div style={{ padding: "10px 0px" }}>
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
                        </div>
                        <div style={{ padding: "10px 0px " }}>
                            <input
                                className="splashScreenInput"
                                type="number"
                                inputMode="numeric"
                                disabled={loading}
                                value={roomKey}
                                placeholder="Enter Room Key"
                                onChange={(e) => {
                                    setRoomKey(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                        }}
                    >
                        <div style={{ padding: "10px 0px " }}>
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
                                            Math.floor(
                                                Math.random() *
                                                    (9999 - 1111 + 1)
                                            ) + 1111
                                        ).toString()
                                    );
                                }}
                                disabled={loading}
                                style={{
                                    textAlign: "center",
                                    verticalAlign: "center",
                                }}
                            >
                                <div>
                                    <img
                                        height={20}
                                        id="randomImg"
                                        width={20}
                                        style={{ marginRight: "7px" }}
                                        alt="GenerateRandom"
                                        src={MySvg}
                                    />
                                </div>
                                Random
                            </button>
                        </div>
                        <div style={{ padding: "10px 0px " }}>
                            <button
                                type="submit"
                                id="splashSubmitBtn"
                                disabled={loading}
                                onClick={() => {
                                    if (
                                        username.length <= 0 ||
                                        roomKey.length <= 0
                                    ) {
                                        if (username === "")
                                            toast.error(
                                                "Username cannot be empty"
                                            );
                                        if (roomKey === "")
                                            toast.error(
                                                "Room Key cannot be empty"
                                            );
                                    } else {
                                        document.title = document.title.concat(
                                            " | " + username
                                        );
                                        sessionStorage.setItem(
                                            "user",
                                            username
                                        );
                                        sessionStorage.setItem(
                                            "roomkey",
                                            roomKey
                                        );
                                        setLoading((e) => !e);
                                        socket.timeout(1000).emit(
                                            "setInitial",
                                            {
                                                username: username,
                                                roomKey: roomKey,
                                            },
                                            (err, val) => {
                                                if (err) {
                                                    toast.error(
                                                        "Connection timed out"
                                                    );
                                                    setLoading((e) => !e);
                                                }
                                            }
                                        );
                                    }
                                }}
                            >
                                Login {"›"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SplashScreenOnline;
