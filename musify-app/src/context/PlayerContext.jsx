import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext, useAuth, API_BASE_URL } from "./AuthContext";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({children}) => {
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const {user, token, getAuthHeaders} = useAuth();


    const getSongsData = async () => {
        try{
            const response = await axios.get(`${API_BASE_URL}/api/songs`, {headers: getAuthHeaders()});
            const songs = response.data.songs || [];
            setSongsData(songs);
        } catch(error){
            console.error(error);
            setSongsData([]);
        }
    }

    const getAlbumsData = async () => {
        try{
            const response = await axios.get(`${API_BASE_URL}/api/albums`, {headers: getAuthHeaders()});
            const albums = response.data.albums || [];
            setAlbumsData(albums);
        } catch(error){
            console.error(error);
            setAlbumsData([]);
        }
    }

    const contextValue = {
        getSongsData,
        getAlbumsData,
        songsData,
        albumsData
    }

    useEffect(()=>{
        if(user&&token){
            getAlbumsData();
            getSongsData();
        }
    }, [user,token])

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );

}