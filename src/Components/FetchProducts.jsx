import "../style.css"; 
import "../pagination.css";  
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import ViewProduct from '../Components/ViewProduct';
import ApproveProduct from '../Components/ApproveProduct';
import DeclineProduct from '../Components/DeclineProduct';
import BanProduct from '../Components/BanProduct';
import { useState, useEffect } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { SlSocialDropbox } from 'react-icons/sl';
import { FaRegCalendarDays } from "react-icons/fa6";
import ScaleLoader from "react-spinners/ScaleLoader";
import ResponsivePagination from 'react-responsive-pagination';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

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
  const [searchTerm, setSearchTerm] = useState(""); 
  const [dateRange, setDateRange] = useState([{ startDate: null, endDate: null, key: 'selection' }]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5;

  // Pagination calculations
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  //   const startIdx = (page - 1) * itemsPerPage;
  //   const endIdx = startIdx + itemsPerPage;
  //   setDisplayData(data.slice(startIdx, endIdx));
  // };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/buyers-product/fetch-all-product-with-filter?page=1';
  // const endpoint = '/admin/buyers-product/fetch-all-product-with-filter?minPrice=&maxPrice=&ratings=&page=1';
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
          setDisplayData(result.data);
          // setDisplayData(result.data.slice(0, itemsPerPage));
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
    setBan(pro);
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

  useEffect(() => {
    const filteredData = data.filter(pro => {
        const orderDate = new Date(pro.createdDate);
        const startDate = dateRange[0].startDate;
        const endDate = dateRange[0].endDate;
        // Check if filters are applied; if not, display all data
        const isWithinDateRange = startDate && endDate ? (orderDate >= startDate && orderDate <= endDate) : true;
        const matchesSearchTerm = pro.category.name.toLowerCase().includes(searchTerm.toLowerCase());
        // const matchesStatus = selectedStatus === "" || item.orderState === selectedStatus;
        return matchesSearchTerm && isWithinDateRange;
    });

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setDisplayData(filteredData.slice(startIdx, endIdx));
  }, [searchTerm, dateRange, currentPage, data]);

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

            {/* Search Input */}
            <div className=" flex flex-row justify-start gap-2 text-left mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-4 text-sm text-black2 border border-f2 rounded focus:bg-white focus:outline-primary"
                />

                <div className="relative">
                    {/* <div className="relative"> */}
                        {/* Button to Toggle Date Picker */}
                            <button onClick={() => setShowDatePicker(!showDatePicker)} className="flex flex-row gap-1 items-center py-4 px-8 bg-fa rounded cursor-pointer">
                                <FaRegCalendarDays className="text-primary size-4"/>
                                <p className="text-sm text-black2">Filter by Date</p>
                            </button>

                        {/* Date Range Picker Dropdown */}
                        {showDatePicker && (
                            // <div className="relative z-10 mt-2 p-2  rounded ">
                            <div className="custom-date-range-picker bg-white top-[120%] absolute trasform translate-x-[-23%]">
                                <DateRange
                                    ranges={dateRange}
                                    onChange={handleDateRangeChange}
                                    moveRangeOnFirstSelection={false}
                                    rangeColors={['#481986']}
                                    className="date-range"
                                />
                            </div>
                        )}
                    {/* </div> */}
                </div>              
            </div>

                    <table className="min-w-full border-collapse border border-disable py-4">
                        <thead className="bg-fa text-sm text-left">
                        <tr className="px-4 py-8">
                            <th className="px-6 py-6 text-black2 font-normal">Product</th>
                            <th className="px-4 py-6 text-black2 font-normal">Available Stock</th>
                            <th className="px-4 py-6 text-black2 font-normal">Price</th>
                            <th className="px-4 py-6 text-black2 font-normal">Date Created</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="">
                        {displayData.map((pro) => (
                            <tr key={pro.id} className="text-black2 text-sm text-left items-center border-b border-disable px-4 py-8">
                                <td className="flex flex-row gap-2 px-6 py-6 items-center text-center">
                                    <img src={pro.category.imageUrl} alt="" className=" h-10 w-10 md:h-12 md:w-12 rounded-md"/>
                                    <div className="flex flex-col gap-1 text-left">
                                        <p className="text-md font-medium">{pro.category.name}</p>
                                        <p className="text-sm">{pro.category.desc}</p>
                                    </div>       
                                </td>
                                <td className="px-4 py-6">{pro.inventory.quantity}</td>                                
                                <td className="px-4 py-6">{pro.price}</td>
                                <td className="px-4 py-6">{pro.dateOfHarvest}</td>
                                <td className="relative items-right">
                                    {/* <div className="relative"> */}
                                      <button onClick={() => toggleDropdown(pro)} 
                                        className="cursor-pointer px-6">
                                        <FiMoreVertical className="text-black2 text-right size-5 cursor-pointer" />
                                      </button>
                                      {dropdownRowId === pro && (
                                        <div className="absolute right-0 bg-white border border-gray-200 shadow-md z-10 rounded-md mt-2 w-32">
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
                                              Approve
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
                                    {/* </div> */}
                                      {/* <FaEye className="text-c4 size-5 cursor-pointer" onClick={() => openDetailsModal(pro)}/>
                                      <HiOutlineTrash className="text-red size-5 cursor-pointer" onClick={() => openModal(pro.id)}/> */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table><br/>
                    
                    {/* Pagination Component */}
                    {displayData.length > itemsPerPage && (
                        <ResponsivePagination
                            total={Math.ceil(displayData.length / itemsPerPage)}
                            current={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <ViewProduct
                      show={isProductModalOpen}
                      handleClose={closeDetailsModal}
                      productDetails={product}
                    />

                    <ApproveProduct
                      show={showModal}
                      handleClose={closeModal}
                      accept={accept}
                    />

                    <DeclineProduct
                      show={showDeclineModal}
                      handleClose={closeDeclineModal}
                      decline={decline}
                    />

                    <BanProduct
                      show={showBanModal}
                      handleClose={closeBanModal}
                      ban={ban}
                    />
      </div>
    </div>
  );
}

export default FetchProducts;