import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Header.css";

function Header({
    record,
    username,
    socket,
    secondPlayer,
    firstPlayer,
    roomKey,
}) {
    var boxShadow = "0px 0px 5px 0px rgba(255,255,255,1)";
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState(false);
    return (
        <div className="HeaderMainDiv">
            <div className="headerSubDiv">
                <span className="headerSpan1">{username.toUpperCase()}</span>
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
                    {username !== secondPlayer
                        ? secondPlayer.toUpperCase()
                        : firstPlayer.toUpperCase()}
                </span>
            </div>
            <h1 className="headerHeading">
                tic-tac-toe
                <br />
                <span className="headerTitle">
                    Room Key -{"    "}
                    <span
                        onClick={() => {
                            var x = window.confirm("Leave current room?");
                            if (x) {
                                sessionStorage.setItem("roomkey", "");
                                socket.emit("roomSwitch");
                                navigate("/login");
                            }
                        }}
                        style={{
                            textDecoration: "underline",
                            textDecorationStyle: "dashed",
                            textUnderlineOffset: 3,
                            textDecorationThickness: 1.2,
                            cursor: "pointer",
                            fontSize: "1.5rem",
                        }}
                    >
                        {roomKey}
                    </span>
                </span>
            </h1>
        </div>
    );
}

export default Header;

/**
 *
 */
