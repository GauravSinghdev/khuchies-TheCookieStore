import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Cards/Banner'
import Footer from '../../components/Footer/Footer'
import Cookies from '../../components/Cards/HCookies'
import axiosInstance from '../../utils/axiosInstance'

const Home = () => {

  const [username, setFullName] = useState("there");

  const getUserInfo = async () => {

    try {
        const response = await axiosInstance.get("/user-details");
        if (response.data && response.data.user) {
            setFullName(response.data.user.username);
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
    <div>
        <Banner/>
        <Navbar/>
        {/* <div className='text-center h-[180px] py-[55px] bg-[#eff7f6] px-[350px]'>
                <p className='text-[50px] text-center w-auto'>
                  <a href="/all-collections" className='flex justify-center'>
                    Explore Shop Here 
                    <span>
                      <GoArrowRight className='mt-3'/>
                    </span>
                  </a>
                  
                </p>
            </div> */}
        <h1 className='bg-red-200 text-[30px] py-8  text-center py-1'>Hi {username}. Hope you are doing good!</h1>
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