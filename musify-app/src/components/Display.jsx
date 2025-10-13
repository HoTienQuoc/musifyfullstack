import {Routes, Route} from 'react-router-dom';
import { Register } from './Register';
import DisplayHome from './DisplayHome';
import Search from './Search';
import DisplayAlbum from './DisplayAlbum';
import Navbar from './Navbar';

const Display = () => {
    return (
        <div className='w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 flex flex-col'>
            {/* Sticky navbar */}
            <div className='sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm border-b border-gray-800/50 px-6 pt-4 pb-2'>
                <Navbar/>
                {/* Scrollable content */}
                <div className="flex-1 px-6 pb-4 overflow-auto">
                    <Routes>
                        <Route path="/" element={<DisplayHome/>}/>
                        <Route path="/albums" element={<DisplayAlbum/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/search" element={<Search/>}/>

                    </Routes>
                </div>
            </div>
        </div>
    );
}
export default Display;