import "../style.css";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { MdCalendarMonth } from "react-icons/md";


function AddStaffAdmin ({ show, handleClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [spin, setSpin] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/staff-management/add-admin';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSubmit = async (e) => { 
    if (!fullName || !email || !phone_number || !role) {
        setErrorMessage('All fields are required.');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
    } 
    setSpin(true);
    // setErrorMessage('');
    // setSuccessMessage('');
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
                    <label htmlFor="fullName" className='text-md text-left text-black2'>Name</label><br/>
                    <input 
                        className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                        type='text' 
                        id = "fullName" 
                        placeholder='Enter full name'
                        value={email}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}<br/><br/>
                </div>
                
                {/* Email */}
                <div className='space-y-1 md:space-y-2 items-start'>
                    <label htmlFor="email" className='text-md text-left text-black2'>Email</label><br/>
                    <input 
                        className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                        type='email' 
                        id = "email" 
                        placeholder='example@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}<br/><br/>
                </div>

                {/* Phone */}
                <div className='space-y-1 md:space-y-2 items-start'>
                    <label htmlFor="phone_number" className='text-md text-left text-black2'>Phone Number</label><br/>
                    <input 
                        className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                        // type='number' 
                        id = "phone_number" 
                        placeholder='+XXX XXX XXX XXXX'
                        value={phone_number}
                        onChange={(e) => setPhone_number(e.target.value)}
                    />
                    {errors.phone_number && <span style={{ color: 'red' }}>{errors.phone_number}</span>}<br/><br/>
                </div>

                {/* Role */}
                <div className='space-y-1 md:space-y-2 items-start'>
                    <label htmlFor="role" className='text-md text-left text-black2'>Account Type</label><br/>
                    <input 
                        className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                        // type='number' 
                        id = "role" 
                        // placeholder='example@gmail.com'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}<br/><br/>
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

export default AddStaffAdmin;
