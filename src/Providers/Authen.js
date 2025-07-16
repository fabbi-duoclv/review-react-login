import { useContext } from "react";
import { useCustomToken } from "../hooks/custom";

export const AuthContext = useContext();


export const AuthProvider = ({children}) => {
    const [token, setToken ] = useCustomToken();

    if (!token) {
        
    }
}