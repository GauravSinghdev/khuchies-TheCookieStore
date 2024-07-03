import React from 'react'
import Banner from '../../components/Cards/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import SideBannerRight from '../../components/Cards/SideBannerRight'
import SideBannerLeft from '../../components/Cards/SideBannerLeft'

const WishList = () => {
  return (
    <div>
        <SideBannerLeft/>
        <SideBannerRight/>
        <Banner/>
        <Navbar/>

        <div className='px-[350px] text-center text-[150px]'>
          <h2>Wishlist Page</h2>
        </div>

        <Footer/>
        
    </div>
  )
}

export default WishList