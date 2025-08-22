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
    <div className='flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky'>

      {/* {Left side - Menu button and title} */}
      <div className='flex items-center gap-5'>
        <button
          className='block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors'
          onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? (<X className='text-2xl' />) : (<Menu className='text-2xl' />)}
        </button>
        <div className='flex items-center gap-2'>
          <img src={assets.logo} alt='logo' className='h-15 w-15' />
          <span className='text-lg font-medium text-black truncate'>Money Manager</span>
        </div>
      </div>

      {/* Right side - Profile picture */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => { setShowDropdown(!showDropdown) }}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2">
          <User className='text-purple-500' />
        </button>
        {
          showDropdown && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
              {/* User Info */}
              <div className='px-4 py-3 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                    <User className='w-4 h-4 text-purple-600' />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate  overflow-hidden ">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate overflow-hidden">{user.email}</p>
                  </div>

                </div>
              </div>
              {/* Drop Options */}
              <div className="py-1">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <LogOut className='w-4 h-4 text-ggray-500' />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )
        }

      </div>

      {/* Mobile Side Menu */}
      {openMenu &&
        <div className='fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[70px]'>
          <Sidebar activeMenu={activeMenu} />
        </div>}
    </div>
  )
}

export default MenuBar