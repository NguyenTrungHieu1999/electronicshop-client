import React, { Component } from 'react';
import "./CardItem.css";
import CurrencyFormat from 'react-currency-format';
class CardItem extends Component {
  render() {

    const { product } = this.props;

    return (
      <div className="col-lg-15">
        <div className="item">
          <div className="products">
            <div className="product">
              <div className="product-image" style={{ marginBottom: "-30%" }}>
                <div className="image">
                  {product.productPhotos && product.productPhotos.length > 1
                    ? <a href={`/san-pham/${product.alias}&${product.id}`}>
                      <img src={product.productPhotos[0].url} style={{ width: "100%", height: "60%" }} alt="photo1" />
                      <img src={product.productPhotos[1].url} style={{ width: "100%", height: "60%" }} alt="photo2" className="hover-image" />
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
                <h3 className="name"><a style={{ color: 'steelblue' }} href={`/san-pham/${product.alias}&${product.id}`}>{product.name}</a></h3>
                <div className="description" />
                <div className="product-price">
                  <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span style={{ color: 'red' }} className="price">{value}₫</span>} />
                  <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="price-before-discount">{value}₫</span>} />
                </div>
              </div>
              <div className="cart clearfix animate-effect">
                <div className="action">
                  <ul className="list-unstyled">
                    <li className="lnk"> <a className="add-to-cart" href="detail.html" title="Thêm giỏ hàng"> <i className="fa fa-shopping-cart" /></a></li>
                    <li className="lnk wishlist"> <a className="add-to-cart" href="" title="Yêu thích"> <i className="icon fa fa-heart" /> </a> </li>
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