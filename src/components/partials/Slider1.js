import React, {Component} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slider1() {
  const settings = {
    dots: true,
    fade: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplaySpeed: 3000,
    autoplay: true,
    className: 'slides',
  };
  return (
    <Slider {...settings}>
      <div>
        <img src="/assets/images/sliders/01.jpg">
        </img>
      </div>
      <div>
        <img src="/assets/images/sliders/02.jpg">
        </img>
      </div>
      <div>
        <img src="/assets/images/sliders/03.jpg">
        </img>
      </div>
    </Slider>
  );
}