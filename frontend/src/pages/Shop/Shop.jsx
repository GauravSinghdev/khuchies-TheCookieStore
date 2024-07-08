import React, { useState } from 'react';
import Banner from '../../components/Cards/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const initialItems = [
  {
    image: "https://cdn.pixabay.com/photo/2020/11/03/23/55/cookies-5711139_640.jpg",
    item_name: "Heart Cookies (250 gms)",
    SP: "₹60.00",
    MRP: "₹75.00",
    disc: "20% OFF",
    tItem: 0
  },
  {
    image: "https://cdn.pixabay.com/photo/2024/02/24/15/46/ai-generated-8594272_640.jpg",
    item_name: "Thick Milk Shake (1L)",
    SP: "₹140.00",
    MRP: "₹200.00",
    disc: "20% OFF",
    tItem: 0
  },
  {
    image: "https://cdn.pixabay.com/photo/2023/02/12/11/41/biscuit-7784888_640.jpg",
    item_name: "Baked Cookies-1 (250 gms)",
    SP: "₹399.00",
    MRP: "₹499.00",
    disc: "20% OFF",
    tItem: 0
  },
  {
    image: "https://cdn.pixabay.com/photo/2020/10/30/16/33/cookies-5699047_640.jpg",
    item_name: "Baked Cookies-2 (250 gms)",
    SP: "₹399.00",
    MRP: "₹499.00",
    disc: "20% OFF",
    tItem: 0
  },
  {
    image: "https://cdn.pixabay.com/photo/2021/10/28/18/00/christmas-6750220_640.jpg",
    item_name: "Christmas Cookies (250 gms)",
    SP: "₹399.00",
    MRP: "₹499.00",
    disc: "20% OFF",
    tItem: 0
  },
  {
    image: "https://cdn.pixabay.com/photo/2021/12/16/10/53/coffee-6874347_640.png",
    item_name: "Baked Cookies (250 gms)",
    SP: "₹399.00",
    MRP: "₹499.00",
    disc: "20% OFF",
    tItem: 0
  },
  {
    image: "https://cdn.pixabay.com/photo/2012/03/01/15/40/cookies-20414_640.jpg",
    item_name: "Palmiers Cookies (250 gms)",
    SP: "₹399.00",
    MRP: "₹499.00",
    disc: "20% OFF",
    tItem: 0
  },
  {
    image: "https://cdn.pixabay.com/photo/2024/01/25/11/10/fortune-cookie-8531636_640.jpg",
    item_name: "Fortune Cookie (250 gms)",
    SP: "₹399.00",
    MRP: "₹499.00",
    disc: "20% OFF",
    tItem: 0
  },
];

const Shop = () => {
  const [items, setItems] = useState(initialItems);

  const handleAddClick = (index) => {
    const newItems = [...items];
    newItems[index].tItem = 1; // Initialize the count to 1
    setItems(newItems);
  };

  const handleIncrement = (index) => {
    const newItems = [...items];
    newItems[index].tItem += 1;
    setItems(newItems);
  };

  const handleDecrement = (index) => {
    const newItems = [...items];
    if (newItems[index].tItem > 0) {
      newItems[index].tItem -= 1;
    }
    setItems(newItems);
  };

  let totalCart = 0;
  initialItems.map((ele) => {
    totalCart += ele.tItem;
  })

  console.log(totalCart);
  return (

    <div>
      <Banner />
      <Navbar totalCart={totalCart} />

      <div className='px-[350px]'>

        <h1 className='my-10 text-[20px]'>Cookies</h1>

        <div className='grid grid-cols-12 gap-3 my-10'>
          {items.map((item, index) => (
            <div key={index} className="shadow-lg bg-white col-span-3">
              <img src={item.image} alt="item-pic" className='h-[250px] w-full object-cover cursor-pointer' />

              <div className='px-4 pt-4'>
                <p>{item.item_name}</p>

                <div className='flex gap-2 pt-5'>
                  <div>{item.SP}</div>
                  <div className='line-through text-[14px]'>{item.MRP}</div>
                  <div className='text-[#02743c] bg-[#e5f6ef] rounded-[10px] px-1 mt-[-5px] mb-5 text-[14px]'>{item.disc}</div>
                </div>
                {
                  item.tItem === 0 ? (
                    <button
                      className='border-2 w-full rounded-[20px] p-1 mb-3 text-[15px] hover:border-gray-400 shadow text-[#cfa25a]'
                      onClick={() => handleAddClick(index)}
                    >
                      Add me
                    </button>
                  ) : (
                    <div className='text-center flex justify-center items-center gap-2'>
                      <button
                        className='text-[20px] px-3 my-1 mx-1 rounded border-2 active:bg-red-300'
                        onClick={() => handleDecrement(index)}
                      >
                        -
                      </button>
                      <h1 className='items-center'>{item.tItem}</h1>
                      <button
                        className='text-[20px] px-3 my-1 mx-1 rounded border-2 active:bg-green-300'
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
