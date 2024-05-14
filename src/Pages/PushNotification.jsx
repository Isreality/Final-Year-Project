// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
// import Skeleton from 'react-loading-skeleton';


const PushNotification = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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

  const openModal = () => {
    setIsOpen(true);
  };

const closeModal = () => {
    setIsOpen(false);
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

                {/* Body */}
                <div className="border border-disable rounded-md px-10 py-8 mx-8">
                  {/* Form */}
                    <form  className='space-y-4'>
                                
                        {/* Title */}
                        <div className='space-y-1 md:space-y-2 items-start text-left'>
                            <label htmlFor="title" className='text-md text-black2'>Title</label><br/>
                            <input 
                                className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable' 
                                type='text' 
                                id = "title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                // required
                                />
                                {/* {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}<br/><br/> */}
                        </div>
                        
                        {/* Body */}
                        <div className='space-y-2 text-left'>
                            <label htmlFor="body" className='text-md text-left text-black2'>Body</label><br/>
                            <input 
                                className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable' 
                                id = "text" 
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            {/* {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}<br/> */}
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
                          <input
                              // onClick = {handleSubmit}
                              onClick={openModal} 
                              type='submit' 
                              value="Send"
                              // disabled={loading} 
                              className=' py-4 px-24 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-bold'
                          />

                          {isOpen && (
                              <div className="fixed inset-0 flex justify-center items-center z-80">
                                  <div className="absolute inset-0 bg-black opacity-50"></div>
                                  <div className="relative bg-white rounded-lg max-w-lg py-8 px-10 z-10">
                                      <button
                                      className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                                      onClick={closeModal}
                                      >
                                      &times;
                                      </button>

                                      <h2 className="text-xl text-primary text-center font-semibold mb-4">Send Notification</h2>
                                      <p className="mb-4 text-center">Are you sure you want to send notifications?</p>
                                      
                                      <div className=" flex flex-row justify-items-stretch gap-4 mr-2">
                                          <button className="bg-disable text-black2 py-3 px-16 rounded-md" onClick={closeModal}>Cancel</button>
                                          {/* <button className="bg-red text-white py-3 px-16 rounded-md" onClick={navigate('/')}>Yes</button> */}
                                          <button className="bg-primary text-white py-3 px-16 rounded-md">Send</button>
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
