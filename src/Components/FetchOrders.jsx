import "../style.css"; 
import "../pagination.css";  
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { RiFileList3Line } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
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
    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedStatus, setSelectedStatus] = useState("");
    const [payBack, setPayBack] = useState("");
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 5;

    // Function to assign color based on status
    const getStatusColorClass = (status) => {
      switch (status) {
          case 'CANCELLED':
              return 'bg-black'; // Black for cancelled
          case 'ORDER_PLACED':
              return 'bg-pend'; // Yellow for order placed
          case 'PENDING_CONFIRMATION':
              return 'bg-orange-500'; // Orange for pending confirmation
          case 'WAITING_TO_BE_SHIPPED':
              return 'bg-primary'; // Purple for waiting to be shipped
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
            <span className={value ? 'text-success' : 'text-red'}>
                {value ? 'Yes' : 'No'}
            </span>
        );
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleView = (item) => {
        setDetails(item);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handlePayBackChange = (e) => {
        setPayBack(e.target.value);
    };

    const baseURL = process.env.REACT_APP_BASE_URL;
    const endpoint = '/admin/order/fetch-order-items?page=1';
    const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

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
                setDisplayData(result.data); // Initially show all data
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
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        // Filter data based on both search term and selected status
        const filteredData = data.filter(item =>
            item.orderItemsRef.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedStatus === "" || item.orderState === selectedStatus) &&
            (payBack === "" || item.isPayBackLater === payBack)
        );

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        setDisplayData(filteredData.slice(startIdx, endIdx));
    }, [searchTerm, selectedStatus, payBack, currentPage, data]);


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
            {/* Search Input */}
            <div className=" flex flex-row justify-between text-left mb-4">
                <input
                    type="text"
                    placeholder="Search by Order Ref."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-4 border border-f2 rounded focus:bg-white focus:outline-primary"
                />

                <div className="flex flex-row gap-2 items-center">
                    {/* Filter by Status */}
                    <div className='relative'>
                        <select
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            className="block appearance-none py-4 px-8 bg-fa rounded focus:outline-primary cursor-pointer"
                        >
                            <option className="text-md" value="">All Statuses</option>
                            <option className="text-md" value="CANCELLED">Cancelled</option>
                            <option className="text-md" value="ORDER_PLACED">Order Placed</option>
                            <option className="text-md" value="PENDING_CONFIRMATION">Pending Confirmation</option>
                            <option className="text-md" value="WAITING_TO_BE_SHIPPED">Waiting to be shipped</option>
                            <option className="text-md" value="OUT_FOR_DELIVERY">Out for Delivery</option>
                            <option className="text-md" value="SHIPPED">Shipped</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black2">
                            <RiArrowDropDownLine className="h-6 w-6"/>
                        </div>
                    </div>

                    {/* Filter by Payback */}
                    <div className='relative'>
                        <select
                            value={payBack}
                            onChange={handlePayBackChange}
                            className="block appearance-none py-4 px-8 bg-fa rounded focus:outline-primary cursor-pointer"
                        >
                            <option className="text-md" value="">Payback</option>
                            <option className="text-md" value="Yes">Yes</option>
                            <option className="text-md" value="No">No</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black2">
                            <RiArrowDropDownLine className="h-6 w-6"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div>
                <table className="min-w-full border-collapse border border-disable py-4">
                    <thead className="bg-fa text-sm text-left">
                        <tr className="px-4 py-8">
                            <th className="px-4 py-6 text-black2 font-normal">Order Reference</th>
                            <th className="px-4 py-6 text-black2 font-normal">Total Amount</th>
                            <th className="px-4 py-6 text-black2 font-normal">Status</th>
                            <th className="px-4 py-6 text-black2 font-normal">Payback</th>
                            <th className="px-4 py-6 text-black2 font-normal">Date</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                    </thead>

                    {/* Table body */}
                    <tbody className="text-left">
                        {displayData.map((item) => (
                            <tr key={item.id} className="text-black2 text-sm border-b border-disable">
                                <td className="px-4 py-6">{item.orderItemsRef}</td>
                                <td className="px-4 py-6">{item.product.price}</td>
                                <td className="px-4 py-6 flex items-center">
                                    <span 
                                        className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColorClass(item.orderState)}`}
                                    ></span>
                                    {item.orderState}
                                </td>
                                <td className="px-4 py-6">{formatBooleanToYesNoWithColor(item.isPayBackLater)}</td>
                                <td className="px-4 py-6">{item.createdDate}</td>
                                <td className="flex flex-row gap-2 px-4 py-6 items-center">
                                    <FaEye className="text-c4 size-5 cursor-pointer" onClick={() => handleView(item)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {data.length > itemsPerPage && (
                    <ResponsivePagination
                        total={Math.ceil(data.filter(item => 
                            item.orderItemsRef.toLowerCase().includes(searchTerm.toLowerCase()) &&
                            (selectedStatus === "" || item.orderState === selectedStatus) &&
                            (payBack === "" || item.isPayBackLater === payBack)
                        ).length / itemsPerPage)}
                        current={currentPage}
                        onPageChange={handlePageChange}
                    />
                )}<br/>

                {/* View Order */}
                <ViewOrders
                    show={isDetailsModalOpen}
                    handleClose={closeDetailsModal}
                />
            </div>
        </div>
    );
}

export default FetchOrders;
