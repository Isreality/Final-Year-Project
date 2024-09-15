import "../style.css";
import { useState, useEffect, forwardRef } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function EditCategory ({ show, handleClose, selectedCategory, onSave }) {
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [spin, setSpin] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
    minimumWeight: '',
    maximumWeight: '',
    price: '',
  });

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        name: selectedCategory.name,
        desc: selectedCategory.desc,
        image: selectedCategory.imageUrl, 
        minimumWeight: selectedCategory.minWeight,
        maximumWeight: selectedCategory.maxWeight,
        price: selectedCategory.price,
      });
    }
  }, [selectedCategory]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
        ...formData,
        image: e.target.files[0]
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      image: e.dataTransfer.files[0]
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSubmit = async (e) => { 
    e.preventDefault();
    

    const weightRegex = /^(?=.*(kg|g)).*$/i;
    if (!weightRegex.test(formData.minimumWeight)) {
        setErrorMessage('Weight must include "kg" or "g".');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
    }

    const weightRegex2 = /^(?=.*(kg|g)).*$/i;
    if (!weightRegex2.test(formData.maximumWeight)) {
        setErrorMessage('Weight must include "kg" or "g".');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
    }


    if (!formData.name || !formData.desc || !formData.image || !formData.minimumWeight || !formData.maximumWeight || !formData.price) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    }

    setSpin(true);
    onSave(formData);
    setSpin(false);
  };

  return ( 
    <div>
      {show && (
        <div className="fixed inset-0 flex justify-center items-center z-80">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-[470px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white">
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
            <h1 className="text-primary text-2xl font-bold">Edit Category</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Name */}
              <div className='space-y-1 md:space-y-2 items-start text-left'>
                <label htmlFor="name" className='text-md text-black2'>Name</label><br/>
                <input 
                  className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                  type='text' 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}<br/>
              </div>

              {/* Description */}
              <div className='space-y-2 text-left'>
                <label htmlFor="desc" className='text-md text-left text-black2'>Description</label><br/>
                <textarea 
                  className='border p-4 w-full h-32 rounded-md border-disable bg-white focus:outline-disable text-black2' 
                  id="desc" 
                  value={formData.desc}
                  onChange={handleChange}
                  name="desc"
                />
                {errors.desc && <span style={{ color: 'red' }}>{errors.desc}</span>}<br/>
              </div>

              {/* Image */}
              <div className='space-y-2 text-left mb-4'>
                <label htmlFor="image" className='text-md text-left text-black2'>Upload Image</label><br/>
                {formData.image && typeof formData.image === 'object' ? (
                  // Use URL.createObjectURL only if formData.image is a File object
                  <div>
                    <img
                      src={URL.createObjectURL(formData.image)} // Create object URL for preview
                      alt="Selected Image"
                      style={{ maxHeight: '300px', borderRadius: '6px' }}
                      className="w-full"
                    />
                    <div className="flex flex-row gap-5 justify-items-start">
                      <input
                        type="file"
                        accept=".jpg, .png"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="imageInput"
                      /><br/>
                      <label
                        htmlFor="imageInput"
                        className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer"
                      >
                        Change Image
                      </label>
                    </div>
                  </div>
                ) : (
                  formData.image && typeof formData.image === 'string' ? (
                    // If the image is a URL, display the image without createObjectURL
                    <div>
                      <img
                        src={formData.image}
                        alt="Selected Image"
                        style={{ maxHeight: '300px', borderRadius: '6px' }}
                        className="w-full"
                      />
                      <input
                        type="file"
                        accept=".jpg, .png"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="imageInput"
                      /><br/>
                      <label
                        htmlFor="imageInput"
                        className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer"
                      >
                        Change Image
                      </label>
                    </div>
                  ) : (
                    // No image or new image hasn't been selected yet
                    <input type="file" accept=".jpg, .png" onChange={handleImageChange} />
                  )
                )}

                {/* {formData.image ? (
                  <div style={{ display: 'inline-block' }}>
                    <img
                      src={formData.image}
                      alt="Selected Image"
                      style={{ maxHeight: '300px', borderRadius: '6px' }}
                      className="w-full"
                    /><br/>
                    <div className="flex flex-row gap-5 justify-items-start">
                      <input
                        type="file"
                        accept=".jpg, .png"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
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
                      {/* <button 
                        className="text-black2 bg-disable px-4 py-2 rounded-md" 
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </button> */}
                    {/* </div>
                  </div> */}
                 {/* ) : ( */}
                  {/* <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
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
                  </div> */}
                 {/* )}  */}
              </div>

              {/* Minimum Weight */}
              <div className='space-y-2 text-left'>
                <label htmlFor="minWeight" className='text-md text-left text-black2'>Minimum Weight(in g or kg)</label><br/> 
                <input 
                  className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black' 
                  type='text' 
                  id="minWeight" 
                  value={formData.minimumWeight}
                  onChange={handleChange}
                  placeholder=""
                  name="minimumWeight"
                />
                {errors.minimumWeight && <span style={{ color: 'red' }}>{errors.minimumWeight}</span>}<br/>
              </div>

              {/* Maximum Weight */}
              <div className='space-y-2 text-left'>
                <label htmlFor="maxWeight" className='text-md text-left text-black2'>Maximum Weight(in g or kg)</label><br/> 
                <input 
                  className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black' 
                  type='text' 
                  id="maxWeight" 
                  value={formData.maximumWeight}
                  onChange={handleChange}
                  placeholder=""
                  name="maximumWeight"
                />
                {errors.maximumWeight && <span style={{ color: 'red' }}>{errors.maximumWeight}</span>}<br/>
              </div>

              {/* Price */}
              <div className='space-y-2 text-left'>
                <label htmlFor="price" className='text-md text-left text-black2'>Price</label><br/>
                <input 
                  className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black' 
                  type='text' 
                  id="price" 
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="N"
                  name="price"
                />
                {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}<br/>
              </div>

              {/* Submit Button */}
              <div className="grid justify-items-end">
                <button type="submit"  disabled={spin} className='mt-4 w-full md:w-64 py-4 px-20 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-medium'>
                  {spin ? <div className="px-2 text-md"><FaSpinner className="animate-spin" /> </div> : 'Update'}
                </button>
              </div> 
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCategory;
