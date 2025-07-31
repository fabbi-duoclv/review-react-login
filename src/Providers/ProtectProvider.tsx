import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router'
import React from "react";
import { AuthContext } from "./authContext";

export const ProtectProvider = ({children}) => {
    const { isAuthenticated, isLoadingAuth, setIsLoadingAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log('--- ProtectProvider: isAuthenticated ---',isAuthenticated, isLoadingAuth);
    console.log('ProtectProvider: isAuthenticated', isAuthenticated, isLoadingAuth);

    useEffect(()=> {
        console.log('--- ProtectProvider: isAuthenticated ---',isAuthenticated, isLoadingAuth);
        // debugger;
        if (!isAuthenticated && !isLoadingAuth) {
            // setIsLoading(true);
            navigate('/login');
        }
    }, [isAuthenticated, isLoadingAuth])

    return <>{children}</>
}