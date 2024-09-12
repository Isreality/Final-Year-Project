import "../style.css";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function ViewOrders ({ show, handleClose, orderDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spin, setSpin] = useState(null);

  // Function to assign color based on status
  const getStatusColorClass = (status) => {
    switch (status) {
        case 'CANCELLED':
            return 'bg-black'; // Black for cancelled
        case 'ORDER_PLACED':
            return 'bg-pend'; // Yellow for order placed
        case 'PENDING_CONFIRMATION':
            return 'bg-orange-500'; // Orange for pending confirmation
        case 'WAITING_TO_BE_SHIPPED':
            return 'bg-primary'; // Purple for waiting to be shipped
        case 'OUT_FOR_DELIVERY':
            return 'bg-teal-500'; // Teal for out for delivery
        case 'SHIPPED':
            return 'bg-success'; // Green for shipped
        default:
            return 'bg-gray-500'; // Default color for any unknown status
    }
};

  // Function to format boolean to "Yes" or "No" with color
  const formatBooleanToYesNoWithColor = (value) => {
    return (
        <span className={value ? 'text-success' : 'text-red'}>
            {value ? 'Yes' : 'No'}
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

                    <h2 className="text-2xl text-primary text-center font-semibold mb-4">Order Details</h2>
                    {orderDetails ? (
                      <div className="flex flex-col gap-5 text-left text-lg">
                        <div className="flex items-center justify-between">
                          <p>Order Reference</p> 
                          {orderDetails.orderItemsRef}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Price</p> 
                          {orderDetails.product.price}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Status</p>
                          <div className="flex flex-row items-center">
                            <span
                              className={`w-2 h-2 rounded-full mr-2 ${getStatusColorClass(orderDetails.orderState)}`}
                            ></span> 
                            {orderDetails.orderState}
                          </div>
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Payback</p> 
                          {/* {orderDetails.isPayBackLater ? 'Yes' : 'No'} */}
                          {formatBooleanToYesNoWithColor(orderDetails.isPayBackLater)}
                        </div>
                        <hr/>
                        
                        <div className="flex items-center justify-between">
                          <p>Date</p> 
                          {orderDetails.createdDate}
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

export default ViewOrders;


