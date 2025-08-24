import React from 'react'

const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className='flex gap-6 bg-gray-900 p-8 rounded-3xl shadow-2xl shadow-black/20 border border-gray-800 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1'>
        <div className={`w-16 h-16 flex items-center justify-center text-[28px] text-white ${color} rounded-2xl shadow-lg drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className="text-sm text-gray-400 mb-2 font-medium uppercase tracking-wide">
                {label}
            </h6>
            <span className="text-2xl font-bold text-gray-100">${value}</span>
        </div>
    </div>
  )
}

export default InfoCard