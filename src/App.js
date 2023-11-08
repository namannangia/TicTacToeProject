import React from "react";
import SplashScreen from "./components/SplashScreen";
import Container from "./components/Container";
import { Routes, Route, Outlet, Link, redirect } from "react-router-dom";
import { io } from "socket.io-client";
import Landing from "./components/Landing";
import { toast } from "react-toastify";
import Overhead from "./components/Overhead";

function App() {
    const [socket, setSocket] = React.useState(io.connect(""));

    const [username, setUsername] = React.useState(
        sessionStorage.getItem("user") ? sessionStorage.getItem("user") : ""
    );
    const [roomKey, setRoomKey] = React.useState(
        sessionStorage.getItem("roomkey")
            ? sessionStorage.getItem("roomkey")
            : ""
    );
    const [firstPlayer, setFirstPlayer] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [secondPlayer, setSecondPlayer] = React.useState("");

    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route
                    path="login"
                    element={
                        <SplashScreen
                            username={username}
                            setUsername={setUsername}
                            roomKey={roomKey}
                            setRoomKey={setRoomKey}
                            socket={socket}
                            setSecondPlayer={setSecondPlayer}
                            setFirstPlayer={setFirstPlayer}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    }
                />
                <Route
                    path=""
                    element={
                        <Landing
                            socket={socket}
                            setLoading={setLoading}
                            setSocket={setSocket}
                        />
                    }
                />
                <Route
                    path="game"
                    element={
                        <Container
                            socket={socket}
                            username={username}
                            roomKey={roomKey}
                            secondPlayer={secondPlayer}
                            firstPlayer={firstPlayer}
                        />
                    }
                />
            </Route>
            <Route path="/singlePlayer" element={<button>2nd page</button>} />
        </Routes>
    );
}

export default App;
