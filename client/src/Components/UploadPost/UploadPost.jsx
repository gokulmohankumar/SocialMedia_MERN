import React, { useContext, useState } from 'react'
import Profilepic from '../../assets/Appassests/profilePic.jpg'
import { MdLabel,MdPermMedia, MdEmojiEmotions,MdLocationPin } from 'react-icons/md'
import { uploadPost } from '../../Utils/Api/api';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
const UploadPost = () => {

    const [desc, setDesc]= useState("");
    const [file,setFile]= useState(null);
    const [loading,setLoading]=useState(false)
    const {user}=useContext(AuthContext);
    const [preview,setPreview]= useState(null)

    const handlePostUpload=async()=>
        {
            setLoading(true)
            try {
                const res = await uploadPost(user._id, desc, file)
                toast.success("Post uploaded succesfully");
                setDesc('');
                setFile(null)
                setLoading(false)
                setPreview(null)
            } catch (error) {
                console.log(error);
                toast.error("Post upload failed");
            }finally{
                setLoading(false)

            }
        }
const handlefileChange = (e)=>{
    const file=e.target.files[0]
    setFile(file)
    if (file) {
       const url=URL.createObjectURL(file);
       setPreview(url)
    } else {
        setPreview(null)
    }
}
  return (
    <div className='w-full h-[170px] rounded-lg shadow-md'>
          <div className="wrapper p-[10px]">
            <div className="top flex items-center">
                <img src={Profilepic} alt="profilepic"  className='w-[50px] h-[50px] rounded-full mr-[10px] object-cover'/>
                <input 
                value={desc}
                type="text" 
                placeholder="What is on your mind ? " 
                className='w-[80%] focus:outline-none '
                onChange={(e)=>
                    setDesc(e.target.value)
                }
                />
                {preview && (
                    <img src={preview} alt="Preview image"
                    className='w-[50px] h-[50px] rounded-md object-cover ml-[15px]'
                    />
                )

                }
            </div>
            <hr className='m-[20px]'/>
            <div className="bottom flex items-center justify-between" >
                <div className='flex'>
                    <label htmlFor="file" className='flex items-center mr-[15px] cursor-pointer'>
                        <MdPermMedia className='mr-[3px] text-orange-600'/>
                        <span>Photo or video</span>
                        <input type="file"
                        name='file'
                        id='file'
                        onChange={handlefileChange}
                        className='hidden'
                        accept='.png,.jpg,.jpeg'
                        />
                    </label>
                    <div className='flex items-center mr-[15px] cursor-pointer'>
                        <MdLabel className='mr-[3px] text-blue-600'/>
                        <span>Tags</span>
                    </div>
                    <div className='flex items-center mr-[15px] cursor-pointer'>
                        <MdEmojiEmotions className='mr-[3px] text-yellow-500'/>
                        <span>Emoji</span>
                    </div>
                    <div className='flex items-center mr-[15px] cursor-pointer'>
                        <MdLocationPin className='mr-[3px] text-green-600'/>
                        <span>Location</span>
                    </div>
                </div> 
                <button  
                disabled={loading}
                onClick={handlePostUpload}
                className='bg-green-600 text-white p-[5px] rounded-lg font-bold' >
                {loading?"Uploading":"Upload"}
                </button>
            </div>
          </div>
    </div>
  )
}

export default UploadPost