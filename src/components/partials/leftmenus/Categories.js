import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getAllCategory, getAllProductType } from '../../../api/categoryApi';

class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      productTypes: [],
      rootCates: []
    }
  }

  async componentDidMount() {
    try {
      let categories = await getAllCategory();

      let productTypes = await getAllProductType();

      if (categories.isSuccessed && productTypes.isSuccessed) {
        let cateTemp = [];

        categories.resultObj.map((cate) => {
          if (cate.rootId === null) {
            cateTemp.push(cate)
          }
        });

        console.log("cateTemp: ", cateTemp);
        this.setState({
          categories: categories.resultObj,
          productTypes: productTypes.resultObj,
          rootCates: cateTemp
        });
      }
    } catch (error) {
      console.log("Không thể kết nối với máy chủ.")
    }
  }

  render() {

    const { categories, productTypes, rootCates } = this.state;

    return (
      <div className="side-menu animate-dropdown outer-bottom-xs">
        <div className="head"><i className="icon fa fa-align-justify fa-fw" /> Danh mục sản phẩm</div>
        <nav className="yamm megamenu-horizontal">
          <ul className="nav">
            {productTypes.map(type => {
              return (
                <React.Fragment key={type.id}>
                  <li key={type.id} className="dropdown menu-item"> <a href="" className="dropdown-toggle" data-toggle="dropdown"><i className="icon fa fa-empire" aria-hidden="true" />{type.name}</a>
                    <ul className="dropdown-menu mega-menu" style={{ minWidth: '100%' }}>
                      <li className="yamm-content">
                        <div className="row">
                          {rootCates.map(root => {
                            return (
                              <React.Fragment key={root.id}>
                                {root.productTypeId === type.id &&
                                  <div>
                                    <li
                                      className="dropdown-header"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => window.location.href = (`/${root.alias}&${root.id}`)}
                                    >
                                    <strong>{root.name}</strong>
                                    </li>
                                    {
                                      categories.map(cate => {
                                        return (
                                          <React.Fragment key={cate.id}>
                                            {cate.rootId === root.id &&
                                              <React.Fragment key={cate.id}>
                                                <li
                                                  style={{ cursor: 'pointer' }}
                                                  key={cate.id}
                                                  onClick={() => window.location.href = (`/${cate.alias}&${cate.id}`)}
                                                >
                                                  <a href={`/${cate.alias}&${cate.id}`}>{cate.name}</a>
                                                </li>
                                              </React.Fragment>
                                            }
                                          </React.Fragment>
                                        )
                                      })
                                    }
                                    <li className="divider" />
                                  </div>
                                }
                                {/* {root.productTypeId === type.id &&
                                  <React.Fragment key={root.id}>
                                    <div className="col-sm-12" key={root.id}>
                                      <ul className="links list-unstyled">
                                        <li
                                          style={{ cursor: 'pointer' }}
                                          onClick={() => window.location.href = (`/${root.alias}&${root.id}`)}
                                        >
                                          <strong key={root.id}>{root.name}</strong>
                                        </li>
                                        {
                                          categories.map(cate => {
                                            return (
                                              <React.Fragment key={cate.id}>
                                                {cate.rootId === root.id &&
                                                  <React.Fragment key={cate.id}>
                                                    <li
                                                      style={{ cursor: 'pointer' }}
                                                      key={cate.id}
                                                      onClick={() => window.location.href = (`/${cate.alias}&${cate.id}`)}
                                                    >
                                                      {cate.name}
                                                    </li>
                                                  </React.Fragment>
                                                }
                                              </React.Fragment>
                                            )
                                          })
                                        }
                                      </ul>
                                    </div>
                                  </React.Fragment>
                                } */}
                              </React.Fragment>
                            )
                          })}
                        </div>
                      </li>
                    </ul>
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Categories);