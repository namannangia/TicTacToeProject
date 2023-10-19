import React from "react";
import SplashScreen from "./components/SplashScreen";
import Container from "./components/Container";
import { io } from "socket.io-client";
var socket = io.connect("localhost:3000");

function App() {
    const [username, setUsername] = React.useState("");
    const [roomKey, setRoomKey] = React.useState("");
    const [page, setPage] = React.useState(true);
    React.useEffect(() => {
        socket.on("start", () => {
            setPage(false);
        });
    }, []);
    return (
        <div>
            {page ? (
                <SplashScreen
                    username={username}
                    setUsername={setUsername}
                    roomKey={roomKey}
                    setRoomKey={setRoomKey}
                    setPage={setPage}
                    socket={socket}
                />
            ) : (
                <Container
                    socket={socket}
                    username={username}
                    roomKey={roomKey}
                />
            )}
        </div>
    );
}

export default App;
