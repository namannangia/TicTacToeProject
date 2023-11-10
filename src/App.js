import React from "react";
import SplashScreen from "./components/SplashScreenOnline";
import Container from "./components/Container";
import { Routes, Route, Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import Landing from "./components/Landing";
import { toast } from "react-toastify";
import Overhead from "./components/Overhead";
import Landing2 from "./components/Landing2";
// const socket = io.connect("https://tictactoe-ueyb.onrender.com:443");
// const socket = io.connect("https://tictactoe25.adaptable.app:443", {
//     transports: ["websocket"],
// });

function App() {
    const socket = React.useRef(io.connect("http://155.248.249.82:3000/"));
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
                            socket={socket.current}
                            setSecondPlayer={setSecondPlayer}
                            setFirstPlayer={setFirstPlayer}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    }
                />
                <Route path="" element={<Landing2 socket={socket.current} />} />
                <Route
                    path="game"
                    element={
                        <Container
                            socket={socket.current}
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
