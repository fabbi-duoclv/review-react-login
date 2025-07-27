import { createContext, Dispatch, SetStateAction } from "react";
import { SnackbarOrigin } from "@mui/material";

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'center' | 'right';

export const AuthContext = createContext({
    message: '',
    setMessage: (() => {}) as Dispatch<SetStateAction<string>>,
    isAuthenticated: false,
    setToken: (() => {}) as Dispatch<SetStateAction<string | null>>,
    vertical: 'top' as VerticalPosition,
    horizontal: 'center' as HorizontalPosition,
    open: false,
    handleClick: (newState: SnackbarOrigin) => () => {},
    handleClose: () => {},
    isLoading: false,
    setIsLoading: (() => {}) as Dispatch<SetStateAction<boolean>>,
});