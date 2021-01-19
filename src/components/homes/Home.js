import React, { Component } from 'react';
import { getAllProductType } from '../../api/categoryApi';
import Slider from '../partials/Slider';
import LeftMenu from './LeftMenu';
import ProductsByCondition from './ProductsByCondition';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productType: []
    }
  }

  async componentDidMount() {
    try {
      const type = await getAllProductType();

      if (type && type.isSuccessed) {

        this.setState({
          productType: type.resultObj
        })
      }
    } catch (error) {

    }
  }

  render() {

    let { productType } = this.state;

    return (
      <div>
        <div className="body-content outer-top-vs" id="top-banner-and-menu">
          <div className="container">
            <div className="row">
              <LeftMenu />
              <div className="col-xs-12 col-sm-12 col-md-9 homebanner-holder">
                <Slider />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <section className="section new-arriavls ProductsByCondition">
                  <h3 className="section-title">Thương hiệu nổi bật</h3>
                </section>
                <div className="wide-banners outer-bottom-xs">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/home-banner2.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/home-banner2.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/home-banner2.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/home-banner2.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>

              </div>
              {productType.map(type => {
                return (
                  <ProductsByCondition title={type.name} id={type.id} key={type.id} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;