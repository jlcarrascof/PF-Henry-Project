import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchBar from '../searchBar/SearchBar';
import Cards from '../cards/Cards';
import { State } from '../../Redux/Reducer/reducer';
import { getFilteredRooms } from '../../Redux/Actions/actions';
import "./LandingPage.modules.css";
import CardsLanding from '../cardsLanding/CardsLanding';

const LandingPage: React.FC = () => {
  const carouselImages = [
    {

      src: "https://static.cozycozy.com/images/catalog/bg2/horizontal-banner-elk.jpg",
      link: "",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/113623519.jpg?k=71d6000bf94c0d9f576d57e05a9b26f71db6a1bc055ba0a3a8e79b5e1ac56483&o=&hp=1",
      link: "",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/375835976.jpg?k=99a88ad6dab6e7ba87115a4e98331ba1eb0353be28ebd8f493228f9d20e24d9a&o=&hp=1",
      link: "",
    },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allRooms = useSelector((state: State) => state.allRooms);

  const onClickSearch = (filters: any) => {
    dispatch(getFilteredRooms(filters)); 


    navigate("/home");
  };

  return (
    <div className="landing-page">
      <div>{/* <Header /> */}</div>
      <div className="searchBar-container">
        <SearchBar onClickSearch={onClickSearch} />
      </div>
      <div className="upperText">
        <h1>Now you don't have to worry about going on holidays</h1>
        <h3>Go for it now!</h3>
      </div>

      <div className="carousel-container">
      <Slider {...carouselSettings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <a
                href={image.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="imagenCarrusel"
                  src={image.src}
                  alt={`Slide ${index + 1}`}
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>
      <div className="imagSlay">
        <div className="archivo">
          <a href='/rooms'>
          <img src="../../../images/archivo.png" />
          </a>
          <span>Discover hotels from all the world</span>
        </div>
        <div className="archivo">
          <a href='/rooms'>
          <img src="../../../images/billetera.png" />
          </a>
          <span>Get the best sales</span>
        </div>
        <div className="archivo">
          <a href='/rooms'>
          <img src="../../../images/hotel.png" />
          </a>
          <span>Compare hotels according to your needs</span>
        </div>

        <div className="archivo">
          <img src="../../../images/metodo-de-pago.png" />
          <span>With the most secure payment method</span>
        </div>
      </div>

      <h2>Some of our best hotels...</h2>
      {/* Renderizar la lista de hoteles */}
      <div className="allCards">

        <CardsLanding allRooms={allRooms} />        
      </div>
    </div>
  );
};

export default LandingPage;
