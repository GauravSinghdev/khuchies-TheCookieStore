import React from 'react'
import Banner from '../../components/Cards/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Settings = () => {
  return (
    
    <div className='flex flex-col min-h-screen'>
        <Banner/>
        <Navbar/>    

        <div className='px-[350px]'>

          <h1 className='my-10 text-[20px]'>Settings</h1>
          
          <div className='flex items-center justify-center gap-5'>
            
            {/* <div className='flex gap-2'>
              <label htmlFor="">Username</label>
              <input type="text" placeholder='Name' className='border border-gray-300'/>
            </div>

            <div className='flex gap-2'>
              <label htmlFor="">Password</label>
              <input type="text" placeholder='Password' className='border border-gray-300'/>
            </div>

            <div className='flex gap-2'>
              <label htmlFor="">City</label>
              <input type="text" placeholder='City' className='border border-gray-300'/>
            </div> */}

            <div className='flex flex-col gap-5 items-center'>
              <label htmlFor="">Username</label>
              <label htmlFor="">Password</label>
              <label htmlFor="">City</label>
              <label htmlFor="">Pincode</label>
            </div>

            <div className='flex flex-col gap-5'>
              <input type="text" placeholder='Name' className='border border-gray-300 px-2 py-1' />
              <input type="text" placeholder='Name' className='border border-gray-300 px-2 py-1' />
              <select className="border bg-transparent px-1 outline-none">
                <option value="">Select City</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Udaipur">Udaipur</option>
                <option value="Chittorgarh">Chittorgarh</option>
                <option value="Jaisalmer">Jaisalmer</option>
                <option value="Kota">Kota</option>
                <option value="Kota">Haldwani</option>
              </select>
              <input type="text" placeholder='Name' className='border border-gray-300 px-2 py-1' />
            </div>


            {/* <button className='border p-2 '>Submit</button> */}
          </div>
          
        </div>
        <Footer/>
    </div>
  )
}

export default Settings