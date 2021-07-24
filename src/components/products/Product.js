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
import paymentApi from '../../api/paymentApi';
import { validateString } from '../account/ValidationForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comment from './Comment';

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
      offset: 0,
      perPage: 5,
      currentPage: 0,
      offsetForCmt: 0,
      perPageForCmt: 5,
      currentPageForCmt: 0,
      offsetForReview: 0,
      perPageForReview: 5,
      currentPageForReview: 0,
      review: '',
      comment: '',
      reviewValid: '',
      commentValid: '',
      allReviews: [],
      allComments: [],
      listCmt: [],
      canReviews: false,
    }

    this.addComment = React.createRef();
    this.changeRating = this.changeRating.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePageClickForCmt = this.handlePageClickForCmt.bind(this);
    this.handlePageClickForReview = this.handlePageClickForReview.bind(this);
  }

  changeRating(newRating, name) {
    this.setState({
      ratingForReview: newRating
    });
  }

  replyComment = (userName, id) => {
    this.addComment.current.focus();
    document.getElementById("AddCmt").placeholder = "@" + userName + " ";
    this.setState({
      parentId: id
    })
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
        const sliceForReview = resReviewByProduct.resultObj.slice(this.state.offsetForReview, this.state.offsetForReview + this.state.perPageForReview);
        commentApi
          .getAllCommentByProductId(id)
          .then(res => {
            if (res.data && res.data.isSuccessed) {
              const sliceForCmt = res.data.resultObj.slice(this.state.offsetForCmt, this.state.offsetForCmt + this.state.perPageForCmt);
              const cmts = sliceForCmt.map(comment => {
                return (
                  <div className="comment-box">
                    <Comment onReplyComment={this.replyComment} key={comment.id} comment={comment} />
                  </div>
                )
              })
              this.setState({
                allComments: cmts,
                listCmt: res.data.resultObj,
                pageCountForCmt: Math.ceil(res.data.resultObj.length / this.state.perPageForCmt),
              })
            }
          })
        const slice = resProducts.resultObj.slice(this.state.offset, this.state.offset + this.state.perPage);

        let products = slice.map(product => {
          if (product.id !== this.props.match.params.id) {
            return (
              <React.Fragment key={product.id}>
                <CardItem product={product} classCSS="col-lg-15" />
              </React.Fragment>
            )
          }
        })

        let photos = [];

        for (var i = 0; i < 4; i++) {
          photos.push(resProduct.resultObj?.productPhotos[i].url);
        }

        paymentApi.haveOrder(id)
          .then(res => {
            this.setState({
              canReviews: res.data.resultObj
            })
          }).catch(err => console.log(err));
        let rv = sliceForReview.map(r => {
          return (
            <React.Fragment key={r.id}>
              <div className="review-title">
                <span className="summary">{r.userName}</span>
                <span className="date"><i className="fa fa-calendar" />
                  <span>{Moment(r.createDate).format('DD/MM/yyyy hh:mm:ss')}</span>
                </span>
              </div>
              <div>
                <StarRatings
                  rating={r.rateStar}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="5px"
                  name='rating'
                />
              </div>
              <div
                className="text">{r.text}</div>
              <br />
            </React.Fragment>
          )
        });
        this.setState({
          product: resProduct.resultObj,
          products: products,
          photos: photos,
          cate: resCate.resultObj,
          pageCount: Math.ceil(resProducts.resultObj.length / this.state.perPage),
          ratingForProduct: restotalRating.resultObj,
          allReviews: resReviewByProduct.resultObj,
          listReview: rv,
          pageCountForReview: Math.ceil(resReviewByProduct.resultObj.length / this.state.perPageForReview),
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

  handlePageClickForCmt = (e) => {
    const selectedPage = e.selected;
    const offsetForCmt = selectedPage * this.state.perPageForCmt;

    this.setState({
      currentPageForCmt: selectedPage,
      offsetForCmt: offsetForCmt
    },
      async () => {
        await this.receivedData()
      }
    );
  };

  handlePageClickForReview = (e) => {
    const selectedPage = e.selected;
    const offsetForReview = selectedPage * this.state.perPageForReview;

    this.setState({
      currentPageForReview: selectedPage,
      offsetForReview: offsetForReview
    },
      async () => {
        await this.receivedData()
      }
    );
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
    if (name === "comment") {
      this.setState({ commentValid: validateString(value) });
    } else if (name === "review") {
      this.setState({ reviewValid: validateString(value) });
    }
  }


  onHandleSubmitReview = (event) => {
    event.preventDefault();
    const isAuth = Cookies.get('isAuth');
    const { ratingForReview, review, reviewValid } = this.state;
    debugger;
    if (review !== '') {
      if (isAuth === false || isAuth === undefined || isAuth === null) {
        toast.warn('Quý khách phải đăng nhập hệ thống để thực hiện đánh giá.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (ratingForReview !== 0 && reviewValid === "") {
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
          toast.warn('Quý khách cần chọn số sao đánh giá', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else {
      toast.warn('Quý khách vui lòng nhập đánh giá.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  onHandleSubmitComment = (event) => {
    event.preventDefault();
    const isAuth = Cookies.get('isAuth');
    const { comment, commentValid, parentId } = this.state;
    if (comment !== '') {
      if (isAuth === false || isAuth === undefined || isAuth === null) {
        toast.warn('Quý khách phải đăng nhập hệ thống để thực hiện bình luận.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (commentValid === "") {
          commentApi
            .createComment({
              productId: this.props.match.params.id,
              text: comment,
              parentId: parentId
            })
            .then(res => {
              if (res.data && res.data.isSuccessed) {
                document.getElementById("AddCmt").placeholder = "Thêm bình luận";
                this.setState({
                  comment: '',
                  parentId: null
                },
                  async () => {
                    await this.receivedData();
                  }
                )
              }
            })
        }
      }
    } else {
      toast.warn('Quý khách vui lòng nhập bình luận.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async componentDidMount() {
    await this.receivedData();
  }

  render() {
    document.title = "Chi tiết sản phẩm";
    const { product, products, photos, cate, allReviews, allComments, canReviews, commentValid, reviewValid, listCmt, listReview } = this.state;
    let hasItem = 0;
    let hasCart = 0;
    const settings = {
      customPaging: function (i) {
        return (
          <div key={i} className="col-xs-12 col-sm-12 col-md-9 rht-col">
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
        <ToastContainer />
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <li
                  onClick={() => window.location.href = (`/`)}
                  style={{ display: 'inline', cursor: 'pointer' }} className="active"
                >Trang chủ
                </li>
                <li
                  onClick={() => window.location.href = (`/${cate.alias}&${cate.id}`)}
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
                  {/* <Testimonials /> */}
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
                            <div key={index}>
                              <div className="single-product-gallery-item">
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
                                  <br />
                                  {allReviews.length > 0
                                    ? <i >{this.state.ratingForProduct} sao / {allReviews.length} đánh giá</i>
                                    : <i >Chưa có đánh giá </i>
                                  }
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
                                  <span className="value">{product.inventory > 0 ? <i style={{color: 'blue'}}> Còn {product.inventory} sản phẩm </i> : "Hết hàng"}</span>
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
                                            key={item.id}
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
                              {product && product.inventory <= 0
                                ? <button
                                  id="addToCart"
                                  className="btn btn-secondary"
                                >
                                  Đã hết hàng
                                </button>
                                :
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
                                                  key={item.id}
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
                              }
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
                          {/* <li><a data-toggle="tab" href="#tags">Bình luận</a></li> */}
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
                                {allReviews.length > 0 ?
                                  <div className="reviews">
                                    <div className="review">
                                      {listReview}
                                      <div style={{ display: 'flex' }}>
                                        <ReactPaginate
                                          previousLabel={"<"}
                                          nextLabel={">"}
                                          breakLabel={"..."}
                                          breakClassName={"break-me"}
                                          pageCount={this.state.pageCountForReview}
                                          marginPagesDisplayed={5}
                                          pageRangeDisplayed={1}
                                          onPageChange={this.handlePageClickForReview}
                                          containerClassName={"pagination"}
                                          subContainerClassName={"pages pagination"}
                                          activeClassName={"active"} />
                                      </div>
                                    </div>
                                  </div>
                                  : <h5>Chưa có đánh giá</h5>
                                }

                              </div>
                              {canReviews === true &&
                                <div className="product-add-review">
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
                                              {reviewValid !== '' && <label className="alert-danger">{reviewValid}</label>}
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
                            <h3 className="section-title">Bình luận của khách hàng</h3>
                            <hr />
                            <div className="row">
                              <div className="col-12">
                                <div className="comments">
                                  <div className="comments-details">
                                    <span className="total-comments comments-sort">{listCmt.length} bình luận</span>
                                    <span className="dropdown">
                                    </span>
                                  </div>
                                  <div className="comment-box add-comment">
                                    <span className="commenter-pic">
                                      <img className="img-fluid" />
                                    </span>
                                    <span className="commenter-name">
                                      <form onSubmit={this.onHandleSubmitComment}>
                                        <input
                                          type="text"
                                          ref={this.addComment}
                                          id="AddCmt"
                                          placeholder="Thêm bình luận"
                                          name='comment'
                                          value={this.state.comment}
                                          onChange={this.onHandleChange}
                                        />
                                        {commentValid !== '' && <label className="alert-danger">{commentValid}</label>}
                                        <button type="submit" className="btn btn-default">Bình luận</button>
                                      </form>
                                    </span>
                                  </div>
                                  {allComments}
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      {listCmt.length > 0 && <div style={{ display: 'flex' }}>
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={">"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={this.state.pageCountForCmt}
                          marginPagesDisplayed={5}
                          pageRangeDisplayed={1}
                          onPageChange={this.handlePageClickForCmt}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"} />
                      </div>}
                    </div>
                  </div>
                </div>
              </section>
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
                                      {products.length > 0 ? products : "Không có sản phẩm nào"}
                                    </div>
                                  </div>
                                </div>
                                {products.length > 0
                                  && <div style={{ display: 'flex' }}>
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
                                  </div>}
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
