import React from "react";
import "./App.css";

function App() {
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
  function editRecord(position, value) {
    if (x1 > 0 && x1 < 100 && y1 > 0 && y1 < 100) {
      if (record.charAt(0) === "2") {
        drawSymbol(50, 50);
        chance
          ? setRecord((e) => "1".concat(e.substring(1)))
          : setRecord((e) => "0".concat(e.substring(1)));
        setChance((e) => !e);
      } else alert("Move Not allowed");
    }
  }
  function drawSymbol(x1, y1) {
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
  function runChance(x1, y1) {
    //pos 1
    if (x1 > 0 && x1 < 100 && y1 > 0 && y1 < 100) {
      if (record.charAt(0) === "2") {
        drawSymbol(50, 50);
        chance
          ? setRecord((e) => "1".concat(e.substring(1)))
          : setRecord((e) => "0".concat(e.substring(1)));
        setChance((e) => !e);
      } else alert("Move Not allowed");
    }
    if (x1 > 0 && x1 < 100 && y1 > 100 && y1 < 200) {
      //pos 4
      if (record.charAt(3) === "2") {
        drawSymbol(50, 150);
        chance
          ? setRecord((e) => e.substring(0, 3).concat("1", e.substring(4)))
          : setRecord((e) => e.substring(0, 3).concat("0", e.substring(4)));
        setChance((e) => !e);
      } else alert("Move Not allowed");
    }
    if (x1 > 0 && x1 < 100 && y1 > 200 && y1 < 300) {
      //pos 7
      if (record.charAt(6) === "2") {
        drawSymbol(50, 250);
        chance
          ? setRecord((e) => e.substring(0, 6).concat("1", e.substring(7)))
          : setRecord((e) => e.substring(0, 6).concat("0", e.substring(7)));
        setChance((e) => !e);
      } else alert("Move Not allowed");
    }
    if (x1 > 100 && x1 < 200 && y1 > 0 && y1 < 100) {
      //pos 2
      if (record.charAt(1) === "2") {
        drawSymbol(150, 50);
        chance
          ? setRecord((e) => e.substring(0, 1).concat("1", e.substring(2)))
          : setRecord((e) => e.substring(0, 1).concat("0", e.substring(2)));
        setChance((e) => !e);
      } else alert("Move Not allowed");
    }
    if (x1 > 100 && x1 < 200 && y1 > 100 && y1 < 200) {
      //pos 5
      if (record.charAt(4) === "2") {
        drawSymbol(150, 150);
        chance
          ? setRecord((e) => e.substring(0, 5).concat("1", e.substring(6)))
          : setRecord((e) => e.substring(0, 5).concat("0", e.substring(6)));
        setChance((e) => !e);
      } else alert("Move Not allowed");
    }
    if (x1 > 100 && x1 < 200 && y1 > 200 && y1 < 300) {
      drawSymbol(150, 250);
    }
    if (x1 > 200 && x1 < 300 && y1 > 0 && y1 < 100) {
      drawSymbol(250, 50);
    }
    if (x1 > 200 && x1 < 300 && y1 > 100 && y1 < 200) {
      drawSymbol(250, 150);
    }
    if (x1 > 200 && x1 < 300 && y1 > 200 && y1 < 300) {
      drawSymbol(250, 250);
    }
  }
  function makeBoard(factor) {
    drawLine(100 + factor - 5, 0 + factor, 100 + factor - 5, 300 - factor);
    drawLine(200 + factor, 0 + factor, 200 + factor, 300 - factor);
    drawLine(0 + factor, 100 - factor, 300 - factor, 100 - factor);
    drawLine(0 + factor, 200 - factor, 300 - factor, 200 - factor);
  }
  // player1 starts first with X
  // player2 starts second with O
  // 0 represents circle
  // 1 represents cross
  // 2 represents blank
  // const [red, setRed] = React.useState(0);
  // const [green, setGreen] = React.useState(0);
  // const [blue, setBlue] = React.useState(0);

  const [record, setRecord] = React.useState("222222222");
  const [chance, setChance] = React.useState(true);
  const [winner, setWinner] = React.useState(2);
  const [x1, setX1] = React.useState(0);
  const [y1, setY1] = React.useState(0);
  const [x2, setX2] = React.useState(0);
  const [y2, setY2] = React.useState(0);
  const factor = 0;

  React.useEffect(() => {
    runChance(x2, y2);
  }, [y2]);

  React.useEffect(() => {
    if ((record.charAt(0) === record.charAt(1)) === record.charAt(2))
      setWinner(record.charAt(0) === "1" ? 1 : 0);

    if ((record.charAt(4) === record.charAt(5)) === record.charAt(3))
      setWinner(record.charAt(4) === "1" ? 1 : 0);

    if ((record.charAt(6) === record.charAt(7)) === record.charAt(8))
      setWinner(record.charAt(6) === "1" ? 1 : 0);

    if ((record.charAt(0) === record.charAt(3)) === record.charAt(6))
      setWinner(record.charAt(0) === "1" ? 1 : 0);

    if ((record.charAt(1) === record.charAt(4)) === record.charAt(7))
      setWinner(record.charAt(1) === "1" ? 1 : 0);

    if ((record.charAt(2) === record.charAt(5)) === record.charAt(8))
      setWinner(record.charAt(2) === "1" ? 1 : 0);

    if ((record.charAt(2) === record.charAt(4)) === record.charAt(6))
      setWinner(record.charAt(2) === "1" ? 1 : 0);

    if ((record.charAt(0) === record.charAt(4)) === record.charAt(8))
      setWinner(record.charAt(0) === "1" ? 1 : 0);

    console.log(record + " :" + winner);
  }, [record]);

  React.useEffect(() => {
    makeBoard(factor);
    // drawSymbol(50, 250);
    // drawSymbol(150, 50);
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: winner === 2 ? "white" : "rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            fontWeight: "400",
            fontVariant: "small-caps",
            marginBottom: "70px",
            textAlign: "center",
          }}
        >
          Live
          <br /> tic-tac-toe
          <br /> {record}
        </h1>
        <canvas
          id="myCanvas"
          width="300"
          height="300"
          style={{
            backgroundColor: chance
              ? "rgba(225, 152, 152,0.5) "
              : "rgba(152, 228, 255,0.5)",
            // backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0px 0px 40px 30px ".concat(
              chance ? "rgb(225, 152, 152)" : "rgb(152, 228, 255)"
            ),
          }}
          onMouseUp={(event) => {
            setX2(
              (e) =>
                e +
                event.clientX -
                e -
                Math.ceil(
                  document.getElementById("myCanvas").getBoundingClientRect()
                    .left
                )
            );
            setY2(
              (e) =>
                e +
                event.clientY -
                e -
                Math.ceil(
                  document.getElementById("myCanvas").getBoundingClientRect()
                    .top
                )
            );
          }}
        ></canvas>
        <button
          style={{ visibility: "hidden" }}
          onClick={() => {
            const canvas = document.getElementById("myCanvas");
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 300, 300);
          }}
        >
          Clear Canvas
        </button>
        <input
          type="text"
          value={x1}
          onChange={(e) => {
            setX1(e.target.value);
          }}
        ></input>
        <input
          type="text"
          value={y1}
          onChange={(e) => {
            setY1(e.target.value);
          }}
        ></input>
        <input
          type="text"
          value={x2}
          onChange={(e) => {
            setX2(e.target.value);
          }}
        ></input>
        <input
          type="text"
          value={y2}
          onChange={(e) => {
            setY2(e.target.value);
          }}
        ></input>
        <button
          style={{ visibility: "hidden" }}
          onClick={() => {
            drawLine(x1, y1, x2, y2);
          }}
        >
          Submit{" "}
        </button>
        <div style={{ flex: 1, marginBottom: "40px" }}>
          <h1
            style={{
              margin: "0px",
              fontWeight: "400",
              fontVariant: "small-caps",
            }}
          >
            {chance ? "Player 1" : "Player 2"}
          </h1>
          <h3
            style={{
              margin: "0px",
              fontWeight: "400",
              fontVariant: "small-caps",
            }}
          >
            should move now!
          </h3>
        </div>
      </div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          display: "flex",
          top: "0px",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          visibility: winner === 2 ? "hidden" : "visible",
        }}
      >
        <h1
          style={{
            flex: 1,
            height: "10%",
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
            justifyItems: "center",
            textAlign: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          Player {winner === 1 ? "1" : "2"} wins!
        </h1>
      </div>
    </div>
  );
}

export default App;

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
