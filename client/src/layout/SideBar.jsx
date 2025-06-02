import React, { useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from '../store/slices/authSlice'
import { toggleAddBookPopup, toggleAddNewAdminPopup, toggleSettingPopup } from "../store/slices/popUpSlice";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from '../popups/SettingPopup'
import libraryLogo from '../assets/library_logo.avif'

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {

  const {addNewAdminPopup,settingPopup}=useSelector(state=> state.popup)
  const { loading, error, message, user, isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(resetAuthSlice())
    }
    if (message) {
       toast.success(message)
      dispatch(resetAuthSlice())
    }
  }, [dispatch, isAuthenticated, error, loading, message])
  return (
    <>
      <aside className={`${isSideBarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`}
        style={{ position: 'fixed' }}>

        <div className="px-4  relative mb-8">
          <img src={libraryLogo} alt="logo"/>
           <p className="absolute bottom-4 left-6 text-2xl font-semibold italic">Bookeeda Library</p>
        </div>
       
        <nav className="flex-1 px-6 space-y-1">
          <button className="w-full py-2 font-medium  bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Dashbord")}>
            <img src={dashboardIcon} alt="icon" /><span>Dashboard</span>
          </button>

          <button className="w-full py-2 font-medium  bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Books")}>
            <img src={bookIcon} alt="books" /><span>Books</span>
          </button>

          
          {  isAuthenticated && user?.role === "Admin" && (
              <>
                <button className="w-full py-2 font-medium  bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Catalog")}>
                  <img src={catalogIcon} alt="catalog" /><span>Catalog</span>
                </button>
                <button className="w-full py-2 font-medium  bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Users")}>
                  <img src={usersIcon} alt="Users" /><span>Users</span>
                </button>
                <button className="w-full py-2 font-medium  bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
                onClick={() =>dispatch(toggleAddNewAdminPopup())}
                >
                 
                  <RiAdminFill /> <span>Add New Admin</span>
                </button>
                </>
              )}
          

          {
            isAuthenticated && user?.role === "User" && (
              <>
                <button className="w-full py-2 font-medium  bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("My borrowed Books")}>
                  <img src={catalogIcon} alt="catalog" /><span>My Borrowed Books</span>
                </button>
              </>
            )
          }

          <button className="w-full py-2 font-medium  bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2 md:hidden " 
          onClick={() => dispatch(toggleSettingPopup())}
            >
            <img src={settingIcon} alt="catalog" /><span>Update Credentials</span>
          </button>

        </nav>
        <div className="px-6 py-6">
          <button className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center gap-3 mx-auto" onClick={handleLogout}><img src={logoutIcon} alt="logout"  /> <span>Log Out</span></button>
        </div>
        <img src={closeIcon} alt="close" onClick={()=> setIsSideBarOpen(!isSideBarOpen)} className="h-fit w-fit absolute top-0 right-4 mt-4  block md:hidden"/>

        
      </aside>
      {addNewAdminPopup && <AddNewAdmin/>}
       {settingPopup && <SettingPopup/>}
    </>
  );
};

export default SideBar;
