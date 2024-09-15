import "../style.css";   
import "../pagination.css";
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import EditAssociation from '../Components/EditAssociation';
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FaRegBuilding } from "react-icons/fa";
import ResponsivePagination from 'react-responsive-pagination';
// import 'react-responsive-pagination/themes/classic.css';

const FetchAssociation = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [association, setAssociation] = useState([]);
  const [error, setError] = useState(null);
  const [associationToDelete, setAssociationToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5;
  // const totalPages = 5;

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
  const endpoint = '/admin/association';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  const handleEdit = (association) => {
    setSelectedAssociation(association);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedAssociation(null);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const response = await fetch(`${baseURL}/admin/association/edit/${selectedAssociation.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'origin': '*',
        },
        body: JSON.stringify({
          name: updatedData.name,
          chairmanName: updatedData.chairmanName,
          chairmanNumber: updatedData.chairmanNumber
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Failed to update association');
      }

      const updatedAssociations = association.map((assoc) =>
        assoc.id === selectedAssociation.id ? { ...assoc, ...updatedData } : assoc
      );

      setAssociation(updatedAssociations);
      setSuccessMessage(`Update was successful.`);
      setErrorMessage('');
      setIsModalOpen(true);
      closeEditModal();
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

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

  const closeModal = () => {
    setShowModal(false);
  };

  const removeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [Atoken]);

  const handleDelete = (association) => {
    setAssociationToDelete(association);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!associationToDelete) return;

    try {
      const response = await fetch(`${baseURL}/admin/association/delete/${associationToDelete.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': "69420",
          'origin': '*',
        },
        body: JSON.stringify({ associationId: associationToDelete?.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else{
        setAssociation(association.filter((association) => association.id !== associationToDelete?.id));
        setShowModal(false);
        setSuccessMessage(`Association "${associationToDelete?.name}" was successfully deleted.`);
        setErrorMessage(``);
        setIsModalOpen(true);
        setAssociationToDelete(null);
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
        <FaRegBuilding className="text-9xl text-c4"/>
        <p className="text-lg text-black2">No Association has been added</p>
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
                        <thead className="bg-fa text-sm p-8 text-left">
                        <tr className="px-4 py-8">
                            <th className="px-8 py-6 text-black2 font-normal">Name</th>
                            <th className="px-8 py-6 text-black2 font-normal">Chairman Name</th>
                            <th className="px-8 py-6 text-black2 font-normal">Chairman Number</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="p-4">
                        {data.map((ass) => (
                            <tr key={ass.id} className="text-black2 text-sm text-left items-center border-b border-disable px-4 py-8">
                                {/* <div className="bg-white p-4 text-left text-sm items-center"><td className="bg-fa px-4 py-2 rounded-sm">{item.id}</td></div> */}
                                <td className="px-8 py-6">{ass.name}</td>                             
                                <td className="px-8 py-6">{ass.chairman_name}</td>
                                <td className="px-8 py-6">{ass.chairman_number}</td>
                                <td className="flex flex-row gap-2 items-center px-4 py-6">
                                    <button onClick={() => handleEdit(ass)} className="cursor-pointer ">
                                        <BiSolidEdit className="text-success size-6 cursor-pointer" />
                                    </button>
                                    <button onClick={() => handleDelete(ass)} className="cursor-pointer ">
                                        <HiOutlineTrash className="text-red size-6 cursor-pointer" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table><br/>

                    {/* Pagination Component */}
                    {/* <ResponsivePagination
                      total={Math.ceil(data.length / itemsPerPage)}
                      // total={totalPages}
                      current={currentPage}
                      onPageChange={handlePageChange}
                      // previousLabel="Previous" 
                      // nextLabel="Next"
                      /><br/> */}

                    {/* Pagination Component */}
                    {data.length > itemsPerPage && (
                        <ResponsivePagination
                          total={Math.ceil(data.length / itemsPerPage)}
                          current={currentPage}
                          onPageChange={handlePageChange}
                        />
                      )}<br/>

                    {/* Edit Modal */}
                    <EditAssociation
                    show={showEditModal}
                    handleClose={closeEditModal}
                    association={selectedAssociation}
                    onSave={handleSaveEdit}
                    />

                    {/* Delete Modal */}
                    <Delete 
                      show={showModal} 
                      handleClose={closeModal} 
                      onConfirm={confirmDelete} 
                      header="Delete Association" 
                      body={`Are you sure you want to delete this category "${associationToDelete?.name}"?`}
                    />
      </div>
    </div>
  );
}

export default FetchAssociation;