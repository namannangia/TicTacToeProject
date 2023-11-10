import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Header.css";

function Header({ record, secondPlayer, firstPlayer }) {
    var boxShadow = "0px 0px 5px 0px rgba(255,255,255,1)";
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState(false);
    return (
        <div className="HeaderMainDiv">
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
