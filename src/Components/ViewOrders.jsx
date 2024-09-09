{isDetailsModalOpen && (
    <div className="fixed inset-0 flex justify-center items-center z-80">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg max-w-lg py-8 px-16 z-10">
            <button
              className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
              onClick={closeDetailsModal}>
            &times;
            </button>

            <h2 className="text-xl text-red text-center font-semibold mb-4">Order Details</h2>
            
                                                  
        </div>
    </div>
)}