import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Testimonials extends Component {
  render() {
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
    };

    return (
        <React.Fragment>
          <Slider {...settings}>
            <div className="item">
              <div className="avatar"><img style={{margin:'30%', marginBottom: '5%', marginTop:'5%'}} src="/assets/images/testimonials/member1.png" alt="" /></div>
              <div className="testimonials"><em>"</em> Vtae sodales aliq uam morbi non sem lacus port mollis. Nunc condime tum metus eud molest sed consectetuer. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat.<em>"</em></div>
              <div className="clients_author">John Doe <span>Abc Company</span> </div>
            </div>
            <div className="item">
              <div className="avatar"><img style={{margin:'30%', marginBottom: '5%', marginTop:'5%'}} src="/assets/images/testimonials/member3.png" alt="" /></div>
              <div className="testimonials"><em>"</em> Vtae sodales aliq uam morbi non sem lacus port mollis. Nunc condime tum metus eud molest sed consectetuer. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat.<em>"</em></div>
              <div className="clients_author">John Doe <span>Abc Company</span> </div>
            </div>
          </Slider>
        </React.Fragment>
    );
  }
}

export default Testimonials;