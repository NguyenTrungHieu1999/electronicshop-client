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
            classCSS="col-lg-15"
          />
        )

        this.setState({
          title: resCate.resultObj.name,
          pageCount: Math.ceil(postData.length / this.state.perPage),
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
                <li
                  onClick={() => this.props.history.push(`/`)}
                  style={{ display: 'inline', cursor: 'pointer' }} className="active"
                >Trang chủ</li>
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
                  {postData.length > 0 ?
                    <React.Fragment>
                      <div className="tab-pane active ProductsByCondition" id="grid-container">
                        <div className="category-product">
                          <div className="row">
                            {postData}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex' }} className="ProductsByCondition">
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
                    </React.Fragment>
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