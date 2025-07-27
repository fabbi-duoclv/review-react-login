import { useState, useEffect, useContext } from 'react';
import { useCheckTokenMutation } from './CheckTokenMutation';
import { CheckRefreshTokenMutation } from './CheckRefreshTokenMutation';
import { AuthContext } from '../Providers/authContext';

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
    const {mutate, data, onError, isLoading: isLoadingCheckToken} = useCheckTokenMutation(token);
    const {mutate: mutateRefreshToken, data: dataRefreshToken, isLoading: isLoadingRefreshToken} = CheckRefreshTokenMutation(refreshToken);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {isLoading, setIsLoading} = useContext(AuthContext);

    console.log('--- useAuth: isLoading ---',isLoading);
    // useEffect(() => {
    //     setIsLoading(true);
    // }, []);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setToken(token);
            token && mutate(token);
            setIsLoading(false);
        } else {
            if(refreshToken) {
                mutateRefreshToken(refreshToken);
            }
            // setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        console.log('--- data ---',data);
        if (data) {
            setIsAuthenticated(true);
            setIsLoading(false);
        } else {
            // setIsLoading(false);
            // localStorage.removeItem('access_token');
        }
    }, [data]);

    useEffect(() => {
        console.log('--- dataRefreshToken ---',dataRefreshToken);
        if (dataRefreshToken) {
            setIsAuthenticated(true);
            setToken(dataRefreshToken.access_token);
            // setIsLoading(false);
        } else {
            // setIsLoading(false);
            // localStorage.removeItem('access_token');
            // localStorage.removeItem('refresh_token');
        }
    }, [dataRefreshToken]);

    return [isAuthenticated, setToken];
}