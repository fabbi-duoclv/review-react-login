import { useState, useEffect, useLayoutEffect } from 'react';
import { useCheckTokenMutation } from './CheckTokenMutation';
import { CheckRefreshTokenMutation } from './CheckRefreshTokenMutation';

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
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
    const {mutate, data, onError} = useCheckTokenMutation(token);
    const {mutate: mutateRefreshToken, data: dataRefreshToken} = CheckRefreshTokenMutation(refreshToken);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
           return
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) return;
        const token = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (token) {
            token && mutate(token);
            return;
        }
        if(refreshToken) {
            mutateRefreshToken(refreshToken);
        }
    }, []);

    useEffect(() => {
        console.log('--- data ---',data);
        if (data === undefined && dataRefreshToken === undefined) return;
        if (data) {
            localStorage.setItem('access_token', data.access_token);
            setIsAuthenticated(true);
        }
        if (dataRefreshToken) {
            localStorage.setItem('access_token', dataRefreshToken.access_token);
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [data, dataRefreshToken]);

    return [isAuthenticated, setToken,setRefreshToken, isLoading];
}