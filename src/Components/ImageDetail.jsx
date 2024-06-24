import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { images } from "../Data/DataServices.tsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';

import { Container } from "react-bootstrap";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [scale, setScale] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    afterChange: (index) => setCurrentIndex(index),
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    sliderRef.current.slickGoTo(index);
  };

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };

  const handleWheel = (e) => {
    if (zoomed) {
      e.stopPropagation();
      if (e.deltaY > 0) {
        // zoom out
        setScale(scale - 0.1);
      } else {
        // zoom in
        setScale(scale + 0.1);
      }
    }
  };

  return (
    <Container fluid className="Container" style={{ backgroundColor: "#242424" }}>
      <div className='row'>
        <div className='col-md-12' style={{ backgroundColor: "#242424", paddingLeft: "30px", paddingRight: "30px" }}>

          <div className="image-slider-container">
            <Slider
              ref={sliderRef}
              {...settings}
              onWheel={handleWheel} // تحديد حدث التمرير للسلايدر
            >
              {images.map((image) => (
                <div key={image.id} className="image-slide">
                  <div className="image-buttons">
                    <div
                      className={`image-container ${zoomed ? 'zoomed-in' : ''}`}
                      style={{ transform: `scale(${scale})` }}
                      onClick={toggleZoom}
                    >
                      <img src={image.src} alt={image.alt} />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <div className="image-thumbnails-container">
              <div className="image-thumbnails">
                {images.map((image, index) => (
                  <div key={index} className="thumbnail-container">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={index === currentIndex ? 'thumbnail active' : 'thumbnail'}
                      onClick={() => handleThumbnailClick(index)}
/>
                    <div className="overlay-text">{image.id}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default ImageSlider;