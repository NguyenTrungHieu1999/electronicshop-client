import React, { Component } from 'react';

class Testimonials extends Component {
  render() {
    return (
      <div className="sidebar-widget outer-top-vs ">
        <div id="advertisement" className="advertisement">
          <div className="item">
            <div className="avatar"><img src="/assets/images/testimonials/member1.png" alt="" /></div>
            <div className="testimonials"><em>"</em> Vtae sodales aliq uam morbi non sem lacus port mollis. Nunc condime tum metus eud molest sed consectetuer. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat.<em>"</em></div>
            <div className="clients_author">John Doe <span>Abc Company</span> </div>
            {/* /.container-fluid */}
          </div>
          {/* /.item */}
          <div className="item">
            <div className="avatar"><img src="/assets/images/testimonials/member3.png" alt="" /></div>
            <div className="testimonials"><em>"</em>Vtae sodales aliq uam morbi non sem lacus port mollis. Nunc condime tum metus eud molest sed consectetuer. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat.<em>"</em></div>
            <div className="clients_author">Stephen Doe <span>Xperia Designs</span> </div>
          </div>
          {/* /.item */}
          <div className="item">
            <div className="avatar"><img src="/assets/images/testimonials/member2.png" alt="" /></div>
            <div className="testimonials"><em>"</em>Vtae sodales aliq uam morbi non sem lacus port mollis. Nunc condime tum metus eud molest sed consectetuer. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat.<em>"</em></div>
            <div className="clients_author">Saraha Smith <span>Datsun &amp; Co</span> </div>
            {/* /.container-fluid */}
          </div>
          {/* /.item */}
        </div>
        {/* /.owl-carousel */}
      </div>
    );
  }
}

export default Testimonials;