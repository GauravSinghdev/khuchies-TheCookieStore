import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownProf = () => {


  const navigate = useNavigate();

    const f_logout = () => {
        localStorage.clear();
        navigate("/login");
    }

  return (
    <div className="relative inline-block text-left">

      <div className="origin-top-right absolute right-2 mt-9 w-48 px-2 py-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a href="/user-details" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900" role="menuitem">Profile</a>
          <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900" role="menuitem">Settings</a>
          <a onClick={f_logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900 cursor-pointer" role="menuitem">Logout</a>

          
        </div>
      </div>
    </div>
  );
}

export default DropdownProf;
