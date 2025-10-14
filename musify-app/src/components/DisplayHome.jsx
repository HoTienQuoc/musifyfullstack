import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem";

const DisplayHome = () => {
    const {songsData, albumsData} = useContext(PlayerContext);
    return (
        <>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">
                    Featured Charts
                    <div className="flex overflow-auto">
                        {/* Display the albums data */}
                        {albumsData.map((item, index)=>{
                            <AlbumItem 
                            key={index} name={item.name} desc={item.desc}
                            id={item._id} image={item.imageUrl}/>
                        })}
                    </div>
                </h1>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">
                    Today's biggest hits
                </h1>
                <div className="flex overflow-auto">
                    {/* Display the songs data */}
                    Displaying the songs
                </div>
            </div>
        </>
    );
}

export default DisplayHome;