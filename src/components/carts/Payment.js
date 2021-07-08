import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import paymentApi from '../../api/paymentApi';

class Payment extends Component {
  render() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || 0;
    const { receiver, receiversAddress, phoneNumber, email, note } = this.props;
    let orderDetailModel = [];
    if (cartItems && cartItems.length) {
      cartItems.map(item => {
        orderDetailModel.push({
          productId: item.product.id,
          quantity: item.total,
          price: item.product.price
        })
      })
    };
    return (
      <PayPalButton
        amount={totalPrice / 20000}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          // OPTIONAL: Call your server to save the transaction
          if (receiver === '' || receiversAddress === '' || phoneNumber === '' || email === '') {
            alert("Quý khách vui lòng điền đầy đủ thông tin.");
            return null;
          } else {
            return paymentApi
              .checkout({ paid: true, receiver: receiver, receiversAddress: receiversAddress, phoneNumber: phoneNumber, email: email, totalMoney: totalPrice, note: note, orderDetails: orderDetailModel })
              .then(res => {
                if (res.data.isSuccessed) {
                  localStorage.removeItem('cartItems');
                  localStorage.removeItem('totalPrice');
                  alert("Thêm đơn hàng thành công!");
                  window.location.href = ('/');
                }
              })
              .catch(error => console.log(error))
          }
        }
        }
      />
    );
  }
}

export default Payment;