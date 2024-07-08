import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Cards/Banner'

const Orders = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Banner/>
        <Navbar/>    

        <div className='px-[350px]'>

          <h1 className='my-10 text-[20px]'>My Orders</h1>

          <div>
            
          </div>
          
        </div>
        <Footer/>
    </div>
  )
}

export default Orders