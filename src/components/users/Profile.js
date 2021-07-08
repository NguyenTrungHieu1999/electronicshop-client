import React, { Component } from 'react';
import userApi from '../../api/userApi';
import Cookies from 'js-cookie';
import { validatePhoneNumber } from '../account/ValidationForm';
import { roleDecode, userIdDecode } from '../../services/DecodeService';
import { forgotPassWord } from '../../api/authApi';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      gender: 0,
      firstMiddleName: "",
      lastName: "",
      address: "",
      birthday: "",
      phoneNumber: "",
    };
    this.loadData = this.loadData.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async changePassword() {
    const { email } = this.state;
    if (email !== '') {
      const res = await forgotPassWord(email);
      if (res && res.isSuccessed) {
        alert("Email đã được gửi đi, quý khách vui lòng kiểm tra Email đã đăng ký tại website và làm theo hướng dẫn.");
      }
    }
  }

  loadData() {
    userApi
      .myProfile()
      .then(res => {
        debugger
        if (res.data && res.data.isSuccessed) {
          this.setState({
            email: res.data.resultObj.email,
            userName: res.data.resultObj.userName,
            gender: res.data.resultObj.gender,
            firstMiddleName: res.data.resultObj.firstMiddleName,
            lastName: res.data.resultObj.lastName,
            address: res.data.resultObj.address,
            birthday: res.data.resultObj.birthday,
            phoneNumber: res.data.resultObj.phoneNumber,
            phoneNumberValid: ""
          })
        }
      })
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    })
    if (name === "phoneNumber") {
      this.setState({
        phoneNumberValid: validatePhoneNumber(value)
      })
    }
  }

  onHandleSubmit = async (event) => {

    event.preventDefault();
    const id = userIdDecode;
    const { email, userName, gender, firstMiddleName, lastName, address, birthday, phoneNumber } = this.state;

    let userInRole = ''
    if (roleDecode === 'Admin') {
      userInRole = 'Admin';
    } else if (roleDecode === 'Emp') {
      userInRole = 'Emp';
    }

    userApi
      .updateProfile({ id, firstMiddleName, lastName, birthday, gender, phoneNumber, address, status: 0, userInRole: userInRole })
      .then(res => {
        debugger
        if (res.data && res.data.isSuccessed) {
          alert(res.data.resultObj);
          this.loadData();
        } else {
          alert(res.data.message);
        }
      })
  }

  render() {
    const { email, userName, gender, firstMiddleName, lastName, address, birthday, phoneNumber, phoneNumberValid } = this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        {Cookies.get('isAuth') === 'true'
          ? <React.Fragment>
            <div className="breadcrumb">
              <div className="container">
                <div className="breadcrumb-inner">
                  <ul className="list-inline list-unstyled">
                    <a href="/" className="disable">Trang chủ /</a>
                    <li className="active">Thông tin tài khoản</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="body-content">
              <div className="container">
                <div className="sign-in-page">
                  <div className="row">
                    <div className="col-md-12 col-sm-12 create-new-account">
                      <form className="register-form outer-top-xs" onSubmit={this.onHandleSubmit}>
                        <div className="form-group">
                          <label className="info-title" htmlFor="EmailUp">Địa chỉ Email</label>
                          <input
                            disabled
                            type="email"
                            className="form-control unicase-form-control text-input"
                            id="EmailUp"
                            name="email"
                            value={email}
                          />
                        </div>
                        <div className="form-group">
                          <label className="info-title" htmlFor="UserName">Tên tài khoản</label>
                          <input
                            type='text'
                            className="form-control unicase-form-control text-input"
                            id="UserName"
                            name="userName"
                            value={userName}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label className="info-title" htmlFor="firstMiddleName">Họ và tên đệm</label>
                          <input
                            type='text'
                            className="form-control unicase-form-control text-input"
                            id="firstMiddleName"
                            name="firstMiddleName"
                            value={firstMiddleName || ""}
                            onChange={this.onHandleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="info-title" htmlFor="lastName">Tên</label>
                          <input
                            type='text'
                            className="form-control unicase-form-control text-input"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={this.onHandleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="info-title">Giới tính</label>
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
                          <label className="info-title" htmlFor="address">Địa chỉ</label>
                          <input
                            type="text"
                            className="form-control unicase-form-control text-input"
                            id="address"
                            name="address"
                            value={address || ""}
                            onChange={this.onHandleChange} />
                        </div>
                        <div className="form-group">
                          <label className="info-title" htmlFor="birthday">Ngày sinh</label>
                          <input
                            type="datetime-local"
                            className="form-control unicase-form-control text-input"
                            id="birthday"
                            name="birthday"
                            value={birthday || null}
                            onChange={this.onHandleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="info-title" htmlFor="phoneNumber">Số điện thoại</label>
                          <input
                            type="tel"
                            className="form-control unicase-form-control text-input"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phoneNumber || ""}
                            onChange={this.onHandleChange}
                          />
                          {phoneNumberValid !== '' ? <label className="alert-danger">{phoneNumberValid}</label> : null}
                        </div>
                        <button type="submit" className="btn-upper btn btn-primary checkout-page-button">Cập nhật</button>
                        &emsp;
                        <button type="button" onClick={() => { window.location.href = ('/') }} className="btn-upper btn btn-primary checkout-page-button">Trở lại trang chủ</button>
                        &emsp;
                        <button type="button" onClick={() => { this.changePassword() }} className="btn-upper btn btn-primary checkout-page-button">Thay đổi mật khẩu</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
          : window.location.href = ("/")
        }
      </React.Fragment>
    );
  }
}

export default Profile;