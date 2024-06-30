import React, { useState } from 'react'

const Banner = () => {

    const adder = [ 
        "15% off on your 1st Order(on order of Rs. 1000 or above)",
        "COD available all over Rajasthan!",
        "Enjoy free shipping on order above Rs. 3000",
        "Same-day delivery is available in Chittorgarh for orders placed before 4 PM."
    ];

    const [ crntAdder, setCrntAdder ] = useState(0);

    setTimeout( () => {
        if(crntAdder > 2) 
        {
            setCrntAdder(0);
            return;
        }
        setCrntAdder(crntAdder + 1);
        return;
    } , 4000)

  return (
    <div className='text-center bg-[#bc8d41] text-white px-[350px]'>

        <p className='hover:cursor-pointer py-3'>{adder[crntAdder]}</p>
        
    </div>
  )
}

export default Banner