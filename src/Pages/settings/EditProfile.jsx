import "../../style.css";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import Heading from "../../Components/Heading";
import Modal from "../../Components/Modal";
import ChangePassword from "../../Components/ChangePassword";
import { useState, useEffect } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSpinner } from 'react-icons/fa';
import BeatLoader from "react-spinners/BeatLoader";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [spin, setSpin] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/user/update-details';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  const handleSubmit = async () => {
    // Check if fullName and password are empty  
    if (fullName.trim() === '' && phoneNumber.trim() === ''){
      setErrorMessage('Name and Phone Number are required.');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    } else if (fullName.trim() === '') {
      setErrorMessage('Name is required.');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    } else if(phoneNumber.trim() === '') {
      setErrorMessage('Phone Number is required.');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    } 
    setSpin(true);
    // setErrorMessage('');
    // setSuccessMessage('');
    

    {/* Fetch Api */}
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
            body: JSON.stringify({ fullName, phoneNumber }),
        });

        const data = await response.json();

        if (!response.ok) {
        setErrorMessage('There was an error! Please try again');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
        } else {
        setSuccessMessage('Your details has been updated successfully');
        setErrorMessage('')
        setIsModalOpen(true);
        }

        setTimeout(() => {
            window.location.reload();
        }, 1000)

    } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('An error occurred. Please try again.');
        // return;
    } finally {
        setSpin(false);
    }

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, [])

    return ( 
        <div>

          {loading ? (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <BeatLoader
                  color={'#481986'}
                  loading={loading}
                  // cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              /> 
            </div>
          ) : (
            <div className="flex flex-row">
              {/* Sidebar */}
              <div>
                <Sidebar/>
              </div>

              {/* Header */}
              <div className="w-full">
                <div className="mb-4 items-center"><Header title="Edit Profile" link=""/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Personal Information"/></div>
                </div>
                {/* Modal */}
                <div className="mx-8 mb-4">
                  {isModalOpen && (
                    <Modal
                      message={errors || successMessage}
                      type={errors ? 'error' : 'success'}
                      onClose={closeModal}
                      className=""
                    />
                  )}
                </div>

                {/* Body */}
                <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-8 mx-8">
                  <form className='space-y-4' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                      {/* Full Name */}
                      <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                        <label htmlFor="fullName" className='text-md text-black2'>Full Name</label><br/>
                        <input 
                            className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                            type='text' 
                            id = "fullName" 
                            // placeholder='example@gmail.com'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}<br/>
                      </div>

                      {/*Phone Number*/}
                      <div className='space-y-1 md:space-y-2 items-start text-left'>
                        <label htmlFor="phoneNumber" className='text-md text-black2'>Phone Number</label><br/>
                        <input 
                            className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                            type='text' 
                            id = "phoneNumber" 
                            // placeholder='example@gmail.com'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}<br/>
                      </div>

                      {/* Submit Button */}
                      <div className="grid justify-items-end">
                        <button type="submit"  disabled={spin} className='mt-4 w-full md:w-64 py-4 px-20 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-medium'>
                          {spin ? <div className="px-2 text-md"><FaSpinner className="animate-spin" /> </div> : 'Update'}
                        </button>
                      </div> 
                  </form>
                </div><br/><br/>
                <ChangePassword/>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default EditProfile;
