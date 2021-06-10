import React, { Component } from 'react';
import { getProductByCateId, getProductById } from '../../api/productApi';
import parse from 'html-react-parser';
import CurrencyFormat from 'react-currency-format';
import StarRatings from 'react-star-ratings';
import { getCategoryById } from '../../api/categoryApi';
import CardItem from '../homes/CardItem';
import ReactPaginate from 'react-paginate';
import { getReviewByProductId, totalRate } from '../../api/reviewApi';
import createReviewApi from '../../api/createReviewApi';
import Cookies from 'js-cookie';
import Moment from 'moment';
import { ContextApi } from '../../contexts/Context';
import commentApi from '../../api/commentApi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product.css";
import HotDeals from '../partials/leftmenus/HotDeals';
import Testimonials from "../partials/leftmenus/Testimonials";
import { userIdDecode } from '../../services/DecodeService';
import paymentApi from '../../api/paymentApi';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      products: [],
      photos: [],
      cate: [],
      ratingForReview: 0,
      ratingForProduct: 0,
      ratingForUser: 0,
      offset: 0,
      perPage: 5,
      currentPage: 0,
      review: '',
      comment: '',
      allReviews: [],
      allComments: [],
      canReviews: false
    }

    this.changeRating = this.changeRating.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  changeRating(newRating, name) {
    this.setState({
      ratingForReview: newRating
    });
  }

  async receivedData() {
    const id = this.props.match.params.id;
    try {
      const resProduct = await getProductById(id);
      if (resProduct && resProduct.isSuccessed) {
        const resCate = await getCategoryById(resProduct.resultObj.categoryId);
        const resProducts = await getProductByCateId(resCate.resultObj.id);
        const restotalRating = await totalRate(id);
        const resReviewByProduct = await getReviewByProductId(id);
        commentApi
          .getAllCommentByProductId(id)
          .then(res => {
            if (res.data && res.data.isSuccessed) {
              this.setState({
                allComments: res.data.resultObj
              })
            }
          })
        const slice = resProducts.resultObj.slice(this.state.offset, this.state.offset + this.state.perPage);

        let products = slice.map(product => {
          return (
            <React.Fragment key={product.id}>
              <CardItem product={product} classCSS="col-lg-15" />
            </React.Fragment>
          )
        })

        let photos = [];

        for (var i = 0; i < 4; i++) {
          photos.push(resProduct.resultObj?.productPhotos[i].url);
        }

        paymentApi.haveOrder(id)
          .then(res => {
            debugger
            this.setState({
              canReviews: res.data.resultObj
            })
          }).catch(err => console.log(err));
        this.setState({
          product: resProduct.resultObj,
          products: products,
          photos: photos,
          cate: resCate.resultObj,
          pageCount: Math.ceil(resProducts.resultObj.length / this.state.perPage),
          ratingForProduct: restotalRating.resultObj,
          allReviews: resReviewByProduct.resultObj,
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    },
      async () => {
        await this.receivedData()
      }
    );
  };

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    console.log("Value: ", value);
    this.setState({
      [name]: value
    })
  }


  onHandleSubmitReview = (event) => {
    event.preventDefault();
    const isAuth = Cookies.get('isAuth');
    const { ratingForReview, review } = this.state;
    if (review !== '') {
      if (isAuth === false || isAuth === undefined || isAuth === null) {
        alert("Quý khách phải đăng nhập hệ thống để thực hiện đánh giá.");
      } else {
        if (ratingForReview !== 0) {
          createReviewApi
            .createReview({
              productId: this.props.match.params.id,
              rateStar: ratingForReview,
              text: review
            })
            .then(res => {
              if (res.data && res.data.isSuccessed) {
                this.setState({
                  ratingForReview: 0,
                  review: ''
                },
                  async () => {
                    await this.receivedData();
                  }
                );
              }
            })
        } else {
          alert("Quý khách cần chọn số sao đánh giá")
        }
      }
    } else {
      alert("Quý khách vui lòng nhập đánh giá.")
    }
  }

  onHandleSubmitComment = (event) => {
    event.preventDefault();
    const isAuth = Cookies.get('isAuth');
    const { comment } = this.state;
    if (comment !== '') {
      if (isAuth === false || isAuth === undefined || isAuth === null) {
        alert("Quý khách phải đăng nhập hệ thống để thực hiện bình luận.")
      } else {
        commentApi
          .createComment({
            productId: this.props.match.params.id,
            text: comment
          })
          .then(res => {
            if (res.data && res.data.isSuccessed) {
              this.setState({
                comment: ''
              },
                async () => {
                  await this.receivedData();
                }
              )
            }
          })
      }
    } else {
      alert("Quý khách vui lòng nhập bình luận.");
    }
  }

  async componentDidMount() {
    await this.receivedData();
  }

  render() {

    const { product, products, photos, cate, allReviews, allComments, canReviews } = this.state;
    let hasItem = 0;
    let hasCart = 0;
    const settings = {
      customPaging: function (i) {
        return (
          <div className="col-xs-12 col-sm-12 col-md-9 rht-col">
            <div className="detail-block">
              <div className="row">
                <div className="gallery-holder">
                  <div className="product-item-holder size-big single-product-gallery small-gallery">
                    <div className="single-product-gallery-thumbs gallery-thumbs">
                      <div>
                        <div className="item">
                          <a className="horizontal-thumb active">
                            <img className="img-responsive" alt="" src={photos[i]} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };
    return (
      <React.Fragment>
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <li
                  onClick={() => this.props.history.push(`/`)}
                  style={{ display: 'inline', cursor: 'pointer' }} className="active"
                >Trang chủ
                </li>
                <li
                  onClick={() => this.props.history.push(`/${cate.alias}&${cate.id}`)}
                  style={{ display: 'inline', cursor: 'pointer' }} className="active"
                >
                  {cate.name}
                </li>
                <li className="active">{product.name}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="body-content outer-top-xs">
          <div className="container">
            <div className="row single-product">
              <div className="col-xs-12 col-sm-12 col-md-3 sidebar">
                <div className="sidebar-module-container">
                  <div className="home-banner outer-top-n outer-bottom-xs">
                    <img src="/assets/images/banners/LHS-banner.jpg" alt="Image" />
                  </div>
                  <HotDeals />
                  <Testimonials />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-9 rht-col">
                <div className="detail-block">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 gallery-holder">
                      <div
                        className="product-item-holder size-big single-product-gallery small-gallery">
                        <Slider {...settings}>
                          {photos?.map((photo, index) =>
                            <div>
                              <div key={index} className="single-product-gallery-item">
                                <a>
                                  <img className="img-responsive" alt="" src={photo} />
                                </a>
                              </div>
                            </div>
                          )}
                        </Slider>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-8 product-info-block">
                      <div className="product-info">
                        <h1 className="name">{product.name}</h1>
                        <div className="rating-reviews m-t-20">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="pull-left">
                                <div id="rating">
                                  <StarRatings
                                    rating={this.state.ratingForProduct}
                                    starRatedColor="yellow"
                                    starDimension="20px"
                                    starSpacing="5px"
                                    numberOfStars={5}
                                    name='rating'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="stock-container info-container m-t-10">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="pull-left">
                                <div className="stock-box">
                                  <span className="label">Trạng thái :</span>
                                </div>
                              </div>
                              <div className="pull-left">
                                <div className="stock-box">
                                  <span className="value">{product.inventory >= 0 ? `Còn ${product.inventory} sản phẩm` : "Hết hàng"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="description-container m-t-20">
                          <p>{product.description}</p>
                        </div>
                        <div className="price-container info-container m-t-30">
                          <div className="row">
                            <div className="col-sm-6 col-xs-6">
                              <div className="price-box">
                                <CurrencyFormat
                                  value={product.price}
                                  displayType={'text'}
                                  thousandSeparator={true} prefix={''}
                                  renderText={value => <span className="price">{value} VNĐ</span>} />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <div className="favorite-button m-t-5">
                                <ContextApi.Consumer>
                                  {({ addToFavorite, favoriteItems }) => (
                                    favoriteItems.map((item) => {
                                      if (item.id === product.id) {
                                        hasItem = 1;
                                        return (
                                          <a
                                            className="add-to-cart"
                                            style={{ cursor: 'pointer' }}
                                            title="Xóa yêu thích"
                                            data-placement="right"
                                            onClick={() => {
                                              addToFavorite(product);
                                              hasItem = 0;
                                            }}>
                                            <i className="icon fa fa-heart" />
                                          </a>
                                        )
                                      }
                                    })
                                  )}
                                </ContextApi.Consumer>
                                <ContextApi.Consumer>
                                  {({ addToFavorite }) => (
                                    <React.Fragment>
                                      {hasItem === 0 ?
                                        <a
                                          className="btn btn-primary"
                                          style={{ cursor: 'pointer' }}
                                          title="Yêu thích"
                                          data-placement="right"
                                          onClick={() => {
                                            addToFavorite(product)
                                          }}>
                                          <i className="fa fa-heart" />
                                        </a>
                                        : ""
                                      }
                                    </React.Fragment>
                                  )}
                                </ContextApi.Consumer>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="quantity-container info-container">
                          <div className="row">
                            <div className="add-btn">
                              <ContextApi.Consumer>
                                {({ cartItems, addToCart }) => (
                                  <React.Fragment>
                                    {cartItems.length === 0
                                      ? <button
                                        id="addToCart"
                                        className="btn btn-primary"
                                        onClick={() => addToCart(product, 1)}
                                      >
                                        <i className="fa fa-shopping-cart inner-right-vs" />
                                        Thêm giỏ hàng
                                      </button>
                                      : <React.Fragment>
                                        {cartItems.map(item => {
                                          if (item.product.id === product.id) {
                                            hasCart = 1;
                                            return (
                                              <button
                                                id="addToCart"
                                                className="btn btn-info"
                                                disabled={true}
                                              >
                                                <i className="fa fa-shopping-cart inner-right-vs" />
                                                  Đã thêm vào giỏ hàng
                                              </button>
                                            )
                                          }
                                        }
                                        )}
                                        {hasCart === 0 &&
                                          <button
                                            id="addToCart"
                                            className="btn btn-primary"
                                            onClick={() => addToCart(product, 1)}
                                          >
                                            <i className="fa fa-shopping-cart inner-right-vs" />
                                                Thêm giỏ hàng
                                              </button>}
                                      </React.Fragment>
                                    }
                                  </React.Fragment>
                                )}
                              </ContextApi.Consumer>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-tabs inner-bottom-xs">
                    <div className="row">
                      <div className="col-sm-12 col-md-3 col-lg-3">
                        <ul id="product-tabs" className="nav nav-tabs nav-tab-cell">
                          <li className="active"><a data-toggle="tab" href="#description">Cấu
                            hình</a></li>
                          <li><a data-toggle="tab" href="#review">Đánh giá</a></li>
                          <li><a data-toggle="tab" href="#tags">Bình luận</a></li>
                        </ul>
                      </div>
                      <div className="col-sm-12 col-md-9 col-lg-9">
                        <div className="tab-content">
                          <div id="description" className="tab-pane in active">
                            <div className="product-tab">
                              <p className="text">{parse(`${product.specifications}`)}</p>
                            </div>
                          </div>
                          <div id="review" className="tab-pane">
                            <div className="product-tab">
                              <div className="product-reviews">
                                <h4 className="title">Đánh giá của khách hàng</h4>
                                <div className="reviews">
                                  <div className="review">
                                    {allReviews
                                      ?
                                      allReviews.map((userReview) => {
                                        return (
                                          <React.Fragment key={userReview.id}>
                                            <div className="review-title">
                                              <span className="summary">{userReview.userName}</span><span
                                                className="date"><i
                                                  className="fa fa-calendar" /><span>{Moment(userReview.createDate).format('YYYY-MM-DD')}</span></span>
                                            </div>
                                            <div>
                                              <StarRatings
                                                rating={userReview.rateStar}
                                                starRatedColor="yellow"
                                                numberOfStars={5}
                                                starDimension="20px"
                                                starSpacing="5px"
                                                name='rating'
                                              />
                                            </div>
                                            <div
                                              className="text">{userReview.text}</div>
                                            <br />
                                          </React.Fragment>
                                        )
                                      })
                                      : ''
                                    }
                                  </div>
                                </div>
                              </div>
                              {canReviews === true && <div className="product-add-review">
                                <h4 className="title">Viết đánh giá của bạn.</h4>
                                <div className="review-table">
                                  <div className="table-responsive">
                                    <StarRatings
                                      rating={this.state.ratingForReview}
                                      starRatedColor="yellow"
                                      changeRating={this.changeRating}
                                      numberOfStars={5}
                                      name='ratingForReview'
                                    />
                                  </div>
                                </div>
                                <div className="review-form">
                                  <div className="form-container">
                                    <form className="cnt-form"
                                      onSubmit={this.onHandleSubmitReview}>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <label
                                              htmlFor="exampleInputReview">Đánh
                                              giá <span
                                                className="astk">*</span></label>
                                            <textarea
                                              required
                                              className="form-control txt txt-review"
                                              name='review'
                                              rows={4}
                                              value={this.state.review}
                                              onChange={this.onHandleChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="action text-right">
                                        <button type='submit' className="btn btn-primary btn-upper">Gửi</button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              }
                            </div>
                          </div>
                          <div id="tags" className="tab-pane">
                            <div className="product-tab">
                              <div className="product-reviews">
                                <h4 className="title">Bình luận của khách hàng</h4>
                                <div className="reviews">
                                  <div className="review">
                                    {allComments ? allComments.map((userComment) => {
                                      return (
                                        <React.Fragment key={userComment.id}>
                                          <div className="review-title">
                                            <span className="summary">{userComment.userName}</span>
                                            <span className="date"><i
                                              className="fa fa-calendar" />
                                              <span>{Moment(userComment.createDate).format('YYYY-MM-DD')}</span>
                                            </span>
                                          </div>
                                          <div
                                            className="text">{userComment.text}</div>
                                          <br />
                                        </React.Fragment>
                                      )
                                    })
                                      : ''
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="product-add-review">
                                <h4 className="title">Viết bình luận của bạn.</h4>
                                <div className="review-form">
                                  <div className="form-container">
                                    <form className="cnt-form"
                                      onSubmit={this.onHandleSubmitComment}>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <label
                                              htmlFor="exampleInputReview">Bình
                                              luận <span
                                                className="astk">*</span></label>
                                            <textarea
                                              className="form-control txt txt-review"
                                              id="exampleInputReview"
                                              rows={4}
                                              name='comment'
                                              value={this.state.comment}
                                              onChange={this.onHandleChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="action text-right">
                                        <button
                                          className="btn btn-primary btn-upper">Gửi
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className="section featured-product">
                <div className="row">
                  <div className="col-xs-12 col-sm-12">
                    <div className="body-content outer-top-vs" id="top-banner-and-menu">
                      <div className="container">
                        <div className="row">
                          <section className="ProductsByCondition">
                            <h3 className="section-title">Sản phẩm tương tự</h3>
                            <hr />
                            <div className="search-result-container ">
                              <div id="myTabContent"
                                className="tab-content category-list">
                                <div className="tab-pane active " id="grid-container">
                                  <div className="category-product">
                                    <div className="row">
                                      {products}
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Product
