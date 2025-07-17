import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const PrivateRoute = ({ children }) => {
    const token = Cookies.get("accessToken")
    // console.log(token)
    if (!token) {
        return <Navigate to={"/login"} />
    }
    return children
}