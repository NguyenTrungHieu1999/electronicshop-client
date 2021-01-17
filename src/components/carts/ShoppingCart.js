import React, { Component } from 'react';
import { ContextApi } from '../../contexts/Context';
import CurrencyFormat from 'react-currency-format';
import Payment from './Payment';
import { validatePhoneNumber, validateUserName } from '../account/ValidationForm';
import paymentApi from '../../api/paymentApi';

class ShoppingCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      receiver: '',
      receiversAddress: '',
      phoneNumber: '',
      receiverValid: '',
      receiversAddressValid: '',
      phoneNumberValid: ''
    }
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    });

    if (name === 'receiver') {
      this.setState({ receiverValid: validateUserName(value) });
    } else if (name === 'receiversAddress') {
      this.setState({ receiversAddressValid: validateUserName(value) });
    } else if (name === 'phoneNumber') {
      this.setState({ phoneNumberValid: validatePhoneNumber(value) });
    }
  }

  onHandleClick = (event) => {
    event.preventDefault();
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const totalPrice = localStorage.getItem('totalPrice');
    const { receiver, receiversAddress, phoneNumber } = this.state;
    let orderDetailModel = [];
    if (cartItems && cartItems.length) {
      cartItems.map(item => {
        orderDetailModel.push({
          productId: item.product.id,
          quantity: item.total,
          price: item.product.price
        })
      })
    }
    if (receiver === '' || receiversAddress === '' || phoneNumber === '') {
      alert("Quý khách vui lòng điền đầy đủ thông tin.");
    }
    else {
      paymentApi
        .checkout({ paid: false, receiver: receiver, receiversAddress: receiversAddress, phoneNumber: phoneNumber, totalMoney: totalPrice, orderDetails: orderDetailModel })
        .then(res => {
          if (res.data.isSuccessed) {
            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalPrice');
            alert(res.data.resultObj);
            window.location.href = ('/');
          }
        })
        .catch(error => console.log(error));
    }
  }
  render() {
    const { receiver, receiversAddress, phoneNumber, receiverValid, receiversAddressValid, phoneNumberValid } = this.state;
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
                                      className="btn btn-upper btn-danger pull-right"
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
                <div className="body-content">
                  <div className="container">
                    <div className="sign-in-page">
                      <div className="row">
                        <div className="col-md-6 col-sm-6 sign-in">
                          <h4>Thêm địa chỉ giao hàng</h4>
                          <p>Xin chào, Chào mừng quý khách đến với Electronic Shop.</p>
                          <form className="register-form outer-top-xs">
                            <div className="form-group">
                              <label className="info-title" htmlFor="Address">Địa chỉ<span>*</span></label>
                              <input
                                required
                                type="text"
                                className="form-control unicase-form-control text-input"
                                id="Address"
                                name="receiversAddress"
                                value={this.state.receiversAddress}
                                onChange={this.onHandleChange}
                              />
                              {receiversAddressValid !== '' ? <label className="alert-danger">{receiversAddressValid}</label> : null}
                            </div>

                            <div className="form-group">
                              <label className="info-title" htmlFor="Receiver">Người nhận <span>*</span></label>
                              <input
                                required
                                type="text"
                                className="form-control unicase-form-control text-input"
                                id="Receiver"
                                name="receiver"
                                value={this.state.receiver}
                                onChange={this.onHandleChange}
                              />
                              {receiverValid !== '' ? <label className="alert-danger">{receiverValid}</label> : null}
                            </div>
                            <div className="form-group">
                              <label className="info-title" htmlFor="PhoneNumber">Số điện thoại <span>*</span></label>
                              <input
                                type="tel"
                                className="form-control unicase-form-control text-input"
                                id="PhoneNumber"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.onHandleChange}
                              />
                              {phoneNumberValid !== '' ? <label className="alert-danger">{phoneNumberValid}</label> : null}
                            </div>
                          </form>
                        </div>
                        <div className="col-md-6 col-sm-12 cart-shopping-total">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>
                                  <ContextApi.Consumer>
                                    {({ totalPrice }) => (
                                      <div className="cart-sub-total" style={{ textAlign: 'center' }}>
                                        Tổng tiền
                                        <CurrencyFormat value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <p className="cart-product-sub-total">{value}₫</p>} />
                                      </div>
                                    )}
                                  </ContextApi.Consumer>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td >
                                  <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    <button onClick={this.onHandleClick} type="submit" className="btn btn-primary checkout-btn">Thanh toán ngay sau khi nhận hàng</button>
                                  </div>
                                  <br />
                                  <Payment receiver={receiver} receiversAddress = {receiversAddress} phoneNumber ={phoneNumber}/>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShoppingCart;