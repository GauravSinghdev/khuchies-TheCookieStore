import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import axiosInstance from '../../utils/axiosInstance';
import Banner from '../../components/Cards/Banner';
import Footer from '../../components/Footer/Footer';

const Login = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!phoneNo || phoneNo.length != 10)
    {
      setError("Please enter a valid mobile number(10 digits)");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        phoneNo: phoneNo,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("userToken", response.data.accessToken);
        navigate("/");
        return;
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again!");
      }
    }
  };

    return (
        <>
            <Banner/>
            <Navbar/>
            <div className="w-96 border-4 rounded-20 bg-white px-7 py-10 mx-auto my-32">
              <form onSubmit={handleLogin}>

                <h4 className='text-3xl font-semibold text-center mb-7'>Login</h4>
                <input
                    type="text"
                    placeholder='Enter Mobile Number'
                    className='input-box'
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                />

                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            
                {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
        
                <button type='submit' className='btn-primary'>Login</button>

                <p className='text-sm text-center mt-4 font-semibold'>Not registered yet?
                    <a href="/signup" className="font-semibold text-primary ps-1 text-blue-600">Create an Account</a>
                </p>

              </form>
            </div>
            <Footer/>
        </>
        
      );
    }
    
export default Login;

