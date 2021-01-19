import React, { Component } from 'react';
import { getProductByCateId, getProductById } from '../../api/productApi';
import Testimonials from '../partials/leftmenus/Testimonials';
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
      allComments: []
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
              <CardItem product={product} />
            </React.Fragment>
          )
        })

        let photos = resProduct.resultObj.productPhotos.map(photo => {
          return photo.url;
        })

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
        }
        else {
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
      }
      else {
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

    const { product, products, photos, cate, allReviews, allComments } = this.state;
    let hasItem = 0;

    return (
      <React.Fragment>
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <a href="/" className="disable">Trang chủ /</a>
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
                  {/* ============================================== Testimonials============================================== */}
                  <Testimonials />
                  {/* ============================================== Testimonials: END ============================================== */}
                </div>
              </div>{/* /.sidebar */}
              <div className="col-xs-12 col-sm-12 col-md-9 rht-col">
                <div className="detail-block">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 gallery-holder">
                      <div className="product-item-holder size-big single-product-gallery small-gallery">
                        <div id="owl-single-product">
                          <div className="single-product-gallery-item" id="slide1">
                            <a data-lightbox="image-1" data-title="Gallery" href={photos[0]}>
                              <img className="img-responsive" alt="" src="assets/images/blank.gif" data-echo={photos[0]} />
                            </a>
                          </div>
                          <div className="single-product-gallery-item" id="slide2">
                            <a data-lightbox="image-1" data-title="Gallery" href={photos[1]}>
                              <img className="img-responsive" alt="" src="assets/images/blank.gif" data-echo={photos[1]} />
                            </a>
                          </div>
                          <div className="single-product-gallery-item" id="slide3">
                            <a data-lightbox="image-1" data-title="Gallery" href={photos[2]}>
                              <img className="img-responsive" alt="" src="assets/images/blank.gif" data-echo={photos[2]} />
                            </a>
                          </div>
                          <div className="single-product-gallery-item" id="slide4">
                            <a data-lightbox="image-1" data-title="Gallery" href={photos[3]}>
                              <img className="img-responsive" alt="" src="assets/images/blank.gif" data-echo={photos[3]} />
                            </a>
                          </div>
                        </div>
                        <div className="single-product-gallery-thumbs gallery-thumbs">
                          <div id="owl-single-product-thumbnails">
                            <div className="item">
                              <a className="horizontal-thumb active" data-target="#owl-single-product" data-slide={1} href="#slide1">
                                <img className="img-responsive" alt="" src="assets/images/blank.gif" data-echo={photos[0]} />
                              </a>
                            </div>
                            <div className="item">
                              <a className="horizontal-thumb active" data-target="#owl-single-product" data-slide={2} href="#slide2">
                                <img className="img-responsive" alt="" src="assets/images/blank.gif" data-echo={photos[1]} />
                              </a>
                            </div>
                            <div className="item">
                              <a className="horizontal-thumb active" data-target="#owl-single-product" data-slide={3} href="#slide3">
                                <img className="img-responsive" alt="" src="assets/images/blank.gif" data-echo={photos[2]} />
                              </a>
                            </div>
                            <div className="item">
                              <a className="horizontal-thumb active" data-target="#owl-single-product" data-slide={4} href="#slide4">
                                <img className="img-responsive" alt="" src="assets/images/blank.gif" data-echo={photos[3]} />
                              </a>
                            </div>
                          </div>{/* /#owl-single-product-thumbnails */}
                        </div>{/* /.gallery-thumbs */}
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
                                <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="price">{value} VNĐ</span>} />
                                {/* <span className="price">{product.price}</span> */}
                                {/* <span className="price-strike">$900.00</span> */}
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <div className="favorite-button m-t-5">
                                <ContextApi.Consumer>
                                  {({ addToFavorite, favoriteItems }) => (
                                    favoriteItems.map((item, index) => {
                                      if (item.id === product.id) {
                                        hasItem = 1;
                                        return (
                                          <a
                                            className="add-to-cart"
                                            style={{ cursor: 'pointer' }}
                                            title="Xóa yêu thích"
                                            data-placement="right"
                                            onClick={() => { addToFavorite(product); hasItem = 0; }}>
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
                                          onClick={() => { addToFavorite(product) }}>
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
                                {({ addToCart }) => (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart(product, 1)}
                                  >
                                    <i className="fa fa-shopping-cart inner-right-vs" />
                                    Thêm giỏ hàng
                                  </button>
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
                          <li className="active"><a data-toggle="tab" href="#description">Cấu hình</a></li>
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
                                            <div className="review-title"><span className="summary">{userReview.userName}</span><span className="date"><i className="fa fa-calendar" /><span>{Moment(userReview.createDate).format('YYYY-MM-DD')}</span></span></div>
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
                                            <div className="text">{userReview.text}</div>
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
                                    <form className="cnt-form" onSubmit={this.onHandleSubmitReview}>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="exampleInputReview">Đánh giá <span className="astk">*</span></label>
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
                                            <span className="date"><i className="fa fa-calendar" />
                                              <span>{Moment(userComment.createDate).format('YYYY-MM-DD')}</span>
                                            </span>
                                          </div>
                                          <div className="text">{userComment.text}</div>
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
                                    <form className="cnt-form" onSubmit={this.onHandleSubmitComment}>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="exampleInputReview">Bình luận <span className="astk">*</span></label>
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
                                        <button className="btn btn-primary btn-upper">Gửi</button>
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
                {/* ============================================== UPSELL PRODUCTS ============================================== */}
                {/* ============================================== UPSELL PRODUCTS : END ============================================== */}
              </div>
              <section className="section featured-product">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="body-content outer-top-vs" id="top-banner-and-menu">
                      <div className="container">
                        <div className="row">
                          <section className="section new-arriavls ProductsByCondition">
                            <h3 className="section-title">Sản phẩm tương tự</h3>
                            <hr />
                            <div className="search-result-container ">
                              <div id="myTabContent" className="tab-content category-list">
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
      </React.Fragment >
    );
  }
}

export default Product
