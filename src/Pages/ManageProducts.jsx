// // import { Link } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { FaEllipsisV } from 'react-icons/fa';
import { SlSocialDropbox } from 'react-icons/sl';
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import FetchProducts from "../Components/FetchProducts";
import BeatLoader from "react-spinners/BeatLoader";


function ManageProducts () {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    // const handleAction = (action, id) => {
    //     // Handle different actions here
    //     console.log(`${action} action on row with ID: ${id}`);
    //     setDropdownRowId(null);
    // };
    
      const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
        const filteredItems = data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filteredItems);
        // setCurrentPage(1);
      };
    
      // const toggleDropdown = (id) => {
      //   setDropdownRowId(dropdownRowId === id ? null : id);
      // };

      // const indexOfLastRow = currentPage * rowsPerPage;
      // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      // const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    
      // const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return ( 
        <div>

          {loading ? (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <BeatLoader
                  color={'#481986'}
                  loading={loading}
                  // cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              />
            </div>
          ) : (
            <div className="flex flex-row">
              {/* Sidebar */}
              <div>
                <Sidebar/>
              </div>

              {/* Header */}
              <div className="w-full">
                <div className="mb-4 items-center"><Header title="Manage Products" link="/products"/></div>
                
                <div className="flex flex-row justify-between items-center px-8">
                  <div className="mb-4"><Heading title="Manage Products"/></div>
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

                <div className="mx-8">
                  <FetchProducts/>
                </div>
                
                
                
              </div>

            </div>
          )}                    
        </div>
     );
};

export default ManageProducts;
