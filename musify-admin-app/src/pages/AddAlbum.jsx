import DashboardLayout from "../layout/DashboardLayout";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import {albumsApi} from '../services/apiService.js'
import toast from "react-hot-toast";


const AddAlbum = () => {
    const [image, setImage] = useState(false);
    const [colour, setColour] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(true);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            const request = {
                name, desc, bgColor: colour
            }
            formData.append("request", JSON.stringify(request));
            formData.append("file", image);

            const response = await albumsApi.add(formData);
            if (response.status === 200) {
                toast.success("Album added!");
                setName("");
                setDesc("");
                setImage(false);
            } else {
                toast.error("Something went wrong while adding album. Please try again")
            }
        } catch (error) {
            toast.error("Error adding album. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout activeMenu="Add Album">
            {loading ? (
                <div className="grid place-items-center min-h-[80vh]">
                    <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin">
                    </div>
                </div>
            ) : (
                <form action="" onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600 mt-5">
                    <div className="flex flex-col gap-4">
                        <p>Upload Image</p>
                        <input type="file" accept="image/*" id="image" hidden
                            onChange={(e) => setImage(e.target.files[0])} />
                        <label htmlFor="image"
                            className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden">
                            {image ? (
                                <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <Image className="w-8 h-8 text-gray-500" />
                            )}
                        </label>
                    </div>
                    {/* Album name */}
                    <div className="flex flex-col gap-2.5">
                        <p>Album Name</p>
                        <input type="text" name="" id=""
                            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type here" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    {/* Album description */}
                    <div className="flex flex-col gap-2.5">
                        <p>Album Description</p>
                        <input type="text" name="" id=""
                            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type here" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    {/* Album background Color */}
                    <div className="flex flex-col gap-2.5">
                        <p>Background Colour</p>
                        <input type="color" name="" id=""
                            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type here" value={colour} onChange={(e) => setColour(e.target.value)} />
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="text-base bg-[#3be477] text-white py-2.5 px-14 cursor-pointer">
                        ADD
                    </button>
                </form>
            )}
        </DashboardLayout>
    );
}

export default AddAlbum;