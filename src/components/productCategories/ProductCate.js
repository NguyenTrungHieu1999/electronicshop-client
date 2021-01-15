import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { getCategoryById } from '../../api/categoryApi';
import { getProductByCateId } from '../../api/productApi';
import CardItem from '../homes/CardItem';
import LeftMenu from '../homes/LeftMenu';

class ProductCate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      offset: 0,
      perPage: 20,
      currentPage: 0,
      postData: []
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  async receivedData() {
    const id = this.props.match.params.id;

    try {
      const resCate = await getCategoryById(id);
      const resProducts = await getProductByCateId(id);

      if (resCate && resCate.isSuccessed && resProducts && resProducts.isSuccessed) {
        const productsData = resProducts.resultObj;

        const slice = productsData.slice(this.state.offset, this.state.offset + this.state.perPage);

        const postData = slice.map(pd =>
          <CardItem
            product={pd} key={pd.id}
          />
        )

        this.setState({
          title: resCate.resultObj.name,
          pageCount: Math.ceil(productsData.length / this.state.perPage),
          postData: postData
        })
      }
    } catch (error) {
      console.log(error);
    }
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
    await this.receivedData();
  }

  render() {
    document.title = this.state.title;
    let { postData } = this.state;

    return (
      <React.Fragment>
        <div className="breadcrumb">
          <div className="container">
            <div className="breadcrumb-inner">
              <ul className="list-inline list-unstyled">
                <a href="/" className="disable">Trang chủ /</a>
                <li className="active">{this.state.title}</li>
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
                    <div className="image"> <img src="assets/images/banners/cat-banner-1.jpg" alt="" className="img-responsive" /> </div>
                    <div className="container-fluid">
                      <div className="caption vertical-top text-left">
                        <div className="big-text"> Big Sale </div>
                        <div className="excerpt hidden-sm hidden-md"> Save up to 49% off </div>
                        <div className="excerpt-normal hidden-sm hidden-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </div>
                        <div className="buy-btn"><a href="#" className="lnk btn btn-primary">Show Now</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="wide-banners outer-bottom-xs">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner1.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner3.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner2.jpg" alt="" /> </div>
                      </div>
                      {/* /.wide-banner */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3">
                      <div className="wide-banner cnt-strip">
                        <div className="image"> <img className="img-responsive" src="assets/images/banners/home-banner3.jpg" alt="" /> </div>
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
                        <li className="active"> <a data-toggle="tab" href="#grid-container"><i className="icon fa fa-th-large" />Grid</a> </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col col-sm-12 col-md-5 col-lg-5 hidden-sm">
                    <div className="col col-sm-6 col-md-6 no-padding">
                      <div className="lbl-cnt"> <span className="lbl">Sort by</span>
                        <div className="fld inline">
                          <div className="dropdown dropdown-small dropdown-med dropdown-white inline">
                            <button data-toggle="dropdown" type="button" className="btn dropdown-toggle"> Position <span className="caret" /> </button>
                            <ul role="menu" className="dropdown-menu">
                              <li role="presentation"><a href="#">position</a></li>
                              <li role="presentation"><a href="#">Price:Lowest first</a></li>
                              <li role="presentation"><a href="#">Price:HIghest first</a></li>
                              <li role="presentation"><a href="#">Product Name:A to Z</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col col-sm-6 col-md-6 no-padding hidden-sm hidden-md">
                      <div className="lbl-cnt"> <span className="lbl">Show</span>
                        <div className="fld inline">
                          <div className="dropdown dropdown-small dropdown-med dropdown-white inline">
                            <button data-toggle="dropdown" type="button" className="btn dropdown-toggle"> 1 <span className="caret" /> </button>
                            <ul role="menu" className="dropdown-menu">
                              <li role="presentation"><a href="#">1</a></li>
                              <li role="presentation"><a href="#">2</a></li>
                              <li role="presentation"><a href="#">3</a></li>
                              <li role="presentation"><a href="#">4</a></li>
                              <li role="presentation"><a href="#">5</a></li>
                              <li role="presentation"><a href="#">6</a></li>
                              <li role="presentation"><a href="#">7</a></li>
                              <li role="presentation"><a href="#">8</a></li>
                              <li role="presentation"><a href="#">9</a></li>
                              <li role="presentation"><a href="#">10</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
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
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={this.handlePageClick}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"} />
                      </div>
                      {/* /.tab-pane */}
                    </>
                    : ""
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