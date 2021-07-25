import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signOut } from '../../api/authApi';
import { nameDecode } from '../../services/DecodeService';
import "./TopMenu.css";

function TopMenu() {

  const history = useHistory();
  const cookiesAuth = Cookies.get('isAuth');

  const [isAuth, setisAuth] = useState(cookiesAuth)
  const [name, setname] = useState(nameDecode)

  console.log(isAuth);
  const signOutHandle = async () => {
    Cookies.remove('isAuth');
    Cookies.remove('token');
    localStorage.setItem('cartItems', JSON.stringify([]));
    localStorage.removeItem('totalPrice');
    localStorage.setItem('totalPrice', 0);
    setisAuth(null);
    await signOut();
    window.location.href = ('/');
  }

  return (
    <div className="top-bar animate-dropdown">
      <div className="container">
        <div className="header-top-inner">

          <div className="cnt-account">
            {isAuth
              ?
              <div className="dropdown">
                <button onClick={() => { window.location.href = ('/thong-tin-tai-khoan') }} className="dropbtn">Xin chào, {name}</button>
                <div className="dropdown-content">
                  <li onClick={() => { window.location.href = ('/thong-tin-tai-khoan') }}>Tài khoản của tôi</li>
                  <li onClick={() => { window.location.href = ('/don-mua') }}>Đơn mua</li>
                  <li onClick={() => { window.location.href = ('/yeu-thich') }}>Yêu thích</li>
                  <li onClick={signOutHandle}>Đăng xuất</li>
                </div>
              </div>
              : <div className="dropdown">
                <button onClick={() => { window.location.href = (`/tai-khoan`); }} className="dropbtn">Đăng nhập</button>
              </div>
            }
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </div>
  )
}

export default TopMenu;