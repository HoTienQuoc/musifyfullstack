import { useAuth } from "../context/AuthContext";

const DisplayHome = () => {
    const {logout} = useAuth();
    const handleLogout = () => {
        logout();
    }
    return (
        <>
            <div>Displaying the albums and songs</div>
            <button onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
                Logout
            </button>
        </>
    );
}

export default DisplayHome;