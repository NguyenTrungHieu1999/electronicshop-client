import React, { Component } from 'react';

class CardItem extends Component {
  render() {

    let { product } = this.props;

    return (
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="item">
          <div className="products">
            <div className="product">
              <div className="product-image">
                <div className="image">
                  {product.productPhotos && product.productPhotos.length > 1
                    ? <a href="a#">
                      <img src={product.productPhotos[0].url} alt="photo1" />
                      <img src={product.productPhotos[1].url} alt="photo2" className="hover-image" />
                    </a>
                    : <a href="a#">
                      <img alt="photo1" />
                      <img alt="photo2" className="hover-image" />
                    </a>
                  }
                </div>
                <div className="tag sale"><span>sale</span></div>
              </div>
              <div className="product-info text-left">
                <h3 className="name"><a href="#a">{product.name}</a></h3>
                <div className="description" />
                <div className="product-price">
                  <span className="price">
                    {product.price} VND
                  </span>
                  <span className="price-before-discount">
                    {product.price} VND
                  </span>
                </div>
              </div>
              <div className="cart clearfix animate-effect">
                <div className="action">
                  <ul className="list-unstyled">
                    <li className="add-cart-button btn-group">
                      <button className="btn btn-primary icon" data-toggle="dropdown" type="button"> <i className="fa fa-shopping-cart" /> </button>
                      <button className="btn btn-primary cart-btn" type="button">Add to cart</button>
                    </li>
                    <li className="lnk wishlist"> <a className="add-to-cart" href="detail.html" title="Wishlist"> <i className="icon fa fa-heart" /> </a> </li>
                    <li className="lnk"> <a className="add-to-cart" href="detail.html" title="Compare"> <i className="fa fa-signal" /> </a> </li>
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