// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
// import Skeleton from 'react-loading-skeleton';


const PushNotification = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

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
                <div className=" border-2 border-fa p-10 mx-8">
                  {/* Form */}
                    <form  className='grid justify-items-stretch text-left space-y-4'>
                                
                        {/* Title */}
                        <div className='space-y-1 md:space-y-2 items-start'>
                            <label htmlFor="title" className='text-sm text-left text-black2'>Title</label><br/>
                            <input 
                                className='border-2 p-4 w-full rounded-md border-fa bg-white focus:outline-disable' 
                                type='text' 
                                id = "title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                // required
                                />
                                {/* {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}<br/><br/> */}
                        </div>
                        
                        {/* Body */}
                        <div className='space-y-2' style={{ position: 'relative' }}>
                            <label htmlFor="body" className='text-sm text-left text-black2'>Body</label><br/>
                            <input 
                                className='border-2 p-4 w-full rounded-md border-fa bg-white focus:outline-disable' 
                                id = "pwd" 
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            // required
                            />
                            {/* {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}<br/> */}
                        </div><br/>

                        {/* Image */}
                        <div className='space-y-2' style={{ position: 'relative' }}>
                            <label htmlFor="image" className='text-sm text-left text-black2'>Upload Image</label><br/>
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                style={{
                                border: '2px dashed #ccc',
                                borderRadius: '5px',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                }}
                            ></div>
                            <input 
                                type="file"
                                accept=".jpg, .png"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />

                            {image && (
                                <div>
                                <h3>Selected Image Preview:</h3>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Selected Image"
                                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                                />
                                </div>
                            )}
                            {/* {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}<br/> */}
                        </div><br/>
                        
                        {/* Submit Button */}
                        <input
                        // onClick = {handleSubmit} 
                        type='submit' 
                        value="Send"
                        // disabled={loading} 
                        className='w-full mt-4 py-4 px-64 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-xl font-bold'
                        /> 
                    </form>
                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default PushNotification;
