import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Cards/Banner';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { MdDeleteOutline } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { RiAdminLine } from "react-icons/ri";


const User = () => {
    const [fullName, setFullName] = useState("Empty");
    const [mobileNo, setMobileNo] = useState("Empty");
    const [city, setCity] = useState("Empty");
    const [add, setAdd] = useState("Empty");
    const [createdOnDate, setCreatedOnDate] = useState("Empty");
    const [admin, setAdmin] = useState(false);
    const [pincode, setPincode] = useState("Empty");
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
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
        <div className='flex flex-col min-h-screen'>
            <Banner />
            <Navbar />
            
            {loading && 
                // <div className='text-[50px] text-[#dcb77b] mt-40 mx-auto flex gap-2 items-center'>
                //     <p>Loading. . . Please Wait</p>
                //     <AiOutlineLoading3Quarters className='animate-spin text-center items-center px-auto' />
                // </div>

                <div aria-label="Loading..." role="status" className="flex items-center gap-2 justify-center mt-40">

                    <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                    </svg>
                    <span className="text-4xl font-medium text-gray-500">Loading...</span>
                    
                </div>

            }       
            
            {
                !loading && (
                    <div>
                        <h1 className='text-[50px] text-center mt-[50px] font-[900px]'>Profile</h1>

                        <div className='text-left text-[20px] border mx-[350px] px-[50px] pt-[50px] py-[20px] text-slate-800 rounded shadow-2xl border-[#dcb77b] relative'>
                            <div className='mt-5'>

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

                            </div>

                            <div className='text-center flex gap-2 justify-center absolute right-5 top-5'>

                                <a href="/admin">
                                    <RiAdminLine className='h-10 w-10 hover:text-slate-300 hover:scale-110' />
                                </a>
                                
                                <a onClick={f_logout} className='hover:cursor-pointer'>
                                    <LiaSignOutAltSolid className='h-10 w-10 hover:text-green-500 hover:scale-110'/>
                                </a>

                                <a href='/settings' className='hover:cursor-pointer'>
                                    <CiSettings className='h-10 w-10 hover:text-[#cfa25a] hover:scale-110'/>
                                </a>

                                <a onClick={f_del} className='hover:cursor-pointer'>
                                    <MdDeleteOutline className='h-10 w-10 hover:text-red-500 hover:scale-110'/>
                                </a>

                            </div>

                            <div className='absolute right-5 bottom-5'>
                                
                            </div>
                        </div>
                    </div>
                    
                )
            }        
                


                


            

            <Footer />
        </div>
    );
}

export default User;
