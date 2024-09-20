import "../style.css";   
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaEye } from 'react-icons/fa';
import { LuUsers } from "react-icons/lu";
import ScaleLoader from "react-spinners/ScaleLoader";
import ResponsivePagination from 'react-responsive-pagination';
import ViewUsers from '../Components/ViewUsers';

const FetchUser = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState({});
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5;

  // Function to assign color based on status
  const getStatusColorClass = (value) => {
    return (
        <span className={value ? 'text-success' : 'text-red'}>
            {value ? 'Enabled' : 'Disabled'}
        </span>
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeModal = () => {
    setIsModalOpen(false);
  };

  const handleView = (item) => {
    setDetails(item);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };


  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/customer/';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

    const fetchData = async () => {
      try {
        const response = await fetch(baseURL + endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Atoken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,X-Token-Auth,Authorization',
            'origin': '*',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status) {
          setData(result.data);
          setDisplayData(result.data);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    useEffect(() => {
      const filteredData = data.filter(item => {
          const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase()) || item.phone_number.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesAccount = selectedAccount === "" || item.account_type === selectedAccount;
          const matchesStatus = selectedStatus === "" || item.is_active === selectedStatus;
          return matchesSearchTerm && matchesAccount && matchesStatus;
      });

      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      setDisplayData(filteredData.slice(startIdx, endIdx));
    }, [searchTerm, selectedAccount, selectedStatus, data]);

  useEffect(() => {
    fetchData();
  }, [Atoken]);

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`${baseURL}/admin/customer/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': "69420",
          'origin': '*',
        },
        body: JSON.stringify({ userId: userToDelete?.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else{
        setUsers(users.filter((user) => user.id !== userToDelete?.id));
        setShowModal(false);
        setSuccessMessage(`User "${userToDelete?.name}" was successfully deleted.`);
        setErrorMessage(``);
        setIsModalOpen(true);
        setUserToDelete(null);
      }

      setTimeout(() => {
        setSuccessMessage('');
        setIsModalOpen(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      setError(error.message);
      setShowModal(false);
    }
  };

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
        <LuUsers className="text-9xl text-c4"/>
        <p className="text-lg text-black2">No User added</p>
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
            <div className=" flex flex-row justify-between text-left mb-4">
                <input
                    type="text"
                    placeholder="Search by Order Ref."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-4 border border-f2 rounded focus:bg-white focus:outline-primary"
                />

                <div className="relative flex flex-row gap-2 items-center">
                  {/* Filter by Account Type */}
                    <div className='relative'>
                        <select
                            value={selectedAccount}
                            onChange={handleAccountChange}
                            className="block appearance-none py-4 px-8 bg-fa rounded focus:outline-primary cursor-pointer"
                        >
                            <option className="text-md" value="">Account Type</option>
                            <option className="text-md" value="SELLER">Seller</option>
                            <option className="text-md" value="CUSTOMER">Customer</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black2">
                            <RiArrowDropDownLine className="h-6 w-6"/>
                        </div>
                    </div>

                    {/* Filter by Status */}
                    <div className='relative'>
                        <select
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            className="block appearance-none py-4 px-8 bg-fa rounded focus:outline-primary cursor-pointer"
                        >
                            <option className="text-md" value="">All Statuses</option>
                            <option className="text-md" value="Enabled">Enabled</option>
                            <option className="text-md" value="Disabled">Disabled</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black2">
                            <RiArrowDropDownLine className="h-6 w-6"/>
                        </div>
                    </div>
                </div>              
            </div>
                    <table className="min-w-full border-collapse border border-disable py-4">
                        <thead className="bg-fa text-sm text-left">
                        <tr className="">
                            {/* <div className="p-2 text-left items-center"><th className="p-4 text-black2 font-normal">S/N</th></div> */}
                            <th className="px-6 py-6 text-black2 font-normal">Name</th>
                            <th className="px-4 py-6 text-black2 font-normal">Email</th>
                            <th className="px-4 py-6 text-black2 font-normal">Phone</th>
                            <th className="px-4 py-6 text-black2 font-normal">Status</th>
                            <th className="px-4 py-6 text-black2 font-normal">Account</th>
                            <th className="px-4 py-6 text-black2 font-normal">Location</th>
                            <th className="px-4 py-6 text-black2 font-normal">Date</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="">
                        {data.map((item) => (
                            <tr key={item._id} className="text-black2 text-sm text-left border-b border-disable p-6">
                                {/* <div className="bg-white p-4 text-left text-sm items-center"><td className="bg-fa px-4 py-2 rounded-sm">{item.id}</td></div> */}
                                <td className="px-6 py-6">{item.name}</td>
                                <td className="px-4 py-6">{item.email}</td>
                                <td className="px-4 py-6">{item.phone_number}</td>
                                <td className="flex flex-row items-center px-4 py-6">
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${getStatusColorClass(item.is_active)}`}
                                    ></span>
                                    {item.is_active}</td>
                                <td className="px-4 py-6">{item.account_type}</td>
                                <td className="px-4 py-6">{item.address}</td>
                                <td className="px-4 py-6">{item.created_at}</td>
                                <td className="flex flex-row gap-2 px-4 py-6 items-center text-center">
                                   <FaEye className="text-c4 size-5 cursor-pointer" onClick={() => handleView(item)}/>
                                   <HiOutlineTrash onClick={() => handleDelete(item)} className="text-red size-6 cursor-pointer" />  
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Pagination Component */}
                    {displayData.length > itemsPerPage && (
                        <ResponsivePagination
                            total={Math.ceil(displayData.length / itemsPerPage)}
                            current={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <ViewUsers
                      show={isDetailsModalOpen}
                      handleClose={closeDetailsModal}
                      userDetails={details}
                    />

                    <Delete 
                      show={showModal} 
                      handleClose={closeModal} 
                      onConfirm={confirmDelete} 
                      header="Delete Product" 
                      body={`Are you sure you want to delete this user "${userToDelete?.name}"?`}
                    />
      </div>
    </div>
  );
}

export default FetchUser;