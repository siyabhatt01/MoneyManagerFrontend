import React from 'react'

const DeleteAlert = ({content,onDelete}) => {
  return (
    <div className="space-y-4">
        <p className="text-sm text-gray-300 font-medium">{content}</p>
        <div className="flex justify-end pt-2">
            <button
                onClick={onDelete}
                type='button'
                className='cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl active:from-red-700 active:to-red-800 transition-all duration-200 transform hover:-translate-y-0.5'
            >Delete</button>
        </div>
    </div>
  )
}

export default DeleteAlert