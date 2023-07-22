import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import CreateTeam from "./CreateTeam";
import ViewTeam from "./ViewTeam";

// eslint-disable-next-line react/display-name
export default () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="register" exact element={<Register />} />
            <Route path="login" exact element={<Login />} />
            <Route path="view-team" exact element={<ViewTeam />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/create-team" exact element={<CreateTeam />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
