import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { signOut } from '../../api/authApi';
import { nameDecode } from '../../services/DecodeService'

function TopMenu() {

  const history = useHistory();
  const cookies = new Cookies();
  const style = { color: 'white', cursor: 'pointer' };

  const cookiesAuth = cookies.get('isAuth');

  const [isAuth, setisAuth] = useState(cookiesAuth)
  const [name, setname] = useState(nameDecode)

  console.log(isAuth);
  const signOutHandle = async () => {
    cookies.remove('isAuth');
    cookies.remove('token');
    setisAuth(null);
    await signOut();
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
                  <li className="myaccount" style={style}><span>Xin chào, {name}</span></li>
                  <li className="wishlist" style={style}><span>Yêu thích</span></li>
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