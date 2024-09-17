// import "../style.css";
// import Modal from "../Components/Modal";
// import { useState, useEffect } from 'react';

// function DeclineRequest ({ show, handleClose, onSubmit }) {
    // const [reason, setReason] = useState('');
    // const [showDeclineModal, setShowDeclineModal] = useState(false);
    // // const [declineReason, setDeclineReason] = useState('');
    // const [selectedRequest, setSelectedRequest] = useState(null);
    // const [errors, setErrorMessage] = useState({});
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [successMessage, setSuccessMessage] = useState('');

//     const baseURL = process.env.REACT_APP_BASE_URL;
//     // const endpoint = '/admin/association/add';
//     const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

//     const handleSubmit = async () => {
    
//         if (!selectedRequest) return;
      
//         try {
//           const response = await fetch(`${baseURL}/admin/customer/decline-become-a-seller-request/${selectedRequest._id}`, {
//             method: 'POST',
//             headers: {
//               'Authorization': `Bearer ${Atoken}`,
//               'Content-Type': 'application/json',
//               'Accept': 'application/json',
//             },
//             body: JSON.stringify({ reason }),
//           });

//         if (!response.ok) {
//             setErrorMessage('Request unsuccessful');
//             setSuccessMessage('');
//             setIsModalOpen(true);
//             return;
//           } else {
//             setSuccessMessage('Request declined successfully.');
//             setErrorMessage('')
//             setIsModalOpen(true);
//             window.location.reload();

//           }
    
//           const result = await response.json();
//           console.log('Success:', result);
//           } catch (error) {
//               console.error('Error:', error);
//           } finally {
//             // setSpin(false);
//             setIsModalOpen(true);
//           }
//       };

//     useEffect(() => {
//         setErrorMessage('');
//         setSuccessMessage('');
//       }, []);
    
//     const closeModal = () => {
//     setIsModalOpen(false);
//     };

//     if (!reason) {
//         setErrorMessage('Please provide a reason for declining the request.');
//         setSuccessMessage('');
//         return;
//     }

//     if (!show) return null;
  
//     return ( 
//         <div>
//           {show && (
//               <div className="fixed inset-0 flex justify-center items-center z-80">
//                   <div className="absolute inset-0 bg-black opacity-50 h-screen"></div>
//                       <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-screen ">
//                           <button
//                           className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
//                           onClick={handleClose}>
//                           &times;
//                           </button>

//                           {/* Modal */}
//                           <div className="fixed top-4 left-4 md:left-44 w-72 md:w-3/4 mb-4">
//                             {isModalOpen && (
//                                 <Modal
//                                 message={errors || successMessage}
//                                 type={errors ? 'error' : 'success'}
//                                 onClose={closeModal}
//                                 className=""
//                                 />
//                             )}
//                           </div>

//                           <h2 className="text-lg md:text-2xl text-red text-center font-bold mb-4">Decline Request</h2>
//                                 <form className='grid justify-items-stretch text-left' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                    // <label htmlFor="name" className="text-md text-left text-black2">
                                    // Reason
                                    // </label>
                                    // <textarea
                                    //     value={reason}
                                    //     onChange={(e) => setReason(e.target.value)}
                                    //     placeholder="Enter the reason for declining"
                                    //     className="border p-4 w-full h-32 rounded-md border-disable bg-white focus:outline-disable text-black2"
                                    //     rows="4"
                                    // ></textarea>

                                    // <div className=" flex flex-col-reverse md:flex-row justify-items-stretch gap-4 mr-2">
                                    //     <button className="bg-disable text-black2 py-3 px-16 rounded-md" onClick={handleClose}>Cancel</button>
                                    //     <button className="bg-red text-white py-3 px-16 rounded-md" onClick = {handleSubmit} type="submit">Decline</button>
                                    // </div>
//                                 </form>
                                
                                
//                       </div>
//               </div>
//           )}
         
           
//         </div>
//      );
//   };

//   export default DeclineRequest;

import "../style.css";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { MdCalendarMonth } from "react-icons/md";

function DeclineRequest ({ show, handleClose }) {
  const [reason, setReason] = useState('');
  // const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [spin, setSpin] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSubmit = async (e) => { 
    if (!reason) {
        setErrorMessage('Please provide a reason for declining the request.');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
    } 
    setSpin(true);

    try {
      const response = await fetch(`${baseURL}/admin/customer/decline-become-a-seller-request`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'origin': '*',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        setErrorMessage('Request unsuccessful');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
      } else {
        setSuccessMessage('Request declined successfully');
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

  return ( 
    <div>
      {show && (
        <div className="fixed inset-0 flex justify-center items-center z-80">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-screen">
            <button
              className="fixed top-10 right-8 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
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

             {/* Heading */} 
            <h1 className="text-red text-2xl font-bold mb-4">Decline Request</h1>

            
            {/* Form */}
            <form  className='grid justify-items-stretch text-left' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {/* Reason */}
                {/* <label htmlFor="reason" className="text-md text-left text-black2">
                  Reason
                </label> */}
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter the reason for declining"
                  className="border p-4 w-full h-32 rounded-md border-disable bg-white focus:outline-disable text-normal text-black2"
                  rows="4"
                ></textarea>               
                {errors.reason && <span style={{ color: 'red' }}>{errors.reason}</span>}<br/>

                {/* Button */}
                <div className=" flex flex-col-reverse md:flex-row justify-items-right gap-4 mr-2">
                  <button className="bg-disable text-black2 py-3 px-16 rounded-md" onClick={handleClose}>Cancel</button>
                  <button className="bg-red text-white py-3 px-16 rounded-md" onClick = {handleSubmit} type="submit">Decline</button>
                </div>
                {/* <button type="submit" onClick = {handleSubmit} disabled={spin} className='bg-red text-white py-3 px-16 rounded-md'>
                {spin ? <div className="px-2 text-xl text-center"><FaSpinner className="animate-spin text-center" /> </div> : 'Add'}
                </button> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeclineRequest;

  