import { createContext, useContext, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const API_BASE_URL = "http://localhost:8080";

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("userToken"));
    const [loading, setLoading] = useState(false);

    const register = async (email,password) => {
        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`,{email,password});
            if(response.status === 201){
                return {
                    success: true,
                    message: "Registration successful"
                }
            }
            else{
                return {
                    success: false,
                    message: response.data.message || "Registration failed"
                }
            }
        }
        catch(error){
            return {
                success: false,
                message: error.response.data.message || "Network error. Please try again later"
            }
        }
    }

    const login = async () => {
        try{

        }
        catch(error){

        }
    }

    const contextValue = {
        register
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}