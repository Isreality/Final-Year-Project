import "../style.css"; 
import "../pagination.css";  
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { BiCategoryAlt } from "react-icons/bi";
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

  const openDetailsModal = (item) => {
    setDetails(item);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
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
        <BiCategoryAlt className="text-9xl text-c4"/>
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
                            <th className="px-4 py-6 text-black2 font-normal">Payment Ref.</th>
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
                                <td className="px-4 py-6"></td>
                                <td className="px-4 py-6">{item.orderState}</td>
                                <td className="px-4 py-6">{item.isPayBack}</td>
                                <td className="px-4 py-6">{item.createdDate}</td>
                                <td className="flex flex-row gap-2 px-4 py-6 items-center">
                                    <FaEye className="text-c4 size-5 cursor-pointer" onClick={() => openDetailsModal(item)}/>
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
      </div>
    </div>
  );
}

export default FetchOrders;