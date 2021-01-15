import React, { useState } from 'react';
import { Login } from '../../../api/authApi';
import Cookies from 'universal-cookie';
import { validateEmail, validatePassword } from '../ValidationForm';
import ExternalLogins from './ExternalLogins';
import { useHistory } from 'react-router-dom';
import loginservice_json from '../../../api/loginservice_json';

function SignIn() {

  const [signInModel, setSignInModel] = useState({
    email: '',
    password: '',
    rememberMe: false,
    emailValid: "",
    passValid: ""
  })

  const history = useHistory();

  const cookies = new Cookies();

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
      try {
        // const res = await Login({ email: signInModel.email, password: signInModel.password, rememberMe: signInModel.rememberMe });

        // debugger;

        // if (res.isSuccessed) {
        //   cookies.set('token', res.resultObj, { path: '/', expires: new Date(Date.now() + 3600000) });
        //   cookies.set('isAuth', true, { patth: '/', expires: new Date(Date.now() + 3600000) });
        //   window.location.href = '/';
        // } else {
        //   alert(res.message);
        // }

        loginservice_json
          .login({ email: signInModel.email, password: signInModel.password, rememberMe: signInModel.rememberMe })
          .then(res => {
            if (res.data.isSuccessed) {
              debugger;
              cookies.set('token', res.data.resultObj, { path: '/', expires: new Date(Date.now() + 3600000) });
              cookies.set('isAuth', true, { patth: '/', expires: new Date(Date.now() + 3600000) });
              window.location.href = '/';
            } else {
              alert(res.data.message);
            }
          })
      } catch (error) {
        console.log(error);
      }
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
    </div>
  );
}

export default SignIn;