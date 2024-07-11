import React from 'react'
import Banner from '../../components/Cards/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const index = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Banner/>
        <Navbar/>

        <div className='px-[350px] '>
            <h1 className='text-[30px] my-5 text-center'>Admin Usage Page</h1>

            <div className='m-20 text-[25px] flex flex-col gap-5'>
                
                <li className='hover:underline hover:text-blue-900'><a href="/admin/all-users" target='_blank'>All Users</a></li>
                <li className='hover:underline hover:text-blue-900'><a href="/admin/all-products" target='_blank'>All Products</a></li>         

            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default index