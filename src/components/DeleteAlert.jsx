import React from 'react'

const DeleteAlert = ({content,onDelete}) => {
  return (
    <div>
        <p className="text-sm">{content}</p>
        <div className="flex justify-end mt-6">
            <button
                onClick={onDelete}
                type='button'
                className='cursor-pointer inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600    bg-red-100 rounded-lg shadow-sm hover:bg-red-200 hover:text-red-900 active:bg-red-300 transition-colors'
            >Delete</button>
        </div>
    </div>
  )
}

export default DeleteAlert