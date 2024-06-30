import React from 'react'
import Banner from '../../components/Cards/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Jobs = () => {
  return (
    <div>
        <Banner/>
        <Navbar/>
    
        <div className='text-center h-[180px] py-[55px] bg-[#eff7f6]'>
            <p className='text-[50px] text-center'>Currently No Jobs Available.</p>
        </div>

        <Footer/>
    </div>
  )
}

export default Jobs