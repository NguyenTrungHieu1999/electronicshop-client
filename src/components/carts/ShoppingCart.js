import React, { Component } from 'react';
import { ContextApi } from '../../contexts/Context';
import Payment from './Payment';
import CurrencyFormat from 'react-currency-format';

class ShoppingCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    }
  }


  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    console.log("CartItems: ", cartItems);
  }

  render() {
    return (
      <React.Fragment>
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <li style={{ display: 'inline' }}><a href="/">Trang chủ</a></li>
                <li className="active">Giỏ hàng</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="body-content outer-top-xs">
          <div className="container">
            <div className="row ">
              <div className="shopping-cart">
                <div className="shopping-cart-table ">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="cart-description item">Hình ảnh</th>
                          <th className="cart-product-name item">Tên sản phẩm</th>
                          <th className="cart-qty item">Số lượng</th>
                          <th className="cart-sub-total item">Giá</th>
                          <th className="cart-total last-item">Tổng giá</th>
                          <th className="cart-romove item">Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        <ContextApi.Consumer>
                          {({ cartItems, addToCart, removeFromCart, removeItem }) => (
                            cartItems && cartItems.map(item => {
                              return (
                                <React.Fragment key={item.product.id}>
                                  <tr>
                                    <td className="cart-image">
                                      <a className="entry-thumbnail"
                                        href={`/san-pham/${item.product.alias}&${item.product.id}`}>
                                        <img src={item.product.productPhotos[0].url} alt="" />
                                      </a>
                                    </td>
                                    <td className="cart-product-name-info">
                                      <h4 className="cart-product-description">
                                        <a href={`/san-pham/${item.product.alias}&${item.product.id}`}>
                                          {item.product.name}
                                        </a>
                                      </h4>
                                      <div className="row">
                                        <div className="col-sm-12">
                                          (Hiển thị đánh giá)
                                        </div>
                                        <div className="col-sm-12">
                                          <div className="reviews">
                                            (còn {item.product.inventory} sản phẩm)
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="cart-product-quantity">
                                      <div className="quant-input">
                                        <div className="arrows">
                                          <div
                                            onClick={() => addToCart(item.product, 1)}
                                            className="arrow plus gradient">
                                            <span className="ir">
                                              <i className="icon fa fa-sort-asc" />
                                            </span>
                                          </div>
                                          <div
                                            className="arrow minus gradient"
                                            onClick={() => removeFromCart(item.product, 1)}>
                                            <span className="ir">
                                              <i className="icon fa fa-sort-desc" />
                                            </span>
                                          </div>
                                        </div>
                                        <input type="text" value={item.total} />
                                      </div>
                                    </td>
                                    <CurrencyFormat value={item.product.price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <td className="cart-product-sub-total">{value}₫</td>} />
                                    <CurrencyFormat value={item.product.price * item.total} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <td className="cart-product-grand-total">{value}₫</td>} />
                                    <td className="romove-item"><span onClick={() => removeItem(item.product)} title="Xóa" className="icon"><i className="fa fa-trash-o"></i></span></td>
                                  </tr>
                                </React.Fragment>
                              )
                            })
                          )}
                        </ContextApi.Consumer>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={7}>
                            <div className="shopping-cart-btn">
                              <span>
                                <button onClick={() => window.location.href = ('/')} className="btn btn-upper btn-info">Tiếp tục mua hàng</button>&emsp;
                                <ContextApi.Consumer>
                                  {({ cleanCart }) => (
                                    <button
                                      className="btn btn-upper btn-danger pull-right outer-right-xs"
                                      onClick={() => cleanCart()}
                                    >
                                      Xóa toàn bộ giỏ hàng
                                    </button>
                                  )}
                                </ContextApi.Consumer>

                              </span>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                {/* <div className="col-md-4 col-sm-12 estimate-ship-tax">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <span className="estimate-title">Estimate shipping and tax</span>
                          <p>Enter your destination to get shipping and tax.</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-group">
                            <label className="info-title control-label">Country <span>*</span></label>
                            <select className="form-control unicase-form-control selectpicker">
                              <option>--Select options--</option>
                              <option>India</option>
                              <option>SriLanka</option>
                              <option>united kingdom</option>
                              <option>saudi arabia</option>
                              <option>united arab emirates</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="info-title control-label">State/Province <span>*</span></label>
                            <select className="form-control unicase-form-control selectpicker">
                              <option>--Select options--</option>
                              <option>TamilNadu</option>
                              <option>Kerala</option>
                              <option>Andhra Pradesh</option>
                              <option>Karnataka</option>
                              <option>Madhya Pradesh</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="info-title control-label">Zip/Postal Code</label>
                            <input type="text" className="form-control unicase-form-control text-input" placeholder />
                          </div>
                          <div className="pull-right">
                            <button type="submit" className="btn-upper btn btn-primary">GET A QOUTE</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                 */}
                {/* <div className="col-md-4 col-sm-12 cart-shopping-total outer-right-xs">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="cart-sub-total">
                            Subtotal<span className="inner-left-md">$600.00</span>
                          </div>
                          <div className="cart-grand-total">
                            Grand Total<span className="inner-left-md">$600.00</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="cart-checkout-btn pull-right" style={{ textAlign: 'center' }}>
                            <Payment />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShoppingCart;