import "../style.css";
import { TbMathGreater } from "react-icons/tb";
import { Link } from 'react-router-dom';
// import { CgProfile } from "react-icons/cg";
import fisher from '../img/fisher.jpg';

const Header = (props) => {
    return ( 
        <div className="px-8 py-4 border-b-2 border-fa">

            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center text-sm gap-1 text-black2">
                    <Link>Home</Link>
                    <TbMathGreater className="text-primary"/>
                    <Link to="/Dashboard" className="text-primary font-medium">{props.title}</Link>
                </div>

                <div className="flex flex-row items-center text-sm gap-2">
                    <button className="py-2 px-6 bg-primary text-white rounded-md">Admin</button>
                    {/* <CgProfile className="h-8 w-8 text-black3"/> */}
                    <Link to="/Settings"><img src={fisher} alt="" className="h-10 w-10 rounded-full"/></Link>
                </div>
            </div>

        </div>
     );
}
 
export default Header;
