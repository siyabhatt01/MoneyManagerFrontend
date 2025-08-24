import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { User } from 'lucide-react';
import { SIDE_BAR_DATA } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

 const Sidebar = ({activeMenu}) => {

    const {user} = useContext(AppContext);
    const navigate=useNavigate();

  return (
    <div className='w-64 h-screen bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/60 p-6 sticky top-[61px] z-20 shadow-lg overflow-y-auto'>
        <div className="flex flex-col items-center justify-center gap-4 mt-4 mb-8">
            {user?.profileImageUrl ? (
                <img src={user?.profileImageUrl ||""} alt='profile image' className='w-20 h-20 bg-gray-700 rounded-full ring-4 ring-purple-500/30 shadow-xl hover:ring-purple-500/50 transition-all duration-300'/>
            ):(
              <User className='w-20 h-20 text-xl text-gray-400 bg-gray-800 rounded-full p-4 shadow-lg'/>  
            )}
            <h5 className='text-gray-100 font-semibold leading-6 text-lg'>{user.fullName || ""}</h5>
        </div>
       {SIDE_BAR_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => navigate(item.path)}
          className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-4 px-6 rounded-xl mb-3 border transition-all duration-200 font-medium
            ${activeMenu === item.label ? "text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg shadow-purple-500/25 border-purple-500" : "text-gray-300 hover:bg-gray-800 hover:text-gray-100 border-gray-700 hover:border-gray-600"}`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
        ))}
    </div>
  )
}

 export default Sidebar;

