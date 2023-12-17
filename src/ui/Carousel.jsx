import React, { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import pj1 from "../assets/pj1.png";
import pj2 from "../assets/pj3.png";
import pj3 from "../assets/pj2.png";
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    pj1,
    pj2,
    pj3,
  ];

  const urls = [
    '/posts/64bb8e6527e716e9f0a0ff88',
    '/posts/64ba690dbce625f5555db68c',
    '/posts/64ba686fbce625f5555db688',
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className='prev'><NavigateNextIcon/></button>
        <Link to={urls[currentIndex]}>
          <button className="carousel_btn"></button>
        </Link>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        
      <button onClick={nextSlide} className='next'><NavigateNextIcon/></button>
    </div>
  );
};

export default Carousel;