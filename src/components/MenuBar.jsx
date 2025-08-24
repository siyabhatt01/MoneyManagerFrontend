import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, User, X } from 'lucide-react';
import { assets } from '../assets/assets.js';
import Sidebar from './Sidebar.jsx';


const MenuBar = ({ activeMenu }) => {

  const [openMenu, setOpenMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, clearUser } = useContext(AppContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close only if click is outside dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  }

  return (
    <div className='flex items-center justify-between gap-5 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/60 py-5 px-6 sm:px-8 sticky top-0 z-30 shadow-xl'>

      {/* {Left side - Menu button and title} */}
      <div className='flex items-center gap-6'>
        <button
          className='block lg:hidden text-gray-300 hover:bg-gray-800 p-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:text-white'
          onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? (<X className='text-2xl' />) : (<Menu className='text-2xl' />)}
        </button>
        <div className='flex items-center gap-3'>
          <img src={assets.logo} alt='logo' className='h-16 w-16 rounded-full' />
          <span className='text-4xl font-bold text-white truncate '>Money Manager</span>
        </div>
      </div>

      {/* Right side - Profile picture */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => { setShowDropdown(!showDropdown) }}
          className="flex items-center justify-center w-15 h-15 bg-gray-700 hover:bg-gray-600 rounded-full  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ">
          <User className='text-purple-400 bg-gray-700 hover:bg-gray-600' />
        </button>
        {
          showDropdown && (
            <div className='absolute right-0 mt-3 w-56 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 py-2 z-50 backdrop-blur-sm'>
              {/* User Info */}
              <div className='px-5 py-4 border-b border-gray-700'>
                <div className='flex items-center gap-4'>
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-900 to-purple-800 rounded-full">
                    <User className='w-5 h-5 text-purple-300' />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-100 truncate overflow-hidden">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-400 truncate overflow-hidden">{user.email}</p>
                  </div>

                </div>
              </div>
              {/* Drop Options */}
              <div className="py-2">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-5 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg mx-2">
                  <LogOut className='w-4 h-4 text-gray-400' />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )
        }

      </div>

      {/* Mobile Side Menu */}
      {openMenu &&
        <div className='fixed left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/60 lg:hidden z-20 top-[76px] shadow-2xl'>
          <Sidebar activeMenu={activeMenu} />
        </div>}
    </div>
  )
}

export default MenuBar