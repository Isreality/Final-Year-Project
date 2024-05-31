// // import { Link } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { FaEllipsisV } from 'react-icons/fa';
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
// import DataTable from 'react-data-table-component';
// import axios from 'axios';


function ManageProducts () {
    const [data, setData] = useState([]);
    // const [data1, setData1] = useState(null);
    // const [data2, setData2] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [dropdownRowId, setDropdownRowId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
  
    const url1 = 'https://35b6-102-89-23-79.ngrok-free.app/api/admin/product/5';
    const url2 = 'https://35b6-102-89-23-79.ngrok-free.app/api/admin/product/?minPrice=&maxPrice=&ratings=';
  

    useEffect(() => {
      const fetchData = async () => {        
        try {
          const headers = {
            'origin': '*',
            "Content-Type": "application/json",
            'app-token': 'sdksd2o32usdf239djfnasojiuhrui2h3rjknweuh4ro8q2hrjwdbfoq274hrqo8e7rgsdbasdjkfnq8uerq948ri24jrdmnfau2q8h4r8oqwhrqwy8rg8oqg623ruqyhkasdjnbq3er2wurgwebsdnbq837y2egrub',
          };

          const [response1, response2] = await Promise.all([
            fetch(url1, {
              method: 'GET',
              headers,
            }),

            fetch(url2, {
              method: 'GET',
              headers,
            }),
          ])
          // const result = await response.json();
          const result1 = await response1.json();
          const result2 = await response2.json();

          if (result1.status && result2.status) {
            const combinedData = [result1.data, ...result2.data];
            setData(combinedData);
            setFilteredData(combinedData);
          } else {
            console.error('Error fetching data:', result1.msg || result2.msg);
          }
          // setData(result);
          // setFilteredData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const handleAction = (action, id) => {
        // Handle different actions here
        console.log(`${action} action on row with ID: ${id}`);
        setDropdownRowId(null);
      };
    
      const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
        const filteredItems = data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filteredItems);
      };
    
      const toggleDropdown = (id) => {
        setDropdownRowId(dropdownRowId === id ? null : id);
      };

      // const columns = [
      //   {
      //     name: 'Name',
      //     selector: row => row.name,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Description',
      //     selector: row => row.desc,
      //     sortable: true,
      //   },
      //   {
      //     name: 'SKU',
      //     selector: row => row.sku,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Price',
      //     selector: row => row.price,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Image URL',
      //     selector: row => row.imageUrl,
      //     cell: row => <img src={row.imageUrl} alt={row.name} className="w-16 h-16 object-cover" />,
      //     sortable: true,
      //   },
      //   {
      //     name: 'State',
      //     selector: row => row.state,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Category Name',
      //     selector: row => row.category.name,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Category Description',
      //     selector: row => row.category.desc,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Inventory Quantity',
      //     selector: row => row.inventory.quantity,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Discount Name',
      //     selector: row => row.discount.name,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Discount Percent',
      //     selector: row => `${row.discount.discountPercent}%`,
      //     sortable: true,
      //   },
      //   {
      //     name: 'Actions',
      //     cell: (row) => (
      //       <div className="relative">
      //         <button onClick={() => toggleDropdown(row.id)} className="focus:outline-none">
      //           <FaEllipsisV />
      //         </button>
      //         {dropdownRowId === row.id && (
      //           <div className="absolute right-0 z-10 w-40 py-2 mt-2 bg-white rounded shadow-xl">
      //             <button
      //               onClick={() => handleAction('Accept', row.id)}
      //               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
      //             >
      //               Accept
      //             </button>
      //             <button
      //               onClick={() => handleAction('Decline', row.id)}
      //               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
      //             >
      //               Decline
      //             </button>
      //             <button
      //               onClick={() => handleAction('Ban', row.id)}
      //               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
      //             >
      //               Ban
      //             </button>
      //           </div>
      //         )}
      //       </div>
      //     ),
      //   },
      // ];
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
                <div className="mb-4 items-center"><Header title="Manage Products" link="/ManageProducts"/></div>
                
                <div className="flex flex-row justify-between items-center px-8">
                  <div className="mb-4"><Heading title="Products"/></div>
                  <div className="mb-4">
                        <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                        className="w-full px-3 py-2 border rounded text-black2 focus:outline-disable"
                        />
                    </div>
                </div>
                
                {/* Body */}
                <div className="text-left px-8 gap-5">
                  <table className="min-w-full border-collapse border border-disable">
                        <thead className="bg-fa text-sm">
                        <tr className="">
                            <div className="p-2 text-center items-center"><th className="p-4 text-black2 font-normal">ID</th></div>
                            <th className="p-4 text-black2 font-normal">Product</th>
                            <th className="p-4 text-black2 font-normal">Available</th>
                            <th className="p-4 text-black2 font-normal">Price</th>
                            <th className="p-4 text-black2 font-normal">Date Added</th>
                            <th className="p-4 text-black2 font-normal">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {currentRows.map((item) => (
                            <tr key={item.id} className="text-black2 text-sm border-b border-disable">
                                <div className="bg-white p-4 text-center text-sm items-center"><td className="bg-fa px-4 py-2 rounded-sm">{item.id}</td></div>
                                <td className="p-4">{item.name}</td>
                                <td className="p-4">{item.state}</td>
                                <td className="p-4">{item.price}</td>
                                <td className="p-4">June, 2024</td>
                                <td className="flex flex-row gap-2 p-2 items-center">
                                  <div className="relative">
                                    <button onClick={() => toggleDropdown(row.id)} className="focus:outline-none">
                                      <FaEllipsisV />
                                    </button>
                                    {dropdownRowId === row.id && (
                                      <div className="absolute right-0 z-10 w-40 py-2 mt-2 bg-white rounded shadow-xl">
                                        <button
                                          onClick={() => handleAction('Accept', row.id)}
                                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                        >
                                          Accept
                                        </button>
                                        <button
                                          onClick={() => handleAction('Decline', row.id)}
                                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                        >
                                          Decline
                                        </button>
                                        <button
                                          onClick={() => handleAction('Ban', row.id)}
                                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                        >
                                          Ban
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                    {/* <FaEye className="text-c4 size-5 cursor-pointer" onClick={() => openDetailsModal(item)}/>
                                    <HiOutlineTrash className="text-red size-5 cursor-pointer" onClick={() => openModal(item.id)}/> */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="mt-4">
                      <Pagination
                        rowsPerPage={rowsPerPage}
                        totalRows={filteredData.length}
                        paginate={paginate}
                        currentPage={currentPage}
                      />    
                    </div>                          
                </div>
                
              </div>

            </div>
          )}                    
        </div>
     );
};

const Pagination = ({ rowsPerPage, totalRows, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight ${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
              } border border-gray-300 hover:bg-gray-200`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}; 
export default ManageProducts;
