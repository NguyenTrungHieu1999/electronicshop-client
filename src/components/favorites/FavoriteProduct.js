import React, { Component } from 'react';
import { ContextApi } from '../../contexts/Context';
import CurrencyFormat from 'react-currency-format';
class FavoriteProduct extends Component {
  render() {
    document.title = "Yêu thích"
    return (
      <React.Fragment>
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <li
                  onClick={() => window.location.href = (`/`)}
                  style={{ display: 'inline', cursor: 'pointer' }} className="active"
                >Trang chủ</li>
                <li className="active">Sản phẩm yêu thích</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="body-content outer-top-xs">
          <div className="container">
            <div className="row ">
              <div className="shopping-cart">
                <div className="shopping-cart-table ">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="cart-description item">Hình ảnh</th>
                          <th className="cart-product-name item">Tên sản phẩm</th>
                          <th className="cart-sub-total item">Giá</th>
                          <th className="cart-romove item">Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        <ContextApi.Consumer>
                          {({ addToFavorite, favoriteItems }) => (
                            favoriteItems.length > 0 && favoriteItems.map(item => {
                              return (
                                <React.Fragment key={item.id}>
                                  <tr>
                                    <td className="cart-image">
                                      <a className="entry-thumbnail"
                                        href={`/san-pham/${item.alias}&${item.id}`}>
                                        <img src={item.productPhotos[0].url} alt="" />
                                      </a>
                                    </td>
                                    <td className="cart-product-name-info">
                                      <h4 className="cart-product-description">
                                        <a href={`/san-pham/${item.alias}&${item.id}`}>
                                          {item.name}
                                        </a>
                                      </h4>
                                      <div className="row">
                                        <div className="col-sm-12">
                                          <div className="reviews">
                                            ({item.inventory > 0 ? `Còn ${item.inventory} sản phẩm` : "Hết hàng"})
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <td className="cart-product-sub-total">{value}₫</td>} />
                                    <td className="romove-item"><span onClick={() => addToFavorite(item)} title="Xóa" className="icon"><i className="fa fa-trash-o"></i></span></td>
                                  </tr>
                                </React.Fragment>
                              )
                            })
                          )}
                        </ContextApi.Consumer>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={7}>
                            <div className="shopping-cart-btn">
                              <span>
                                <ContextApi.Consumer>
                                  {({ cleanFavorite }) => (
                                    <button
                                      className="btn btn-upper btn-danger pull-right"
                                      onClick={() => cleanFavorite()}
                                    >
                                      Xóa toàn bộ sản phẩm yêu thích
                                    </button>
                                  )}
                                </ContextApi.Consumer>
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FavoriteProduct;