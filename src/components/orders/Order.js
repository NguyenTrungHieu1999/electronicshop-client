import moment from 'moment';
import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import orderApi from '../../api/orderApi';
import ReactPaginate from 'react-paginate';
import "./Order.css";
import "../homes/ProductsByCondition.css"
class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 2,
      currentPage: 0,
      postData: [],
      showData: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  clickCancle(orderId) {
    orderApi.cancleMyOrder(orderId)
      .then(res => {
        if (res.data.isSuccessed) {
          this.receivedData();
        }
      })
  }

  clickReceived(orderId) {
    orderApi.confirmReceived(orderId)
      .then(res => {
        if (res.data.isSuccessed) {
          this.receivedData();
        }
      })
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    },
      async () => {
        await this.receivedData()
      }
    );
  };

  receivedData() {
    moment.locale('vi');
    orderApi
      .getAllOrders()
      .then(res => {
        if (res.data && res.data.isSuccessed) {
          const listOrders = res.data.resultObj;
          const postData = [];
          const status = ["Đặt hàng thành công", "Đã được tiếp nhận", "Đang lấy hàng", "Đóng gói xong", "Bàn giao vận chuyển", "Đang giao hàng", "Giao hàng thành công", "Hủy đơn hàng"];

          if (listOrders.length > 0) {
            listOrders.map(order => {
              const steps = [];
              let classCss = "";
              const times = [];
              for (let t = 0; t < 8; t++) {
                let flat = 0;
                order.orderStatusDetails.map(od => {
                  if (od.statusId === t + 1) {
                    flat = 1;
                    times.push(moment(od.createdDate).format('lll'));
                  }
                });
                if (flat === 0) {
                  times.push("");
                }
              }
              for (let index = 0; index < 8; index++) {
                if (index + 1 < order.statusId) {
                  if (times[index] === "" && index !== 0) {
                    classCss = "stepper-item";
                  } else {
                    classCss = "stepper-item completed";
                  }
                } else if (index + 1 === order.statusId) {
                  classCss = "stepper-item active completed";
                } else {
                  classCss = "stepper-item";
                }

                steps.push(
                  <div className={classCss}>
                    <div className="step-counter">{index + 1}</div>
                    <div className="step-name">{status[index]}</div>
                    <div className="step-name">{times[index]}</div>
                  </div>
                )
              }
              postData.push(
                <React.Fragment>
                  <article className="card-1">
                    <div className="card-body-1">
                      <h5><strong>Mã đơn hàng: {order.orderId}</strong></h5>
                      <article className="card-1">
                        <div className="card-body-1 row-1">
                          <div className="col-md-3"> <strong>Thông tin đơn hàng: </strong><br />Điện thoại: {order.phoneNumber} <br />Người nhận: {order.receiver}<br />Địa chỉ: {order.receiversAddress}</div>
                          <div className="col-md-3">
                            <strong>Tổng giá: </strong>
                            <CurrencyFormat
                              value={order.totalPrice}
                              displayType={'text'}
                              thousandSeparator={true} prefix={''}
                              renderText={value => <p>{value}₫</p>}
                            />
                          </div>
                          <div className="col-md-3"> <strong>Ngày giao hàng dự kiến: </strong> <br /> {moment(order.deliveryDate).format('L')} </div>
                          <div className="col-md-3"> <strong>Trạng thái: </strong> <br /> <span style={{ color: 'blueviolet' }}>{order.orderStatus}</span>  </div>
                        </div>
                      </article>
                      <br />
                      <div className="stepper-wrapper">
                        {steps}
                      </div>
                      <hr />
                      <ul className="row-1">
                        <div>
                          {
                            order.products.length > 0 && order.products.map(p => {
                              return (
                                <li className={order.products.length > 1 ? "col-md-6" : "col-md-12"} key={p.productId}>
                                  <figure className="itemside-1 mb-3">
                                    <div className="aside-1"><img src={p.productPhoto} className="img-sm-1 border" /></div>
                                    <figcaption className="info-1 align-self-center">
                                      <a style={{ fontSize: '12px' }}
                                        href={`/san-pham/${p.alias}&${p.productId}`} className="title-1">
                                        {p.productName}
                                      </a>
                                      <p style={{ fontSize: '12px' }} className="text-muted">x{p.quantity}</p>
                                      <CurrencyFormat
                                        value={p.price}
                                        displayType={'text'}
                                        thousandSeparator={true} prefix={''}
                                        renderText={value =>
                                          <p style={{ fontSize: '12px' }}
                                            className="text-muted">{value}₫
                                          </p>}
                                      />
                                    </figcaption>
                                  </figure>
                                </li>
                              )
                            }
                            )
                          }
                        </div>
                      </ul>
                      <hr />
                      {order.statusId < 3
                        ? <button style={{ float: 'right' }} onClick={this.clickCancle.bind(this, order.orderId)} type="submit" className="btn btn-warning">Hủy đơn hàng</button>
                        : <button style={{ float: 'right' }} type="submit" className="btn btn-secondary ">Đã hủy đơn</button>
                      }
                      {order.received === false
                        ? <button style={{ float: 'right', marginRight: '5px' }} onClick={this.clickReceived.bind(this, order.orderId)} type="submit" className="btn btn-warning">Xác nhận đã nhận</button>
                        : <button style={{ float: 'right', marginRight: '5px' }} type="submit" className="btn btn-secondary ">Đã nhận</button>
                      }
                    </div>
                  </article>
                  <br />
                </React.Fragment>
              )
            }
            );
            const showData = postData.slice(this.state.offset, this.state.offset + this.state.perPage);
            this.setState(
              {
                pageCount: Math.ceil(postData.length / this.state.perPage),
                postData: postData,
                showData: showData
              });
          }
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.receivedData();
  }

  render() {
    const { showData } = this.state;
    return (
      <React.Fragment>
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <li
                  onClick={() => this.props.history.push(`/`)}
                  style={{ display: 'inline', cursor: 'pointer' }} className="active"
                >Trang chủ</li>
                <li className="active">Đơn hàng</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="body-content outer-top-xs">
          <div className="container">
            {showData.length > 0 ? showData : <h2>Không tồn tại đơn hàng nào</h2>}
          </div>
          {showData.length > 0 && <div style={{ display: 'flex' }} className="ProductsByCondition">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={1}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"} />
          </div>}
        </div>
      </React.Fragment>
    );
  }
}

export default Orders;