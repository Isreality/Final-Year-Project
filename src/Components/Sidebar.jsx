import "../style.css";
import "../index.css";
import { useState } from 'react';
import SidebarData from "../Components/SidebarData";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const proceed = () => {
        setIsOpen(false);
        navigate('/'); 
    };

    return ( 
        <>
            <div className=" sticky h-full left-0 w-60 text-left border-r border-disable p-4 bg-white" >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                {/* Display your content using the fetched data */}
                {/* Example: <p>{data.someValue}</p> */}
                </div>
            )}
                <div className="">
                    <div className="flex flex-col justify-items-start mb-4 pl-2">                
                    <h1 className="mb-4 mt-4 font-extrabold text-primary text-2xl">Market Access</h1>
                    </div>
                    
                    {/* Nav */}
                    <div className="flex justify-between lg:flex-col space-y-1">
                        {SidebarData.map((nav) => (
                            <NavLink to={nav.path} key={nav.id} className="flex flex-row items-center gap-2 text-sm text-black2 hover:text-black2 hover:bg-disable font-normal  hover:rounded-md hover:border-primary pl-4 pr-10 py-4">
                                {nav.icons || <Skeleton circle width={20} height={20}/>}
                                {/* <NavLink to={nav.path} className="nav">{nav.title}</NavLink> */}
                                {nav.title || <Skeleton/>}
                            </NavLink> 
                        ))}
                    </div><br/>

                    {/* Logout */}   
                    <div className="flex flex-row justify-items-center mb-4 pl-4 py-4 gap-3 cursor-pointer text-sm text-black2 hover:text-black2 hover:bg-disable font-normal  hover:rounded-md hover:border-primary">
                        <TbLogout className="h-5 w-5"/>
                        <button type="submit" onClick={openModal}>Logout</button>
                    </div>
                    
                    {/* Logout */}
                    {isOpen && (
                        <div className="fixed inset-0 flex justify-center items-center z-80">
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="relative bg-white rounded-lg max-w-lg py-8 px-10 z-10">
                                <button
                                className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                                onClick={closeModal}
                                >
                                &times;
                                </button>

                                <h2 className="text-xl text-red text-center font-semibold mb-4">Logout</h2>
                                <p className="mb-4 text-center">Are you sure you want to logout of your account?</p>
                                
                                <div className=" flex flex-row justify-items-stretch gap-4 mr-2">
                                    <button className="bg-disable text-black2 py-3 px-16 rounded-md" onClick={closeModal}>Cancel</button>
                                    <button className="bg-red text-white py-3 px-16 rounded-md" onClick={proceed}>Logout</button>
                                </div>
                            </div>
                        </div>
                    )}
                
                </div>                    
            </div>
        </>
     );
}
 
export default Sidebar;