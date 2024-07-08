import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Cards/Banner';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const User = () => {
    const [fullName, setFullName] = useState("Empty");
    const [mobileNo, setMobileNo] = useState("Empty");
    const [city, setCity] = useState("Empty");
    const [add, setAdd] = useState("Empty");
    const [createdOnDate, setCreatedOnDate] = useState("Empty");
    const [admin, setAdmin] = useState(false);
    const [pincode, setPincode] = useState("Empty");

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
                setCity(response.data.user.city);
                const createdOn = new Date(response.data.user.createdOn);
                setCreatedOnDate(createdOn.toLocaleDateString());
                if(response.data.user.role === "Admin") setAdmin(response.data.user.role)
                const addrs = response.data.user.addLine1 + " " + response.data.user.addLine2;
                setAdd(addrs);
                setPincode(response.data.user.pincode)
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
            <h1 className='text-[50px] text-center mt-[50px] font-[900px] '>Profile</h1>
            <div className='text-left text-[20px] border-4 mx-[350px] mb-[205px] px-[50px] pt-[50px] py-[20px] text-slate-800  rounded-2xl shadow-2xl border-[#dcb77b]'>
                
                <div className='pb-2 flex gap-5'>
                    <div className='font-semibold text-slate-600'>Full Name:</div> 
                    <div>{fullName}</div>
                </div>

                <div className='pb-2 flex gap-5'>
                    <div className='font-semibold text-slate-600'>Mobile No:</div> 
                    <div>{mobileNo}</div>
                </div>

                <div className='pb-2 flex gap-9'>
                    <div className='font-semibold text-slate-600'>Address:</div> 
                    <div>{add}</div>
                </div>

                <div className='pb-2 flex gap-[78px]'>
                    <div className='font-semibold text-slate-600'>City:</div> 
                    <div>{city}</div>
                </div>

                <div className='pb-2 flex gap-9'>
                    <div className='font-semibold text-slate-600'>Pincode:</div> 
                    <div>{pincode}</div>
                </div>

                {
                    admin && 
                    <div className='pb-2 flex gap-[74px]'>
                        <div className='font-semibold text-slate-600'>Role:</div> 
                        <div>{admin}</div>
                    </div>
                }

                <div className='pb-2 flex gap-8'>
                    <div className='font-semibold text-slate-600'>Created:</div> 
                    <div>{createdOnDate}</div>
                </div>

                <div className='text-center'>
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
                
            </div>
            <Footer />
        </>
    );
}

export default User;
