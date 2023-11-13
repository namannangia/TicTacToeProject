import React from "react";
import { data } from "../Common/datacontext";
import { roundData, crossData, noData } from "../../assets/icons";
import { toast } from "react-toastify";
function Hero() {
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
    const size = window.innerWidth < 450 ? "80vw" : "60vh";
    const [comvo, setComvos] = React.useState([]);
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
                const combo1 = document.getElementById(
                    a.toString().concat("gameBtn")
                );
                const combo2 = document.getElementById(
                    b.toString().concat("gameBtn")
                );
                const combo3 = document.getElementById(
                    c.toString().concat("gameBtn")
                );
                const comboElements = [combo1, combo2, combo3];
                toggleOpacity(comboElements);
                setWinner(record.charAt(a) === "1" ? 1 : 0);
                setComvos(combo);
                return;
            }
        }
        if (tries === 9) setWinner(2);
    }, [record]);
    const toggleOpacity = (elements, index = 0) => {
        if (index >= elements.length * 2) return;

        elements.forEach((element) => {
            element.style.opacity = index % 2 === 0 ? "0.2" : "1";
        });

        setTimeout(() => toggleOpacity(elements, index + 1), 250);
    };

    return (
        <div className="heroMainDiv">
            <div
                id="canvas"
                style={{
                    display: "flex",
                    height: size,
                    width: size,
                    flexFlow: "wrap",
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    id="bgCircle"
                    style={{
                        display: "block",
                        position: "absolute",
                        opacity: winner === 1 || winner === 0 ? 0.2 : 1,
                        zIndex: 1,
                        transition: "none",
                        backgroundColor: isOn ? "#F5E8C7" : "#072541",
                        borderRadius: "50%",
                        scale: "0.8",
                        height: size,
                        width: size,
                    }}
                ></div>

                {"123456789".split("").map((data, key) => {
                    return (
                        <div
                            id={key.toString().concat("gameBtn")}
                            key={key}
                            style={{
                                opacity:
                                    winner !== 3 &&
                                    (comvo[0] === key ||
                                        comvo[1] === key ||
                                        comvo[2] === key)
                                        ? 1
                                        : winner === 3
                                        ? 1
                                        : 0.2,
                                display: "flex",
                                // outlineColor: "black",
                                // outlineStyle: "solid",
                                // outlineOffset: "0px",
                                height:
                                    size === "80vw"
                                        ? `${80 / 3}vw`
                                        : `calc(${60 / 3}vh)`,
                                width:
                                    size === "80vw"
                                        ? `${80 / 3}vw`
                                        : `calc(${60 / 3}vh )`,
                                backgroundClip: "rgba(0,0,0,0)",
                                zIndex: 1,
                                transition: "all 0.3s ease-in-out",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onClick={() => {
                                if (winner === 3) {
                                    var temp = "abcdefghi";
                                    var pos = key + 1;

                                    if (
                                        record.charAt(pos - 1) ===
                                        temp.charAt(pos - 1)
                                    ) {
                                        // drawSymbol(x1, y1);
                                        chance
                                            ? setRecord((e) =>
                                                  e
                                                      .substring(0, pos - 1)
                                                      .concat(
                                                          "1",
                                                          e.substring(pos)
                                                      )
                                              )
                                            : setRecord((e) =>
                                                  e
                                                      .substring(0, pos - 1)
                                                      .concat(
                                                          "0",
                                                          e.substring(pos)
                                                      )
                                              );
                                        setChance((e) => !e);
                                        setTries((e) => e + 1);
                                    } else
                                        toast.info("Move not allowed", record);
                                }
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    backgroundColor: isOn
                                        ? "#F6F4EB"
                                        : "#072541",
                                    border: `${
                                        size === "80vw" ? 5 : 10
                                    }px solid ${isOn ? "#F3B664" : "#7ed0ec"}`,
                                    height:
                                        size === "80vw"
                                            ? `${window.innerWidth / 8 + 20}px`
                                            : ` ${
                                                  window.innerHeight / 8 + 20
                                              }px`,
                                    width:
                                        size === "80vw"
                                            ? `${window.innerWidth / 8 + 20}px`
                                            : ` ${
                                                  window.innerHeight / 8 + 20
                                              }px`,
                                    borderRadius:
                                        size === "80vw" ? "15px" : "30px",
                                    // margin: "10px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    alt="icon"
                                    style={{
                                        display: "flex",
                                        scale: "2",
                                        height:
                                            size === "80vw" ? "32px" : "64px",
                                        width:
                                            size === "80vw" ? "32px" : "64px",
                                    }}
                                    src={`data:image/svg+xml,${encodeURIComponent(
                                        record.charAt(key) === "0"
                                            ? roundData
                                            : record.charAt(key) === "1"
                                            ? crossData
                                            : noData
                                    )}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Hero;
