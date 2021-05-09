import React, { Component } from 'react';
import { getAllCategory } from '../../api/categoryApi';
import { getAllProduct } from '../../api/productApi';
import CardItem from './CardItem';
import "./ProductsByCondition.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class ProductsByCondition extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      postData: []
    };
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
        const postData = products.map(pd =>
          <CardItem
            product={pd} key={pd.id}
          />
        )

        this.setState({
          products: products,
          postData: postData
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    await this.receivedData();
  }


  render() {

    let { title } = this.props;
    let { postData } = this.state;

    var settings = {
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplaySpeed: 5000,
      autoplay: false,
      speed: 1000
    };

    return (
      <React.Fragment>
        <section className="section new-arriavls ProductsByCondition">
          <h3 className="section-title">{title}</h3>
          {postData.length > 0
            ? <>
              <div className="search-result-container ">
                <div id="myTabContent" className="tab-content category-list">
                  <div className="tab-pane active" >
                    <div className="category-product">
                      <div className="row">
                        <Slider {...settings}>
                          {postData}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
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