import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { validateEmail, validatePassword } from '../ValidationForm';
import ExternalLogins from './ExternalLogins';
import { useHistory } from 'react-router-dom';
import loginservice_json from '../../../api/loginservice_json';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {

  const [signInModel, setSignInModel] = useState({
    email: '',
    password: '',
    rememberMe: false,
    emailValid: "",
    passValid: ""
  })

  const history = useHistory();

  const onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    const tempModel = { ...signInModel };

    tempModel[name] = value;

    setSignInModel(tempModel);

    if (name === 'email') {

      tempModel.emailValid = validateEmail(value);
      setSignInModel(tempModel);
    }
    else if (name === 'password') {
      tempModel.passValid = validatePassword(value);
      setSignInModel(tempModel);
    }
  }

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    if (signInModel.emailValid === "" && signInModel.passValid === "") {
      loginservice_json
        .login({ email: signInModel.email, password: signInModel.password, rememberMe: signInModel.rememberMe })
        .then(res => {
          if (res.data.isSuccessed) {
            Cookies.set('token', res.data.resultObj, { expires: 3 });
            Cookies.set('isAuth', 'true', { expires: 3 });
            // cartModels.length && cartApi.createCarts({ cartModels: cartModels });
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            let cartModels = [];
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
        }).catch(() => toast.warn('Không thể kết nối với máy chủ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }));
    }
  }

  return (
    <div className="col-md-6 col-sm-6 sign-in">
      <h4>Đăng nhập</h4>
      <p>Xin chào, Chào mừng đến với tài khoản của bạn.</p>
      <div className="social-sign-in outer-top-xs">
        <ExternalLogins />
      </div>
      <form className="register-form outer-top-xs" onSubmit={onHandleSubmit}>
        <div className="form-group">
          <label className="info-title" htmlFor="Email">Địa chỉ Email<span>*</span></label>
          <input
            type="email"
            className="form-control unicase-form-control text-input"
            id="Email"
            name="email"
            value={signInModel.email}
            onChange={onHandleChange}
          />
          {signInModel.emailValid !== '' ? <label className="alert-danger">{signInModel.emailValid}</label> : null}
        </div>

        <div className="form-group">
          <label className="info-title" htmlFor="Password">Mật khẩu <span>*</span></label>
          <input
            type="password"
            className="form-control unicase-form-control text-input"
            id="Password"
            name="password"
            value={signInModel.password}
            onChange={onHandleChange}
          />
          {signInModel.passValid !== '' ? <label className="alert-danger">{signInModel.passValid}</label> : null}
        </div>
        <div className="checkbox outer-xs">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              value={false}
              checked={signInModel.rememberMe}
              onChange={onHandleChange}
            />
            Ghi nhớ!
          </label>
          <li
            style={{ listStyleType: 'none', cursor: 'pointer' }}
            className="forgot-password pull-right"
            onClick={() => history.push('/chinh-sua-mat-khau')}
          >Bạn đã quên mật khẩu?</li>
        </div>
        <button type="submit" className="btn-upper btn btn-primary checkout-page-button">Đăng nhập</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignIn;