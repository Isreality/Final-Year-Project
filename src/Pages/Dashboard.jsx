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
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
// import Skeleton from 'react-loading-skeleton';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Tooltip, Legend);
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

              {/* Header */}
              <div className="w-full">
                <div className="mb-4 items-center"><Header title="Dashboard" link="/Dashboard"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Dashboard"/></div>
                </div>
                
                {/* Body */}
                {/* Card */}
                <div className=" grid lg:grid-cols-4 sm:grid-cols-1 px-8 gap-5 mb-4">
                  <Card className="bg-primary !important text-white" title="Total Revenue" icons={<TbCurrencyNaira className="size-10 text-white bg-primary p-2 rounded-full"/>} info="10M"/>
                  <Card className="bg-fa !important" title="Total Orders" icons={<RiListView className="size-10 text-white bg-blue p-2 rounded-full"/>} info="5K"/>
                  <Card title="Total Delivery" icons={<MdDeliveryDining className="size-10 text-white bg-success p-2 rounded-full"/>} info="50K"/>
                  <Card title="Total Users" icons={<FaUsers className="size-10 text-white bg-pend p-2 rounded-full"/>} info="100K"/>
                </div>

                {/* Charts */}
                <div className=" grid lg:grid-cols-3  px-8 gap-3">
                  <div className="col-span-2 md:col-span-2 bg-white border border-disable rounded-md p-4 overflow-hidden">
                    <p className="text-md text-black text-left mb-2">Customer Order Map</p>
                    <Line
                        data = {{
                          labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
                          datasets: [
                            {
                              // label: '# of Votes',
                              data: [50, 100, 80, 100, 150, 120, 200],
                              fill: true,
                              // backgroundColor: (context) => {
                              //   const ctx = context.chart.ctx;
                              //   const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                              //   gradient.addColorStop(0, '#481986');
                              //   gradient.addColorStop(1, 'rgba(72, 25, 134, 0)');
                              //   return gradient;
                              // },
                              borderColor: '#481986',
                              tension: 0.3,
                              borderWidth: 1,
                              backgroundColor: 'rgba(72, 25, 134, 0.1)',
                              pointRadius: 0,
                            },
                          ],
                        }}

                        options = {{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: '',
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                display: false,
                              },
                            },
                            y: {
                              grid: {
                                display: false,
                              },
                            },
                          },
                        }}
                      />
                  </div>

                  <div className="bg-white border w-full border-disable p-6 rounded-md">
                    <p className="text-md text-black text-left mb-2">Order Status</p>
                    <Doughnut className="items-center"
                      data = {{
                        labels: ['50% Delivered', '30% Pending', '20% Cancelled'],
                        datasets: [
                          {
                            // label: '# of Votes',
                            data: [50, 30, 20],
                            backgroundColor: [
                              '#009688',
                              '#EDBB00',
                              '#CC4424',
                            ],
                          },
                        ],
                      }}

                      options = {{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                          tooltip: {
                            enabled: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Dashboard;
