import {Routes, Route, useLocation} from 'react-router-dom';
import { Register } from './Register';
import DisplayHome from './DisplayHome';
import Search from './Search';
import DisplayAlbum from './DisplayAlbum';
import Navbar from './Navbar';
import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
    const {albumsData} = useContext(PlayerContext);
    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split("/").pop() : "";
    const album = isAlbum ? albumsData.find(x=>x._id===albumId):null;
    const bgColor = album?.bgColor || '#121212';

    useEffect(()=>{
        if(isAlbum){
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
        }
        else{
            displayRef.current.style.background = '#121212';
        }
    }, [isAlbum, bgColor]);
    return (
        <div ref={displayRef} className='w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 flex flex-col'>
            {/* Sticky navbar */}
            <div ref={displayRef} className='sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm border-b border-gray-800/50 px-6 pt-4 pb-2'>
                <Navbar/>
            </div>
            {/* Scrollable content */}
            <div className="flex-1 px-6 pb-4 overflow-auto">
                    <Routes>
                        <Route path="/" element={<DisplayHome/>}/>
                        <Route path="/albums/:id" element={
                            <DisplayAlbum album={albumsData.find(x => x._id === albumId)}/>
                        }/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/search" element={<Search/>}/>

                    </Routes>
                </div>
        </div>
    );
}
export default Display;