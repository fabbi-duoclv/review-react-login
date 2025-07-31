import { createContext, Dispatch, SetStateAction } from "react";
import { SnackbarOrigin } from "@mui/material";

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'center' | 'right';

export type User = {
    id: number | string,
    username: string,
    password: string,
    email: string,
    isActive: boolean | string,
    createdAt: string | Date,
    updatedAt: string | Date,
    role: string | number
}
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
    isLoadingAuth: false,
    setIsLoadingAuth: (() => {}) as Dispatch<SetStateAction<boolean>>,
    user: null as User | null,
    setUser: (() => {}) as Dispatch<SetStateAction<User | null>>,
});