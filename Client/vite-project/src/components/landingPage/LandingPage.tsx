import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchBar from '../searchBar/SearchBar';
import "./LandingPage.modules.css"

const LandingPage: React.FC = () => {
  const carouselImages = [
    { src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/487649976.jpg?k=6f70577988c2044be20cfb76ac48915ba25c055b402754a1a8a1faa26dc605e5&o=&hp=1', link: '' },
    { src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/113623519.jpg?k=71d6000bf94c0d9f576d57e05a9b26f71db6a1bc055ba0a3a8e79b5e1ac56483&o=&hp=1', link: '' },
    { src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/92452049.jpg?k=27ff3a822743c89a7bcfa9e8fd9fa17684a8b5a0d4aaaefd055d421ff20d12bd&o=&hp=1', link: '' },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
  <div className="landing-page">
      <div>
        {/* <Header /> */}
      </div>
      <div className='searchBar-container'>
      <SearchBar />
      </div>

      <div className="carousel-container">
        <Slider {...carouselSettings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <a href={image.link} target="_blank" rel="noopener noreferrer">
                <img src={image.src} alt={`Slide ${index + 1}`} />
              </a>
            </div>
          ))}
        </Slider>
      </div>

      <div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default LandingPage;