import React from "react";

function Hero({ chance, setX2, setY2 }) {
    return (
        <div className="heroMainDiv">
            <canvas
                id="myCanvas"
                width="300"
                height="300"
                style={{
                    display: "flex",
                    backgroundColor: chance
                        ? "rgba(135, 196, 255,0.5) "
                        : "rgba(153, 176, 128,0.5)",
                    borderRadius: "20px",
                    boxShadow: "10px 10px 5px 0px ".concat(
                        chance ? "rgb(135, 196, 255)" : "rgb(153, 176, 128)"
                    ),
                }}
                onMouseUp={(event) => {
                    setX2(
                        event.clientX -
                            Math.ceil(
                                document
                                    .getElementById("myCanvas")
                                    .getBoundingClientRect().left
                            )
                    );
                    setY2(
                        event.clientY -
                            Math.ceil(
                                document
                                    .getElementById("myCanvas")
                                    .getBoundingClientRect().top
                            )
                    );
                }}
            ></canvas>
        </div>
    );
}

export default Hero;
