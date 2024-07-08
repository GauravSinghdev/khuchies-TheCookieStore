import React, { useState } from 'react'
import Banner from '../../components/Cards/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import SideBannerRight from '../../components/Cards/SideBannerRight'
import SideBannerLeft from '../../components/Cards/SideBannerLeft'

const ele = [{
  image: "https://cdn.pixabay.com/photo/2023/02/12/11/41/biscuit-7784888_640.jpg",
  Product: "Baked Cookies (250 gms)",
  Price: "₹399.00",
},
{
  image: "https://cdn.pixabay.com/photo/2023/02/12/11/41/biscuit-7784888_640.jpg",
  Product: "Baked Cookies (250 gms)",
  Price: "₹399.00",
},
{
  image: "https://cdn.pixabay.com/photo/2023/02/12/11/41/biscuit-7784888_640.jpg",
  Product: "Baked Cookies (250 gms)",
  Price: "₹399.00",
},
{
  image: "https://cdn.pixabay.com/photo/2023/02/12/11/41/biscuit-7784888_640.jpg",
  Product: "Baked Cookies (250 gms)",
  Price: "₹399.00",
}]
const WishList = () => {

  const [items, setItems] = useState(4);
  return (
    <div className='flex flex-col min-h-screen'>
        {/* <SideBannerLeft/>
        <SideBannerRight/> */}
        <Banner/>
        <Navbar/>
        
        <div className='px-[350px] '>

          <h1 className='my-10 text-2xl'>My Wishlist <span className='text-slate-600'>({items} items)</span></h1>

          <div className='grid grid-cols-12 gap-3 my-10'>
            {ele.map((ele, index) => (
              <div key={index} className="shadow-lg border-2 bg-white col-span-3">

                <img src={ele.image} alt="item-pic" className='h-[250px] w-full object-cover cursor-pointer' />

                <div className='px-4 py-4 text-center'>
                  <p>{ele.Product}</p>
                  <p>{ele.Price}</p>
                </div>
                
                <div className='text-center text-[#cfa25a]'>
                  <button className='w-full border-t-2 p-2 text-[13px] hover:scale-105'>MOVE TO BAG</button>
                </div>
              </div>
            ))}
          </div>

        </div>

        <Footer/>
        
    </div>
  )
}

export default WishList