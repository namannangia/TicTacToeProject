import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Container.css";
import Header from "./HeaderOffline";
import Hero from "./HeroNext.js";
import Footer from "./FooterOffline";
import Overlay from "../Common/Overlay.js";
import { useNavigate } from "react-router-dom";
import { theme } from "../Common/themecontext";
import { data } from "../Common/datacontext";
import { computeMove } from "tic-tac-toe-ai-engine";
function ContainerOffline({ firstPlayer, secondPlayer, isAi }) {
    const { isOn } = useContext(theme);
    const {
        setChance,
        setRecord,
        setTries,
        setWinner,
        winner,
        chance,
        record,
    } = useContext(data);
    const navigate = useNavigate();
    const [heading, setHeading] = React.useState("");
    React.useEffect(() => {
        if (firstPlayer === "" || secondPlayer === "") navigate("/offline");
    }, []);
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
    React.useEffect(() => {
        if (isAi)
            if (!chance) {
                setTries((e) => e + 1);
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
        if (winner !== 3)
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
    }, [winner]);

    return (
        <>
            <ToastContainer position="top-right" />
            <div
                className="SubDiv"
                style={{
                    backgroundColor: isOn ? "#F6F4EB" : "#164863",
                }}
            >
                <Header secondPlayer={secondPlayer} firstPlayer={firstPlayer} />
                <Hero />
                <Footer secondPlayer={secondPlayer} firstPlayer={firstPlayer} />
            </div>
            <Overlay
                firstPlayer={firstPlayer}
                heading={heading}
                secondPlayer={secondPlayer}
                resetGame={() => {
                    setChance(true);
                    setRecord("abcdefghi");
                    setTries(0);
                    setWinner(3);
                    setHeading("");
                }}
            />
        </>
    );
}

export default ContainerOffline;
