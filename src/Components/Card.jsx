import "../style.css";
import { PiUsersThree } from "react-icons/pi";

const CardData =
    [
      {
        title: "Total Revenue",
        icons: <RxDashboard className="w-5 h-5"/>,
        id: 1
      },
  
      {
        title: "Total Orders",
        icons: <RiFileList3Line className="w-5 h-5"/>,
        id: 2
      },

      {
        title: "Total Delivery",
        icons: <LuUsers className="w-5 h-5"/>,
        id: 3
      },

      {
        title: "Total Users",
        icons: <PiUsersThree className="w-5 h-5 text-pend"/>,
        id: 4
      },
    ]

const Header = (props) => {
    return ( 
        <div className="px-8 py-4 border-b-2 border-fa">
            <div className="flex flex-row justify-between">
                <h1>Total Revenue</h1>
                
            </div>

        </div>
     );
}
 
export default Header;
