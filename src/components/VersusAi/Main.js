import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import SplashScreenAi from "./SplashScreenAi";
import ContainerAi from "./ContainerAi";

function Main({ firstPlayer, secondPlayer, setFirstPlayer, setSecondPlayer }) {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route
                    path=""
                    element={
                        <SplashScreenAi
                            firstPlayer={firstPlayer}
                            setFirstPlayer={setFirstPlayer}
                            secondPlayer={secondPlayer}
                            setSecondPlayer={setSecondPlayer}
                        />
                    }
                />
                <Route
                    path="game"
                    element={
                        <ContainerAi
                            firstPlayer={firstPlayer}
                            setFirstPlayer={setFirstPlayer}
                            secondPlayer={secondPlayer}
                            setSecondPlayer={setSecondPlayer}
                        />
                    }
                />
            </Route>
        </Routes>
    );
}

export default Main;
