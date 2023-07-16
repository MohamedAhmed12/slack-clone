import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

// eslint-disable-next-line react/display-name
export default () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact Component={Home} />
        </Routes>
    </BrowserRouter>
);
