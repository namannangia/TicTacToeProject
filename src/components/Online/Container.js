import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "../../styles/Container.css";
import Header from "./Header";
// import Hero from "../Common/Hero";
import Hero from "./HeroNext";
import Footer from "./Footer";
import Overlay from "../Common/Overlay";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { data } from "../Common/datacontext";
import { theme } from "../Common/themecontext";

function Container({
    socket,
    socketURL,
    username,
    roomKey,
    setFirstPlayer,
    setSecondPlayer,
    firstPlayer,
    secondPlayer,
    online,
}) {
    const myChance = username === firstPlayer ? true : false;
    const [comvo, setComvos] = React.useState([]);
    const navigate = useNavigate();
    const {
        chance,
        setChance,
        winner,
        setWinner,
        isOn,
        record,
        setRecord,
        tries,
        setTries,
    } = React.useContext(data);
    const [heading, setHeading] = React.useState("");
    React.useEffect(() => {
        socket.on("move", (record, chance, tries) => {
            // console.log("Record rcvd " + record + " chance rcvd: " + chance);
            setRecord(record);
            setChance(chance);
            setTries(tries);
        });
        socket.on("debug", (msg) => {
            // console.log(msg);
        });
        socket.on("winner", (result) => {
            if (result !== winner) {
                setWinner(result);
            }
        });
        socket.on("resetBoard", () => {
            // console.log("Reset Board request rcvd");
            resetGame(false);
        });
        socket.on("userInfo", (p1, p2) => {
            setSecondPlayer(p2);
            setFirstPlayer(p1);
            setHeading("");
        });
        socket.on("holdGame", () => {
            setHeading("Opponent disconnected. Waiting for reconnection.");
        });
        if (secondPlayer === "" || firstPlayer === "") navigate("/online");
    }, []);
    React.useEffect(() => {
        if (winner !== 3) {
            socket.emit("winner", winner);
            setTimeout(async () => {
                setHeading(
                    <div>
                        <span
                            style={{
                                fontStyle: "italic",
                                fontVariant: "small-caps",
                                fontSize: "25px",
                                fontWeight: "200",
                            }}
                        >
                            {winner === 0
                                ? secondPlayer.toString().toUpperCase()
                                : winner === 1
                                ? firstPlayer.toString().toUpperCase()
                                : "Draw"}
                        </span>
                        <br />
                        <span
                            style={{
                                fontSize: "25px",
                            }}
                        >
                            {winner === 0
                                ? "(O) wins 🎉"
                                : winner === 1
                                ? "(X) wins 🎉"
                                : "🏳️"}
                        </span>
                    </div>
                );
            }, 1250);
        }
    }, [winner]);
    React.useEffect(() => {
        if (record !== "abcdefghi") socket.emit("input", record);
    }, [record]);
    function resetGame(x) {
        if (x) {
            socket.emit("reset");
        }
        setHeading("");
        setWinner(3);
        setTries(0);
        setComvos([]);
    }
    return (
        <div className="App">
            <ToastContainer position="top-right" />
            <div
                className="SubDiv"
                style={{
                    backgroundColor: isOn ? "#F6F4EB" : "#164863",
                }}
            >
                <Header
                    username={username}
                    secondPlayer={secondPlayer}
                    record={record}
                    roomKey={roomKey}
                    firstPlayer={firstPlayer}
                    socket={socket}
                />
                <Hero myChance={myChance} comvo={comvo} setComvos={setComvos} />
                <Footer
                    username={username}
                    secondPlayer={secondPlayer}
                    chance={chance}
                    firstPlayer={firstPlayer}
                />
            </div>
            <Overlay heading={heading} resetGame={resetGame} />
        </div>
    );
}

export default Container;
