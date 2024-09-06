// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import FetchCategory from "../Components/FetchCategory";
// import AddStaffAdmin from "../Components/AddStaffAdmin";
import { useState, useEffect } from 'react';
import { HiUser } from "react-icons/hi2";
import { MdPayments } from "react-icons/md";
import { RxCaretRight } from "react-icons/rx";
import { BiShieldQuarter } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from 'react-router-dom';
import {  useMatch } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
                <div className="mb-4 items-center"><Header title="Manage Category" link="/category"/></div>
                
                <div className="flex md:flex-row flex-col justify-between items-left md:items-center px-8 mb-4">
                  <div className="mb-4 text-left"><Heading title="Manage Category"/></div>
                  <div>
                    <button onClick={openModal} className="flex flex-row w-full gap-1 items-center p-4 bg-primary text-white text-sm text-center rounded-md">
                      <FaPlus/>
                      <p>Add Category</p>
                    </button>

                    {/* <AddStaffAdmin show={showModal} handleClose={closeModal}/> */}
                  </div>
                </div>
               
                {/* Body */}               
                <div className="mx-8">  
                  <FetchCategory />
                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Category;
