// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import { useState, useEffect } from 'react';
import { useAuth } from '../Components/AuthContext';
import { FaUsers } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { RiListView } from "react-icons/ri";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { TbMathGreater } from "react-icons/tb";
import { Link } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Tooltip, Legend, Filler);
const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const { authToken, setStatusCode } = useAuth();
  const [stat, setStat] = useState([]);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/dashboard';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL + endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Atoken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': "69420",
            'origin': '*',
          },
        });

        setStatusCode(response.status);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status) {
          // console.log(result);
          setStat(result.data);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [Atoken, setStatusCode]);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, [])

    return ( 
        <div>

          {loading ? (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <BeatLoader
                  color={'#481986'}
                  loading={loading}
                  // cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              /> 
            </div>
          ) : (
            <div className="flex flex-row">
              {/* Sidebar */}
              <div>
                <Sidebar/>
              </div>

              {/* Header */}
              <div className="w-full">
                <div className="mb-4 items-center"><Header title="Dashboard" link="/dashboard"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Dashboard"/></div>
                </div>
                
                {/* Body */}
                {/* Card */}
                <div className=" grid lg:grid-cols-4 sm:grid-cols-1 px-8 gap-5 mb-4">
                  <Card className="bg-primary" title="Total Orders" icons={<RiListView className="size-10 text-white bg-blue p-2 rounded-full"/>} info={stat.totalOrders}/>
                  <Card title="Total Users" icons={<FaUsers className="size-10 text-white bg-pend p-2 rounded-full"/>} info={stat.totalUsers}/>
                </div>

                                
                {/* Recent Orders */}
                <div className="flex flex-row justify-between px-8">
                  <div className="text-primary text-xl font-semibold">Recent Orders</div>

                  <div className=" text-black2 text-md font-medium px-4">
                    <Link to="/OrderList" className="flex flex-row cursor-pointer gap-1 items-center">See All<TbMathGreater/></Link>
                  </div>

                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Dashboard;
