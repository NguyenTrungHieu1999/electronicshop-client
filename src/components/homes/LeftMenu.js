import React, { Component } from 'react';
import Categories from '../partials/leftmenus/Categories';

class LeftMenu extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-3 sidebar">
        <Categories />
      </div>
    );
  }
}

export default LeftMenu;