import "../style.css"
import dash from "../icons/sidebar/dash.svg"
import order from '../icons/sidebar/order.svg';
import people from "../icons/sidebar/people.svg"
import product from "../icons/sidebar/product.svg"
import not from "../icons/sidebar/not.svg"
import star from "../icons/sidebar/star.svg"
import settings from "../icons/sidebar/settings.svg"


const SidebarData =
    [
      {
        title: "Dashboard",
        path: "/Dashboard",
        src: dash,
        id: 1
      },
  
      {
        title: "Order List",
        path: "/OrderList",
        src: order,
        id: 2
      },

      {
        title: "Staff Admins",
        path: "/StaffAdmins",
        src: people,
        id: 3
      },

      {
        title: "Vendors",
        path: "/Vendors",
        src: people,
        id: 4
      },

      {
        title: "Customers",
        path: "/Customers",
        src: people,
        id: 5
      },

      {
        title: "Manage Products",
        path: "/ManageProducts",
        src: product,
        id: 6
      },

      {
        title: "Push Notification",
        path: "/PushNotification",
        src: not,
        id: 7
      },

      {
        title: "Reviews",
        path: "/Reviews",
        src: star,
        id: 8
      },

      {
        title: "Settings",
        path: "/Settings",
        src: settings,
        id: 9
      },
    ]

 
export default SidebarData;