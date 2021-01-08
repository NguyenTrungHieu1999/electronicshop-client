import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { nameDecode } from '../../services/DecodeService'

function TopMenu() {

  const history = useHistory();
  const cookies = new Cookies();

  const cookiesAuth = cookies.get('isAuth');

  const [isAuth, setisAuth] = useState(cookiesAuth)
  const [name, setname] = useState(nameDecode)

  const signOutHandle = () => {
    cookies.remove('isAuth');
    cookies.remove('token');

    setisAuth(false);
  }

  const style = { color: 'white', cursor: 'pointer' };

  return (
    <div className="top-bar animate-dropdown">
      <div className="container">
        <div className="header-top-inner">
          <div className="cnt-account">
            {isAuth ?
              <ul className="list-unstyled">
                <li className="myaccount" style={style}><span>Xin chào, {name}</span></li>
                <li className="wishlist" style={style}><span>Yêu thích</span></li>
                <li
                  className="check"
                  style={style}
                  onClick={signOutHandle}
                >
                  <span>Đăng xuất</span>
                </li>
              </ul> :
              <ul className="list-unstyled">
                <li
                  className="login"
                  style={style}
                  onClick={() => { history.push('/tai-khoan'); }}
                >
                  <span>Đăng nhập</span>
                </li>
              </ul>
            }
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </div>
  )
}

export default TopMenu;