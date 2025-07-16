import { createContext } from "react";
import { useCustomToken } from "../hooks/custom";
import { redirect } from "react-router";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [token, setToken ] = useCustomToken();

    if (!token) {
        return redirect("/login");
    }

    // if (token) {

    // }

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}