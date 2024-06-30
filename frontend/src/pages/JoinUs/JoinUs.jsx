import React from 'react'
import Banner from '../../components/Cards/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

const JoinUs = () => {

    const navigate = useNavigate();

    const onAction = () => {
        localStorage.clear();
        navigate("/job-openings");
    }


  return (
    <div>
        <Banner/>
        <Navbar/>

        <div>

            <div className='text-center h-[180px] py-[55px] bg-[#eff7f6]'>
                <p className='text-[50px] text-center'>Join us as a career . . .</p>
            </div>
            
            <div className="flex gap-16 my-10 mx-auto justify-center px-[350px]">
                
                <div className="shadow-lg p-6 rounded-[5px] bg-white w-[350px] grid gap-y-10 cursor-pointer hover:shadow-2xl text-[#cfa25a]" onClick={onAction}>
                    <p className="text-lg">Designer</p>
                    <div className="flex justify-between items-center">
                        <p className="font-medium cursor-pointer">More Details</p>
                        <GoArrowRight className="w-5 text-[30px]"/>
                    </div>
                </div>   

                <div className="shadow-lg p-6 rounded-[5px] bg-white w-[350px] grid gap-y-10 cursor-pointer hover:shadow-2xl text-[#cfa25a]" onClick={onAction}>
                    <p className="text-lg">Bakery Intern</p>
                    <div className="flex justify-between items-center">
                        <p className="font-medium cursor-pointer">More Details</p>
                        <GoArrowRight className="w-5 text-[30px]"/>
                    </div>
                </div>

                <div className="shadow-lg p-6 rounded-[5px] bg-white w-[350px] grid gap-y-10 cursor-pointer hover:shadow-2xl text-[#cfa25a]" onClick={onAction}>
                    <p className="text-lg">Delivery Guy</p>
                    <div className="flex justify-between items-center">
                        <p className="font-medium cursor-pointer">More Details</p>
                        <GoArrowRight className="w-5 text-[30px]"/>
                    </div>
                </div>        

            </div>

            <div className="flex gap-16 my-10 mx-auto justify-center px-[350px]">
                
                <div className="shadow-lg p-6 rounded-[5px] bg-white w-[350px] grid gap-y-10 cursor-pointer hover:shadow-2xl text-[#cfa25a]" onClick={onAction}>
                    <p className="text-lg">Junior Chef</p>
                    <div className="flex justify-between items-center">
                        <p className="font-medium cursor-pointer">More Details</p>
                        <GoArrowRight className="w-5 text-[30px] "/>
                    </div>
                </div>

                <div className="shadow-lg p-6 rounded-[5px] bg-white w-[350px] grid gap-y-10 cursor-pointer hover:shadow-2xl text-[#cfa25a]" onClick={onAction}>
                    <p className="text-lg">Financer</p>
                    <div className="flex justify-between items-center">
                        <p className="font-medium cursor-pointer">More Details</p>
                        <GoArrowRight className="w-5 text-[30px]"/>
                    </div>
                </div>

                <div className="shadow-lg p-6 rounded-[5px] bg-white w-[350px] grid gap-y-10 cursor-pointer hover:shadow-2xl text-[#cfa25a]" onClick={onAction}>
                    <p className="text-lg">Other Openings</p>
                    <div className="flex justify-between items-center">
                        <p className="font-medium cursor-pointer">More Details</p>
                        <GoArrowRight className="w-5 text-[30px] "/>
                    </div>
                </div>

            </div>

            

        </div>
        <Footer/>
    </div>
  )
}

export default JoinUs