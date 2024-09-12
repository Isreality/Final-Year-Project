import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { MdDeliveryDining } from "react-icons/md";
import { RiListView } from "react-icons/ri";
import { Doughnut, Line } from "react-chartjs-2";
import { TbMathGreater } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Seller = () => {
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
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <BeatLoader
                  color={'#481986'}
                  loading={loading}
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
                <div className="mb-4 items-center"><Header title="Become a Seller Request" link="/becomeaseller"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Become a Seller Request"/></div>
                </div>
                
                {/* Body */}

                                           
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Seller;
