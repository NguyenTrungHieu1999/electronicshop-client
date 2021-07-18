import React, { Component } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
class Contact extends Component {
  render() {
    document.title = "Liên hệ";
    return (
      <React.Fragment>
        <div>
          <div className="breadcrumb">
            <div className="container">
              <div className="breadcrumb-inner">
                <ul className="list-inline list-unstyled">
                  <a href="/" className="disable">Trang chủ /</a>
                  <li className="active">Liên hệ</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="body-content">
            <div className="container">
              <div className="contact-page">
                <div className="row">
                  <div className="col-md-12 contact-map outer-bottom-vs">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4835511130136!2d106.76968971406906!3d10.850778592271137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175270ad28d48ab%3A0xa6c02de0a7c40d6c!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIEvhu7kgVGh14bqtdCBUUC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1591024815892!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} />
                  </div>
                  <div className="col-md-4 contact-info">
                    <div className="contact-title">
                      <h4>Thông tin</h4>
                    </div>
                    <div className="clearfix address">
                      <span className="contact-i"><i className="fa fa-map-marker"></i></span>
                      <span className="contact-span">Số 1, Võ Văn Ngân, P.Linh Chiểu, Q.Thủ Đức, TP HCM</span>
                    </div>
                    <div className="clearfix phone-no">
                      <span className="contact-i"><i className="fa fa-mobile"></i></span>
                      <span class="contact-span">+(84) 38 4341 437</span>
                    </div>
                    <div className="clearfix email">
                      <span className="contact-i"><i className="fa fa-envelope"></i></span>
                      <span className="contact-span"><a href="#">electronicshop0123@gmail.com</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MessengerCustomerChat
          pageId="136478068166816"
          appId="102090245499672"
        />
      </React.Fragment>
    );
  }
}

export default Contact;