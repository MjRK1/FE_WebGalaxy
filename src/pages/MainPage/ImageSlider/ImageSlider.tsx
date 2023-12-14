import React, { useState } from 'react';

export const ImageSlider = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider">
      <button onClick={goToPrevSlide}>&lt;</button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="slider-image"
      />
      <button onClick={goToNextSlide}>&gt;</button>
    </div>
  );
};
