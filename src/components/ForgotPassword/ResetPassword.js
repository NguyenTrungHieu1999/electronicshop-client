import React, { Component } from 'react';
import { resetPassword } from '../../api/authApi';
import { validateConfirmPassword, validatePassword } from '../account/ValidationForm';

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      passwordValid: "",
      confirmPasswordValid: ""
    };
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    })

    if (name === 'password') {
      this.setState({ passwordValid: validatePassword(value) });
    } else if (name === 'confirmPassword') {
      this.setState({ confirmPasswordValid: validateConfirmPassword(this.state.password, value) });
    }
  }

  onHandleSubmit = async (event) => {

    event.preventDefault();
    const { password, confirmPassword,
      passwordValid, confirmPasswordValid } = this.state;

    if (passwordValid === "" && confirmPasswordValid === "") {
      try {
        const { email, token } = this.props.match.params;

        const res = await resetPassword({ token, email, password, confirmPassword });
        if (res && res.isSuccessed) {
          alert(res.resultObj);
          this.props.history.push('tai-khoan');
        }
        else {
          alert(res.message);
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
  render() {

    const { password, confirmPassword, passwordValid, confirmPasswordValid } = this.state;
    return (
      <>
        <div className="container padding-bottom-3x mb-2 mt-5" style={{ margin: '5%' }}>
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12">
              <div className="forgot">
                <h2>Tạo mới mật khẩu của bạn?</h2>
                <p>Tạo mới mật khẩu của bạn trong 3 bước đơn giản. Điều này sẽ giúp bạn bảo mật mật khẩu của mình!</p>
                <ol className="list-unstyled">
                  <li><span className="text-primary text-medium">1. </span>Nhập địa chỉ email của bạn dưới đây.</li>
                  <li><span className="text-primary text-medium">2. </span>Nhập mật khẩu mới.</li>
                  <li><span className="text-primary text-medium">3. </span>Xác nhận lại mật khẩu.</li>
                </ol>
                <form className="card mt-4" onSubmit={this.onHandleSubmit}>
                  <div className="card-body">
                    <div className="form-group">
                      <label >Nhập mật khẩu mới</label>
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
                      <label >Xác nhận lại mật khẩu</label>
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
                  </div>
                  <div className="card-footer" style={{ textAlign: 'center' }}>
                    <button className="btn btn-success" type="submit">Lưu</button>
                  &nbsp;&nbsp;
                  <a className="btn btn-danger"
                      onClick={() => { this.props.history.push('/tai-khoan') }}
                    >Thoát</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ResetPassword;
