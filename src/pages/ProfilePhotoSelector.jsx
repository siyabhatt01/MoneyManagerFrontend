import { Trash, Upload, User } from 'lucide-react';
import React, { useRef, useState } from 'react'

const ProfilePhotoSelector = ({image,setImage}) => {

    const inputRef= useRef(null);
    const [previewUrl,setPreviewUrl]=useState(null);
    
    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setImage(file);
            const preview=URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage=(e)=>{
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile=(e)=>{
        e.preventDefault();
        inputRef.current?.click();
    }

  return (
    <div className='flex justify-center mb-6'>
        <input type="file"
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />
        {!image ?(
            <div className='w-24 h-24 flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-full relative shadow-xl hover:shadow-2xl transition-all duration-200'>
                <User className='text-gray-400' size={40}/>
                <button onClick={onChooseFile} className='w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full absolute -bottom-2 -right-2 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200'>
                    <Upload size={18} className='text-white'/>
                </button>
            </div>
        ):(
            <div className='relative'>
                <img src={previewUrl} alt='profile-photo' className='w-24 h-24 rounded-full object-cover shadow-xl hover:shadow-2xl transition-all duration-200'/>
                <button className='w-10 h-10 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full absolute -bottom-2 -right-2 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200' onClick={handleRemoveImage}>
                    <Trash size={18}/>
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector