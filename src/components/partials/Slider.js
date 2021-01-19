import React, { Component } from 'react';

class Slider extends Component {
  render() {
    return (
      <div id="hero">
        <div id="owl-main" className="owl-carousel owl-inner-nav owl-ui-sm">
          <div className="item" style={{ backgroundImage: 'url(/assets/images/sliders/01.jpg)' }}>
            {/* /.container-fluid */}
          </div>
          {/* /.item */}
          <div className="item" style={{ backgroundImage: 'url(/assets/images/sliders/02.jpg)' }}>
            {/* /.container-fluid */}
          </div>
          <div className="item" style={{ backgroundImage: 'url(/assets/images/sliders/03.jpg)' }}>
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