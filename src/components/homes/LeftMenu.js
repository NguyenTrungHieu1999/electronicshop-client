import React, { Component } from 'react';
import Categories from '../partials/leftmenus/Categories';
import HotDeals from '../partials/leftmenus/HotDeals';
import Testimonials from '../partials/leftmenus/Testimonials';

class LeftMenu extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-3 sidebar">
        {/* ================================== TOP NAVIGATION ================================== */}
        <Categories />
        {/* ================================== TOP NAVIGATION : END ================================== */}
        {/* ============================================== SPECIAL OFFER ============================================== */}
        <HotDeals />
        {/* ============================================== SPECIAL OFFER : END ============================================== */}
        {/* ============================================== Testimonials============================================== */}
        <Testimonials />
        {/* ============================================== Testimonials: END ============================================== */}
      </div>
    );
  }
}

export default LeftMenu;