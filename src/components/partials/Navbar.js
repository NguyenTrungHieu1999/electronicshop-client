import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
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
                      <li className="active dropdown"> <a href="/">Trang chủ</a> </li>
                      {/* <li className="dropdown mega-menu">
                        <a href="" data-hover="dropdown" className="dropdown-toggle" data-toggle="dropdown">Giới thiệu</a>
                      </li> */}
                      <li className="dropdown mega-menu">
                        <a href="" onClick={() => { this.props.history.push("/lien-he")}} data-hover="dropdown" className="dropdown-toggle" data-toggle="dropdown">Liên hệ</a>
                      </li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default withRouter(Navbar);