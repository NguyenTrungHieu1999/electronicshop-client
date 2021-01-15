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
    console.log(res);

    if (res) {
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

      await sendRequest(LogInModel);
    }
  }

  const sendRequest = async (model) => {

    console.log(model);
    try {
      const res = await External(model);

      if (res.isSuccessed) {
        cookies.set('token', res.resultObj, { path: '/', expires: new Date(Date.now() + 3600000) });

        cookies.set('isAuth', true, { patth: '/', expires: new Date(Date.now() + 3600000) });

        window.location.href = '/';
      }
    } catch (error) {
      alert("Không kết nối được với máy chủ.");
    }
  }

  return (
    <div>
      <GoogleLogin
        clientId="499129772453-mqgkumi1dogjb9dbvl1k57u434n1slob.apps.googleusercontent.com"
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