import "../style.css"; 
import "../pagination.css";  
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import EditCategory from '../Components/EditCategory';
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";
import { FaEllipsisV } from 'react-icons/fa';
import { FiBox } from "react-icons/fi";
import { SlSocialDropbox } from 'react-icons/sl';
import ScaleLoader from "react-spinners/ScaleLoader";
import ResponsivePagination from 'react-responsive-pagination';

const FetchProducts = () => {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownRowId, setDropdownRowId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/product/?minPrice=&maxPrice=&ratings=&page=1';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

    const fetchData = async () => {
      try {
        const response = await fetch(baseURL + endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Atoken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'origin': '*',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status) {
          // console.log(result);
          setData(result.data);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };


  const closeModal = () => {
    setShowModal(false);
  };

  const removeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = (id) => {
    setDropdownRowId(dropdownRowId === id ? null : id);
  };

  const handleAction = (action, id) => {
    // Handle different actions here
    console.log(`${action} action on row with ID: ${id}`);
    setDropdownRowId(null);
};

  useEffect(() => {
    fetchData();
  }, [Atoken]);


  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 3000)
  }, [])

  if (loading) {
    return (
      <div>
        <ScaleLoader
          color={'#c4c4c4'}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> 
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <SlSocialDropbox className="text-9xl text-c4"/>
        <p className="text-lg text-black2">No product has been added</p>
      </div>
    );
  }

  return (
    <div>
      <div className="">
            {/* Modal */}
            <div className="fixed top-4 w-72 md:w-3/4 mb-4">
              {isModalOpen && (
                <Modal
                  message={errors || successMessage}
                  type={errors ? 'error' : 'success'}
                  onClose={removeModal}
                  className=""
                />
            )}
            </div>

                    <table className="min-w-full border-collapse border border-disable py-4">
                        <thead className="bg-fa text-sm text-left">
                        <tr className="px-4 py-8">
                            <th className="px-4 py-6 text-black2 font-normal">Product</th>
                            <th className="px-4 py-6 text-black2 font-normal">Available</th>
                            <th className="px-4 py-6 text-black2 font-normal">Price</th>
                            <th className="px-4 py-6 text-black2 font-normal">Date</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="">
                        {data.map((pro) => (
                            <tr key={pro.id} className="text-black2 text-sm text-left items-center border-b border-disable px-4 py-8">
                                <td className="flex flex-row gap-2 px-4 py-6 items-center text-center">
                                    <img src={pro.category.imageUrl} alt="" className=" h-10 w-10 md:h-12 md:w-12 rounded-md"/>
                                    <div className="flex flex-col gap-1 text-left">
                                        {pro.category.name}
                                        {pro.category.desc}
                                    </div>       
                                </td>
                                <td className="px-4 py-6">{pro.inventory.quantity}</td>                                
                                <td className="px-4 py-6">{pro.price}</td>
                                <td className="px-4 py-6">{pro.dateOfHarvest}</td>
                                <td className="flex flex-row gap-2 p-2 items-center">
                                    <div className="relative">
                                      <button onClick={() => toggleDropdown(pro.id)} className="focus:outline-none">
                                        <FaEllipsisV />
                                      </button>
                                      {dropdownRowId === pro.id && (
                                        <div className="absolute right-0 z-10 w-40 py-2 mt-2 bg-white rounded shadow-xl">
                                          <button
                                            onClick={() => handleAction('Accept', pro.id)}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                          >
                                            Accept
                                          </button>
                                          <button
                                            onClick={() => handleAction('Decline', pro.id)}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                          >
                                            Decline
                                          </button>
                                          <button
                                            onClick={() => handleAction('Ban', pro.id)}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                          >
                                            Ban
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                      {/* <FaEye className="text-c4 size-5 cursor-pointer" onClick={() => openDetailsModal(pro)}/>
                                      <HiOutlineTrash className="text-red size-5 cursor-pointer" onClick={() => openModal(pro.id)}/> */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table><br/>
                    {/* Pagination Component */}
                    <ResponsivePagination
                        total={Math.ceil(data.length / itemsPerPage)}
                        // total={totalPages}
                        current={currentPage}
                        onPageChange={handlePageChange}
                    /><br/>
      </div>
    </div>
  );
}

export default FetchProducts;