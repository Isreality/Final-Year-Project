// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import { useState, useEffect } from 'react';
import { useAuth } from '../Components/AuthContext';
import { FaUsers } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { FiStar } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
// import { TbCurrencyNaira } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { RiListView } from "react-icons/ri";
import { Doughnut, Line } from "react-chartjs-2";
import { TbMathGreater } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState([]);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/ratings/fetch-all-ratings-with-filter?page=1&rating=4';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
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

        // setStatusCode(response.status);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status) {
          // console.log(result);
          setRating(result.data);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [Atoken]);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, [])

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-pend text-lg" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-c4 text-lg" />);
      }
    }
    return stars;
  };

  // if (rating.length === 0) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-64">
  //       <FiStar className="text-9xl text-c4"/>
  //       <p className="text-lg text-black2">No Ratings Yet</p>
  //     </div>
  //   );
  // }

    return ( 
        <div>

          {loading ? (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <BeatLoader
                  color={'#481986'}
                  loading={loading}
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
                <div className="mb-4 items-center"><Header title="Reviews" link="/reviews"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Reviews"/></div>
                </div>
                
                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                {rating.map((rate) => (
                    <div key={rate.id} className="flex flex-col bg-fa rounded-md text-black2 gap-1 p-6">
                          <h1 className="text-left text-primary text-md font-bold">{rate.user.fullname}</h1>
                          <div className="flex text-xs text-left gap-1">
                            {renderStars(rate.rating).map((star, index) => (
                              <div key={index}>{star}</div>
                            ))}
                          </div>
                          <h1 className="text-sm text-left text-black2">{rate.review}</h1>
                    </div> 
                ))}
              </div><br/>
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Reviews;
