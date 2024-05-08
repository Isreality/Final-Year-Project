import "../style.css";
import "../index.css";
import SidebarData from "../Components/SidebarData";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logout from "../icons/sidebar/logout.svg"


const Sidebar = () => {
    return ( 
        <>
            <div className=" sticky h-full left-0 w-64 text-left border-r-2 border-fa" >
                <div className="p-4">
                    <div className="flex flex-col justify-items-start mb-4 pl-2">                
                    <Link to='/Dashboard'><h1 className="mb-4 mt-4 font-extrabold text-primary text-2xl">Market Access</h1></Link>
                    </div>
                    
                    {/* Nav */}
                    <div className="flex justify-between lg:flex-col space-y-2">
                        {SidebarData.map((nav) => (
                            <NavLink to={nav.path} key={nav.id} className="flex flex-row gap-3 text-sm text-black2 hover:text-black2 hover:bg-disable font-medium  hover:rounded-md hover:border-primary pl-4 pr-10 py-4">
                                <img src={nav.src} alt="icon" className='h-5 w-5'/>
                                {/* <NavLink to={nav.path} className="nav">{nav.title}</NavLink> */}
                                {nav.title}
                            </NavLink> 
                        ))}
                    </div><br/>

                    {/* Logout */}   
                    <div className="flex flex-row justify-items-center mb-4 pl-4 py-4 gap-3 text-sm text-black2 hover:text-black2 hover:bg-disable font-medium  hover:rounded-md hover:border-primary">
                        <img src={logout} alt="" className='h-5 w-5'/>
                        <button type="submit" >Logout</button>
                    </div>
                
                </div>                    
            </div>
        </>
     );
}
 
export default Sidebar;