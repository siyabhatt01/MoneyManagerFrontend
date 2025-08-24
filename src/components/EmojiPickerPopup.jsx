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
        className='flex items-center gap-4 cursor-pointer group'>
            <div className="w-14 h-14 flex items-center justify-center text-2xl bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
                {icon ? (
                <span className="text-3xl">{icon}</span>
                ) : (
                <ImageIcon className="text-purple-400" />
                )}


            </div>
            <p className='underline text-purple-400 font-medium group-hover:text-purple-300 transition-colors'>{icon ? "Change icon" :"Pick Icon"}</p>
        </div>
        {isOpen && (<div className='relative'>
            <button 
                onClick={()=>setIsOpen(false)}
                className='w-8 h-8 flex items-center justify-center bg-gray-800 border-2 border-gray-600 rounded-full absolute -top-3 -right-3 z-10 cursor-pointer shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200'>
                    <X size={16} className="text-gray-300"/>
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