import "../style.css";
import { useState, useEffect } from 'react';
import Modal from "../Components/Modal";
import { FaSpinner } from 'react-icons/fa';

function DeclineRequest ({ show, handleClose, selectedRequest }) {
  const [reason, setReason] = useState('');
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
    e.preventDefault();
    if (!reason) {
        setErrorMessage('Please provide a reason for declining the request.');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
    }     

    if (!selectedRequest) {
      setErrorMessage('No request selected.');
      setIsModalOpen(true);
      return;
    }
    setSpin(true);

    try {
      const response = await fetch(`${baseURL}/admin/customer/decline-become-a-seller-request/${selectedRequest._id}`, {
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

  if (!show) return null;

  return ( 
    <div>
      {show && (
        <div className="fixed inset-0 flex justify-center items-center z-80">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-screen">
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

             {/* Heading */} 
            <h1 className="text-red text-2xl font-bold mb-4">Decline Request</h1>

            
            {/* Form */}
            <form  onSubmit={handleSubmit}>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter the reason for declining"
                  className="border p-4 w-full h-32 rounded-md border-disable bg-white focus:outline-disable text-normal text-left text-black2"
                  rows="4"
                ></textarea>               
                {errors.reason && <span style={{ color: 'red' }}>{errors.reason}</span>}<br/><br/>

                {/* Button */}
                <div className="flex flex-row gap-3 justify-items-end">
                  <button className="bg-disable text-black2 py-3 px-16 rounded-md" onClick={handleClose}>Cancel</button>
                  <button className="bg-red text-white py-3 px-16 rounded-md" type="submit">Decline</button>
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

  