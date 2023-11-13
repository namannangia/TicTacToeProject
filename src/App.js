import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Landing from "./components/Common/Landing";
import SplashScreenOffline from "./components/Offline/SplashScreenOffline";
// import SplashScreenAi from "./components/VersusAi/SplashScreenAi";
import ContainerOffline from "./components/Offline/ContainerOffline";
import Temp from "./components/Online/Temp";
// import ContainerAi from "./components/VersusAi/ContainerAi";
import { ThemeProvider } from "./components/Common/themecontext";
import { io } from "socket.io-client";
import { Datacontext } from "./components/Common/datacontext";

const socketOptions = [
    "https://tictactoe-ueyb.onrender.com:443",
    "https://tictactoe25.adaptable.app:443",
    "https://155.248.249.82:3000",
    "https://localhost:3000",
    "http://localhost:3000",
];
const socketURL = socketOptions[0];
function App() {
    const [firstPlayer, setFirstPlayer] = React.useState("");
    const [secondPlayer, setSecondPlayer] = React.useState("");
    return (
        <ThemeProvider>
            <Datacontext>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route
                            path="/online/*"
                            element={
                                <Temp
                                    socketURL={socketURL}
                                    firstPlayer={firstPlayer}
                                    secondPlayer={secondPlayer}
                                    setFirstPlayer={setFirstPlayer}
                                    setSecondPlayer={setSecondPlayer}
                                />
                            }
                        >
                            {/* <Route
                        path=""
                        element={
                          
                        }
                    /> */}
                        </Route>
                        <Route path="offline" element={<Outlet />}>
                            <Route
                                path="game"
                                element={
                                    <ContainerOffline
                                        firstPlayer={firstPlayer}
                                        secondPlayer={secondPlayer}
                                        isAi={false}
                                    />
                                }
                            />
                            <Route
                                path=""
                                element={
                                    <SplashScreenOffline
                                        firstPlayer={firstPlayer}
                                        setFirstPlayer={setFirstPlayer}
                                        secondPlayer={secondPlayer}
                                        setSecondPlayer={setSecondPlayer}
                                        isAi={false}
                                    />
                                }
                            />
                        </Route>
                        <Route path="ai" element={<Outlet />}>
                            <Route
                                path="game"
                                element={
                                    <ContainerOffline
                                        firstPlayer={firstPlayer}
                                        secondPlayer={secondPlayer}
                                        isAi={true}
                                    />
                                }
                            />
                            <Route
                                path=""
                                element={
                                    <SplashScreenOffline
                                        firstPlayer={firstPlayer}
                                        setFirstPlayer={setFirstPlayer}
                                        secondPlayer={secondPlayer}
                                        setSecondPlayer={setSecondPlayer}
                                        isAi={true}
                                    />
                                }
                            />
                        </Route>

                        <Route
                            path=""
                            element={<Landing socketURL={socketURL} />}
                        />
                    </Route>
                </Routes>
            </Datacontext>
        </ThemeProvider>
    );
}

export default App;
