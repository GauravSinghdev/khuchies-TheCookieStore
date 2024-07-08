import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Banner from '../../components/Cards/Banner';
import Footer from '../../components/Footer/Footer';

const Signup = () => {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [addLine1, setAddLine1] = useState('');
    const [addLine2, setAddLine2] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [pincode, setPincode] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Validation
        if (!name) {
            setError('Please enter your name');
            return;
        }

        if (!phoneNo) {
            setError('Enter WhatsApp number');
            return;
        }

        if (phoneNo.length !== 10) {
            setError('Enter a valid 10-digit WhatsApp number');
            return;
        }

        if (!password) {
            setError('Please enter the password');
            return;
        }

        if (!addLine1) {
            setError('Please enter the address line 1');
            return;
        }

        if (!city) {
            setError('Please select a city');
            return;
        }

        setError('');

        try {
            const response = await axiosInstance.post('/signup', {
                username: name,
                phoneNo: phoneNo,
                password: password,
                addLine1: addLine1,
                addLine2: addLine2,
                city: city,
                pincode : pincode
            });

            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }

            if (response.data && response.data.accessToken) {
                localStorage.setItem('userToken', response.data.accessToken);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again!');
            }
        }
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Banner />
            <Navbar />
                <div className="w-96 border-4 rounded-20 bg-white px-7 py-10 mx-auto my-10">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-3xl font-semibold text-center mb-7">Signup</h4>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="input-box"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="WhatsApp No."
                            className="input-box"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />

                        <textarea
                            placeholder="Address Line 1"
                            className="input-box"
                            maxLength={30}
                            rows={3}
                            value={addLine1}
                            onChange={(e) => setAddLine1(e.target.value)}
                        />

                        <textarea
                            placeholder="Address Line 2"
                            className="input-box"
                            maxLength={30}
                            rows={3}
                            value={addLine2}
                            onChange={(e) => setAddLine2(e.target.value)}
                        />

                        <div className="mt-1 mb-5 flex items-center gap-3">
                            <label>City</label>
                            <select
                                className="border-[1.5px] bg-transparent px-1 rounded-lg outline-none"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="">Select City</option>
                                <option value="Jaipur">Jaipur</option>
                                <option value="Jodhpur">Jodhpur</option>
                                <option value="Udaipur">Udaipur</option>
                                <option value="Chittorgarh">Chittorgarh</option>
                                <option value="Jaisalmer">Jaisalmer</option>
                                <option value="Kota">Kota</option>
                                <option value="Kota">Haldwani</option>
                            </select>
                        </div>

                            
                        <input
                        type="text"
                        placeholder="Pincode No."
                        className="input-box"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                        <button type="submit" className="btn-primary">Signup</button>

                        <p className="text-sm text-center mt-4 font-semibold">
                            Already have an account?
                            <Link to="/login" className="text-primary font-semibold pl-1 text-blue-600">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>

            <Footer />
        </div>
    );
};

export default Signup;
