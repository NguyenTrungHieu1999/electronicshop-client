import React, { Component } from 'react'
import {getNewProducts} from "../../../api/productApi";
import CurrencyFormat from 'react-currency-format';
import StarRatings from 'react-star-ratings';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HotDeals extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      products: []
    }
  }

  async componentDidMount() {
    const resProducts = await getNewProducts();
    try{
      if(resProducts&&resProducts.isSuccessed){
        await this.setState({products: resProducts.resultObj});
      }
    }catch{
      console.log(resProducts.message);
    }
  }

  render() {
    const {products} = this.state;
    const settings = {
      dots: false,
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
        <React.Fragment>
          <div className="sidebar-widget hot-deals outer-bottom-xs">
            <h3 className="section-title">Sản phẩm mới</h3>
            <div className="sidebar-carousel owl-theme outer-top-ss">
              <Slider {...settings}>
            {products&&products.map(product=>

                  <div className="item">
                    <div className="products">
                      <div className="hot-deal-wrapper">
                        <div className="image" style={{ width: "220px", height: "180px" }}>
                          <a href={`/san-pham/${product.alias}&${product.id}`}>
                            <img src={product.productPhotos?product.productPhotos[0].url:""} style={{ width: "100%", height: "60%" }} alt="" />
                            <img src={product.productPhotos?product.productPhotos[1].url:""} style={{ width: "100%", height: "60%" }} alt="" className="hover-image" />
                          </a>
                        </div>
                        <div className="sale-offer-tag"><span>Mới</span></div>
                      </div>
                      <div className="product-info text-left m-t-20">
                        <h3 className="name"><a href={`/san-pham/${product.alias}&${product.id}`}>{product.name}</a></h3>
                        <div className="product-price">
                          <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="price">{value}₫</span>} />
                        </div>
                      </div>
                      <div className="cart clearfix animate-effect">
                        <div className="action">
                          <div className="add-cart-button btn-group">
                            <button className="btn btn-primary icon" data-toggle="dropdown" type="button"> <i className="fa fa-shopping-cart" /> </button>
                            <button className="btn btn-primary cart-btn" type="button">Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            )}
              </Slider>
            </div>
          </div>
        </React.Fragment>
    )
  }
}

export default HotDeals;
