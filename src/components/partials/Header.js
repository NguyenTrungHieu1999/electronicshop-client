import React, { Component } from 'react'
import TopMenu from './TopMenu'

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
                    <img src="assets/images/logo.png" alt="logo"
                    />
                  </a>
                </div>
                {/* ============================================================= LOGO : END ============================================================= */}
              </div>
              <div className="col-lg-7 col-md-6 col-sm-8 col-xs-12 top-search-holder">
                {/* /.contact-row */}
                {/* ============================================================= SEARCH AREA ============================================================= */}
                <div className="search-area">
                  <form>
                    <div className="control-group">
                      <ul className="categories-filter animate-dropdown">
                        <li className="dropdown"> <a className="dropdown-toggle" data-toggle="dropdown" href="category.html">Categories <b className="caret" /></a>
                          <ul className="dropdown-menu" role="menu">
                            <li className="menu-header">Computer</li>
                            <li role="presentation"><a role="menuitem" tabIndex={-1} href="category.html">- Clothing</a></li>
                            <li role="presentation"><a role="menuitem" tabIndex={-1} href="category.html">- Electronics</a></li>
                            <li role="presentation"><a role="menuitem" tabIndex={-1} href="category.html">- Shoes</a></li>
                            <li role="presentation"><a role="menuitem" tabIndex={-1} href="category.html">- Watches</a></li>
                          </ul>
                        </li>
                      </ul>
                      <input className="search-field" placeholder="Search here..." />
                      <a className="search-button" href = "a"></a>
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
        <div className="header-nav animate-dropdown">
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
                      <li className="active dropdown"> <a href="home.html">Home</a> </li>
                      <li className="dropdown mega-menu">
                        <a href="category.html" data-hover="dropdown" className="dropdown-toggle" data-toggle="dropdown">Electronics <span className="menu-label hot-menu hidden-xs">hot</span> </a>
                        <ul className="dropdown-menu container">
                          <li>
                            <div className="yamm-content">
                              <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-2 col-menu">
                                  <h2 className="title">Laptops</h2>
                                  <ul className="links">
                                    <li><a href="#a">Gaming</a></li>
                                    <li><a href="#a">Laptop Skins</a></li>
                                    <li><a href="#a">Apple</a></li>
                                    <li><a href="#a">Dell</a></li>
                                    <li><a href="#a">Lenovo</a></li>
                                    <li><a href="#a">Microsoft</a></li>
                                    <li><a href="#a">Asus</a></li>
                                    <li><a href="#a">Adapters</a></li>
                                    <li><a href="#a">Batteries</a></li>
                                    <li><a href="#a">Cooling Pads</a></li>
                                  </ul>
                                </div>
                                {/* /.col */}
                                <div className="col-xs-12 col-sm-12 col-md-2 col-menu">
                                  <h2 className="title">Desktops</h2>
                                  <ul className="links">
                                    <li><a href="#a">Routers &amp; Modems</a></li>
                                    <li><a href="#a">CPUs, Processors</a></li>
                                    <li><a href="#a">PC Gaming Store</a></li>
                                    <li><a href="#a">Graphics Cards</a></li>
                                    <li><a href="#a">Components</a></li>
                                    <li><a href="#a">Webcam</a></li>
                                    <li><a href="#a">Memory (RAM)</a></li>
                                    <li><a href="#a">Motherboards</a></li>
                                    <li><a href="#a">Keyboards</a></li>
                                    <li><a href="#a">Headphones</a></li>
                                  </ul>
                                </div>
                                {/* /.col */}
                                <div className="col-xs-12 col-sm-12 col-md-2 col-menu">
                                  <h2 className="title">Cameras</h2>
                                  <ul className="links">
                                    <li><a href="#a">Accessories</a></li>
                                    <li><a href="#a">Binoculars</a></li>
                                    <li><a href="#a">Telescopes</a></li>
                                    <li><a href="#a">Camcorders</a></li>
                                    <li><a href="#a">Digital</a></li>
                                    <li><a href="#a">Film Cameras</a></li>
                                    <li><a href="#a">Flashes</a></li>
                                    <li><a href="#a">Lenses</a></li>
                                    <li><a href="#a">Surveillance</a></li>
                                    <li><a href="#a">Tripods</a></li>
                                  </ul>
                                </div>
                                {/* /.col */}
                                <div className="col-xs-12 col-sm-12 col-md-2 col-menu">
                                  <h2 className="title">Mobile Phones</h2>
                                  <ul className="links">
                                    <li><a href="#a">Apple</a></li>
                                    <li><a href="#a">Samsung</a></li>
                                    <li><a href="#a">Lenovo</a></li>
                                    <li><a href="#a">Motorola</a></li>
                                    <li><a href="#a">LeEco</a></li>
                                    <li><a href="#a">Asus</a></li>
                                    <li><a href="#a">Acer</a></li>
                                    <li><a href="#a">Accessories</a></li>
                                    <li><a href="#a">Headphones</a></li>
                                    <li><a href="#a">Memory Cards</a></li>
                                  </ul>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-menu custom-banner"> <a href="#a"><img alt="" src="assets/images/banners/top-menu-banner1.jpg" /></a> </div>
                              </div>
                              {/* /.row */}
                            </div>
                            {/* /.yamm-content */} </li>
                        </ul>
                      </li>
                      <li className="dropdown  navbar-right special-menu"> <a href="#a">Get 30% off on selected items</a> </li>
                    </ul>
                    {/* /.navbar-nav */}
                    <div className="clearfix" />
                  </div>
                  {/* /.nav-outer */}
                </div>
                {/* /.navbar-collapse */}
              </div>
              {/* /.nav-bg-class */}
            </div>
            {/* /.navbar-default */}
          </div>
          {/* /.container-class */}
        </div>
        {/* /.header-nav */}
        {/* ============================================== NAVBAR : END ============================================== */}
      </header>
    )
  }
}
