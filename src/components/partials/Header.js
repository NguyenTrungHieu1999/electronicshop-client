import React, { Component } from 'react'
import Navbar from './Navbar'
import TopMenu from './TopMenu'
import Logo from '../../logo.png'

export default class Header extends Component {
  render() {
    return (
      <header className="header-style-1">
        {/* ============================================== TOP MENU ============================================== */}
        <TopMenu />
        {/* ============================================== TOP MENU : END ============================================== */}
        <div className="main-header">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-3 logo-holder">
                {/* ============================================================= LOGO ============================================================= */}
                <div className="logo">
                  <a href="/">
                    <img src={Logo} alt="logo"
                    />
                  </a>
                </div>
                {/* ============================================================= LOGO : END ============================================================= */}
              </div>
              <div className="col-lg-7 col-md-6 col-sm-8 col-xs-12 top-search-holder">
                {/* ============================================================= SEARCH AREA ============================================================= */}
                <div className="search-area">
                  <form>
                    <div className="control-group">
                      <ul className="categories-filter animate-dropdown">
                        <li className="dropdown"> <a className="dropdown-toggle" data-toggle="dropdown" href="category.html">Tìm kiếm<b className="caret" /></a>
                        </li>
                      </ul>
                      <input
                        className="search-field"
                        placeholder="Nhập từ khóa để tìm kiếm..."
                        style={{ outline: 'none' }} />
                      <li
                        className="search-button"
                        style={{ cursor: 'pointer' }}>
                      </li>
                    </div>
                  </form>
                </div>
                {/* ============================================================= SEARCH AREA : END ============================================================= */}
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 animate-dropdown top-cart-row">
                {/* ============================================================= SHOPPING CART DROPDOWN ============================================================= */}
                <div className="dropdown dropdown-cart"> <a href="#a" className="dropdown-toggle lnk-cart" data-toggle="dropdown">
                  <div className="items-cart-inner">
                    <div className="basket">
                      <div className="basket-item-count"><span className="count">2</span></div>
                      <div className="total-price-basket"> <span className="lbl">Shopping Cart</span> <span className="value">$4580</span> </div>
                    </div>
                  </div>
                </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="cart-item product-summary">
                        <div className="row">
                          <div className="col-xs-4">
                            <div className="image"> <a href="detail.html"><img src="assets/images/products/p4.jpg" alt="" /></a> </div>
                          </div>
                          <div className="col-xs-7">
                            <h3 className="name"><a href="index8a95.html?page-detail">Simple Product</a></h3>
                            <div className="price">$600.00</div>
                          </div>
                          <div className="col-xs-1 action"> <a href="#a"><i className="fa fa-trash" /></a> </div>
                        </div>
                      </div>
                      <div className="clearfix" />
                      <hr />
                      <div className="clearfix cart-total">
                        <div className="pull-right"> <span className="text">Sub Total :</span><span className="price">$600.00</span> </div>
                        <div className="clearfix" />
                        <a href="checkout.html" className="btn btn-upper btn-primary btn-block m-t-20">Checkout</a>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* ============================================================= SHOPPING CART DROPDOWN : END============================================================= */}
              </div>
            </div>
          </div>
        </div>
        {/* ============================================== NAVBAR ============================================== */}
        {/* <div className="header-nav animate-dropdown">
          <div className="container">
            <div className="yamm navbar navbar-default" role="navigation">
              <div className="navbar-header">
                <button data-target="#mc-horizontal-menu-collapse" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                  <span className="sr-only">Toggle navigation</span> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              </div>
              <div className="nav-bg-class">
                <div className="navbar-collapse collapse" id="mc-horizontal-menu-collapse">
                  <div className="nav-outer">
                    <ul className="nav navbar-nav">
                      <li className="active dropdown"> <a href="home.html">Trang chủ</a> </li>
                      <li className="dropdown mega-menu">
                        <a href="category.html" data-hover="dropdown" className="dropdown-toggle" data-toggle="dropdown">Laptop</a>
                        <ul className="dropdown-menu container">
                          <li>
                            <div className="yamm-content">
                              <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-2 col-menu">
                                  <h2 className="title">Laptop Dell</h2>
                                  <ul className="links">
                                    <li style={{ color: '#A19999', paddingTop: '10%' }}>Laptop Dell Inspiron 15</li>
                                    <li style={{ color: '#A19999', paddingTop: '10%' }}>Laptop Dell Inspiron 15</li>
                                    <li style={{ color: '#A19999', paddingTop: '10%' }}>Laptop Dell Inspiron 15</li>
                                    <li style={{ color: '#A19999', paddingTop: '10%' }}>Laptop Dell Inspiron 15</li>
                                  </ul>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-menu custom-banner"> <a href="#a"><img alt="" src="assets/images/banners/top-menu-banner1.jpg" /></a> </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown  navbar-right special-menu"> <a href="#a">Get 30% off on selected items</a> </li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Navbar/>
        {/* ============================================== NAVBAR : END ============================================== */}
      </header>
    )
  }
}
