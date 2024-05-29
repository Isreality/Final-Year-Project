// // import { Link } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { FaEllipsisV } from 'react-icons/fa';
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import DataTable from 'react-data-table-component';
import axios from 'axios';


const ManageProducts = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [dropdownRowId, setDropdownRowId] = useState(null);
    const [loading, setLoading] = useState(false);
  

  

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          setData(response.data);
          setFilteredData(response.data);
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
        setDropdownRowId(null); // Close the dropdown after action
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

    const columns = [
        {
        name: 'ID',
        selector: 'id',
        sortable: true,
        },
        {
        name: 'Product',
        selector: 'product',
        sortable: true,
        },
        {
        name: 'Available',
        selector: 'available',
        sortable: true,
        },
        {
        name: 'Price',
        selector: 'price',
        sortable: true,
        },
        {
        name: 'Date Added',
        selector: 'date',
        sortable: true,
        },
        {
        name: 'Actions',
        cell: (row) => (
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
        ),
        },
    ];



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
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Products"/></div>
                </div>
                
                {/* Body */}
                <div className="text-left px-8 gap-5">
                    <div className="mb-4">
                        <input
                        type="text"
                        placeholder="Search by Name"
                        value={search}
                        onChange={handleSearch}
                        className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <DataTable
                        title="User List"
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        pointerOnHover
                    />
                          

                          
                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default ManageProducts;
