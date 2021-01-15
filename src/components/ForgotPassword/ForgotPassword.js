import React, { Component } from 'react';
import { forgotPassWord } from '../../api/authApi';
import { validateEmail } from '../account/ValidationForm';
import './Style.css';

class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValid: ""
    };
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    console.log("Value: ", value);
    this.setState({
      [name]: value
    })
    if (name === 'email') {
      this.setState({ emailValid: validateEmail(value) });
    }
  }

  onHandleSubmit = async (event) => {
    event.preventDefault();
    const { email, emailValid } = this.state;
    if (emailValid === "" && email !== '') {
      const res = await forgotPassWord(email);

      if (res && res.isSuccessed) {
        alert("Email đã được gửi đi.");
      }
    }
  }

  render() {
    const { email, emailValid } = this.state;
    return (
      <>
        <div className="container mb-2 mt-5" style={{ margin: '5%' }}>
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12">
              <div className="forgot">
                <h2>Thay đổi mật khẩu của bạn?</h2>
                <p>Thay đổi mật khẩu trong 3 bước. Điều này sẽ giúp bạn bảo mật mật khẩu của mình!</p>
                <ol className="list-unstyled">
                  <li><span className="text-primary text-medium">1. </span>Nhập địa chỉ Email bên dưới</li>
                  <li><span className="text-primary text-medium">2. </span>Hệ thống của chúng tôi sẽ gửi cho bạn một liên kết tạm thời</li>
                  <li><span className="text-primary text-medium">3. </span>Sử dụng liên kết để đặt lại mật khẩu của bạn</li>
                </ol>
                <form className="card mt-4" onSubmit={this.onHandleSubmit}>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Nhập địa chỉ Email của bạn</label>
                      <input
                        required
                        className="form-control unicase-form-control text-input"
                        name="email"
                        value={email}
                        onChange={this.onHandleChange}
                        id="email-for-pass"
                      />
                      {emailValid !== '' && <span className="alert-danger">{emailValid}</span>}
                      <br />
                      <small className="form-text text-muted">Nhập địa chỉ email bạn đã sử dụng trong quá trình đăng ký trên Electronic Shop. Sau đó, chúng tôi sẽ gửi một liên kết đến địa chỉ này qua email.</small>
                    </div>
                  </div>
                  <div className="card-footer" style={{ textAlign: 'center' }}>
                    <button className="btn btn-success" type="submit">Gửi</button>
                  &nbsp;&nbsp;
                  <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => this.props.history.push('/tai-khoan')}
                    >Thoát</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ForgotPassword;