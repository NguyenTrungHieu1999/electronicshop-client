import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import cartApi from '../../api/cartApi';
import paymentApi from '../../api/paymentApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <React.Fragment>
        <PayPalButton
          amount={totalPrice / 20000}
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            details.payer.name.given_name = receiver;
            // OPTIONAL: Call your server to save the transaction
            if (receiver === '' || receiversAddress === '' || phoneNumber === '' || email === '') {
              toast.warn("Quý khách vui lòng điền đầy đủ thông tin.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return null;
            } else {
              return paymentApi
                .checkout({ paid: true, receiver: receiver, receiversAddress: receiversAddress, phoneNumber: phoneNumber, email: email, totalMoney: totalPrice, note: note, paymentMethod: "Paypal", orderDetails: orderDetailModel })
                .then(res => {
                  if (res.data.isSuccessed) {
                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('totalPrice');
                    cartApi.cleanCarts()
                      .then(res => console.log(res.data))
                      .catch(err => console.log(err));
                    toast.info("Thêm đơn hàng thành công!", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    window.location.href = ('/');
                  } else {
                    toast.warn(res.data.message, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                })
                .catch(error => console.log(error));
            }
          }
          }
        />
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default Payment;