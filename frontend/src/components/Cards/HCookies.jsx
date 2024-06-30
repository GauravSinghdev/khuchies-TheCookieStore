import React, { useState, useEffect } from 'react';

const images = [
    
    { src: "https://cdn.pixabay.com/photo/2022/09/22/12/00/christmas-7472281_1280.jpg", title: "Star Cookies" },
    { src: "https://cdn.pixabay.com/photo/2020/11/24/20/19/cookies-5773812_1280.jpg", title: "Candies" },
    { src: "https://cdn.pixabay.com/photo/2014/11/27/14/35/cookies-547636_1280.jpg", title: "Customized Cookies" },
    { src: "https://cdn.pixabay.com/photo/2018/03/11/09/08/cookie-3216243_640.jpg", title: "Cookies Biscuits" },
    { src: "https://cdn.pixabay.com/photo/2020/12/06/15/52/cookies-5809181_640.jpg", title: "Cookies Plate" },
];

const HCookies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[670px] overflow-hidden">
      <div 
        className="flex transition-transform duration-500 "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="w-full"
            style={{ minWidth: "100%" }}
          >
            <img 
              src={image.src} 
              alt={image.title} 
              className="w-100% h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button 
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HCookies;