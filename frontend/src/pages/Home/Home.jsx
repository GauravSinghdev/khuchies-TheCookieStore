import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Cards/Banner'
import Footer from '../../components/Footer/Footer'
import Cookies from '../../components/Cards/HCookies'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const [username, setFullName] = useState("there");

  const getUserInfo = async () => {
    if(!localStorage.getItem('userToken'))
    {
      
      navigate('/login');
    }
    try {
        const response = await axiosInstance.get("/user-details");
        if (response.data && response.data.user) {
            const n = response.data.user.username;
            setFullName(n.split(" ")[0]);
            return;
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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
        <Banner/>
        <Navbar/>

        <h1 className='bg-[#eff7f6] text-[30px] py-8 text-center'>Hi {username}. Hope you are doing good!</h1>
        <div className='px-[350px] '>
          <a href="/all-collections">
            <Cookies/>
          </a>
          
        </div>
        <Footer/>
    </div>
  )
}

export default Home