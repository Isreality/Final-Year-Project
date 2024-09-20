import "../style.css"; 
import "../pagination.css";  
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import EditCategory from '../Components/EditCategory';
import { useState, useEffect } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { SlSocialDropbox } from 'react-icons/sl';
import ScaleLoader from "react-spinners/ScaleLoader";
import ResponsivePagination from 'react-responsive-pagination';

const FetchProducts = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [product, setProduct] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [accept, setAccept] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [decline, setDecline] = useState(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [ban, setBan] = useState(null);
  const [showBanModal, setShowBanModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownRowId, setDropdownRowId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5;

  // Pagination calculations
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setDisplayData(data.slice(startIdx, endIdx));
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
          setDisplayData(result.data.slice(0, itemsPerPage));
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };

  const toggleDropdown = (id) => {
    setDropdownRowId(dropdownRowId === id ? null : id);
  };  

  const handleView = (pro) => {
    setProduct(pro);
    setIsProductModalOpen(true);
    setDropdownRowId();
  };
  
  const closeDetailsModal = () => {
    setIsProductModalOpen(false);
  };

  const handleAccept = (pro) => {
    setAccept(pro);
    setShowModal(true);
    setDropdownRowId();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDecline = (pro) => {
    setDecline(pro);
    setShowDeclineModal(true);
    setDropdownRowId();
  };

  const closeDeclineModal = () => {
    setShowDeclineModal(false);
  };

  const handleBan = (pro) => {
    setDecline(pro);
    setShowBanModal(true);
    setDropdownRowId();
  };

  const closeBanModal = () => {
    setShowBanModal(false);
  };

  const removeModal = () => {
    setIsModalOpen(false);
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
                                <td className="relative items-right">
                                    <div className="relative">
                                      <button onClick={() => toggleDropdown(pro)} 
                                        className="cursor-pointer">
                                        <FiMoreVertical className="text-black2 text-right size-5 cursor-pointer" />
                                      </button>
                                      {dropdownRowId === pro && (
                                        <div className="absolute right-0 bg-white border border-gray-200 shadow-md rounded-md mt-2 w-32">
                                          <ul>
                                            <li
                                              onClick={() => handleView(pro)}
                                              className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                                            >
                                              View
                                            </li>
                                            <li
                                              onClick={() => handleAccept(pro)}
                                              className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                                            >
                                              Accept
                                            </li>
                                            <li
                                              onClick={() => handleDecline(pro)}
                                              className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                                            >
                                              Decline
                                            </li>
                                            <li
                                              onClick={() => handleBan(pro)}
                                              className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                                            >
                                              Ban
                                            </li>
                                          </ul>
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