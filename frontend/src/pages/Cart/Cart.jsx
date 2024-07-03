import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Cards/Banner'
import Footer from '../../components/Footer/Footer'
import SideBannerRight from '../../components/Cards/SideBannerRight'
import SideBannerLeft from '../../components/Cards/SideBannerLeft'

const Cart = () => {
  return (
    <div>
        <SideBannerLeft/>
        <SideBannerRight/>
        <Banner/>
        <Navbar/>

        <div className='px-[350px] text-center text-[200px]'>
          <h2>Cart Page</h2>
        </div>

        <Footer/>
        
    </div>
  )
}

export default Cart