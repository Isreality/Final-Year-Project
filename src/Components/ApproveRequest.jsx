import "../style.css";
import { useState, useEffect } from 'react';

function ApproveRequest ({ show, handleClose, request }) {
  const [approve, setApprove] = useState('');
  
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
    if (!request) return;   

    setSpin(true);

    try {
      const response = await fetch(`${baseURL}/admin/customer/accept-become-a-seller-request/${request._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'origin': '*',
        },
        body: JSON.stringify({ requestId: request?._id }),
      });

      if (!response.ok) {
        setErrorMessage('Request not approved');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
      } else {
        setSuccessMessage('Request approved successfully');
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
                  <div className="absolute inset-0 bg-black opacity-50 h-screen"></div>
                      <div className="relative bg-white rounded-lg w-3/4 max-w-lg py-8 px-4 lg:px-16 z-10 max-h-screen ">
                          <button
                          className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                          onClick={handleClose}>
                          &times;
                          </button>

                          <h2 className="text-lg md:text-xl text-primary text-center font-bold mb-4">Approve Request</h2>
                          <p className="mb-4 text-md md:text-lg text-center">Do you want to approve this request</p>
                          <div className=" flex flex-col-reverse md:flex-row justify-items-stretch gap-4 mr-2">
                            <button className="bg-disable text-black2 py-3 px-16 rounded-md" onClick={handleClose}>Cancel</button>
                            <button className="bg-primary text-white py-3 px-16 rounded-md" onClick={handleSubmit}>Approve</button>
                          </div>
                      </div>
              </div>
          )}
         
           
        </div>
     );
}
 
export default ApproveRequest;
