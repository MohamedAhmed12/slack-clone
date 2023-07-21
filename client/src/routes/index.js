import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import CreateTeam from "./CreateTeam";

// eslint-disable-next-line react/display-name
export default () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="register" exact Component={Register} />
            <Route path="login" exact Component={Login} />
            <Route path="/create-team" exact Component={CreateTeam} />
        </Routes>
    </BrowserRouter>
);
