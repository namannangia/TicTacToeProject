import React from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/splash.css";

function SplashScreenOffline({
    setSecondPlayer,
    secondPlayer,
    firstPlayer,
    setFirstPlayer,
}) {
    const navigate = useNavigate();

    return (
        <div className="splashMainDiv">
            <ToastContainer limit={2} position="top-right" />
            <div className="splashSubDiv">
                <h1 className="splashHeading">
                    Live <span id="theSpan">❤️</span>
                    <br /> tic-tac-toe
                    <br />
                </h1>
            </div>
            <form
                className="splashForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/offline/game");
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                    }}
                >
                    <div style={{ padding: "10px 0px" }}>
                        <input
                            className="splashScreenInput"
                            type="text"
                            value={firstPlayer}
                            placeholder="1st Player Name"
                            onChange={(e) => {
                                setFirstPlayer(e.target.value);
                            }}
                        />
                    </div>
                    <div style={{ padding: "10px 0px " }}>
                        <input
                            className="splashScreenInput"
                            value={secondPlayer}
                            placeholder="2nd Player Name"
                            onChange={(e) => {
                                setSecondPlayer(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                    }}
                >
                    <div style={{ padding: "10px 0px " }}></div>
                    <div style={{ padding: "10px 0px " }}>
                        <button type="submit" id="splashSubmitBtn">
                            Login {"›"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SplashScreenOffline;