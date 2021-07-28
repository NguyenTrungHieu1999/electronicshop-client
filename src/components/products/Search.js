import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { searchProduct } from '../../api/productApi';
import CardItem from '../homes/CardItem';
import LeftMenu from '../homes/LeftMenu';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      offset: 0,
      perPage: 20,
      currentPage: 0,
      keyword: '',
      postData: [],
      sorted: 0,
      price: 0,
      productsData: [],
      isShow: false,
      showData: []
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  onHandleSubmit = (event) => {
    event.preventDefault();
    const { sorted, price, productsData } = this.state;

    let data = [...productsData];

    switch (sorted) {
      case "1":
        data = data.sort((a, b) => a.price - b.price);
        break;
      case "2":
        data = data.sort((a, b) => b.price - a.price);
        break;
    }
    switch (price) {
      case "1":
        data = data.filter(p => p.price < 10000000);
        break;
      case "2":
        data = data.filter(p => p.price >= 10000000 && p.price < 20000000);
        break;
      case "3":
        data = data.filter(p => p.price >= 20000000 && p.price < 40000000);
        break;
      case "4":
        data = data.filter(p => p.price >= 40000000);
        break;
    }

    this.setState({
      showData: data,
      offset: 0,
      currentPage: 0
    },
      async () => await
        this.receivedData()
    )
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    })
  }

  async receivedData() {
    let { showData } = this.state;
    const slice = showData.slice(this.state.offset, this.state.offset + this.state.perPage);

    const postData = slice.map(pd =>
      <CardItem
        product={pd} key={pd.id}
        classCSS="col-lg-15"
      />
    )

    this.setState({
      pageCount: Math.ceil(showData.length / this.state.perPage),
      postData: postData,
      isShow: true
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
        this.receivedData()
      }
    );
  };

  async componentDidMount() {
    const search = this.props.location.search;
    const keyword = new URLSearchParams(search).get("key");
    const resProducts = await searchProduct(keyword);

    if (resProducts && resProducts.isSuccessed) {
      const productsData = resProducts.resultObj;
      this.setState({
        productsData: productsData,
        showData: productsData,
        keyword: keyword
      })
    }

    await this.receivedData();
  }

  render() {
    document.title = "Tìm kiếm";
    let { postData, isShow } = this.state;
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
                <li className="active">Tìm kiếm</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="body-content outer-top-xs">
          <div className='container'>
            <div className='row'>
              <LeftMenu />
              <div className="col-xs-12 col-sm-12 col-md-9 rht-col">
                <div id="category" className="category-carousel hidden-xs">
                  <div className="item">
                    <div className="image"> <img src="/assets/images/banners/cat-banner-1.jpg" alt="" className="img-responsive" /> </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="wide-banners outer-bottom-xs">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/b1.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/b2.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/b3.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="/assets/images/banners/b4.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>

              </div>

              {isShow === false
                ? <h1>Đang tải dữ liệu, vui lòng đợi giây lát</h1>
                : <React.Fragment>
                  <section className="section new-arriavls ProductsByCondition">
                    <form onSubmit={this.onHandleSubmit}>
                      <div className="col col-sm-6 col-md-6 no-padding">
                        <div className="lbl-cnt"> <strong style={{ color: 'Highlight' }} className="lbl">Sắp xếp theo: </strong>
                          <div className="fld inline">
                            <div className="dropdown dropdown-small dropdown-med dropdown-white inline">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  name="sorted"
                                  value={this.state.sorted}
                                  onChange={this.onHandleChange}>
                                  <option value={0}>Mặc định</option>
                                  <option value={1}>Giá tăng dần</option>
                                  <option value={2}>Giá giảm dần</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          &emsp;
                          <div className="fld inline">
                            <div className="dropdown dropdown-small dropdown-med dropdown-white inline">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  name="price"
                                  value={this.state.price}
                                  onChange={this.onHandleChange}>
                                  <option value={0}>Mặc định</option>
                                  <option value={1}>Nhỏ hơn 10.000.000đ</option>
                                  <option value={2}>Từ 10.000.000đ đến nhỏ hơn 20.000.000đ</option>
                                  <option value={3}>Từ 20.000.000đ đến nhỏ hơn 40.000.000đ</option>
                                  <option value={4}>Lớn hơn 40.000.000đ</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn-upper btn btn-primary checkout-page-button">Sắp xếp</button>
                    </form>
                  </section>
                  <div className="clearfix filters-container m-t-10">
                    <div className="row">
                      <div className="col col-sm-6 col-md-3 col-lg-3 col-xs-6">
                        <div className="filter-tabs">
                          <ul id="filter-tabs" className="nav nav-tabs nav-tab-box nav-tab-fa-icon">
                            <li className="active"> <a data-toggle="tab" href="#grid-container"><h3 className="section-title">Tìm kiếm cho từ khóa: "{this.state.keyword}"</h3></a> </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="search-result-container ">
                    <div id="myTabContent" className="tab-content category-list">
                      {postData.length > 0 ?
                        <>
                          <div className="tab-pane active ProductsByCondition" id="grid-container">
                            <div className="category-product">
                              <div className="row">
                                {postData}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={">"}
                              breakLabel={"..."}
                              breakClassName={"break-me"}
                              pageCount={this.state.pageCount}
                              marginPagesDisplayed={4}
                              pageRangeDisplayed={5}
                              onPageChange={this.handlePageClick}
                              containerClassName={"pagination"}
                              subContainerClassName={"pages pagination"}
                              activeClassName={"active"} />
                          </div>
                        </>
                        : "Không tìm thấy sản phẩm"
                      }
                    </div>
                  </div>
                </React.Fragment>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;