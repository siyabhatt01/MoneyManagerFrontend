import { X } from 'lucide-react';
import React from 'react'

const Model = ({isOpen,onClose,children,title}) => {
    if(!isOpen)return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/70 backdrop-blur-md overflow-y-auto" >
        <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
           {/* Model header */}
           <div className="relative bg-gray-900 rounded-3xl shadow-2xl border border-gray-700">
            {/* Model content */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-700 rounded-t-3xl max-h-[90vh]">
                <h3 className="text-2xl font-bold text-gray-100">
                    {title}
                </h3>
                <button
                 onClick={onClose}
                 type='button'
                 className="text-gray-400 bg-gray-800 hover:bg-red-900/20 hover:text-red-400 rounded-xl text-sm w-10 h-10 flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-sm hover:shadow-md">
                    <X className='w-5 h-5'/>
                </button>
            </div>
            {/* Model body */}
            <div className="p-6 md:p-8 text-gray-300">
                {children}
            </div>
           </div>
        </div>
    </div>
    
  )
}

export default Model