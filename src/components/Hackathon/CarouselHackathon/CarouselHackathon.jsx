import React, { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselHackathon.scss';
import '../carousel.scss';

export default function CarouselHackathon() {
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev-arrow" onClick={onClick}>
        <div className="arrow-icon"></div>
      </div>
    );
  };
  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next-arrow" onClick={onClick}>
        <div className="arrow-icon"></div>
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow/>,
    prevArrow: <CustomPrevArrow/>,
    autoplay: true,
    autoplaySpeed: 4000,
  };
    return (
      <>
        <div className="cardHackathon">
          <div className="slider" >
            <Slider {...settings}>
                <div>
                    <img className="photosCarouselHackathon" src={require("../../../images/photoCarouselHackathon/photoCarousel1.png")} alt="extia image"/>
                </div>
                <div>
                    <img className="photosCarouselHackathon" src={require("../../../images/photoCarouselHackathon/photoCarousel2.png")} alt="extia image"/>
                </div>
                <div>
                    <img className="photosCarouselHackathon" src={require("../../../images/photoCarouselHackathon/photoCarousel3.png")} alt="extia image"/>
                </div>
                <div>
                    <img className="photosCarouselHackathon" src={require("../../../images/photoCarouselHackathon/photoCarousel4.png")} alt="extia image"/>
                </div>
                <div>
                    <img className="photosCarouselHackathon" src={require("../../../images/photoCarouselHackathon/photoCarousel5.png")} alt="extia image"/>
                </div>
            </Slider>
          </div>
        </div>
      </>
    );
}
