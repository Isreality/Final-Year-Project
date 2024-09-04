// import { Link } from "react-router-dom";
import "../../style.css";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import Heading from "../../Components/Heading";
// import ManageProfile from "./ManageProfile";
import { useState, useEffect } from 'react';
import { HiUser } from "react-icons/hi2";
import { MdPayments } from "react-icons/md";
import { RxCaretRight } from "react-icons/rx";
import { BiShieldQuarter } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from 'react-router-dom';
import {  useMatch } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const match = useMatch('/settings/*');
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/admin/account/';
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
          setProfile(result.data);
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
                <div className="mb-4 items-center"><Header title="Settings" link="/settings"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Settings"/></div>
                </div>
                
                {/* Body */}               
               <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-8 mx-8">
                <div className="gap-5 flex flex-col">
                    {/* Role */}
                    <div className="flex flex-row justify-between bg-fa p-4 lg:p-8 rounded-md cursor-pointer">
                        <div className="flex flex-row md:flex-row items-center text-md gap-2 text-black2">
                            <HiUser className="text-white font-xl size-10 bg-primary p-2 rounded-full"/>
                            <p className="text-black2 font-medium">Role</p>
                        </div>

                        <div className="flex flex-row items-center sm:ml-96 gap-3">
                          <p className="text-black2 font-medium">{profile.accountType}</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-row justify-between bg-fa p-4 lg:p-8 rounded-md cursor-pointer">
                        <div className="flex flex-row items-center text-md gap-2 text-black2">
                            <MdEmail className="text-white font-xl size-10 bg-primary p-2 rounded-full"/>
                            <p className="text-black2 font-medium">Email</p>
                        </div>

                        <div className="flex flex-row items-center sm:ml-96 gap-3">
                          <p className="text-black2 font-medium">{profile.email}</p>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-row justify-between bg-fa p-4 lg:p-8 rounded-md cursor-pointer">
                        <div className="flex flex-row items-center text-md gap-2 text-black2">
                            <FaPhoneAlt className="text-white font-xl size-10 bg-primary p-2 rounded-full"/>
                            <p className="text-black2 font-medium">Phone Number</p>
                        </div>

                        <div className="flex flex-row items-center sm:ml-96 gap-3">
                          <p className="text-black2 font-medium"></p>
                        </div>
                    </div>
                </div>  

                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Settings;
