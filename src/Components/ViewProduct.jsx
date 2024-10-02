import "../style.css";
import { useState, useEffect } from 'react';

function ViewProduct ({ show, handleClose, productDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spin, setSpin] = useState(null);


  return ( 
    <div>
        {show && (
            <div className="fixed inset-0 flex justify-center items-center z-80">
                <div className="absolute inset-0 bg-black opacity-50 h-screen"></div>
                <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-[470px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white">
                    <button
                    className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                    onClick={handleClose}>
                    &times;
                    </button>

                    <h2 className="text-2xl text-primary text-center font-semibold mb-4">Product Details</h2>
                    {productDetails ? (
                      <div className="flex flex-col gap-5 text-left text-md">
                        <div className="flex items-center justify-between">
                            <img
                            src={productDetails.category.imageUrl} 
                            alt={`${productDetails.name}'s profile`}
                            className="h-10 w-full md:h-64 md:w-full rounded-md object-fill"/>
                          
                        </div><br/>

                        <div className="flex items-center justify-between">
                          <p>Name</p> 
                          {productDetails.category.name}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Description</p> 
                          {productDetails.category.desc}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Available Stock</p> 
                          {productDetails.inventory.quantity}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Price</p> 
                          {productDetails.price}
                        </div>
                        <hr/>

                        <div className="flex items-center justify-between">
                          <p>Date Created</p> 
                          {productDetails.dateOfHarvest}
                        </div>
                        <hr/>
                      </div>
                    ) : (
                      <p>No details available.</p>
                    )}
                                                        
                </div>
            </div>
        )}
    </div>
  );
}

export default ViewProduct;


