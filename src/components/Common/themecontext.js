import React, { createContext } from "react";

const theme = createContext();
const cookie = localStorage.getItem("theme");
const val = cookie ? (cookie === "false" ? false : true) : false;
const ThemeProvider = ({ children }) => {
    const [isOn, setOn] = React.useState(val);

    return <theme.Provider value={{ isOn, setOn }}>{children}</theme.Provider>;
};

export { ThemeProvider, theme };
