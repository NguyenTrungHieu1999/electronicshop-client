import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { getCategoryById } from '../../api/categoryApi';
import { getProductByCateId } from '../../api/productApi';
import CardItem from '../homes/CardItem';
import LeftMenu from '../homes/LeftMenu';
import "../homes/ProductsByCondition.css";

class ProductCate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      rootTitle: '',
      rootCate: [],
      offset: 0,
      perPage: 20,
      currentPage: 0,
      postData: [],
      sorted: 0,
      price: 0,
      productsData: []
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    })
  }

  onHandleSubmit = async (event) => {
    event.preventDefault();
    const { sorted, price } = this.state;
    const id = this.props.match.params.id;

    try {
      const resCate = await getCategoryById(id);
      const resProducts = await getProductByCateId(id);

      if (resCate && resCate.isSuccessed && resProducts && resProducts.isSuccessed) {
        const productsData = resProducts.resultObj;
        let rootTitle = "";
        let rootCate = [];
        if (resCate.resultObj.rootId !== null) {
          const resRootCate = await getCategoryById(resCate.resultObj.rootId);
          rootTitle = resRootCate.resultObj.name;
          rootCate = resRootCate.resultObj;
        }
        this.setState({
          title: resCate.resultObj.name,
          rootCate: rootCate,
          rootTitle: rootTitle,
          productsData: productsData
        })
      }
    } catch { }

    let data = [...this.state.productsData];

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
      productsData: data
    })

    await this.receivedData();
  }

  async receivedData() {
    const { productsData } = this.state;
    const slice = productsData.slice(this.state.offset, this.state.offset + this.state.perPage);

    const postData = slice.map(pd =>
      <CardItem
        product={pd} key={pd.id}
        classCSS="col-lg-15"
      />
    )

    this.setState({
      pageCount: Math.ceil(productsData.length / this.state.perPage),
      postData: postData
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

  async componentDidMount() {
    const id = this.props.match.params.id;

    try {
      const resCate = await getCategoryById(id);
      const resProducts = await getProductByCateId(id);

      if (resCate && resCate.isSuccessed && resProducts && resProducts.isSuccessed) {
        const productsData = resProducts.resultObj;
        let rootTitle = "";
        let rootCate = [];
        if (resCate.resultObj.rootId !== null) {
          const resRootCate = await getCategoryById(resCate.resultObj.rootId);
          rootTitle = resRootCate.resultObj.name;
          rootCate = resRootCate.resultObj;
        }
        this.setState({
          title: resCate.resultObj.name,
          rootCate: rootCate,
          rootTitle: rootTitle,
          productsData: productsData
        })
      }
    } catch (err) { console.log(err) }

    await this.receivedData();
  }

  render() {
    document.title = "Danh mục sản phẩm";
    let { postData, rootCate, rootTitle, title } = this.state;
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
                {rootTitle === ""
                  ? <li className="active">{title}</li>
                  : <React.Fragment>
                    <li
                      onClick={() => window.location.href = (`/${rootCate.alias}&${rootCate.id}`)}
                      style={{ display: 'inline', cursor: 'pointer' }} className="active"
                    >{rootTitle}</li>
                    <li className="active">{title}</li>
                  </React.Fragment>
                }
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
                    <div className="image"> <img src="/assets/images/sliders/02.jpg" alt="" className="img-responsive" /> </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="wide-banners outer-bottom-xs">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/b1.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/b2.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/b3.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/b4.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>

              </div>

              <div className="clearfix filters-container m-t-10">
                <div className="row">
                  <div className="col col-sm-6 col-md-3 col-lg-3 col-xs-6">
                    <div className="filter-tabs">
                      <ul id="filter-tabs" className="nav nav-tabs nav-tab-box nav-tab-fa-icon">
                        <li className="active"> <a data-toggle="tab" href="#grid-container"><h3 className="section-title">{this.state.title}</h3></a> </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="search-result-container ">
                <div id="myTabContent" className="tab-content category-list">
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
                  
                  {postData.length > 0 ?
                    <React.Fragment>
                      <div className="tab-pane active ProductsByCondition" id="grid-container">
                        <div className="category-product">
                          <div className="row">
                            {postData}
                          </div>
                        </div>
                      </div>
                      {postData.length > 0
                        && <div style={{ display: 'flex' }} className="ProductsByCondition">
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={5}
                            pageRangeDisplayed={4}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                        </div>
                      }
                      {/* /.tab-pane */}
                    </React.Fragment>
                    : "Không có sản phẩm"
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductCate;