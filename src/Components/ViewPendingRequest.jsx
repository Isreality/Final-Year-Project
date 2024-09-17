import "../style.css";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function ViewPendingRequest ({ show, handleClose, pendingDetails }) {
    const displayValue = (value) => {
        return value ? value : 'N/A';
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

                    <h2 className="text-2xl text-primary text-center font-semibold mb-4">Request Details</h2>
                    {pendingDetails ? (
                      <div className="flex flex-col gap-5 text-left text-lg">
                        <img src={pendingDetails.profile_image_url} alt="" className=" h-10 w-10 md:h-40 md:w-40 rounded-lg"/>
                        <div className="flex items-center justify-between">
                          <p>ID</p> 
                          {pendingDetails.association_id}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Name</p> 
                          {pendingDetails.name}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Email</p>
                          {pendingDetails.email}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Phone</p> 
                          {pendingDetails.phone_number}
                        </div>
                        <hr/>
                        
                        <div className="flex items-center justify-between">
                          <p>Association</p> 
                          {displayValue(pendingDetails.cooperative_name)}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Chairman Name</p> 
                          {displayValue(pendingDetails.chairman_name)}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Chairman Number</p> 
                          {displayValue(pendingDetails.chairman_number)}
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

export default ViewPendingRequest;


