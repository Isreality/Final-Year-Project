import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { useState, useEffect } from 'react';
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import BeatLoader from "react-spinners/BeatLoader";
import { FiStar } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

const Reviews = () => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState([]);
  const [review, setReview] = useState([]);
  const [error, setError] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/ratings/fetch-all-ratings-with-filter?page=1';
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

  const closeModal = () => {
    setShowModal(false);
  };

  const removeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (review) => {
    setReviewToDelete(review);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!reviewToDelete) return;

    try {
      const response = await fetch(`${baseURL}/admin/ratings/delete-rating/${reviewToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': "69420",
          'origin': '*',
        },
        body: JSON.stringify({ staffId: reviewToDelete?.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else{
        setReview(review.filter((review) => review.id !== reviewToDelete?.id));
        setShowModal(false);
        setSuccessMessage(`Review "${reviewToDelete?.name}" was successfully deleted.`);
        setErrorMessage(``);
        setIsModalOpen(true);
        setReviewToDelete(null);
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
              <div className="bg-none md:bg-none lg:bg-primary">
                <Sidebar/>
              </div>

              {/* Header */}
              <div className="w-full">
                <div className="mb-4 items-center"><Header title="Reviews" link="/reviews"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Reviews"/></div>
                </div>

                {/* Modal */}
                <div className="mx-8 mb-4">
                  {isModalOpen && (
                    <Modal
                      message={errors || successMessage}
                      type={errors ? 'error' : 'success'}
                      onClose={removeModal}
                      className=""
                    />
                  )}
                </div>
                
                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center mx-8">
                {rating.map((rate) => (
                    <div key={rate.id} className="flex flex-col bg-fa rounded-md text-black2 gap-3 p-6">
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          <h1 className="text-left text-primary text-md font-bold">{rate.user.name}</h1>
                          <div className="flex text-xs text-left gap-1">
                            {renderStars(rate.ratings).map((star, index) => (
                              <div key={index}>{star}</div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <button onClick={() => handleDelete(rate)} className="cursor-pointer ">
                            <HiOutlineTrash className="text-red size-6 cursor-pointer" />
                          </button>
                        </div> 
                      </div>
                      
                        <h1 className="text-sm text-left text-black2">{rate.review}</h1>
                    </div> 
                ))}
              </div><br/>

              <Delete 
                  show={showModal} 
                  handleClose={closeModal} 
                  onConfirm={confirmDelete} 
                  header="Delete Category" 
                  body={`Are you sure you want to delete this review by "${reviewToDelete?.name}"?`}
              />
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Reviews;
