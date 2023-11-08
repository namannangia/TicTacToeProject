import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Overhead() {
    const [a, b] = React.useState("");
    const navigate = useNavigate();
    return (
        <div style={{}}>
            <form
                style={{
                    height: "50px",
                    width: "50px",
                    display: "flex",
                    flexDirection: "row",
                    position: "absolute",
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    navigate(a);
                }}
            >
                <label>
                    <input
                        type="radio"
                        onChange={(e) => b(e.target.value)}
                        value="/"
                        checked={a === "/"}
                    />
                </label>
                Root
                <label>
                    <input
                        type="radio"
                        onChange={(e) => b(e.target.value)}
                        value="/login"
                        checked={a === "/login"}
                    />
                </label>
                Login
                <label>
                    <input
                        type="radio"
                        onChange={(e) => b(e.target.value)}
                        value="/game"
                        checked={a === "/game"}
                    />
                </label>
                Game
                <input
                    type="submit"
                    style={{
                        marginLeft: "10px",
                        marginTop: "5px",
                        height: "fit-content",
                    }}
                />
            </form>
            <Outlet />
        </div>
    );
}

export default Overhead;
