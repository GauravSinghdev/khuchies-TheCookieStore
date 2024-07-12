import React from 'react'
import Banner from '../../components/Cards/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const ThankYou = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Banner/>
        <Navbar/>

        <div className='px-[350px] text-center mt-10 flex flex-col justify-center'>
            <p className='font-[cursive] text-[40px] font-bold'>Payment is completed Successfully!</p>
            <p className='font-[cursive] text-[30px]'>Thank you for Shopping!</p>

            <div className='my-10'>
                <a href="/all-collections" className=' bg-blue-400 p-2 border shadow-xl me-36 active:bg-blue-300'>Continue Shopping</a>
            </div>
        </div>

        
        <Footer/>
    </div>
  )
}

export default ThankYou