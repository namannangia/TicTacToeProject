import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "../styles/Container.css";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Overlay from "./Overlay";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Container({ socket, username, roomKey, firstPlayer, secondPlayer }) {
    const [record, setRecord] = React.useState("abcdefghi");
    const [chance, setChance] = React.useState(true);
    const [winner, setWinner] = React.useState(3);
    const [x2, setX2] = React.useState(0);
    const [y2, setY2] = React.useState(0);
    const factor = 0;
    const navigate = useNavigate();

    console.log("Username:", username, " Key", roomKey);
    React.useEffect(() => {
        if (socket.connected === true) {
            if (!(x2 === 0 && y2 === 0)) {
                console.log("Sending input to server");
                socket.emit("input", { x: x2, y: y2 });
            }
        } else {
            socket.current = io.connect("https//localhost:3000");
            socket.timeout(1000).emit(
                "setInitial",
                {
                    username: username,
                    roomKey: roomKey,
                },
                (err, val) => {
                    if (err) {
                        toast.error("Connection timed out");
                        setTimeout(() => {
                            window.confirm("Change server URL?");
                        }, 200);
                    }
                }
            );
        }
    }, [y2]);
    function drawLine(x1, y1, x2, y2) {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "#faf8ed";
        ctx.lineCap = "round";
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    function drawSymbol(x1, y1, chance) {
        // SetTries((e) => e + 1);
        if (chance) {
            drawLine(x1 - 20, y1 - 20, x1, y1);
            drawLine(x1 - 20, y1 + 20, x1, y1);
            drawLine(x1 + 20, y1 - 20, x1, y1);
            drawLine(x1 + 20, y1 + 20, x1, y1);
        } else {
            const canvas = document.getElementById("myCanvas");
            const ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(x1, y1, 20, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    function makeBoard(factor = 0) {
        drawLine(100 + factor - 5, 0 + factor, 100 + factor - 5, 300 - factor);
        drawLine(200 + factor, 0 + factor, 200 + factor, 300 - factor);
        drawLine(0 + factor, 100 - factor, 300 - factor, 100 - factor);
        drawLine(0 + factor, 200 - factor, 300 - factor, 200 - factor);
    }

    React.useEffect(() => {
        makeBoard(factor);
        socket.on("move", (record, chance) => {
            console.log("Record rcvd " + record + " chance rcvd: " + chance);
            setRecord(record);
            setChance(chance);
        });
        socket.on("debug", (msg) => {
            console.log(msg);
        });
        socket.on("winner", (result) => {
            setWinner(result);
        });
        socket.on("resetBoard", () => {
            console.log("Reset Board request rcvd");
            resetGame(false);
        });
        socket.on("holdGame", () => {
            setWinner(4);
        });
    }, []);

    async function buildBoard() {
        var canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        console.log("Reset Board request accomplished");
        ctx.reset();
        makeBoard(0);
        var temp = "abcdefghi";
        const mapping = [
            [50, 50],
            [50, 150],
            [50, 250],
            [150, 50],
            [150, 150],
            [150, 250],
            [250, 50],
            [250, 150],
            [250, 250],
        ];
        mapping.map((data, idx) => {
            if (record.charAt(idx) !== temp.charAt(idx))
                drawSymbol(
                    mapping[idx][0],
                    mapping[idx][1],
                    record.charAt(idx) === "1" ? true : false
                );
            return null;
        });
    }
    React.useEffect(() => {
        buildBoard(record);
    }, [record]);
    function resetGame(x) {
        if (x) socket.emit("reset");
        const canvas = document.getElementById("myCanvas");
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                console.log("Reset Board request accomplished");
                ctx.reset();
                makeBoard(0);
            }
        }
    }

    return (
        <div className="App">
            <ToastContainer position="top-right" />
            <div
                className="SubDiv"
                style={{
                    backgroundColor: "#FAF8ED",
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
                <Hero chance={chance} setX2={setX2} setY2={setY2} />
                <Footer
                    username={username}
                    secondPlayer={secondPlayer}
                    chance={chance}
                    firstPlayer={firstPlayer}
                />
            </div>
            <Overlay
                socket={socket}
                username={username}
                winner={winner}
                resetGame={resetGame}
                firstPlayer={firstPlayer}
                secondPlayer={secondPlayer}
            />
        </div>
    );
}

export default Container;
