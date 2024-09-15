import "../style.css";   
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import { useState, useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";
import { SlSocialDropbox } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import ScaleLoader from "react-spinners/ScaleLoader";
// import { useNavigate } from 'react-router-dom';

const PendingRequest = () => {
  const [data, setData] = useState([]);
  const [seller, setSeller] = useState([]);
  const [error, setError] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeclineModal, setDeclineModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);


  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/customer/fetch-become-a-seller-requests';
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

//   const handleDelete = (staff) => {
//     setStaffToDelete(staff);
//     setShowModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!staffToDelete) return;

//     try {
//       const response = await fetch(`${baseURL}/admin/staff-management/delete-admin/${staffToDelete.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${Atoken}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'ngrok-skip-browser-warning': "69420",
//           'origin': '*',
//         },
//         body: JSON.stringify({ staffId: staffToDelete?.id }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       } else{
//         setStaffs(staffs.filter((staff) => staff.id !== staffToDelete?.id));
//         setShowModal(false);
//         setSuccessMessage(`Product "${staffToDelete?.fullname}" was successfully deleted.`);
//         setErrorMessage(``);
//         setIsModalOpen(true);
//         setStaffToDelete(null);
//         // console.log('Delete Result:', result);
//       }

//       setTimeout(() => {
//         setSuccessMessage('');
//         setIsModalOpen(false);
//         // navigate('/product');
//         window.location.reload();
//       }, 3000);
//     } catch (error) {
//       setError(error.message);
//       setShowModal(false);
//     }
//   };

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
        <p className="text-lg text-black2">No Request Yet</p>
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
                        <thead className="bg-fa text-sm text-left p-4">
                        <tr className="">
                            {/* <div className="p-2 text-left items-center"><th className="p-4 text-black2 font-normal">S/N</th></div> */}
                            <th className="px-6 py-6 text-black2 font-normal">Name</th>
                            <th className="px-4 py-6 text-black2 font-normal">Email</th>
                            <th className="px-4 py-6 text-black2 font-normal">Phone</th>
                            <th className="px-4 py-6 text-black2 font-normal">Association</th>
                            <th className="px-4 py-6 text-black2 font-normal">Chairman Name</th>
                            <th className="px-4 py-6 text-black2 font-normal">Chairman Number</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="p-4">
                        {data.map((sell) => (
                            <tr key={sell._id} className="text-black2 text-sm border-b items-center border-disable p-6">
                                {/* <td className="px-6 py-6 text-left">{sell.name}</td> */}
                                <td className="flex flex-row gap-2 px-4 py-6 items-center text-center">
                                    <img src={sell.profile_image_url} alt="" className=" h-10 w-10 md:h-12 md:w-12 rounded-md"/>
                                    {sell.name}   
                                </td>
                                <td className="px-4 py-6 text-left">{sell.email}</td>
                                <td className="px-4 py-6 text-left">{sell.phone_number}</td>
                                <td className="px-4 py-6 text-left">{sell.cooperative_name}</td>
                                <td className="px-4 py-6 text-left">{sell.chairman_name}</td>
                                <td className="px-4 py-6 text-left">{sell.chairman_number}</td>
                                <td className=" items-right ">
                                    <button className="cursor-pointer ">
                                        <FiMoreVertical className="text-black2 text-right size-5 cursor-pointer" />
                                    </button>

                                    {/* <button className="cursor-pointer ">
                                        <FaCircleCheck className="text-success text-right size-6 cursor-pointer" />
                                    </button>

                                    <button className="cursor-pointer ">
                                        <MdCancel className="text-red text-right size-6 cursor-pointer" />
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                {/* <Delete 
                  show={showModal} 
                  handleClose={closeModal} 
                  onConfirm={confirmDelete} 
                  header="Delete Product" 
                  body={`Are you sure you want to delete this staff "${staffToDelete?.fullname}"?`}
                /> */}
      </div>
    </div>
  );
}

export default PendingRequest;