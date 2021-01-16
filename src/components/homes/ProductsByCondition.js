import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllCategory } from '../../api/categoryApi';
import { getAllProduct } from '../../api/productApi';
import CardItem from './CardItem';
import "./ProductsByCondition.css";


class ProductsByCondition extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      offset: 0,
      perPage: 5,
      currentPage: 0,
      postData: []
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  async receivedData() {
    try {
      let res = await getAllProduct();

      let resCate = await getAllCategory();

      if (res && res.isSuccessed && resCate && resCate.isSuccessed) {
        const productData = res.resultObj;
        const categories = resCate.resultObj;

        let cateData = []
        categories.map(cate => {
          if (cate.productTypeId === this.props.id && cate.rootId !== null) {
            cateData.push(cate);
          }
        });

        let products = [];
        productData.map(product => {
          cateData.map(cate => {
            if (product.categoryId === cate.id) {
              products.push(product);
            }
          })
        });

        const slice = products.slice(this.state.offset, this.state.offset + this.state.perPage);
        const postData = slice.map(pd =>
          <CardItem
            product={pd} key={pd.id}
          />
        )

        this.setState({
          pageCount: Math.ceil(productData.length / this.state.perPage),
          products: productData,
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

    let { title } = this.props;
    let { postData } = this.state;

    return (
      <React.Fragment>
        <section className="section new-arriavls ProductsByCondition">
          <h3 className="section-title">{title}</h3>
          {postData.length > 0
            ? <>
              <div className="search-result-container ">
                <div id="myTabContent" className="tab-content category-list">
                  <div className="tab-pane active " id="grid-container">
                    <div className="category-product">
                      <div className="row">
                        {postData}
                      </div>
                    </div>
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

            </>
            : <h4>Không có sản phẩm</h4>
          }
        </section >
      </React.Fragment>
    );
  }
}

export default ProductsByCondition;