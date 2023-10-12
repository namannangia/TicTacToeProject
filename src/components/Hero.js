import React from "react";

function Hero({ chance, setX2, setY2 }) {
  return (
    <canvas
      id="myCanvas"
      width="300"
      height="300"
      style={{
        backgroundColor: chance
          ? "rgba(225, 152, 152,0.5) "
          : "rgba(152, 228, 255,0.5)",
        borderRadius: "20px",
        boxShadow: "0px 0px 40px 30px ".concat(
          chance ? "rgb(225, 152, 152)" : "rgb(152, 228, 255)"
        ),
      }}
      onMouseUp={(event) => {
        setX2(
          event.clientX -
            Math.ceil(
              document.getElementById("myCanvas").getBoundingClientRect().left
            )
        );
        setY2(
          event.clientY -
            Math.ceil(
              document.getElementById("myCanvas").getBoundingClientRect().top
            )
        );
      }}
    ></canvas>
  );
}

export default Hero;
