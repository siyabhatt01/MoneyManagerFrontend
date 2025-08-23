 import EmojiPicker from 'emoji-picker-react';
import { X , Image as ImageIcon} from 'lucide-react';
import React, { useState } from 'react'
 
 const EmojiPickerPopup = ({icon,onSelect}) => {

    const [isOpen,setIsOpen]= useState(false);
    const handleEmojiClick = (emojiData, event) => {
    onSelect(emojiData.emoji); // emojiData.emoji gives the unicode emoji
    setIsOpen(false);
    };


   return (
     <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
        <div
        onClick={()=>setIsOpen(true)}
        className='flex items-center gap-4 cursor-pointer'>
            <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                {icon ? (
                <span className="text-3xl">{icon}</span>
                ) : (
                <ImageIcon />
                )}


            </div>
            <p className='underline text-purple-800'>{icon ? "Change icon" :"Pick Icon"}</p>
        </div>
        {isOpen && (<div className='relative'>
            <button 
                onClick={()=>setIsOpen(false)}
                className='w-7 h-7 flex items-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer '>
                    <X/>
                </button>
                <EmojiPicker 
                    open={isOpen} 
                    onEmojiClick={handleEmojiClick} 
                />
        </div>
        )}
     </div>
   )
 }
 
 export default EmojiPickerPopup