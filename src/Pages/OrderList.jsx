// // import { Link } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { HiOutlineTrash } from "react-icons/hi";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import FetchOrders from "../Components/FetchOrders";
import BeatLoader from "react-spinners/BeatLoader";

const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


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
                <div className="mb-4 items-center"><Header title="Orders" link="/orders"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Orders"/></div>
                </div>
                
                {/* Body */}
                <div className="mx-8">
                    <FetchOrders/>          
                </div>
                
              </div>

            </div>
          )}
           
        </div>
     );
}
 
export default OrderList;
