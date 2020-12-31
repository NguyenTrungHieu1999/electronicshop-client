import React, { Component } from 'react';

class Slider extends Component {
  render() {
    return (
      <div id="hero">
        <div id="owl-main" className="owl-carousel owl-inner-nav owl-ui-sm">
          <div className="item" style={{ backgroundImage: 'url(assets/images/sliders/01.jpg)' }}>
            <div className="container-fluid">
              <div className="caption bg-color vertical-center text-left">
                <div className="slider-header fadeInDown-1">Top Brands</div>
                <div className="big-text fadeInDown-1"> New Collections </div>
                <div className="excerpt fadeInDown-2 hidden-xs"> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span> </div>
                <div className="button-holder fadeInDown-3"> <a href="index6c11.html?page=single-product" className="btn-lg btn btn-uppercase btn-primary shop-now-button">Shop Now</a> </div>
              </div>
              {/* /.caption */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.item */}
          <div className="item" style={{ backgroundImage: 'url(assets/images/sliders/02.jpg)' }}>
            <div className="container-fluid">
              <div className="caption bg-color vertical-center text-left">
                <div className="slider-header fadeInDown-1">Spring 2018</div>
                <div className="big-text fadeInDown-1"> Women Fashion </div>
                <div className="excerpt fadeInDown-2 hidden-xs"> <span>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit</span> </div>
                <div className="button-holder fadeInDown-3"> <a href="index6c11.html?page=single-product" className="btn-lg btn btn-uppercase btn-primary shop-now-button">Shop Now</a> </div>
              </div>
              {/* /.caption */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.item */}
        </div>
        {/* /.owl-carousel */}
      </div>
    );
  }
}

export default Slider;