import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("token") ? true : false

    if (!user) {
        return <Navigate to="/login" />
    }
    return children

};

export default ProtectedRoute;