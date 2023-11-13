import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "./themecontext";
const data = createContext();
function Datacontext({ children }) {
    const navigate = useNavigate();
    const { isOn, setOn } = React.useContext(theme);
    const [chance, setChance] = React.useState(true);
    const [winner, setWinner] = React.useState(3);
    const [record, setRecord] = React.useState("abcdefghi");
    const [tries, setTries] = React.useState(0);
    return (
        <data.Provider
            value={{
                chance,
                navigate,
                setChance,
                winner,
                setWinner,
                record,
                setRecord,
                tries,
                setTries,
                isOn,
                setOn,
            }}
        >
            {children}
        </data.Provider>
    );
}

export { Datacontext, data };
