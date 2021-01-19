import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <>
        <div>
          {/* ============================================== INFO BOXES ============================================== */}
          <div className="row our-features-box">
            <div className="container">
              <ul>
                <li>
                  <div className="feature-box">
                    <div className="icon-truck" />
                    <div className="content-blocks">Nhanh chóng, tin cậy</div>
                  </div>
                </li>
                <li>
                  <div className="feature-box">
                    <div className="icon-support" />
                    <div className="content-blocks">
                      call + 1900 10000
            </div>
                  </div>
                </li>
                <li>
                  <div className="feature-box">
                    <div className="icon-money" />
                    <div className="content-blocks">Tiết kiệm</div>
                  </div>
                </li>
                <li>
                  <div className="feature-box">
                    <div className="icon-return" />
                    <div className="content">Ưu đãi thường xuyên</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* /.info-boxes */}
          {/* ============================================== INFO BOXES : END ============================================== */}
          {/* ============================================================= FOOTER ============================================================= */}
          <footer id="footer" className="footer color-bg">
            <div className="footer-bottom">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="address-block">
                      {/* /.module-heading */}
                      <div className="module-body">
                        <ul className="toggle-footer" style={{}}>
                          <li className="media">
                            <div className="pull-left"> <span className="icon fa-stack fa-lg"> <i className="fa fa-map-marker fa-stack-1x fa-inverse" /> </span> </div>
                            <div className="media-body">
                              <p>Số 1, Võ Văn Ngân, Quận Thủ Đức, TP HCM</p>
                            </div>
                          </li>
                          <li className="media">
                            <div className="pull-left"> <span className="icon fa-stack fa-lg"> <i className="fa fa-mobile fa-stack-1x fa-inverse" /> </span> </div>
                            <div className="media-body">
                              <p> + (84) 38 4341 437 </p>
                            </div>
                          </li>
                          <li className="media">
                            <div className="pull-left"> <span className="icon fa-stack fa-lg"> <i className="fa fa-envelope fa-stack-1x fa-inverse" /> </span> </div>
                            <div className="media-body"> <span><a href="#">ElectronicShop0123@gmail.com</a></span> </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* /.module-body */}
                  </div>
                  {/* /.col */}
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="module-heading">
                      <h4 className="module-title">Dịch vụ</h4>
                    </div>
                    {/* /.module-heading */}
                    <div className="module-body">
                      <ul className="list-unstyled">
                        <li className="first"><a href="#" title="Contact us">Tài khoản</a></li>
                        <li><a href="#" title="About us">Lược sử</a></li>
                        <li><a href="#" title="faq">Câu hỏi thường gặp</a></li>
                        <li className="last"><a href="#" title="Where is my order?">Hỗ trợ</a></li>
                      </ul>
                    </div>
                    {/* /.module-body */}
                  </div>
                  {/* /.col */}
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="module-heading">
                      <h4 className="module-title">Công ty</h4>
                    </div>
                    {/* /.module-heading */}
                    <div className="module-body">
                      <ul className="list-unstyled">
                        <li className="first"><a title="Your Account" href="#">Tài khoản</a></li>
                        <li><a title="Addresses" href="#">Thông tin</a></li>
                        <li><a title="Information" href="#">Dịch vụ khách hàng</a></li>
                      </ul>
                    </div>
                    {/* /.module-body */}
                  </div>
                  {/* /.col */}
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="module-heading">
                      <h4 className="module-title">Thông tin</h4>
                    </div>
                    {/* /.module-heading */}
                    <div className="module-body">
                      <ul className="list-unstyled">
                        <li className="first"><a href="#" title="About">Thông tin</a></li>
                        <li className=" last"><a href="/lien-he" title="Suppliers">Liên hệ</a></li>
                      </ul>
                    </div>
                    {/* /.module-body */}
                  </div>
                </div>
              </div>
            </div>
            <div className="copyright-bar">
              <div className="container">
                <div className="col-xs-12 col-sm-4 no-padding social">
                  <ul className="link">
                    <li className="fb pull-left"><a target="_blank" rel="nofollow" href="#" title="Facebook" /></li>
                    <li className="tw pull-left"><a target="_blank" rel="nofollow" href="#" title="Twitter" /></li>
                    <li className="googleplus pull-left"><a target="_blank" rel="nofollow" href="#" title="GooglePlus" /></li>
                    <li className="youtube pull-left"><a target="_blank" rel="nofollow" href="#" title="Youtube" /></li>
                  </ul>
                </div>
                <div className="col-xs-12 col-sm-4 no-padding copyright"> </div>
                <div className="col-xs-12 col-sm-4 no-padding">
                  <div className="clearfix payment-methods">
                    <ul>
                      <li><img src="/assets/images/payments/1.png" alt="" /></li>
                      <li><img src="/assets/images/payments/2.png" alt="" /></li>
                      <li><img src="/assets/images/payments/3.png" alt="" /></li>
                      <li><img src="/assets/images/payments/4.png" alt="" /></li>
                      <li><img src="/assets/images/payments/5.png" alt="" /></li>
                    </ul>
                  </div>
                  {/* /.payment-methods */}
                </div>
              </div>
            </div>
          </footer>
          {/* ============================================================= FOOTER : END============================================================= */}
        </div>
      </>
    )
  }
}
