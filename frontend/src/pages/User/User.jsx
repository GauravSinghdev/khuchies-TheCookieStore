import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Cards/Banner';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const User = () => {
    const [fullName, setFullName] = useState("Empty");
    const [mobileNo, setMobileNo] = useState("Empty");
    const [createdOnDate, setCreatedOnDate] = useState("Empty");

    const navigate = useNavigate();

    const f_logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    const f_del = () => {
      delUser();
    }

    const getUserInfo = async () => {

        try {
            const response = await axiosInstance.get("/user-details");
            if (response.data && response.data.user) {
                setFullName(response.data.user.username);
                setMobileNo(response.data.user.phoneNo);

                const createdOn = new Date(response.data.user.createdOn);
                setCreatedOnDate(createdOn.toLocaleDateString());
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            } else {
                console.error("Error fetching user info", error);
            }
        }
    }

    const delUser = async () => {

      try {
          await axiosInstance.delete("/delete-user");
          localStorage.clear();
          navigate("/login");
          return;
      } catch (error) {
          if (error.response && error.response.status === 401) {
            localStorage.clear();
            navigate("/login");
          } else {
              console.error("Error deleting user:", error.message);
          }
      }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <Banner />
            <Navbar />
            <h1 className='text-[50px] text-center mt-[50px] font-[900px]'>My Info</h1>
            <div className='text-center text-[20px] border-4 w-[500px] mx-auto mb-[205px] p-[50px] text-slate-800 border-green-500 rounded-2xl pb-[40px] shadow-2xl'>
                <h1 className='pb-2'><span className='font-semibold text-slate-600'>Full Name :</span> {fullName}</h1>
                <h1 className='pb-2'><span className='font-semibold text-slate-600'>Mobile No :</span> {mobileNo}</h1>
                <h1 className='pb-2'><span className='font-semibold text-slate-600'>Created On :</span> {createdOnDate}</h1>

                <button 
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 dark:bg-red-700 dark:hover:bg-red-600 mt-5 dark:focus:ring-red-900"
                    onClick={f_logout}
                >
                    Logout
                </button>

                <button 
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 ms-2 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={f_del}
                >
                    Del Acc
                </button>
            </div>
            <Footer />
        </>
    );
}

export default User;
