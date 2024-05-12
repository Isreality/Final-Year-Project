// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { RiListView } from "react-icons/ri";
// import Skeleton from 'react-loading-skeleton';


const Dashboard = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, [])

    return ( 
        <div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row">
              {/* Sidebar */}
              <div>
                <Sidebar/>
              </div>

              {/* Body */}
              <div className="w-full">
                <div className="mb-4"><Header title="Dashboard"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Dashboard"/></div>
                </div>

                <div className=" grid grid-cols-4 px-8 gap-5">
                  <Card className="bg-primary !important text-white" title="Total Revenue" icons={<TbCurrencyNaira className="size-10 text-white bg-primary p-2 rounded-full"/>} info="10M"/>
                  <Card className="bg-fa !important" title="Total Orders" icons={<RiListView className="size-10 text-white bg-blue p-2 rounded-full"/>} info="5K"/>
                  <Card title="Total Delivery" icons={<MdDeliveryDining className="size-10 text-white bg-success p-2 rounded-full"/>} info="50K"/>
                  <Card title="Total Users" icons={<FaUsers className="size-10 text-white bg-pend p-2 rounded-full"/>} info="100K"/>
                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Dashboard;
