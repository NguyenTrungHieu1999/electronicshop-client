import React, { Component } from 'react';
import SignIn from './signIn/SignIn';
import SignUp from './SignUp';
import Cookies from 'universal-cookie';

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    }
  }


  componentDidMount() {
    const cookies = new Cookies();

    this.setState({
      isAuth: cookies.get('isAuth')
    });
  }

  render() {


    const {isAuth} = this.state;

    return (
      <div>
        {isAuth === false || isAuth === undefined
          ? <div>
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
          : window.location.href = '/'
        }
      </div>
    );
  }
}

export default Account;