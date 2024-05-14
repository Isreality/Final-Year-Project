// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import cancel from '../icons/cancel.svg';
import success from '../icons/success.svg';
import { Link } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
// import Skeleton from 'react-loading-skeleton';

function Modal({ message, type, onClose }) {
  const modalClasses = `relative top-0 left-0 right-0 p-4 font-medium text-left rounded-md z-50 ${type === 'success' ? 'bg-success2 text-success' : 'bg-red2 text-red'}`;
  const iconSrc = type === 'success' ? success : cancel;
  const iconColor = type === 'success' ? 'bg-success' : 'bg-red';

  return (
    <div className={modalClasses}>
      <div className='flex flex-row gap-10'>
        <img src={iconSrc} alt="" className={`p-4 absolute left-0 top-0 rounded-md ${iconColor}`}/>        
        <div className='ml-12'>{message}</div> 
      </div>

      <button style={{ marginLeft: '470px', top: '10px'}} onClick={onClose} className='absolute text-black2 text-lg top-30 right-4 size-4 font-normal'>
          &times;</button>
    </div>
          
  );
}

function PushNotification () {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(false);
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  // const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedImage = e.dataTransfer.files[0];
    setImage(selectedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const removeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (!title || !body) {
      setErrorMessage('Both title and body are required.');
      // setSuccessMessage('');
      setIsModalOpen(true);
      return;
    }

    setErrorMessage('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const proceed = () => {
    setIsOpen(false);
    navigate('/PushNotification'); 
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
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row">
              {/* Sidebar */}
              <div>
                <Sidebar/>
              </div>

              {/* Header */}
              <div className="w-full">
                <div className="mb-4"><Header title="Push Notification" link="/PushNotification"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Push Notification"/></div>
                </div>

                {/* Header */}
                <div className="mx-8 mb-4">
                  {isModalOpen && (                  
                      <Modal
                        message={errors || successMessage}
                        type={errors ? 
                          'error' : 
                          'success'}
                        onClose={removeModal}
                        className=""
                      />
                  )}
                </div>

                {/* Body */}
                <div className="border border-disable rounded-md px-10 py-8 mx-8">
                  {/* Form */}
                    <form  className='space-y-4' onSubmit={openModal}>
                                
                        {/* Title */}
                        <div className='space-y-1 md:space-y-2 items-start text-left'>
                            <label htmlFor="title" className='text-md text-black2'>Title</label><br/>
                            <input 
                                className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                                type='text' 
                                id = "title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                // required
                                />
                                {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}<br/>
                        </div>

                        {/* Body */}
                        <div className='space-y-2 text-left'>
                            <label htmlFor="body" className='text-md text-left text-black2'>Body</label><br/>
                            <textarea 
                                className='border p-4 w-full h-32 rounded-md border-disable bg-white focus:outline-disable text-black2' 
                                id = "text" 
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            {errors.body && <span style={{ color: 'red' }}>{errors.body}</span>}<br/>
                        </div>

                        {/* Image */}
                        <div className='space-y-2 text-left mb-4'>
                            <label htmlFor="image" className='text-md text-left text-black2'>Upload Image</label><br/>
                            
                            {image ? (
                              <div
                                // onMouseEnter={handleImageHover}
                                // onMouseLeave={handleImageHoverExit}
                                style={{ display: 'inline-block' }}
                              >
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="Selected Image"
                                  style={{  maxHeight: '300px', borderRadius: '6px' }}
                                  className="w-full"
                                /><br/>

                                <div className="flex flex-row gap-5 justify-items-start">
                                  {/* Option to change image */}
                                  <input
                                  type="file"
                                  accept=".jpg, .png"
                                  onChange={handleImageChange}
                                  style={{ display: 'none' }}
                                  id="imageInput"
                                  />

                                  <label
                                    htmlFor="imageInput"
                                    className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer"
                                    onChange={handleImageChange}
                                  >
                                    Change Image
                                  </label>

                                  {/* Option to remove the image */}
                                  <button 
                                    className="text-black2 bg-disable px-4 py-2 rounded-md" 
                                    onClick={handleRemoveImage}
                                    // style={{
                                    //   position: 'absolute',
                                    //   bottom: 0,
                                    //   right: 0,
                                    //   cursor: 'pointer',
                                    // }}
                                    >
                                  Remove Image</button>
                                </div>
                                                                
                              </div>
                            ) : (
                            
                              <div
                                  onDrop={handleDrop}
                                  onDragOver={handleDragOver}
                                  // className="h-50 text-center"
                                  style={{
                                  border: '2px dashed #ccc',
                                  borderRadius: '5px',
                                  padding: '40px',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  }}
                              >
                                  <input
                                  type="file"
                                  accept=".jpg, .png"
                                  onChange={handleImageChange}
                                  style={{ display: 'none' }}
                                  id="imageInput"
                                  />

                                  <label htmlFor="imageInput" className="text-black2" style={{ cursor: 'pointer' }}>
                                    <div className="grid justify-items-center"><LiaImage className="text-c4 size-32"/></div>
                                    Drag and drop files, or <b className="text-primary">Browse</b><br/>
                                    <p className="text-xs">JPG, PNG - Max file size (10MB)</p>
                                  </label>
                                  
                              </div>
                            )}
                            
                            {/* {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}<br/> */}
                        </div>
                        
                        {/* Submit Button */}
                        <div className="grid justify-items-end">
                          <button
                              // onClick = {handleSubmit} 
                              type='submit'  
                              className=' py-4 px-24 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-bold'
                          >Send</button>

                          {isOpen && (
                              <div className="fixed inset-0 flex justify-center items-center z-80">
                                  <div className="absolute inset-0 bg-black opacity-50"></div>
                                  <div className="relative bg-white rounded-lg max-w-lg py-8 px-16 z-10">
                                      <button
                                        className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                                        onClick={closeModal}>
                                      &times;
                                      </button>

                                      <h2 className="text-xl text-primary text-center font-semibold mb-4">Send Notification</h2>
                                      <p className="mb-4 text-center">Do you want to send post notification?</p>
                                      
                                      <div className=" flex flex-row justify-items-stretch gap-4 mr-2">
                                          <button className="bg-disable text-black2 py-3 px-12 rounded-md" onClick={closeModal}>No</button>
                                          <button className="bg-primary text-white py-3 px-12 rounded-md" onClick={proceed}>Send</button>
                                      </div>
                                  </div>
                              </div>
                          )}
                        </div> 
                    </form>
                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default PushNotification;
