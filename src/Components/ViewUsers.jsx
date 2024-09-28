import "../style.css";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function ViewUsers ({ show, handleClose, userDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spin, setSpin] = useState(null);

  // Function to assign color based on status
  const getStatusColorClass = (value) => {
    return (
      <span className="flex items-center gap-1">
        <span
          className={`h-2 w-2 rounded-full ${
            value === 1 ? 'bg-success' : 'bg-red'
          }`}
        ></span>
        {value === 1 ? 'Enabled' : 'Disabled'}
      </span>
    );
  };

  return ( 
    <div>
        {show && (
            <div className="fixed inset-0 flex justify-center items-center z-80">
                <div className="absolute inset-0 bg-black opacity-50 h-screen"></div>
                <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-[470px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white">
                    <button
                    className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                    onClick={handleClose}>
                    &times;
                    </button>

                    <h2 className="text-2xl text-primary text-center font-semibold mb-4">User Details</h2>
                    {userDetails ? (
                      <div className="flex flex-col gap-5 text-left text-md">
                        <div className="flex items-center justify-between">
                          <p>Name</p> 
                          {userDetails.name}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Phone</p> 
                          {userDetails.phone_number}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Email</p> 
                          {userDetails.email}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Status</p>
                          <div className="flex flex-row items-center">
                            {getStatusColorClass(userDetails.is_active)}
                          </div>
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Account</p> 
                          {userDetails.account_type}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Location</p> 
                          {userDetails.address}
                        </div>
                        <hr/>
                        
                        <div className="flex items-center justify-between">
                          <p>Date</p> 
                          {userDetails.created_at}
                        </div>
                      </div>
                    ) : (
                      <p>No details available.</p>
                    )}
                                                        
                </div>
            </div>
        )}
    </div>
  );
}

export default ViewUsers;


