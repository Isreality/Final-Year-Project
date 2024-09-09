import "../style.css"
import { RxDashboard } from "react-icons/rx";
import { RiFileList3Line } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { FiBox } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";

const SidebarData =
    [
      {
        title: "Dashboard",
        path: "/dashboard",
        icons: <RxDashboard className="w-5 h-5"/>,
        id: 1
      },
  
      {
        title: "Orders",
        path: "/orders",
        icons: <RiFileList3Line className="w-5 h-5"/>,
        id: 2
      },

      {
        title: "Staff Admins",
        path: "/staffadmins",
        icons: <LuUsers className="w-5 h-5"/>,
        id: 3
      },

      {
        title: "Users",
        path: "/users",
        icons: <LuUsers className="w-5 h-5"/>,
        id: 4
      },

      {
        title: "Category",
        path: "/category",
        icons: <BiCategoryAlt className="w-5 h-5"/>,
        id: 5
      },

      {
        title: "Products",
        path: "/products",
        icons: <FiBox className="w-5 h-5"/>,
        id: 6
      },

      {
        title: "Association",
        path: "/association",
        icons: <FaRegBuilding className="w-5 h-5"/>,
        id: 7
      },

      {
        title: "Become a Seller",
        path: "/becomeaseller",
        icons: <LuUsers className="w-5 h-5"/>,
        id: 8
      },

      {
        title: "Reviews",
        path: "/reviews",
        icons: <FaRegStar className="w-5 h-5"/>,
        id: 9
      },

      {
        title: "Settings",
        path: "/settings",
        icons: <SlSettings className="w-5 h-5"/>,
        id: 10
      },
    ]

 
export default SidebarData;