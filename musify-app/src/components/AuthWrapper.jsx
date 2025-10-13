import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Register } from "./Register";
import { Login } from "./Login";

const AuthWrapper = ({children}) => {
    const {isAuthenticated, loading} = useAuth();
    const [showRegister, setShowRegister] = useState(false);
    if(loading){
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }
    if(!isAuthenticated){
        return showRegister? (
            <Register onSwitchLogin={()=>setShowRegister(false)}/>
        ) : (
            <Login onSwitchRegister={()=>setShowRegister(true)}/>
        );
    }
    return children;
}
export default AuthWrapper;