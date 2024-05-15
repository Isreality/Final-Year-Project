// // import { Link } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { HiOutlineTrash } from "react-icons/hi";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";


const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
   const [deleteId, setDeleteId] = useState(null);
  const rowsPerPage = 10;

  const openModal = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    setIsOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      handleDelete(deleteId);
    }
  };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://api.example.com/data');
//         setData(response.data);
//       } catch (error) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

//   if (loading) {
//     return <div className="text-center p-4">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center p-4">{error}</div>;
//   }

//   if (data.length === 0) {
//     return <div className="text-center p-4">No data available</div>;
//   }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
//   const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);


  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

const tableData =
[
  {
    id: 1,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 2,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 3,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 4,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 5,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 6,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 7,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 8,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 9,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 10,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 11,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 12,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

  {
    id: 13,
    name: "John Doe",
    product: "Catfish",
    phone: "1234567890",
    status: "Delivered",
    price: "N500",
    date: "May 15,2024",
  },

]


    return ( 
        <div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row">
              {/* Sidebar */}
              <div>
                <Sidebar/>
              </div>

              {/* Header */}
              <div className="w-full">
                <div className="mb-4 items-center"><Header title="Orders" link="/OrderList"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Orders"/></div>
                </div>
                
                {/* Body */}
                <div className="text-left px-8 gap-5">
                    <table className="min-w-full border-collapse border border-disable">
                        <thead className="bg-fa text-sm">
                        <tr className="">
                            <div className="p-2 text-center items-center"><th className="p-4 text-black2 font-normal">ID</th></div>
                            <th className="p-4 text-black2 font-normal">Name</th>
                            <th className="p-4 text-black2 font-normal">Product</th>
                            <th className="p-4 text-black2 font-normal">Phone</th>
                            <th className="p-4 text-black2 font-normal">Status</th>
                            <th className="p-4 text-black2 font-normal">Price</th>
                            <th className="p-4 text-black2 font-normal">Delivery Date</th>
                            <th className="p-4 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>
                        {/* <tbody>
                        {currentRows.map((item) => (
                            <tr key={item.id}>
                            <td className="border border-gray-300 p-2">{item.id}</td>
                            <td className="border border-gray-300 p-2">{item.name}</td>
                            <td className="border border-gray-300 p-2">{item.details}</td>
                            </tr>
                        ))}
                        </tbody> */}

                        <tbody>
                        {tableData.map((item) => (
                            <tr key={item.id} className="text-black2 text-sm border-b border-disable">
                                <div className="bg-white p-4 text-center text-sm items-center"><td className="bg-fa px-4 py-2 rounded-sm">{item.id}</td></div>
                                <td className="p-4">{item.name}</td>
                                <td className="p-4">{item.product}</td>
                                <td className="p-4">{item.phone}</td>
                                <td className="p-4">{item.status}</td>
                                <td className="p-4">{item.price}</td>
                                <td className="p-4">{item.date}</td>
                                <td className="flex flex-row gap-2 p-2 items-center">
                                    <FaEye className="text-c4 size-5"/>
                                    <HiOutlineTrash className="text-red size-5 cursor-pointer" onClick={() => openModal(item.id)}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-4">
                        <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                        >
                        Previous
                        </button>
                        <span>
                        Page {currentPage} of {totalPages}
                        </span>
                        <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                        >
                        Next
                        </button>
                    </div>

                          {isOpen && (
                              <div className="fixed inset-0 flex justify-center items-center z-80">
                                  <div className="absolute inset-0 bg-black opacity-50"></div>
                                  <div className="relative bg-white rounded-lg max-w-lg py-8 px-16 z-10">
                                      <button
                                        className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
                                        onClick={closeModal}>
                                      &times;
                                      </button>

                                      <h2 className="text-xl text-red text-center font-semibold mb-4">Delete Order</h2>
                                      <p className="mb-4 text-center">Do you want to delete this order?</p>
                                      
                                      <div className=" flex flex-row justify-items-stretch gap-4 mr-2">
                                          <button className="bg-disable text-black2 py-3 px-12 rounded-md cursor-pointer" onClick={closeModal}>No</button>
                                          <button className="bg-red text-white py-3 px-12 rounded-md cursor-pointer" onClick={confirmDelete}>Delete</button>
                                      </div>
                                  </div>
                              </div>
                          )}
                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default OrderList;
