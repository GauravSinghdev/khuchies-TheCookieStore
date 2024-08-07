import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Cards/Banner';
import axiosInstance from '../../utils/axiosInstance';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const fetchUsers = async () => {

        try {
            const response = await axiosInstance.get("/all-user-details");
            if(response.data.error == true)
            console.log("error is coming!")
            if (response.data && response.data.users) {
                setUsers(response.data.users);
                console.log("hey");
                console.log(response.data.users);
                setLoading(false);
            }
        } catch (error) {
            setError('Failed to fetch users or User is not logged In.');
            setLoading(false);
          }
    }

    const fetchIfAdmin = async () => {

      try{
        const response = await axiosInstance.get("/user-details");
        console.log("yo yo")
        if (response.data && response.data.user)
        {
          if(response.data.user.role != "Admin")
          {
            setError('Failed to fetch users because you are not Admin.');
          }
            
        }
      } catch(error) {
        setError('User not logged In!');
      }
    }

  useEffect(() => {
    fetchUsers();
    fetchIfAdmin();
}, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <Navbar />

      <div className="px-[350px] mt-10">
        <h1 className="text-3xl mb-8 text-center">All Users <span className='text-slate-600'>({users.length})</span></h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 text-2xl text-center mt-10">{error}</p>}
        
        {!loading && !error && users.length === 0 && (
          <p>No users found!</p>
        )}

        {!error && !loading && users.length > 0 && (
          <table className="border-collapse w-full border-4">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">PhoneNo</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">Pincode</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">CreatedOn</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.phoneNo}</td>
                  <td className="border px-4 py-2">{user.city}</td>
                  <td className="border px-4 py-2">{user.pincode}</td>
                  <td className="border px-4 py-2">{`${user.addLine1} ${user.addLine2}`}</td>
                  <td className="border px-4 py-2">{new Date(user.createdOn).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllUsers;
