import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Container.css";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Overlay from "./Overlay";

function Container({ username, roomKey, socket }) {
    console.log("Username:", username, " Key", roomKey);
    const [x2, setX2] = React.useState(0);
    const [y2, setY2] = React.useState(0);
    React.useEffect(() => {
        if (!(x2 === 0 && y2 === 0)) {
            console.log("Sending input to server");
            socket.emit("input", { x: x2, y: y2 });
        }
    }, [y2]);
    function drawLine(x1, y1, x2, y2) {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "black";
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

    function makeBoard(factor) {
        factor = 0;
        drawLine(100 + factor - 5, 0 + factor, 100 + factor - 5, 300 - factor);
        drawLine(200 + factor, 0 + factor, 200 + factor, 300 - factor);
        drawLine(0 + factor, 100 - factor, 300 - factor, 100 - factor);
        drawLine(0 + factor, 200 - factor, 300 - factor, 200 - factor);
    }

    const [record, setRecord] = React.useState("abcdefghi");
    const [chance, setChance] = React.useState(true);
    const [winner, setWinner] = React.useState(3);
    const [tries, SetTries] = React.useState(0);
    const factor = 0;

    React.useEffect(() => {
        makeBoard(factor);
        socket.on("move", (record, chance) => {
            console.log("Record rcvd " + record + " chance rcvd: " + chance);
            setRecord(record);
            setChance(chance);
            // SetTries(tries);
            // drawSymbol(coordinates.x1, coordinates.y1);
        });
        socket.on("debug", (msg) => {
            console.log(msg);
        });
        socket.on("winner", (result) => {
            setWinner(result);
        });
        socket.on("notif", (msg) => {
            toast.info(msg);
        });
        socket.on("reset", () => {
            const canvas = document.getElementById("myCanvas");
            const ctx = canvas.getContext("2d");
            ctx.reset();
            makeBoard();
        });
    }, []);
    React.useEffect(() => {
        console.log("Tries updated");
    }, [tries]);

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
        buildBoard(record);
    }, [record]);
    function resetGame() {
        socket.emit("reset");
        makeBoard();
    }

    return (
        <div className="App">
            <ToastContainer position="top-right" />
            <div
                className="SubDiv"
                style={{
                    backgroundColor: "white",
                }}
            >
                <Header
                    username={username}
                    socket={socket}
                    tries={tries}
                    record={record}
                />
                <Hero chance={chance} setX2={setX2} setY2={setY2} />
                <Footer username={username} socket={socket} chance={chance} />
            </div>
            <Overlay
                socket={socket}
                username={username}
                tries={tries}
                winner={winner}
                resetGame={resetGame}
            />
        </div>
    );
}

export default Container;

/**
 *
 * Made by NAMAN
 * https://www.github.com/namannangia
 *
 * Code logics shortened using AI after proper testing
 *
 * WORKING MECHANISM
 *
 * 1) A 300x300 CANVAS IS DRAWN
 * 2) 2 spacing lines horizontally with 100px margin are added using makeBoard function
 * 3) 2 spacing lines vertically with 100px margin are added using makeBoard function
 * 4) Ranges are specified mapping to 9 different imaginary boxes where symbols will be drawn using drawSymbol function
 * 5) The draw symbol function checks if it is turn of X or 0 to play and draws symbols accordingly
 * 6) On Every symbol drawn, a counter is incremented  and another function constantly checks for winning combinations
 * 7) If any combination is found, games stops, overlay is displayed with winning player info along with PLAY AGAIN button
 * 8) UI indications for the player expected to move that turn
 * 9) If 9 tries are reached, game ends and a Draw(game Tie) is considered final
 * 10) UI Indications to prevent double entry on a pre-filled box
 * 11) Enteries are stored as a 9-character string in a React state named "Record" starting 'a' to 'i'
 * 12) each digit represents a box starting from zero from top left to  8 in bottom right
 * 13) This string is then processed to find winning combination with 0 marked as Circle or Player 2 and 1 as Cross or Player 1
 * 14) After game ends, resetGame() function can be called that clears the canvas and re-draws the markings and resets all states to default
 *
 * */

