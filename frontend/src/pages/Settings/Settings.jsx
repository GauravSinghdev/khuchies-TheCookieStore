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
          
          <div className='flex flex-col items-center'>

            <button className='border-2 border-slate-400 mb-5 px-2 py-1 w-64'>Change the Username</button>

            <button className='border-2 border-slate-400 mb-5 px-2 py-1 w-64'>Change the Password</button>

            <button className='border-2 border-slate-400 mb-10 px-2 py-1 w-64'>Change the mobile no.</button>


          </div>
          
        </div>
        <Footer/>
    </div>
  )
}

export default Settings