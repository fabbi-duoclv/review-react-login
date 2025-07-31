import React from 'react';
import { AuthContext, User } from './authContext.ts'
import { useAuth } from '../hooks/custom'
import { useEffect, useState } from 'react';
import { SnackbarOrigin } from '@mui/material';
import { LoadingComponent } from '../components/loading.tsx';

export interface State extends SnackbarOrigin {
    open: boolean;
  }

export const AppProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [ isAuthenticated, setToken, setRefreshToken, isLoading ] = useAuth();
    const [ isLoadingAuth, setIsLoadingAuth ] = useState(true);
    const [ user, setUser ] = useState<User | null>(null);

    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;
    
      const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ ...newState, open: true });
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };

    useEffect(() => {
      if (isLoading) return;
        setIsLoadingAuth(false);
    }, [isAuthenticated, isLoading]);
    
    if (isLoading || isLoadingAuth) {
        return <LoadingComponent isLoading={isLoading} />
    }

    return (
        <AuthContext.Provider value={{
            message,
            setMessage,
            isAuthenticated: isAuthenticated as boolean,
            setToken: setToken as any,
            vertical,
            horizontal,
            open,
            handleClick,
            handleClose,
            isLoadingAuth,
            setIsLoadingAuth,
            user,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}