import "../style.css";
import "../index.css";
import SidebarData from "../Components/SidebarData";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return ( 
        <>
            <div className=" sticky h-screen left-0 w-60 text-left border-r-2 border-fa" >
                <div className="p-2">
                    <div className="flex flex-col justify-items-start mb-4 pl-6">                
                    <Link to='/Dashboard'><h1 className="mb-8 mt-4 font-extrabold text-primary text-2xl">Market Access</h1></Link>
                    </div>
                    
                    {/* Nav */}
                    <div className="flex justify-between lg:flex-col space-y-10">
                        {SidebarData.map((nav) => (
                            <div key={nav.id}>
                                <NavLink to={nav.path} className=" m-2 text-black2 hover:text-black hover:bg-disable font-medium  hover:rounded-md hover:border-primary hover:min-w-full pl-4 pr-10 py-4">{nav.title}</NavLink>
                            </div> 
                        ))}
                    </div> 
                
                </div>                    
            </div>
        </>
     );
}
 
export default Sidebar;