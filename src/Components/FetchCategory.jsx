import "../style.css";   
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";
import ScaleLoader from "react-spinners/ScaleLoader";
// import { useNavigate } from 'react-router-dom';

const FetchCategory = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);


  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/product-category';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  const handleEdit = (productId) => {
    setSelectedProduct(productId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
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
                            {/* <div className="p-2 text-left items-center"><th className="p-4 text-black2 font-normal">S/N</th></div> */}
                            <th className="p-4 text-black2 font-normal">Name</th>
                            <th className="p-4 text-black2 font-normal">Description</th>
                            <th className="p-4 text-black2 font-normal">Min Weight</th>
                            <th className="p-4 text-black2 font-normal">Max Weight</th>
                            <th className="p-4 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody className="">
                        {data.map((cat) => (
                            <tr key={cat.id} className="text-black2 text-sm text-left items-center border-b border-disable px-4 py-8">
                                {/* <div className="bg-white p-4 text-left text-sm items-center"><td className="bg-fa px-4 py-2 rounded-sm">{item.id}</td></div> */}
                                <td className="p-4">{cat.name}</td>
                                <td className="flex flex-row gap-2 p-4 items-center text-center">
                                    <img src={cat.imageUrl} alt="" className=" h-10 w-10 md:h-12 md:w-12 rounded-md"/>
                                    {cat.desc}   
                                </td>                                
                                <td className="p-4">{cat.minWeight}</td>
                                <td className="p-4">{cat.maxWeight}</td>
                                <td className="flex flex-row gap-2 p-1 items-center">
                                    <button onClick={() => handleEdit(cat.id)} className="cursor-pointer ">
                                        <BiSolidEdit className="text-success size-6 cursor-pointer" />
                                    </button>
                                    <button onClick={() => handleDelete(cat)} className="cursor-pointer ">
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
                  header="Delete Category" 
                  body={`Are you sure you want to delete this category "${categoryToDelete?.name}"?`}
                />
      </div>
    </div>
  );
}

export default FetchCategory;