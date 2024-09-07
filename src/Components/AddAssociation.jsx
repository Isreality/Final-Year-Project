import "../style.css";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { MdCalendarMonth } from "react-icons/md";

function AddAssociation ({ show, handleClose }) {
  const [name, setName] = useState('');
  const [chairmanName, setChairmanName] = useState('');
  const [chairmanNumber, setChairmanNumber] = useState('');
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [spin, setSpin] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/association/add';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSubmit = async (e) => { 
    if (!name || !chairmanName || !chairmanNumber) {
        setErrorMessage('All fields are required.');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
    } 
    setSpin(true);

    try {
      const response = await fetch(baseURL + endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': "69420",
          'origin': '*',
        },
        body: JSON.stringify({ name, chairmanName, chairmanNumber }),
      });

      if (!response.ok) {
        setErrorMessage('Association submission unsuccessful');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
      } else {
        setSuccessMessage('Association added successfully.');
        setErrorMessage('')
        setIsModalOpen(true);
        window.location.reload();
        // console.log(result);
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
          <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-[470px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white">
            <button
              // className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
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
            <h1 className="text-primary text-2xl font-bold">Add Staff Admin</h1>

            
            {/* Form */}
            <form  className='grid justify-items-stretch text-left' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {/* Name */}
                <div className='space-y-1 md:space-y-2 items-start'>
                    <label htmlFor="name" className='text-md text-left text-black2'>Name</label><br/>
                    <input 
                        className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                        type='text' 
                        id = "name" 
                        placeholder='Enter full name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}<br/><br/>
                </div>
                
                {/* Chairman Name */}
                <div className='space-y-1 md:space-y-2 items-start'>
                    <label htmlFor="chairmanName" className='text-md text-left text-black2'>Chairman Name</label><br/>
                    <input 
                        className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                        type='text' 
                        id = "chairmanName" 
                        placeholder='Enter Chairman Name'
                        value={chairmanName}
                        onChange={(e) => setChairmanName(e.target.value)}
                    />
                    {errors.chairmanName && <span style={{ color: 'red' }}>{errors.chairmanName}</span>}<br/><br/>
                </div>

                {/* Chairman Number */}
                <div className='space-y-1 md:space-y-2 items-start'>
                    <label htmlFor="chairmanNumber" className='text-md text-left text-black2'>Chairman Phone Number</label><br/>
                    <input 
                        className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                        // type='number' 
                        id = "chairmanNumber" 
                        placeholder='Enter Chairman Number'
                        value={chairmanNumber}
                        onChange={(e) => setChairmanNumber(e.target.value)}
                    />
                    {errors.chairmanNumber && <span style={{ color: 'red' }}>{errors.chairmanNumber}</span>}<br/><br/>
                </div>                
            
                <button type="submit" onClick = {handleSubmit} disabled={spin} className='w-80 md:w-full mt-4 py-4 px-20 md:px-64 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-xl text-center font-bold'>
                {spin ? <div className="px-2 text-xl text-center"><FaSpinner className="animate-spin text-center" /> </div> : 'Add'}
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAssociation;
