import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";

// eslint-disable-next-line react/display-name
export default () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="register" exact Component={Register}/>
        </Routes>
    </BrowserRouter>
);
