import "../style.css";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function ViewOrders ({ show, handleClose, orderDetails, baseURL, token }) {
  const [selectedStatus, setSelectedStatus] = useState(orderDetails?.orderState || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spin, setSpin] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

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

  // Handle status change in the dropdown
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    if (newStatus === 'CANCELLED') {
      setShowCancelModal(true); // Show cancellation reason modal if CANCELLED is selected
    } else {
      setShowConfirmModal(true); // Show regular confirmation modal for other statuses
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle status change in the dropdown
  const confirmStatusUpdate = async () => {
    setLoading(true);
    setError(null);
    setShowConfirmModal(false);

    try {
      const response = await fetch(`${baseURL}/admin/order/update-order-item-state/${orderDetails.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) {
        setErrorMessage('Failed to update status');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
      } else {
        setSuccessMessage('Status updated successfully');
        setErrorMessage('')
        setIsModalOpen(true);
        window.location.reload();
      }

      const result = await response.json();
      console.log('Success:', result);
      } catch (error) {
          console.error('Error:', error);
      } finally {
        setSpin(false);
        setIsModalOpen(true);
      }
  };

  // Function to confirm cancellation with reason
  const confirmCancellation = async () => {
    setLoading(true);
    setError(null);
    setShowCancelModal(false); // Close cancellation reason modal

    try {
      const response = await fetch(
        `${baseURL}/admin/order/update-order-item-state/${orderDetails.id}?status=CANCELLED&reason=${encodeURIComponent(cancelReason)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        setErrorMessage('Failed to cancel the order');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
      } else {
        setSuccessMessage('Status updated successfully');
        setErrorMessage('')
        setIsModalOpen(true);
        window.location.reload();
      }

      const result = await response.json();

      if (result.success) {
        window.location.reload(); // Reload the page for the changes to take effect
      } else {
        throw new Error('Failed to cancel the order');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

                    {/* Modal */}
                      <div className="fixed top-4 left-4 md:left-44 w-72 md:w-3/4 mb-4">
                            {isModalOpen && (
                              <Modal
                                message={errors || successMessage}
                                type={errors ? 'error' : 'success'}
                                onClose={closeModal}
                                className=""
                              />
                            )}
                          </div>

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
                        </div><br/>

                        {/* Dropdown to change status */}
                        <div className="flex flex-col gap-1 relative">
                          <label>Update Status</label>
                          
                            <select
                              value={selectedStatus}
                              onChange={handleStatusChange}
                              className="block appearance-none border border-disable rounded-md w-full px-4 py-6 text-black leading-tight focus:outline-disable bg-white"
                              disabled={loading}
                            >
                              <option value="" disabled>Select Status</option>
                              <option value="CANCELLED">Cancelled</option>
                              <option value="ORDER_PLACED">Order Placed</option>
                              <option value="PENDING_CONFIRMATION">Pending Confirmation</option>
                              <option value="WAITING_TO_BE_SHIPPED">Waiting to be shipped</option>
                              <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                              <option value="SHIPPED">Shipped</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black2">
                              <RiArrowDropDownLine className="h-6 w-6"/>
                            </div>
                        </div>
                      </div>
                    ) : (
                      <p>No details available.</p>
                    )}

                    {/* Confirmation Modal */}
                    {showConfirmModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-80">
                        <div className="bg-white rounded-lg w-3/4 max-w-lg py-8 px-4 lg:px-16 z-10 max-h-screen">
                          <button
                          className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                          onClick={() => setShowConfirmModal(false)}>
                          &times;
                          </button>

                          <h3 className="text-lg md:text-xl text-primary text-center font-bold mb-4">Confirm Status Update</h3>
                          <p className="mb-4 text-md md:text-lg text-center">Are you sure you want to update the status to "{selectedStatus}"?</p>
                          <div className="flex flex-col-reverse md:flex-row justify-items-stretch gap-4 mr-2">
                            <button
                              className="bg-disable text-black2 py-3 px-16 rounded-md"
                              onClick={() => setShowConfirmModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-primary text-white py-3 px-16 rounded-md"
                              onClick={confirmStatusUpdate}
                              disabled={loading}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancellation Modal with Reason */}
                    {showCancelModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-screen">
                          <button
                          className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                          onClick={() => setShowCancelModal(false)}>
                          &times;
                          </button>

                          <h3 className="text-red text-2xl font-bold mb-4">Cancel Order</h3>
                          <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="border p-4 w-full h-32 rounded-md border-disable bg-white focus:outline-disable text-normal text-left text-black2"
                            rows="3"
                            placeholder="Enter cancellation reason..."
                          />
                          <div className="flex flex-row gap-3 justify-end">
                            <button
                              className="bg-disable text-black2 py-3 px-16 rounded-md cursor-pointer"
                              onClick={() => setShowCancelModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-red text-white py-3 px-16 rounded-md cursor-pointer"
                              onClick={confirmCancellation}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                                                        
                </div>
            </div>
        )}
    </div>
  );
}

export default ViewOrders;


