import React, { useState } from 'react';
import { Login } from '../../api/authApi';
import Cookies from 'universal-cookie';
import { validateEmail, validatePassword } from './ValidationForm';
import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

// import { useHistory } from 'react-router-dom';

function SignIn() {

  const [signInModel, setSignInModel] = useState({
    email: '',
    password: '',
    rememberMe: false,
    emailValid: "",
    passValid: ""
  })

  const cookies = new Cookies();

  // const history = useHistory();

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
        const res = await Login({ email: signInModel.email, password: signInModel.password, rememberMe: signInModel.rememberMe });

        if (res.isSuccessed) {

          //localStorage.setItem("token", JSON.stringify(res));
          cookies.set('token', res, { path: '/', expires: new Date(Date.now() + 3600000) });

          window.location.href = '/';

          //history.push('/')
        } else {
          alert(res.message);
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
  const responseGoogle = (response) => {
    console.log(response);
  }

  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <div className="col-md-6 col-sm-6 sign-in">
      <h4>Sign in</h4>
      <p>Hello, Welcome to your account.</p>
      <div className="social-sign-in outer-top-xs">
        <GoogleLogin
          clientId="266745939810-8pkul8mbskjscf713hlrticfepc1a38m.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        >
          <span> Sign In with Google</span>
        </GoogleLogin>

        <FacebookLogin
          appId="136478068166816"
          autoLoad
          callback={responseFacebook}
          render={renderProps => (
            <a
              href
              className="facebook-sign-in"
              style={{ cursor: 'pointer', float: 'right' }}
              onClick={renderProps.onClick}>
              <i className="fa fa-facebook" />
              Sign In with Facebook
            </a>
          )}
        />
        {/* <a href="#a" className="facebook-sign-in"><i className="fa fa-facebook" /> Sign In with Facebook</a> */}
        {/* <a href="#a" className="twitter-sign-in"><i className="fa fa-google" /> Sign In with Google</a> */}
      </div>
      <form className="register-form outer-top-xs" onSubmit={onHandleSubmit}>
        <div className="form-group">
          <label className="info-title" htmlFor="Email">Email Address <span>*</span></label>
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
          <label className="info-title" htmlFor="Password">Password <span>*</span></label>
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
              Remember me!
            </label>
          <a href="#a" className="forgot-password pull-right">Forgot your Password?</a>
        </div>
        <button type="submit" className="btn-upper btn btn-primary checkout-page-button">Login</button>
      </form>
    </div>
  );
}

export default SignIn;