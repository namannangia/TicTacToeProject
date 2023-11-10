import React from "react";
import { Route, Outlet, Routes } from "react-router-dom";
import SplashScreenOnline from "./SplashScreenOnline";
import Container from "./Container";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

function Temp({
    socketURL,
    firstPlayer,
    setFirstPlayer,
    secondPlayer,
    setSecondPlayer,
}) {
    const socket = React.useRef(io.connect(socketURL));
    socket.current.on("connection", () => {
        alert("Connected");
    });
    React.useEffect(() => {
        socket.current.on("notif", (obj) => {
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
    }, []);
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState(
        sessionStorage.getItem("user") ? sessionStorage.getItem("user") : ""
    );
    const [roomKey, setRoomKey] = React.useState(
        sessionStorage.getItem("roomkey")
            ? sessionStorage.getItem("roomkey")
            : ""
    );
    const [online, setOnline] = React.useState(false);
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route
                    path=""
                    element={
                        <SplashScreenOnline
                            online={online}
                            setOnline={setOnline}
                            username={username}
                            setUsername={setUsername}
                            roomKey={roomKey}
                            setRoomKey={setRoomKey}
                            socket={socket.current}
                            socketUrl={socketURL}
                            setSecondPlayer={setSecondPlayer}
                            setFirstPlayer={setFirstPlayer}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    }
                />
                <Route
                    path="game"
                    element={
                        <Container
                            online={online}
                            setOnline={setOnline}
                            socket={socket.current}
                            socketUrl={socketURL}
                            username={username}
                            roomKey={roomKey}
                            secondPlayer={secondPlayer}
                            firstPlayer={firstPlayer}
                        />
                    }
                />
            </Route>
        </Routes>
    );
}

export default Temp;
