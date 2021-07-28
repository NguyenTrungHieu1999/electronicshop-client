import React, { Component } from 'react';
import { getAllCategory, getAllProductType } from '../../api/categoryApi';
import { filterProduct, getAllProduct } from '../../api/productApi';
import Slider1 from '../partials/Slider1';
import LeftMenu from './LeftMenu';
import CardItem from './CardItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productTypes: [],
      products: [],
      cates: [],
      showDatas: [],
      sorted: 0,
      price: 0,
      isShow: false
    }
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  async componentDidMount() {
    const types = await getAllProductType();
    if (types && types.isSuccessed) {
      const products = await getAllProduct();
      const cates = await getAllCategory();
      debugger
      this.setState({
        productTypes: types.resultObj,
        products: this.shuffleArray(products.resultObj),
        cates: cates.resultObj,
        isShow: true
      })
    };
    await this.receivedData();
  }

  async receivedData() {
    let data = [];
    let { productTypes, products, cates } = this.state;
    productTypes.map(type => {
      let cateData = [];
      let productData = [];
      cates.map(cate => {
        if (cate.productTypeId === type.id && cate.rootId !== null) {
          cateData.push(cate);
        }
      });
      products.map(product => {
        cateData.map(cate => {
          if (product.categoryId === cate.id) {
            productData.push(product);
          }
        })
      });
      const postData = productData.map(pd =>
        <CardItem product={pd} key={pd.id} />
      );
      data.push({
        postData: postData,
        typeName: type.name
      });
    });

    this.setState({
      showDatas: data
    });
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    })
  }

  onHandleSubmit = async (event) => {
    event.preventDefault();
    const { sorted, price } = this.state;

    const productData = await filterProduct(sorted, price);
    this.setState({
      products: productData.resultObj
    })

    await this.receivedData();
  }
  render() {
    let { showDatas, isShow } = this.state;
    const settings = {
      dots: true,
      arrows: true,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplaySpeed: 5000,
      autoplay: false,
      speed: 1000,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 4,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false
          }
        },
        {
          breakpoint: 350,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            initialSlide: 1
          }
        }
      ]
    };
    return (
      <div>
        <div className="body-content outer-top-vs" id="top-banner-and-menu">
          <div className="container">
            <div className="row">
              <LeftMenu />
              <div className="col-xs-12 col-sm-12 col-md-9 homebanner-holder">
                <Slider1 />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <section className="section new-arriavls ProductsByCondition">
                  <h3 className="section-title">Thông tin nổi bật</h3>
                </section>
                <div className="wide-banners outer-bottom-xs">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/b1.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/b2.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/b3.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/b4.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
              </div>
              {isShow === false
                ? <h1>Đang tải dữ liệu, vui lòng đợi giây lát</h1>
                : <React.Fragment>
                  {showDatas.length > 0
                    ? <React.Fragment>
                      <section className="section new-arriavls ProductsByCondition">
                        <form onSubmit={this.onHandleSubmit}>
                          <div className="col col-sm-6 col-md-6 no-padding">
                            <div className="lbl-cnt"> <strong style={{ color: 'Highlight' }} className="lbl">Sắp xếp theo: </strong>
                              <div className="fld inline">
                                <div className="dropdown dropdown-small dropdown-med dropdown-white inline">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      name="sorted"
                                      value={this.state.sorted}
                                      onChange={this.onHandleChange}>
                                      <option value={0}>Mặc định</option>
                                      <option value={1}>Giá tăng dần</option>
                                      <option value={2}>Giá giảm dần</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              &emsp;
                              <div className="fld inline">
                                <div className="dropdown dropdown-small dropdown-med dropdown-white inline">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      name="price"
                                      value={this.state.price}
                                      onChange={this.onHandleChange}>
                                      <option value={0}>Mặc định</option>
                                      <option value={1}>Nhỏ hơn 10.000.000đ</option>
                                      <option value={2}>Từ 10.000.000đ đến nhỏ hơn 20.000.000đ</option>
                                      <option value={3}>Từ 20.000.000đ đến nhỏ hơn 40.000.000đ</option>
                                      <option value={4}>Lớn hơn 40.000.000đ</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button type="submit" className="btn-upper btn btn-primary checkout-page-button">Sắp xếp</button>
                        </form>
                      </section>
                      {showDatas.map((data, index) => {
                        return (
                          <React.Fragment key={index}>
                            {data && data.postData.length > 0
                              ? <section className="section new-arriavls">
                                <h3 className="section-title">{data.typeName}</h3>
                                <div className="search-result-container ">
                                  <div id="myTabContent" className="tab-content category-list">
                                    <div className="tab-pane active" >
                                      <div className="category-product">
                                        <div className="row">
                                          <Slider {...settings}>
                                            {data.postData}
                                          </Slider>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section >
                              : ""
                            }
                          </React.Fragment>
                        )
                      })}
                    </React.Fragment>
                    : "Không có sản phẩm"
                  }
                </React.Fragment>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;