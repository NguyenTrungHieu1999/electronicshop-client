import React, { Component } from 'react';
import "./CardItem.css";
import CurrencyFormat from 'react-currency-format';
import { ContextApi } from '../../contexts/Context';
import StarRatings from 'react-star-ratings';
import { totalRate } from '../../api/reviewApi';

class CardItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    }
  }

  async componentDidMount() {
    const restotalRating = await totalRate(this.props.product.id);
    this.setState({
      rating: restotalRating.resultObj
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.product !== this.props.product || prevState.rating !== this.state.rating){
      const restotalRating = await totalRate(this.props.product.id);
      this.setState({
        rating: restotalRating.resultObj
      })
    }
  }

  render() {
    const { product, classCSS } = this.props;

    return (
      <div className={classCSS}>
        <div className="item">
          <div className="products">
            <div className="product">
              <div className="product-image" style={{ marginBottom: "-30%" }}>
                <div className="image">
                  {product.productPhotos && product.productPhotos.length > 1
                    ? <a href={`/san-pham/${product.alias}&${product.id}`}>
                      <img src={product.productPhotos[0].url}
                        style={{ width: "100%", height: "60%" }} alt="photo1" />
                      <img src={product.productPhotos[1].url}
                        style={{ width: "100%", height: "60%" }} alt="photo2"
                        className="hover-image" />
                    </a>
                    : <a href={`/san-pham/${product.alias}&${product.id}`}>
                      <img alt="photo1" />
                      <img alt="photo2" className="hover-image" />
                    </a>
                  }
                </div>
                {
                  product.status === '2' && <div className="tag sale"><span>Giảm giá</span></div>
                }
                {
                  product.status === '1' && <div className="tag new"><span>Mới</span></div>
                }
              </div>
              <div className="product-info text-left">
                <h3 className="name">
                  <a style={{ color: 'steelblue' }} href={`/san-pham/${product.alias}&${product.id}`}>
                    <p style={
                      {
                        display: '-webkit-box',
                        height: '2.6em',
                        lineHeight: '1.3em',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.name}
                    </p>
                  </a>
                </h3>
                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="5px"
                  name='rating'
                />
                <div className="description" />
                <div className="product-price">
                  <CurrencyFormat
                    value={product.price}
                    displayType={'text'}
                    thousandSeparator={true} prefix={''}
                    renderText={value =>
                      <span
                        style={{ color: 'red' }}
                        className="price">{value}₫
                      </span>}
                  />
                </div>
              </div>
              <div className="cart clearfix animate-effect">
                <div className="action">
                  <ul className="list-unstyled">
                    <ContextApi.Consumer>
                      {({ addToCart, addToFavorite }) => (
                        <React.Fragment>
                          <li style={{ cursor: 'pointer' }} className="lnk"
                            onClick={() => addToCart(product, 1)}>
                            <a
                              className="add-to-cart"
                              title="Thêm giỏ hàng"
                            >
                              <i className="fa fa-shopping-cart" />
                            </a>
                          </li>
                          <li
                            style={{ cursor: 'pointer' }}
                            className="lnk wishlist"
                            onClick={() => {
                              addToFavorite(product)
                            }}
                          >
                            <a className="add-to-cart" title="Yêu thích">
                              <i className="icon fa fa-heart" />
                            </a>
                          </li>
                        </React.Fragment>

                      )}
                    </ContextApi.Consumer>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardItem;