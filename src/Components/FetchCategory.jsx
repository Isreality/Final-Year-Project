import "../style.css"; 
import "../pagination.css";  
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import EditCategory from '../Components/EditCategory';
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";
import ScaleLoader from "react-spinners/ScaleLoader";
import ResponsivePagination from 'react-responsive-pagination';

const FetchCategory = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  const endpoint = '/admin/product-category';
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

    const handleEdit = (category) => {
      setSelectedCategory(category);
      setShowEditModal(true);
    };
  
    const closeEditModal = () => {
      setShowEditModal(false);
      setSelectedCategory(null);
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

  const handleSaveEdit = async (updatedCategory) => {
    try {
      const formData = new FormData();
      formData.append('name', updatedCategory.name);
      formData.append('desc', updatedCategory.desc);
      formData.append('minimumWeight', updatedCategory.minimumWeight);
      formData.append('maximumWeight', updatedCategory.maximumWeight);
      formData.append('price', updatedCategory.price);

      if (updatedCategory.image) {
        formData.append('image', updatedCategory.image); // Append image if it exists
      }

      const response = await fetch(`${baseURL}/admin/product-category/edit/${selectedCategory.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'ngrok-skip-browser-warning': "69420",
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Failed to update category');
      }
        
        setCategory((prevData) =>
          prevData.map((cat) => (cat.id === selectedCategory.id ? result.data : cat))
        );
        setSuccessMessage('Category updated successfully!');
        setErrorMessage('');
        setIsModalOpen(true);
        closeEditModal(false);
        window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await fetch(`${baseURL}/admin/product-category/delete/${categoryToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': "69420",
          'origin': '*',
        },
        body: JSON.stringify({ staffId: categoryToDelete?.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else{
        setCategory(category.filter((category) => category.id !== categoryToDelete?.id));
        setShowModal(false);
        setSuccessMessage(`Category "${categoryToDelete?.name}" was successfully deleted.`);
        setErrorMessage(``);
        setIsModalOpen(true);
        setCategoryToDelete(null);
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
        <BiCategoryAlt className="text-9xl text-c4"/>
        <p className="text-lg text-black2">No category has been added</p>
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
                            <th className="px-4 py-6 text-black2 font-normal">Name</th>
                            <th className="px-4 py-6 text-black2 font-normal">Description</th>
                            <th className="px-4 py-6 text-black2 font-normal">Min Weight</th>
                            <th className="px-4 py-6 text-black2 font-normal">Max Weight</th>
                            <th className="px-4 py-6 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="">
                        {data.map((cat) => (
                            <tr key={cat.id} className="text-black2 text-sm text-left items-center border-b border-disable px-4 py-8">
                                <td className="px-4 py-6">{cat.name}</td>
                                <td className="flex flex-row gap-2 px-4 py-6 items-center text-center">
                                    <img src={cat.imageUrl} alt="" className=" h-10 w-10 md:h-12 md:w-12 rounded-md"/>
                                    {cat.desc}   
                                </td>                                
                                <td className="px-4 py-6">{cat.minWeight}</td>
                                <td className="px-4 py-6">{cat.maxWeight}</td>
                                <td className="flex flex-row gap-2 px-4 py-6 items-center">
                                    <button onClick={() => handleEdit(cat)} className="cursor-pointer ">
                                        <BiSolidEdit className="text-success size-6 cursor-pointer" />
                                    </button>
                                    <button onClick={() => handleDelete(cat)} className="cursor-pointer ">
                                        <HiOutlineTrash className="text-red size-6 cursor-pointer" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table><br/>
                    
                    {/* Pagination Component */}
                    {data.length > itemsPerPage && (
                        <ResponsivePagination
                          total={Math.ceil(data.length / itemsPerPage)}
                          current={currentPage}
                          onPageChange={handlePageChange}
                        />
                    )}<br/>

                  <EditCategory
                    show={showEditModal}
                    handleClose={closeEditModal}
                    selectedCategory={selectedCategory}
                    onSave={handleSaveEdit}
                  />

                  <Delete 
                    show={showModal} 
                    handleClose={closeModal} 
                    onConfirm={confirmDelete} 
                    header="Delete Category" 
                    body={`Are you sure you want to delete this category "${categoryToDelete?.name}"?`}
                  />
      </div>
    </div>
  );
}

export default FetchCategory;