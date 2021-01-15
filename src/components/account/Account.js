import React, { Component } from 'react';
import SignIn from './signIn/SignIn';
import SignUp from './SignUp';
import Cookies from 'universal-cookie';

class Account extends Component {

  render() {
    const cookies = new Cookies();
    document.title = 'Đăng nhập && Đăng ký';
    return (
      <div>
        {cookies.get('isAuth') !== undefined && cookies.get('isAuth')===true
          ? window.location.href = '/'
          : <div>
            <div className="breadcrumb">
              <div className="container">
                <div className="breadcrumb-inner">
                  <ul className="list-inline list-unstyled">
                    <a href="/" className="disable">Trang chủ /</a>
                    <li className="active">Đăng nhập && Đăng ký</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="body-content">
              <div className="container">
                <div className="sign-in-page">
                  <div className="row">
                    <SignIn />
                    <SignUp />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Account;