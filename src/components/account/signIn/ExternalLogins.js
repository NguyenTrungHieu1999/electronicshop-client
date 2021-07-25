import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from "react-google-login";
import Cookies from 'js-cookie';
import loginservice_json from '../../../api/loginservice_json';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

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

  const responseGoogleFailure = (res) => {
    toast.warn("Không thể kết nối với máy chủ", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
      toast.warn("Đăng nhập thất bại", {
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

  const sendRequest = async (model) => {
    loginservice_json
      .externalLogins(model)
      .then(res => {
        if (res.data.isSuccessed) {
          debugger
          Cookies.set('token', res.data.resultObj, { expires: 3 });
          Cookies.set('isAuth', 'true', { expires: 3 });
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
              .then(response => { history.goBack()})
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
              history.goBack();
            });
          }
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
      .catch(() => toast.warn("Không kết nối được với máy chủ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }));
  }

  return (
    <React.Fragment>
      <GoogleLogin
        clientId="499129772453-12j5m0stg9u83tflhrddkhrghpapp1i8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogleFailure}
      >
        <span> Đăng nhập với Google</span>
      </GoogleLogin>

      <FacebookLogin
        appId="136478068166816"
        autoLoad
        fields="name,email,picture"
        callback={responseFacebook}
        render={renderProps => (
          <a
            className="facebook-sign-in"
            style={{ cursor: 'pointer', float: 'right' }}
            onClick={renderProps.onClick}>
            <i className="fa fa-facebook" />
            Đăng nhập với Facebook
          </a>
        )}
      />
      <ToastContainer />
    </React.Fragment>
  );
};