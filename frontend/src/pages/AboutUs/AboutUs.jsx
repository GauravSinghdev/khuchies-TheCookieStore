import React from 'react'
import Banner from '../../components/Cards/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const AboutUs = () => {
  return (
    <div>
        <Banner/>
        <Navbar/>
        
        <div className='flex px-[350px] gap-[50px]'>
          <img src="https://cdn.pixabay.com/photo/2017/01/22/16/25/baking-2000142_1280.jpg" alt="image-loading" className='w-100% h-[600px]' />

          <div className='w-full'>
            <h1 className='text-center text-[50px] mb-5 bg-blue-200'>About Us</h1>

            <p className='text-[18px] px-2 '>We embarked on our journey in June 2024, embracing each step as a learning opportunity. We are committed to growing, exploring, and evolving in this exciting adventure.</p>
            <p className='text-[25px] mt-5 font-semibold text-center font-[cursive]'>Hope you like it!</p> 

            <details className='text-center mt-20'>
              <summary className='text-center text-[20px]'>Owners</summary>
              <ul className='text-[20px] pt-5 font-semibold font-[cursive]'>
                <li>KK</li>
                <li>Kara</li>
              </ul>
          </details>

          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AboutUs