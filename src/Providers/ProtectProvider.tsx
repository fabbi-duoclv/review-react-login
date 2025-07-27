import { useEffect, useContext } from "react";
import { useAuth } from "../hooks/custom";
import { useNavigate } from 'react-router'
import React from "react";
import { AuthContext } from "./authContext";
import { LoadingComponent } from "../components/loading";

export const ProtectProvider = ({children}) => {
    const { isLoading, setIsLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ isAuthenticated, setToken ] = useAuth();
    console.log('ProtectProvider: isAuthenticated', isAuthenticated, isLoading);

    useEffect(()=> {
        if (!isAuthenticated && !isLoading) {
            // setIsLoading(true);
            navigate('/login');
        }
    }, [isAuthenticated, isLoading])

    // if (isLoading) {
    //     return <LoadingComponent isLoading={true} />
    // }

    return <>{children}</>
}