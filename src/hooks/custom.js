import { useState, useEffect } from 'react';


export const useCustomToken = (initialValue = null) => {
    const [token, setTokens] = useState(initialValue);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setTokens(token);
        }
    }, []);


    const setToken = (token) => {
        localStorage.setItem('access_token', token);
        setToken(token);
    }

    return [token, setToken];
}

export const useAuth = () => {
    const [token, setToken] = useState(null);
    
    let isAuthenticated = false;

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {

            setToken(token);
        }

    }, [token]);


    // const setToken = (token) => {
    //     localStorage.setItem('token', token);
    //     setToken(token);
    // }

    return [token, setToken];
}