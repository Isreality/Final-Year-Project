import "../style.css";
import Heading from "../Components/Heading";
import Modal from "../Components/Modal";
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState('');
  const [current_password, setCurrent_password] = useState('');
  const [new_password, setNew_password] = useState('');
  const [new_password_confirmation, setNew_password_confirmation] = useState('');
  const [errors, setErrorMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [spin, setSpin] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/auth/password/change-password';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    // Check if fullName and password are empty  
    // if (current_password.trim() === '' && new_password.trim() === '' && new_password_confirmation.trim()){
      if (!current_password || !new_password || !new_password_confirmation) { 
      setErrorMessage('Fill all the fields');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    } 
    if (new_password !== new_password_confirmation) {
      setErrorMessage("New passwords do not match");
      setSuccessMessage("");
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
            body: JSON.stringify({ current_password, new_password, new_password_confirmation }),
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

    return ( 
        <div>
            <div className="flex flex-row">
              {/* Header */}
              <div className="w-full">
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Change Password"/></div>
                </div>
                
                {/* Body */}
                <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-8 mx-8">
                  <div className="mb-4">
                    {isModalOpen && (
                      <Modal
                        message={errors || successMessage}
                        type={errors ? 
                          'error' : 
                          'success'}
                        onClose={closeModal}
                        className=""
                      />
                    )}
                  </div>
                  {/* Form */}
                  <form  className='grid justify-items-stretch text-left' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className='space-y-1 md:space-y-2 items-start'>

                    </div>
                    
                    {/* Current Password */}
                    <div className='space-y-2' style={{ position: 'relative' }}>
                      <label htmlFor="current_password" className='text-md md:text-md text-left mb-8'>Enter Current Password</label><br/>
                      <input 
                        className='border p-6 w-full md:w-full rounded-md border-fa bg-white focus:bg-white focus:outline-fa' 
                        type= {showPassword ? 'text' : 'password'}
                        id = "current_password" 
                        placeholder='Enter current password'
                        value={current_password}
                        onChange={(e) => setCurrent_password(e.target.value)}
                        />
                        
                        {/* Eye icon switch */}
                        {showPassword ? (
                          <FaEye
                            onClick={togglePasswordVisibility}
                            size={20}
                            style={{
                              position: 'absolute',
                              top: '60%',
                              right: '30px', 
                              transform: 'translateY(-50%)', 
                              cursor: 'pointer', 
                              color: '#c4c4c4', 
                            }}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={togglePasswordVisibility}
                            size={20}
                            style={{
                              position: 'absolute',
                              top: '60%',
                              right: '30px', 
                              transform: 'translateY(-50%)', 
                              cursor: 'pointer', 
                              color: '#c4c4c4', 
                            }}
                          />
                        )}
                        {errors.current_password && <span style={{ color: 'red' }}>{errors.current_password}</span>}<br/>
                    </div><br/>
                    
                    {/* New Password */}
                    <div className='space-y-2' style={{ position: 'relative' }}>
                      <label htmlFor="new_password" className='text-md md:text-md text-left mb-8'>Enter New Password</label><br/>
                      <input 
                        className='border p-6 w-full md:w-full rounded-md border-fa bg-white focus:bg-white focus:outline-fa' 
                        type= {showNewPassword ? 'text' : 'password'}
                        id = "new_password" 
                        placeholder='Enter new password'
                        value={new_password}
                        onChange={(e) => setNew_password(e.target.value)}
                        />
                        
                        {/* Eye icon switch */}
                        {showNewPassword ? (
                          <FaEye
                            onClick={toggleNewPasswordVisibility}
                            size={20}
                            style={{
                              position: 'absolute',
                              top: '60%',
                              right: '30px', 
                              transform: 'translateY(-50%)', 
                              cursor: 'pointer', 
                              color: '#c4c4c4', 
                            }}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={toggleNewPasswordVisibility}
                            size={20}
                            style={{
                              position: 'absolute',
                              top: '60%',
                              right: '30px', 
                              transform: 'translateY(-50%)', 
                              cursor: 'pointer', 
                              color: '#c4c4c4', 
                            }}
                          />
                        )}
                        {errors.new_password && <span style={{ color: 'red' }}>{errors.new_password}</span>}<br/>
                    </div><br/>

                    {/* Re-enter Password */}
                    <div className='space-y-2' style={{ position: 'relative' }}>
                      <label htmlFor="new_password_confirmation" className='text-md md:text-md text-left mb-8'>Confirm New Password</label><br/>
                      <input 
                        className='border p-6 w-full md:w-full rounded-md border-fa bg-white focus:bg-white focus:outline-fa' 
                        type= {showRePassword ? 'text' : 'password'}
                        id = "new_password_confirmation" 
                        placeholder='Confirm new password'
                        value={new_password_confirmation}
                        onChange={(e) => setNew_password_confirmation(e.target.value)}
                        />
                        
                        {/* Eye icon switch */}
                        {showNewPassword ? (
                          <FaEye
                            onClick={toggleRePasswordVisibility}
                            size={20}
                            style={{
                              position: 'absolute',
                              top: '60%',
                              right: '30px', 
                              transform: 'translateY(-50%)', 
                              cursor: 'pointer', 
                              color: '#c4c4c4', 
                            }}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={toggleRePasswordVisibility}
                            size={20}
                            style={{
                              position: 'absolute',
                              top: '60%',
                              right: '30px', 
                              transform: 'translateY(-50%)', 
                              cursor: 'pointer', 
                              color: '#c4c4c4', 
                            }}
                          />
                        )}
                        {errors.new_password_confirmation && <span style={{ color: 'red' }}>{errors.new_password_confirmation}</span>}<br/>
                    </div><br/>

                    <div className="grid justify-items-end">    
                      <button type="submit" onClick = {handleSubmit} disabled={spin} className='mt-4 w-full md:w-64 py-4 px-20  rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-medium'>
                        {spin ? <div className="px-2 text-md"><FaSpinner className="animate-spin" /> </div> : 'Update'}
                      </button>
                    </div>
                  </form>
                </div>

                
              </div>

            </div>           
        </div>
     );
}
 
export default ChangePassword;
