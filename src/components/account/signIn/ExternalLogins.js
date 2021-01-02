import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from "react-google-login";
import { External } from '../../../api/authApi';
import Cookies from 'universal-cookie';


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

  const cookies = new Cookies();

  const responseGoogle = async (res) => {

    console.log(res);

    LogInModel = {
      email: res.profileObj.email,
      userName: res.profileObj.email,
      firstMiddleName: res.profileObj.familyName,
      lastName: res.profileObj.givenName,
      loginProvider: 'Google',
      providerKey: res.profileObj.googleId,
      providerDisplayName: 'Google'
    };

    try {
      const res = await External(LogInModel);

      if (res.isSuccessed) {
        cookies.set('token', res, { path: '/', expires: new Date(Date.now() + 3600000) });

        cookies.set('isAuthen', true, { patth: '/', expires: new Date(Date.now() + 3600000) });

        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }

  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <div>
      <GoogleLogin
        clientId="499129772453-mqgkumi1dogjb9dbvl1k57u434n1slob.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      >
        <span> Đăng nhập với Google</span>
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
              Đăng nhập với Facebook
          </a>
        )}
      />
    </div>
  );
};