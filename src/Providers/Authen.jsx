// import { createContext } from "react";
import { useCustomToken } from "../hooks/custom";
// import { redirect } from "react-router";

export const AuthProvider = ({children}) => {
    const [token, setToken ] = useCustomToken();

    // if (!token) {
    //     return redirect("/login");
    // }
    let isAuthenticated = false;
    // if (token) {

    // }

    return <AuthContext.Provider value={{
        token,
        setToken,
        isAuthenticated,
    }}>{children}</AuthContext.Provider>
}