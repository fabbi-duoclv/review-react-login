import React from 'react';
import { AuthContext } from './authContext.ts'
import { useAuth } from '../hooks/custom'
import { useState } from 'react';
import { SnackbarOrigin } from '@mui/material';
import { LoadingComponent } from '../components/loading.tsx';

export interface State extends SnackbarOrigin {
    open: boolean;
  }

export const AppProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [ isAuthenticated, setToken ] = useAuth();
    const [ isLoading, setIsLoading ] = useState(false);
    console.log('--- isAuthenticated ---',isAuthenticated);
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
    
    // if (true) {
    //     return <LoadingComponent isLoading={true} />
    // }
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
            isLoading,
            setIsLoading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}