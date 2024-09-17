import "../style.css";   
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import ViewPendingRequest from '../Components/ViewPendingRequest';
import DeclineRequest from '../Components/DeclineRequest';
import { useState, useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";
import { SlSocialDropbox } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import ScaleLoader from "react-spinners/ScaleLoader";
// import { useNavigate } from 'react-router-dom';

const PendingRequest = () => {
  const [data, setData] = useState([]);
  const [seller, setSeller] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);


  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/customer/fetch-become-a-seller-requests';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  const displayValue = (value) => {
    return value ? value : 'N/A';
  };

  const toggleDropdown = (id) => {
    setIsDropdownOpen((prev) => (prev === id ? null : id));
  };

  const handleView = (sell) => {
    setDetails(sell);
    setIsDetailsModalOpen(true);
    setIsDropdownOpen();
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const handleAccept = (id) => {
    console.log("Accept clicked for id:", id);
  };


  // useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL + endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Atoken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'origin': '*',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status) {
          // console.log(result);
          setData(result.data);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [Atoken]);

  const handleDecline = (sell) => {
    setSelectedRequest(sell);
    setShowDeclineModal(true);
    setIsDropdownOpen();
  };

  const closeDeclineModal = () => {
    setShowDeclineModal(false);
  };

  // const onSubmitDecline = async () => {
  //   // if (!selectedRequest) {
  //   //   // alert('Please provide a reason for declining the request.');
  //   //   setErrorMessage('Please provide a reason for declining the request.');
  //   //   setSuccessMessage('');
  //   //   return;
  //   // }

  //   if (!selectedRequest) return;
  
  //   try {
  //     const response = await fetch(`${baseURL}/admin/customer/decline-become-a-seller-request/${selectedRequest._id}`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${Atoken}`,
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //       body: JSON.stringify({ reason: selectedRequest?._id }),
  //     });
  
  //     const result = await response.json();
  
  //     if (!response.ok) {
  //       throw new Error(result.message || 'Something went wrong');
  //     }
  
  //     setSuccessMessage('Request declined successfully');
  //     setShowDeclineModal(false);
  //     // setSelectedRequest('');
  //     setIsModalOpen(true);
  
  //     // Optionally, refresh the data or update the UI
  //     fetchData();
  //   } catch (error) {
  //     setError(error.message);
  //     setShowDeclineModal(false);
  //   }
  // };
  

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 3000)
  }, [])

  
  

  if (loading) {
    return (
      <div>
        <ScaleLoader
          color={'#c4c4c4'}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> 
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <LuUsers className="text-9xl text-c4"/>
        <p className="text-lg text-black2">No Request Yet</p>
      </div>
    );
  }

  return (
    <div>
      <div className="">
            {/* Modal */}
            <div className="fixed top-4 w-72 md:w-3/4 mb-4">
              {isModalOpen && (
                <Modal
                  message={errors || successMessage}
                  type={errors ? 'error' : 'success'}
                  onClose={removeModal}
                  className=""
                />
            )}
            </div>

                    <table className="min-w-full border-collapse border border-disable py-4">
                        <thead className="bg-fa text-sm text-left p-4">
                        <tr className="">
                            {/* <div className="p-2 text-left items-center"><th className="p-4 text-black2 font-normal">S/N</th></div> */}
                            <th className="px-4 py-6 text-black2 font-normal">ID</th>
                            <th className="px-4 py-6 text-black2 font-normal">Name</th>
                            <th className="px-4 py-6 text-black2 font-normal">Email</th>
                            <th className="px-4 py-6 text-black2 font-normal">Phone</th>
                            <th className="px-4 py-6 text-black2 font-normal">Association</th>
                            <th className="px-4 py-6 text-black2 font-normal">Chairman Name</th>
                            <th className="px-4 py-6 text-black2 font-normal">Chairman Number</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="p-4">
                        {data.map((sell) => (
                            <tr key={sell._id} className="text-black2 text-sm border-b items-center border-disable p-6">
                                <td className="px-6 py-6 text-left">{sell.association_id}</td>
                                <td className="flex flex-row gap-2 px-4 py-6 items-center text-center">
                                    <img src={sell.profile_image_url} alt="" className=" h-10 w-10 md:h-12 md:w-12 rounded-md"/>
                                    {sell.name}   
                                </td>
                                <td className="px-4 py-6 text-left">{sell.email}</td>
                                <td className="px-4 py-6 text-left">{sell.phone_number}</td>
                                <td className="px-4 py-6 text-left">{displayValue(sell.cooperative_name)}</td>
                                <td className="px-4 py-6 text-left">{displayValue(sell.chairman_name)}</td>
                                <td className="px-4 py-6 text-left">{displayValue(sell.chairman_number)}</td>
                                <td className="relative items-right">
                                  <button
                                    onClick={() => toggleDropdown(sell)} 
                                    className="cursor-pointer">
                                    <FiMoreVertical className="text-black2 text-right size-5 cursor-pointer" />
                                  </button>
                                  {isDropdownOpen === sell && (
                                    <div className="absolute right-0 bg-white border border-gray-200 shadow-md rounded-md mt-2 w-32">
                                      <ul>
                                        <li 
                                          className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                                          onClick={() => handleView(sell)}>
                                          View
                                        </li>
                                        <li 
                                          className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                                          onClick={() => handleAccept(sell)}>
                                          Accept
                                        </li>
                                        <li 
                                          className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                                          onClick={() => handleDecline(sell)}>
                                          Decline
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <ViewPendingRequest
                      show={isDetailsModalOpen}
                      handleClose={closeDetailsModal}
                      pendingDetails={details}
                    />

                    <DeclineRequest
                      show={showDeclineModal}
                      handleClose={closeDeclineModal}
                      // onSubmit={onSubmitDecline}
                    />
      </div>
    </div>
  );
}

export default PendingRequest;