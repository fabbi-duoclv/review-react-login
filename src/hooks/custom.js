import { useState, useEffect } from 'react';


export const useCustomToken = () => {
    const [token, setTokens] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setTokens(token);
        }
    }, []);


    const setToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    }

    return [token, setToken];
}

export const useAuth = () => {
    const [token, setTokens] = useCustomToken();
    
    let isAuthenticated = false;

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //     setTokens(token);
        // }
    }, [token]);


    // const setToken = (token) => {
    //     localStorage.setItem('token', token);
    //     setToken(token);
    // }

    // return [token, setToken];
}