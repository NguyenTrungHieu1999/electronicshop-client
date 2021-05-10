import React, { Component } from 'react';
import Navbar from './Navbar';
import TopMenu from './TopMenu';
import Logo from '../../logo.png';
import { ContextApi } from '../../contexts/Context';
import { withRouter } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    })
  }

  onHandleClick = (event) => {
//    event.preventDefault();
    window.location.href = (`/tim-kiem/${this.state.keyword}`);
  }
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
                        <li className="dropdown"> <a href='' className="dropdown-toggle" data-toggle="dropdown">Tìm kiếm<b className="caret" /></a>
                        </li>
                      </ul>
                      <input
                        className="search-field"
                        placeholder="Nhập từ khóa để tìm kiếm..."
                        style={{ outline: 'none' }}
                        value={this.state.keyword}
                        name='keyword'
                        onChange={this.onHandleChange}
                        onKeyDown={(event) => {
                          if (event.keyCode === 13) {
                            event.preventDefault();
                            this.onHandleClick();
                          }
                        }}
                      />
                      <li
                        onClick={this.onHandleClick}
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
                {<ContextApi.Consumer>
                  {({ cartItems, totalPrice }) => (
                    <div onClick={() => this.props.history.push('/gio-hang')}
                      style={{ cursor: 'pointer' }}
                      className="dropdown dropdown-cart">
                      <span className="dropdown-toggle lnk-cart" data-toggle="dropdown">
                        <div className="items-cart-inner">
                          <div className="basket">
                            <div className="basket-item-count"><span className="count">{cartItems ? cartItems.length : 0}</span></div>
                            <div className="total-price-basket">
                              <span className="lbl">Tổng tiền</span>
                              <CurrencyFormat value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="price-before-discount">{value}₫</span>} />
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  )}
                </ContextApi.Consumer>}

                {/* ============================================================= SHOPPING CART DROPDOWN : END============================================================= */}
              </div>
            </div>
          </div>
        </div>
        {/* ============================================== NAVBAR ============================================== */}
        <Navbar />
        {/* ============================================== NAVBAR : END ============================================== */}
      </header>
    )
  }
}
export default withRouter(Header);