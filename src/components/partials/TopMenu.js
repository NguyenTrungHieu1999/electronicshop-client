import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signOut } from '../../api/authApi';
import { nameDecode } from '../../services/DecodeService'

function TopMenu() {

  const history = useHistory();
  const style = { color: 'white', cursor: 'pointer' };

  const cookiesAuth = Cookies.get('isAuth');

  const [isAuth, setisAuth] = useState(cookiesAuth)
  const [name, setname] = useState(nameDecode)

  console.log(isAuth);
  const signOutHandle = async () => {
    Cookies.remove('isAuth');
    Cookies.remove('token');
    localStorage.clear();
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
              <React.Fragment>
                <ul className="list-unstyled">
                  <li className="myaccount" onClick={() => { history.push('thong-tin-tai-khoan') }} style={style}><span>Xin chào, {name}</span></li>
                  <li className="wishlist" onClick={() => { history.push('/yeu-thich') }} style={style}><span>Yêu thích</span></li>
                  <li
                    className="check"
                    style={style}
                    onClick={signOutHandle}
                  >
                    <span>Đăng xuất</span>
                  </li>
                </ul>
              </React.Fragment>
              :
              <React.Fragment>
                <ul className="list-unstyled">
                  <li
                    className="login"
                    style={style}
                    onClick={() => { history.push(`/tai-khoan`); }}
                  >
                    <span>Đăng nhập</span>
                  </li>
                </ul>
              </React.Fragment>
            }
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </div>
  )
}

export default TopMenu;