import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from "react-google-login";
import Cookies from 'js-cookie';
import loginservice_json from '../../../api/loginservice_json';
import axios from 'axios';


export default function ExternalLogins() {

  let LogInModel = {
    email: '',
    userName: '',
    firstMidleName: '',
    lastName: '',
    loginProvider: '',
    providerKey: '',
    providerDisplayName: ''
  };

  const responseGoogle = async (res) => {

    console.log(res);

    if (res) {
      LogInModel = {
        email: res.profileObj.email,
        userName: res.profileObj.email,
        firstMiddleName: res.profileObj.familyName,
        lastName: res.profileObj.givenName,
        loginProvider: 'Google',
        providerKey: res.profileObj.googleId,
        providerDisplayName: 'Google'
      };

      await sendRequest(LogInModel);
    }

  }

  const responseFacebook = async (res) => {
    if (res.status !== 'unknown') {
      const index = res.name.lastIndexOf(" ");

      LogInModel = {
        email: res.email,
        userName: res.email,
        firstMiddleName: res.name.substring(0, index),
        lastName: res.name.substring(index + 1),
        loginProvider: 'Facebook',
        providerKey: res.id,
        providerDisplayName: 'Facebook'
      }

      console.log(LogInModel);

      sendRequest(LogInModel);
    } else {
      alert("Đăng nhập thất bại");
    }
  }

  const sendRequest = async (model) => {
    loginservice_json
      .externalLogins(model)
      .then(res => {
        if (res.data.isSuccessed) {
          debugger
          Cookies.set('token', res.data.resultObj, { expires: 7 });
          Cookies.set('isAuth', 'true', { expires: 7 });
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          let cartModels = []
          cartItems.length && cartItems.map(item => {
            cartModels.push({
              productId: item.product.id,
              quantity: item.total
            })
          });
          const headers = {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
          if (cartModels.length > 0) {
            axios.post('https://localhost:5001/api/Carts/create', { cartModels }, { headers })
              .then(response => { window.location.href = '/'; console.log(response.data) })
              .catch(err => console.log(err));
          } else {
            axios.get('https://localhost:5001/api/Carts/getAll', { headers }).then(res1 => {
              let totalPrice = 0;
              let cartItems1 = [];
              res1.data && res1.data.resultObj.map(item => {
                totalPrice += item.product.price * item.quantity;
                cartItems1.push({
                  product: item.product,
                  total: item.quantity
                })
              });

              localStorage.setItem('cartItems', JSON.stringify(cartItems1));
              localStorage.removeItem('totalPrice');
              localStorage.setItem('totalPrice', totalPrice);
              window.location.href = '/';
            });
          }
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert(err));
  }

  return (
    <div>
      <GoogleLogin
        clientId="499129772453-12j5m0stg9u83tflhrddkhrghpapp1i8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
      // onFailure={responseGoogle}
      >
        <span> Đăng nhập với Google</span>
      </GoogleLogin>

      <FacebookLogin
        appId="136478068166816"
        autoLoad
        fields="name,email,picture"
        callback={responseFacebook}
        render={renderProps => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            className="facebook-sign-in"
            style={{ cursor: 'pointer', float: 'right' }}
            onClick={renderProps.onClick}>
            <i className="fa fa-facebook" />
            Đăng nhập với Facebook
          </a>
        )}
      />
    </div>
  );
};