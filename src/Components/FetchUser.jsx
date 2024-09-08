import "../style.css";   
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import { SlSocialDropbox } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import ScaleLoader from "react-spinners/ScaleLoader";
// import { useNavigate } from 'react-router-dom';

const FetchUser = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);


  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/customer/';
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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,X-Token-Auth,Authorization',
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

  useEffect(() => {
    fetchData();
  }, [Atoken]);

  const handleDelete = (staff) => {
    setUserToDelete(staff);
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
        setUsers(users.filter((users) => users.id !== userToDelete?.id));
        setShowModal(false);
        setSuccessMessage(`User "${userToDelete?.name}" was successfully deleted.`);
        setErrorMessage(``);
        setIsModalOpen(true);
        setUserToDelete(null);
        // console.log('Delete Result:', result);
      }

      setTimeout(() => {
        setSuccessMessage('');
        setIsModalOpen(false);
        // navigate('/product');
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

                    <table className="min-w-full border-collapse border border-disable py-4">
                        <thead className="bg-fa text-sm text-left">
                        <tr className="">
                            {/* <div className="p-2 text-left items-center"><th className="p-4 text-black2 font-normal">S/N</th></div> */}
                            <th className="p-4 text-black2 font-normal">Name</th>
                            <th className="p-4 text-black2 font-normal">Email</th>
                            <th className="p-4 text-black2 font-normal">Phone</th>
                            <th className="p-4 text-black2 font-normal">Status</th>
                            <th className="p-4 text-black2 font-normal">Account</th>
                            <th className="p-4 text-black2 font-normal">Location</th>
                            <th className="p-4 text-black2 font-normal">Date</th>
                            <th className="p-4 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="">
                        {data.map((item) => (
                            <tr key={item.id} className="text-black2 text-sm text-left border-b border-disable p-6">
                                {/* <div className="bg-white p-4 text-left text-sm items-center"><td className="bg-fa px-4 py-2 rounded-sm">{item.id}</td></div> */}
                                <td className="p-4">{item.name}</td>
                                <td className="p-4">{item.email}</td>
                                <td className="p-4">{item.phone_number}</td>
                                <td className="p-4">{item.phone_number}</td>
                                <td className="p-4">{item.account_type}</td>
                                <td className="p-4">{item.address}</td>
                                <td className="p-4">{item.created_at}</td>
                                <td className="flex flex-row gap-2 p-2 items-center text-center">
                                    <button onClick={() => handleDelete(item)} className="cursor-pointer ">
                                        <HiOutlineTrash className="text-red size-6 cursor-pointer" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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