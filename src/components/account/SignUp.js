import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Register } from '../../api/authApi';
import { validateEmail, validatePassword, validateUserName, validateConfirmPassword } from './ValidationForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: 0,
      emailValid: "",
      userNameValid: "",
      passwordValid: "",
      confirmPasswordValid: "",
      captcha: false
    };
  }

  verifyBack = (response) => {
    if (response) {
      this.setState({
        captcha: true,
      });
    }
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    })

    if (name === 'email') {
      this.setState({ emailValid: validateEmail(value) });
    } else if (name === 'userName') {
      this.setState({ userNameValid: validateUserName(value) })
    } else if (name === 'password') {
      this.setState({ passwordValid: validatePassword(value) });
    } else if (name === 'confirmPassword') {
      this.setState({ confirmPasswordValid: validateConfirmPassword(this.state.password, value) });
    }
  }

  onHandleSubmit = async (event) => {

    event.preventDefault();

    const { email, userName, password, confirmPassword, gender, emailValid,
      userNameValid, passwordValid, confirmPasswordValid, captcha } = this.state;

    debugger;

    if (emailValid === "" && userNameValid === "" &&
      passwordValid === "" && confirmPasswordValid === "" && email !== "" && userName !== "" &&
      password !== "" && confirmPassword !== "" && captcha === true) {
      try {
        let res = await Register({
          userName: userName, password: password,
          confirmPassword: confirmPassword, email: email, gender: gender
        });
        if (res.isSuccessed) {
          toast.info('Đăng ký tài khoản thành công', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.warn(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch {
        toast.warn("Đăng ký tài khoản thất bại", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    } else if (captcha === false) {
      toast.warn("Xác nhận bạn không phải là người máy", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.warn("Hãy nhập dữ liệu hợp lệ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  render() {

    const { email, userName, password, confirmPassword, gender, emailValid,
      userNameValid, passwordValid, confirmPasswordValid } = this.state;

    return (
      <div className="col-md-6 col-sm-6 create-new-account">
        <h4 className="checkout-subtitle">Tạo mới tài khoản</h4>
        <p className="text title-tag-line">Tạo mới tài khoản cho bạn.</p>
        <form className="register-form outer-top-xs" onSubmit={this.onHandleSubmit}>
          <div className="form-group">
            <label className="info-title" htmlFor="EmailUp">Địa chỉ Email <span>*</span></label>
            <input
              type="email"
              className="form-control unicase-form-control text-input"
              id="EmailUp"
              name="email"
              value={email}
              required
              onChange={this.onHandleChange}
            />
            {emailValid !== '' && <label className="alert-danger">{emailValid}</label>}
          </div>
          <div className="form-group">
            <label className="info-title" htmlFor="UserName">Tên tài khoản <span>*</span></label>
            <input
              required
              type='text'
              className="form-control unicase-form-control text-input"
              id="UserName"
              name="userName"
              value={userName}
              onChange={this.onHandleChange} />
            {userNameValid !== '' && <label className="alert-danger">{userNameValid}</label>}
          </div>
          <div className="form-group">
            <label className="info-title">Giới tính <span>*</span></label>
            <select
              className="form-control"
              name="gender"
              value={gender}
              onChange={this.onHandleChange}>
              <option value={0}>Nam</option>
              <option value={1}>Nữ</option>
            </select>
          </div>
          <div className="form-group">
            <label className="info-title" htmlFor="PasswordUp">Mật khẩu <span>*</span></label>
            <input
              required
              type="password"
              className="form-control unicase-form-control text-input"
              id="PasswordUp"
              name="password"
              value={password}
              onChange={this.onHandleChange} />
            {passwordValid !== '' && <label className="alert-danger">{passwordValid}</label>}
          </div>
          <div className="form-group">
            <label className="info-title" htmlFor="cPassword">Xác nhận mật khẩu <span>*</span></label>
            <input
              required
              type="password"
              className="form-control unicase-form-control text-input"
              id="cPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onHandleChange}
            />
            {confirmPasswordValid !== '' && <label className="alert-danger">{confirmPasswordValid}</label>}
          </div>
          <div className="form-group">
            <div className="invisible-recaptch">
              <ReCAPTCHA
                sitekey="6LcGp5YbAAAAACiOSL2wWwapqJj5Y0WwIGyddDOK"
                render="explicit"
                onChange={this.verifyBack}
              />
            </div>
          </div>
          <button type="submit" className="btn-upper btn btn-primary checkout-page-button">Đăng ký</button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default SignUp;