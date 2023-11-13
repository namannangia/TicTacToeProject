import React from "react";
import "../../styles/Header.css";
import { data } from "../Common/datacontext";

function Header({ secondPlayer, firstPlayer }) {
    const { isOn } = React.useContext(data);
    return (
        <div
            className="HeaderMainDiv"
            style={{
                color: !isOn ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
            }}
        >
            <div className="headerSubDiv">
                <span className="headerSpan1">{firstPlayer.toUpperCase()}</span>
                <span
                    style={{
                        padding: "0% 10%",
                        fontSize: "25px",
                        fontWeight: 400,
                    }}
                >
                    V/S
                </span>
                <span className="headerSpan3">
                    {secondPlayer.toUpperCase()}
                </span>
            </div>
            <h1 className="headerHeading">
                tic-tac-toe
                <br />
            </h1>
        </div>
    );
}

export default Header;
