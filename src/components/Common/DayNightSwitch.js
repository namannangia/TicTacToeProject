import React, { useContext } from "react";
import { theme } from "./themecontext";
export default function DayNightSwitch() {
    const transitionSpeed = 0.3;
    const [pop, setPop] = React.useState(false);
    const { isOn, setOn } = useContext(theme);
    return (
        <div>
            <div
                id="btnback"
                onMouseEnter={() => {
                    setPop(true);
                }}
                onMouseLeave={() => {
                    setPop(false);
                }}
                onClick={() => {
                    setOn((e) => !e);
                    localStorage.setItem("theme", !isOn);
                }}
                style={{
                    cursor: "pointer",
                    height: "40px",
                    borderRadius: "20px",
                    width: "80px",
                    backgroundColor: isOn ? "#89CFF3" : "#4D4C7D",
                    alignItems: "center",
                    transition: `all ${transitionSpeed}s ease-in-out`,
                    justifyContent: "center",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
                }}
            >
                <div
                    id="btnswitch"
                    style={{
                        position: "relative",
                        top: "5px",
                        left: isOn ? "0px" : "35px",
                        backgroundColor: isOn ? "#F4CE14" : "#F99417",
                        height: "30px",
                        width: "30px",
                        margin: "10px",
                        transition: `all ${transitionSpeed}s ease-in-out`,
                        borderRadius: "100px",
                    }}
                ></div>
            </div>
            <div
                style={{
                    display: "flex",
                    backgroundColor: isOn ? "black" : "white",
                    color: !isOn ? "black" : "white",
                    borderRadius: "12px",
                    padding: "5px",
                    visibility: pop ? "visible" : "hidden",
                    marginTop: "20px",
                }}
            >
                {!isOn ? `Turn off Dark mode` : "Turn off LightMode"}
            </div>
        </div>
    );
}
