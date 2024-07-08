import React from 'react'
import Banner from '../../components/Cards/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { MdMan } from "react-icons/md";
import { MdOutlineWoman } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Banner/>
        <Navbar/>
        
        <div className='flex px-[350px] gap-[50px]'>
          <img src="https://cdn.pixabay.com/photo/2017/01/22/16/25/baking-2000142_1280.jpg" alt="image-loading" className='w-100% h-[600px]' />

          <div className='w-full'>
            <h1 className='text-center text-[50px] mb-5 py-3 bg-[#eff7f6]'>About Us</h1>

            <p className='text-[20px] px-4 mt-8 '>We embarked on our journey in June 2024, embracing each step as a learning opportunity. We are committed to growing, exploring, and evolving in this exciting adventure.</p>
            <p className='text-[25px] mt-10 font-semibold text-center font-[cursive]'>Thank You !</p> 

            <details className='text-center mt-[50px] w-40 mx-auto'>
              <summary className='text-center text-[30px] text-[#dcb77b] cursor-pointer'>Owners</summary>
              
              <div className='flex gap-5 text-center justify-center font-[cursive] text-[25px] ps-10'>
                <div>
                  KK
                  <MdOutlineWoman className='w-10 h-10 mx-auto text-[#ed49a7]'/>
                </div>
                <div>
                  KARA
                  <MdMan className='w-10 h-10 mx-auto text-[#02a2ff]'/>
                  
                </div>
              </div>
          </details>

          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AboutUs