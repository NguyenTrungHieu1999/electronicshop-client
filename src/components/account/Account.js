import React, { Component } from 'react';
import SignIn from './signIn/SignIn';
import SignUp from './SignUp';

class Account extends Component {
  render() {
    return (
      <div>
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <a href="/" className="disable">Trang chủ /</a>
                <li className="active">Tài khoản</li>
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
    );
  }
}

export default Account;