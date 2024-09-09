import "../style.css"; 
import "../pagination.css";  
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { RiFileList3Line } from "react-icons/ri";
import ViewOrders from '../Components/ViewOrders';
import ScaleLoader from "react-spinners/ScaleLoader";
import ResponsivePagination from 'react-responsive-pagination';

const FetchOrders = () => {
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [details, setDetails] = useState({});

    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 5;

  // Function to assign color based on status
  const getStatusColorClass = (status) => {
    switch (status) {
        case 'CANCELLED':
            return 'bg-black'; // Red for cancelled
        case 'ORDER_PLACED':
            return 'bg-pend'; // Blue for order placed
        case 'PENDING_CONFIRMATION':
            return 'bg-orange-500'; // Yellow for pending confirmation
        case 'WAITING_TO_BE_SHIPPED':
            return 'bg-primary'; // Orange for waiting to be shipped
        case 'OUT_FOR_DELIVERY':
            return 'bg-teal-500'; // Teal for out for delivery
        case 'SHIPPED':
            return 'bg-success'; // Green for shipped
        default:
            return 'bg-gray-500'; // Default color for any unknown status
    }
  };

  // Function to format boolean to "Yes" or "No" with color
  const formatBooleanToYesNoWithColor = (value) => {
    return (
        <span className={value ? 'text-succes' : 'text-red'}>
            {value ? 'Yes' : 'No'}
        </span>
    );
};

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setDisplayData(data.slice(startIdx, endIdx));
  };

  const handleView = (item) => {
    setDetails(item);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = (item) => {
    setIsDetailsModalOpen(false);
  };

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/order/fetch-order-items?page=1';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;


  // useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL + endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Atoken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': "69420",
            'origin': '*',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status) {
          setData(result.data);
          setDisplayData(result.data.slice(0, itemsPerPage));
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
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
        <RiFileList3Line className="text-9xl text-c4"/>
        <p className="text-lg text-black2">No order has been added</p>
      </div>
    );
  }

  return (
    <div>
      <div className="">

                <table className="min-w-full border-collapse border border-disable py-4">
                    <thead className="bg-fa text-sm text-left">
                        <tr className="px-4 py-8">
                            <th className="px-4 py-6 text-black2 font-normal">Order Reference</th>
                            <th className="px-4 py-6 text-black2 font-normal">Total Amount</th>
                            {/* <th className="px-4 py-6 text-black2 font-normal">Payment Ref.</th> */}
                            <th className="px-4 py-6 text-black2 font-normal">Status</th>
                            <th className="px-4 py-6 text-black2 font-normal">Payback</th>
                            <th className="px-4 py-6 text-black2 font-normal">Date</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-left">
                        {data.map((item) => (
                            <tr key={item.id} className="text-black2 text-sm border-b border-disable">
                                <td className="px-4 py-6">{item.orderItemsRef}</td>
                                <td className="px-4 py-6">{item.product.price}</td>
                                {/* <td className="px-4 py-6"></td> */}
                                <td className='flex flex-row gap-1 px-4 py-6 items-center'>
                                    <span className={`inlline-block h-2 w-2 rounded-full ${getStatusColorClass(item.orderState)}`}></span>
                                    {item.orderState}
                                </td>
                                <td className="px-4 py-6">{formatBooleanToYesNoWithColor(item.isPayBackLater)}</td>
                                <td className="px-4 py-6">{item.createdDate}</td>
                                <td className="flex flex-row gap-2 px-4 py-6 items-center">
                                    <FaEye className="text-c4 size-5 cursor-pointer" onClick={() => handleView(item)}/>
                                    {/* <HiOutlineTrash className="text-red size-5 cursor-pointer" onClick={() => openModal(item.id)}/> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>        
                    {/* Pagination Component */}
                    {data.length > itemsPerPage && (
                        <ResponsivePagination
                          total={Math.ceil(data.length / itemsPerPage)}
                          current={currentPage}
                          onPageChange={handlePageChange}
                        />
                    )}<br/>

                  <ViewOrders
                    show={isDetailsModalOpen}
                    handleClose={closeDetailsModal}
                  />
      </div>
    </div>
  );
}

export default FetchOrders;