/**
 * 0  100  100  300
 * 200  0 200 300
 * 0  100 300 100
 * 0  200 300 200
 */

// React.useEffect(() => {
// setTimeout(() => {
// if (red > 250) setRed(0);
// if (blue > 250) setBlue(0);
// if (green > 250) setGreen(0);
// setRed((e) => e + 50);
// setGreen((e) => e + 30);
// setBlue((e) => e + 40);
// document.getElementById("myCanvas").getContext("2d").strokeStyle =
// "rgb(".concat(
// red.toString(),
// ",",
// blue.toString(),
// ",",
// green.toString(),
// ",)"
// );
// }, 500);
// });

// function runChance(x1, y1) {
//   if (x1 > 0 && x1 < 100 && y1 > 0 && y1 < 100) {
//     editRecord(1, 50, 50);
//   }
//   if (x1 > 0 && x1 < 100 && y1 > 100 && y1 < 200) {
//     editRecord(4, 50, 150);
//   }
//   if (x1 > 0 && x1 < 100 && y1 > 200 && y1 < 300) {
//     editRecord(7, 50, 250);
//   }
//   if (x1 > 100 && x1 < 200 && y1 > 0 && y1 < 100) {
//     editRecord(2, 150, 50);
//   }
//   if (x1 > 100 && x1 < 200 && y1 > 100 && y1 < 200) {
//     editRecord(5, 150, 150);
//   }
//   if (x1 > 100 && x1 < 200 && y1 > 200 && y1 < 300) {
//     editRecord(8, 150, 250);
//   }
//   if (x1 > 200 && x1 < 300 && y1 > 0 && y1 < 100) {
//     editRecord(3, 250, 50);
//   }
//   if (x1 > 200 && x1 < 300 && y1 > 100 && y1 < 200) {
//     editRecord(6, 250, 150);
//   }
//   if (x1 > 200 && x1 < 300 && y1 > 200 && y1 < 300) {
//     editRecord(9, 250, 250);
//   }
// }

// function resetGame() {
//     const canvas = document.getElementById("myCanvas");
//     const ctx = canvas.getContext("2d");
//     ctx.reset();
//     makeBoard(factor);
//     setChance(true);
//     setRecord("abcdefghi");
//     setWinner(2);
//     SetTries(0);
// }

// React.useEffect(() => {}, [y2]);

// React.useEffect(() => {
// const winningCombos = [
// [0, 1, 2],
// [3, 4, 5],
// [6, 7, 8],
// [0, 3, 6],
// [1, 4, 7],
// [2, 5, 8],
// [2, 4, 6],
// [0, 4, 8],
// ];

// for (const combo of winningCombos) {
// const [a, b, c] = combo;
// if (
// record.charAt(a) === record.charAt(b) &&
// record.charAt(b) === record.charAt(c)
// ) {
// setWinner(record.charAt(a) === "1" ? 1 : 0);
// return;
// }
// }
// }, [record]);

// function runChance(x1, y1) {
//     for (let x = 0; x <= 300; x += 100) {
//         for (let y = 0; y <= 300; y += 100) {
//             if (x1 > x && x1 < x + 100 && y1 > y && y1 < y + 100) {
//                 editRecord((x / 100) * 3 + y / 100 + 1, x + 50, y + 50);
//                 return;
//             }
//         }
//     }
// }

// function editRecord(pos, x1, y1) {
//     var temp = "abcdefghi";
//     if (record.charAt(pos - 1) === temp.charAt(pos - 1)) {
//         drawSymbol(x1, y1);
//         chance
//             ? setRecord((e) =>
//                   e.substring(0, pos - 1).concat("1", e.substring(pos))
//               )
//             : setRecord((e) =>
//                   e.substring(0, pos - 1).concat("0", e.substring(pos))
//               );
//     } else toast.info("Move not allowed");
// }
