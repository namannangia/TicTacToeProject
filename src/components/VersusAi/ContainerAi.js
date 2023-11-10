import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "../../styles/Container.css";
import Header from "../Offline/HeaderOffline";
import Hero from "../Common/Hero";
import Footer from "../Offline/FooterOffline";
import Overlay from "../Offline/OverlayOffline";
import { computeMove } from "tic-tac-toe-ai-engine";

function ContainerAi({ firstPlayer }) {
    const secondPlayer = "Computer";
    function drawLine(x1, y1, x2, y2) {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "white";
        ctx.lineCap = "round";
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    function resetGame() {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.reset();
        makeBoard(factor);
        setChance(true);
        setRecord("abcdefghi");
        setWinner(3);
        SetTries(0);
    }
    function drawSymbol(x1, y1, chance) {
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
    function editRecord(pos, x1, y1) {
        var temp = "abcdefghi";
        if (record.charAt(pos - 1) === temp.charAt(pos - 1)) {
            SetTries((e) => e + 1);
            chance
                ? setRecord((e) =>
                      e.substring(0, pos - 1).concat("1", e.substring(pos))
                  )
                : setRecord((e) =>
                      e.substring(0, pos - 1).concat("0", e.substring(pos))
                  );
            setChance((e) => !e);
        } else toast.info("Move not allowed");
    }
    function runChance(x1, y1) {
        for (let x = 0; x <= 300; x += 100) {
            for (let y = 0; y <= 300; y += 100) {
                if (x1 > x && x1 < x + 100 && y1 > y && y1 < y + 100) {
                    editRecord((x / 100) * 3 + y / 100 + 1, x + 50, y + 50);
                    return;
                }
            }
        }
    }
    function makeBoard(factor) {
        drawLine(100 + factor - 5, 0 + factor, 100 + factor - 5, 300 - factor);
        drawLine(200 + factor, 0 + factor, 200 + factor, 300 - factor);
        drawLine(0 + factor, 100 - factor, 300 - factor, 100 - factor);
        drawLine(0 + factor, 200 - factor, 300 - factor, 200 - factor);
    }

    const [record, setRecord] = React.useState("abcdefghi");
    const [chance, setChance] = React.useState(true);
    const [winner, setWinner] = React.useState(3);
    const [x2, setX2] = React.useState(0);
    const [y2, setY2] = React.useState(0);
    const [tries, SetTries] = React.useState(0);
    const factor = 0;

    React.useEffect(() => {
        runChance(x2, y2);
    }, [y2]);
    function convertStringToArray(inputString) {
        return inputString.split("").map((char) => {
            if (char === "0") {
                return "O";
            } else if (char === "1") {
                return "X";
            } else {
                return "";
            }
        });
    }
    function convertArrayToString(inputArray) {
        var temp = "abcdefghi";
        return inputArray
            .map((symbol, idx) => {
                if (symbol === "O") {
                    return "0";
                } else if (symbol === "X") {
                    return "1";
                } else {
                    return temp.charAt(idx);
                }
            })
            .join("");
    }
    function buildBoard() {
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
        buildBoard();
    }, [record]);

    React.useEffect(() => {
        if (!chance) {
            SetTries((e) => e + 1);
            setTimeout(() => {
                var nextState = computeMove(
                    convertStringToArray(record)
                ).nextBestGameState;
                var strNextState = convertArrayToString(nextState);
                setRecord(strNextState);
                setChance((e) => !e);
            }, 500);
        }
    }, [chance]);

    React.useEffect(() => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                record.charAt(a) === record.charAt(b) &&
                record.charAt(b) === record.charAt(c)
            ) {
                setWinner(record.charAt(a) === "1" ? 1 : 0);
                return;
            }
        }
        if (tries === 9) setWinner(2);
    }, [record]);

    React.useEffect(() => {
        makeBoard(factor);
    }, []);

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
                    secondPlayer={secondPlayer}
                    record={record}
                    firstPlayer={firstPlayer}
                />
                <Hero chance={chance} setX2={setX2} setY2={setY2} />
                <Footer
                    secondPlayer={secondPlayer}
                    chance={chance}
                    firstPlayer={firstPlayer}
                />
            </div>
            <Overlay
                winner={winner}
                resetGame={resetGame}
                firstPlayer={firstPlayer}
                secondPlayer={secondPlayer}
            />
        </div>
    );
}

export default ContainerAi;
