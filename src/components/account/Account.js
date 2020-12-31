import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Account extends Component {
  render() {
    return (
      <div>
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <li><a href="home.html">Home</a></li>
                <li className="active">Account</li>
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