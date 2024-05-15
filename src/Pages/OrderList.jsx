// // import { Link } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from 'react';
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";


const OrderList = () => {
//   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

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

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

const tableData =
[
  {
    name: "Dashboard",
    details: "Dante",
    id: 1
  },

  {
    name: "Dashboard",
    details: "Dante",
    id: 2
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
                <div className="mb-4 items-center"><Header title="Dashboard" link="/Dashboard"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Orders"/></div>
                </div>
                
                {/* Body */}
                <div className="text-left px-8 gap-5">
                    <table className="min-w-full border-collapse border border-disable">
                        <thead className="bg-fa ">
                        <tr className="">
                            <div className="p-2 text-center items-center"><th className="p-4 text-black2 font-normal">ID</th></div>
                            <th className="p-4 text-black2 font-normal">Name</th>
                            <th className="p-4 text-black2 font-normal">Details</th>
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
                            <tr key={item.id} className="text-black2">
                            <div className="bg-white p-4 text-center items-center"><td className=" bg-fa px-4 py-2 rounded-sm">{item.id}</td></div>
                            <td className="p-4">{item.name}</td>
                            <td className="p-4">{item.details}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/* <div className="flex justify-between items-center mt-4">
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
                    </div> */}
                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default OrderList;
