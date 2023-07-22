import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token !== "undefined" && token ? <Outlet /> : <Navigate to="/login" />;
};
