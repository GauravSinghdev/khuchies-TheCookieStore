import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import Banner from '../../components/Cards/Banner';
import Footer from '../../components/Footer/Footer';


const Signup = () => {

    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name){
            setError("Please enter your name");
            return;
        }

        if(!phoneNo){
            setError("Enter whatsApp no.");
            return;
        }

        if(phoneNo.length != 10)
            {
                setError("Enter 10 digit whatsApp no.");
                return;
            }

        if(!password){
            setError("Please enter the password");
            return;
        }
        setError("");

        try{
            const response = await axiosInstance.post("/signup",{
                username: name,
                phoneNo: phoneNo,
                password: password,
            });
            //Handle successful registr response
            if(response.data && response.data.error){
                setError(response.data.message);
                return;
            }

            if(response.data && response.data.accessToken){
                localStorage.setItem("userToken", response.data.accessToken);
                navigate('/');
            }
        } catch(error){
            //Handle registr error
            if(error.response && error.response.data && error.response.data.message)
            {
                setError(error.response.data.message);
            }
            else{
                setError("An unexpected error occured. Please try again!");
            }
        }
    }

  return (
    <>
        <Banner/>
        <Navbar/>
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-96 border-[5px] rounded-[20px] bg-white px-7 py-10 mt-[-275px]'>
                <form onSubmit={handleSignUp}>
                    <h4 className='text-3xl font-semibold text-center mb-7'>Signup</h4>
                    <input 
                        type="text"  
                        placeholder='Full Name'                      
                        className='input-box' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input 
                        type="text"  
                        placeholder='WhatsApp No.'                      
                        className='input-box' 
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                    />

                    
                    
                    <PasswordInput 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p> }

                    <button type='submit' className='btn-primary'>Signup</button>

                    <p className='text-sm text-center mt-4 font-semibold'>Already have an account? 
                        <a href="/login" className=" text-primary font-semibold ps-1 text-blue-600">Login</a>
                    </p>
                </form>
            </div>
        </div>

        <Footer/>
    </>
  );
}

export default Signup