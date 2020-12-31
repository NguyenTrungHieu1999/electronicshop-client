import React, { Component } from 'react';
import Slider from '../partials/Slider';
import LeftMenu from './LeftMenu';
import ProductsByCondition from './ProductsByCondition';

class Home extends Component {

  render() {

    let condition = ["Hot Products", "New Products", "Test Products"];

    return (
      <div>
        <div className="body-content outer-top-vs" id="top-banner-and-menu">
          <div className="container">
            <div className="row">
              <LeftMenu />
              <div className="col-xs-12 col-sm-12 col-md-9 homebanner-holder">
                <Slider />
                <ProductsByCondition title={condition[0]} condition={0} />
                <div className="wide-banners outer-bottom-xs">
                  <div className="row">
                    <div className="col-md-4 col-sm-4">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner1.jpg" alt="" /> </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner3.jpg" alt="" /> </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner2.jpg" alt="" /> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ProductsByCondition title={condition[1]} condition={0} />
                <div className="wide-banners outer-bottom-xs">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="wide-banner1 cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner.jpg" alt="" /> </div>
                        <div className="strip strip-text">
                          <div className="strip-inner">
                            <h2 className="text-right">Amazing Sunglasses<br />
                              <span className="shopping-needs">Get 40% off on selected items</span></h2>
                          </div>
                        </div>
                        <div className="new-label">
                          <div className="text">NEW</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner4.jpg" alt="" /> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ProductsByCondition title={condition[2]} condition={0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;