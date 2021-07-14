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

  async receivedData() {
    let { productsData } = this.state;
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
        keyword: keyword
      })
    }

    await this.receivedData();
  }

  render() {
    document.title = "Tìm kiếm";
    let { postData } = this.state;
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
                    {/* <div className="container-fluid">
                      <div className="caption vertical-top text-left">
                        <div className="big-text"> Big Sale </div>
                        <div className="excerpt hidden-sm hidden-md"> Save up to 49% off </div>
                        <div className="excerpt-normal hidden-sm hidden-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </div>
                        <div className="buy-btn"><a href="#" className="lnk btn btn-primary">Show Now</a></div>
                      </div>
                    </div> */}
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;