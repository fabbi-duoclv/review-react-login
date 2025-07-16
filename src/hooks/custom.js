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
