import React, { useContext } from 'react'
import MenuBar from './MenuBar'
import Sidebar from './Sidebar.jsx';
import { AppContext } from '../context/AppContext.jsx';

const Dashboard = ({children,activeMenu}) => {

  const {user}= useContext(AppContext);

  return (
    <>
        <MenuBar activeMenu={activeMenu}/>
          {user && (
            <div className="flex bg-gray-950 min-h-screen">
            <div className="max-[1080px]:hidden">
            
              {/* {Side bar content} */}
              <Sidebar activeMenu={activeMenu}/>
            </div>
            {/* main-app content */}
            <div className='grow mx-5'>{children}</div>
          </div>
          )}
    </>
  )
}

export default Dashboard