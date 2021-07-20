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
                      Gọi +(84) 38 4341 437
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
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="address-block">
                      <div className="module-body">
                        <ul className="toggle-footer">
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
                            <div className="media-body"> <span><a>ElectronicShop0123@gmail.com</a></span> </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="module-heading">
                      <h4 style={{color: 'ButtonHighlight'}} className="module-title">Hỗ trợ khách hàng</h4>
                    </div>
                    <div className="module-body">
                      <ul>
                        <li className="first"><a >Trung tâm bảo hành</a></li>
                        <li><a>Thanh toán và giao hàng</a></li>
                        <li><a>Dịch vụ sửa chữa và bảo trì</a></li>
                        <li className="last"><a>Doanh nghiệp thân thiết</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="module-heading">
                      <h4 style={{ color: 'ButtonHighlight' }} className="module-title">Công ty</h4>
                    </div>
                    <div className="module-body">
                      <ul>
                        <li className="first"><a >Tài khoản</a></li>
                        <li><a>Hỏi đáp</a></li>
                        <li><a >Tin công nghệ</a></li>
                        <li><a >Tuyển dụng</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-2">
                    <div className="module-heading">
                      <h4 style={{ color: 'ButtonHighlight' }} className="module-title">Thông tin</h4>
                    </div>
                    <div className="module-body">
                      <ul>
                        <li className="first"><a>Giới thiệu</a></li>
                        <li className=" last"><a href="/lien-he" title="Suppliers">Liên hệ</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="copyright-bar">
              <div className="container">
                <div className="col-xs-12 col-sm-4 no-padding social">
                  <ul className="link">
                    <li className="fb pull-left"><a target="_blank" rel="nofollow" title="Facebook" /></li>
                    <li className="tw pull-left"><a target="_blank" rel="nofollow" title="Twitter" /></li>
                    <li className="googleplus pull-left"><a target="_blank" rel="nofollow" title="GooglePlus" /></li>
                    <li className="rss pull-left"><a target="_blank" rel="nofollow"  title="RSS" /></li>
                    <li className="pintrest pull-left"><a target="_blank" rel="nofollow" title="PInterest" /></li>
                    <li className="linkedin pull-left"><a target="_blank" rel="nofollow"  title="Linkedin" /></li>
                    <li className="youtube pull-left"><a target="_blank" rel="nofollow"  title="Youtube" /></li>
                  </ul>
                </div>
                <div className="col-xs-12 col-sm-4 no-padding copyright"></div>
                <div className="col-xs-12 col-sm-4 no-padding">
                  <div className="clearfix payment-methods">
                    <ul>
                      <li><img src="assets/images/payments/1.png" alt="" /></li>
                      <li><img src="assets/images/payments/2.png" alt="" /></li>
                      <li><img src="assets/images/payments/3.png" alt="" /></li>
                      <li><img src="assets/images/payments/4.png" alt="" /></li>
                      <li><img src="assets/images/payments/5.png" alt="" /></li>
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
