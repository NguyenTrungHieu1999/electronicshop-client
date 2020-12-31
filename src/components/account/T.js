import React, { Component } from 'react';
import { Login } from '../../api/authApi';
import { validateEmail, validatePassword } from './ValidationForm';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      emailValid: "",
      passValid: ""
    };
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value })
    if (name === 'email') {

      this.setState({ emailValid: validateEmail(value) })
    }
    else if (name === 'password') {
      this.setState({ passValid: validatePassword(value) })
    }
  }

  onHandleSubmit = async (event) => {
    event.preventDefault();

    const { email, password, rememberMe } = this.state;

    try {
      const res = await Login({ email: email, password: password, rememberMe: rememberMe });

      if (res.isSuccessed) {

        localStorage.setItem("token", JSON.stringify(res));

        window.location.href = '/';
      } else {
        alert(res.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const { email, password, rememberMe } = this.state;

    return (
      <div className="col-md-6 col-sm-6 sign-in">
        <h4>Sign in</h4>
        <p>Hello, Welcome to your account.</p>
        <div className="social-sign-in outer-top-xs">
          <a href="#a" className="facebook-sign-in"><i className="fa fa-facebook" /> Sign In with Facebook</a>
          <a href="#a" className="twitter-sign-in"><i className="fa fa-google" /> Sign In with Google</a>
        </div>
        <form className="register-form outer-top-xs" onSubmit={this.onHandleSubmit}>
          <div className="form-group">
            <label className="info-title" htmlFor="Email">Email Address <span>*</span></label>
            <input
              type="email"
              className="form-control unicase-form-control text-input"
              id="Email"
              name="email"
              value={email}
              onChange={this.onHandleChange}
            />
            {this.state.emailValid !== '' ? <label className="alert-danger">{this.state.emailValid}</label> : null}
          </div>

          <div className="form-group">
            <label className="info-title" htmlFor="Password">Password <span>*</span></label>
            <input
              type="password"
              className="form-control unicase-form-control text-input"
              id="Password"
              name="password"
              value={password}
              onChange={this.onHandleChange}
            />
            {this.state.passValid !== '' ? <label className="alert-danger">{this.state.passValid}</label> : null}
          </div>
          <div className="checkbox outer-xs">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                value={false}
                checked={rememberMe}
                onChange={this.onHandleChange}
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
}

export default SignIn;