import React, { Component } from 'react'

export default class TopMenu extends Component {
  render() {
    return (
      <div className="top-bar animate-dropdown">
        <div className="container">
          <div className="header-top-inner">
            <div className="cnt-account">
              <ul className="list-unstyled">
                <li className="myaccount"><a href="#a"><span>My Account</span></a></li>
                <li className="wishlist"><a href="#a"><span>Wishlist</span></a></li>
                <li className="header_cart hidden-xs"><a href="#a"><span>My Cart</span></a></li>
                <li className="check"><a href="#a"><span>Checkout</span></a></li>
                <li className="login"><a href="#a"><span>Login</span></a></li>
              </ul>
            </div>
            {/* /.cnt-account */}

            {/* /.cnt-cart */}
            <div className="clearfix" />
          </div>
          {/* /.header-top-inner */}
        </div>
        {/* /.container */}
      </div>
    )
  }
}
