import Cookies from "js-cookie";
import React, { Component } from "react";
import cartApi from "../api/cartApi";
import favoriteApi from "../api/favoriteApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContextApi = React.createContext();

export class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      totalPrice: localStorage.getItem('totalPrice') || 0,
      favoriteItems: [],
    };

    this.addToFavorite = this.addToFavorite.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.cleanCart = this.cleanCart.bind(this);
    this.cleanFavorite = this.cleanFavorite.bind(this);
  }

  componentDidMount() {
    if (Cookies.get('isAuth')) {
      favoriteApi.getAllFavorites()
        .then(res => {
          cartApi.getAllCarts().then(res1 => {
            let totalPrice = 0;
            let cartItems = [];
            res1.data && res1.data.resultObj.map(item => {
              totalPrice += item.product.price * item.quantity;
              cartItems.push({
                product: item.product,
                total: item.quantity
              })
            });
            this.setState({
              cartItems: cartItems,
              totalPrice: totalPrice,
              favoriteItems: res.data.resultObj
            })
          });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        totalPrice: localStorage.getItem('totalPrice') || 0
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.totalPrice !== this.state.totalPrice) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        totalPrice: localStorage.getItem('totalPrice') || 0
      })
    }
  }

  addToFavorite(product) {
    if (Cookies.get('isAuth')) {
      favoriteApi.addRemoveFavorites({ productId: product.id })
        .then(res => {
          if (res.data.resultObj === 10) {
            toast.info('Đã thêm sản phẩm vào mục yêu thích', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.warn('Đã xóa sản phẩm khỏi mục yêu thích', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          debugger;
          favoriteApi.getAllFavorites()
            .then(res1 => {
              this.setState({
                favoriteItems: res1.data.resultObj
              })
            }).catch(err1 => console.log(err1));
        }).catch(err => console.log(err));
    } else {
      toast.warn('Hãy đăng nhập vào hệ thống để thêm sản phẩm vào mục yêu thích', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  cleanFavorite() {
    favoriteApi.cleanFavorites()
      .then(res => {
        console.log(res.data);
        this.setState({
          favoriteItems: []
        })
      }).catch(err => console.log(err));
  }

  addToCart(product, total) {
    let cartItems = this.state.cartItems ? this.state.cartItems : [];
    let quantity = 0;
    let totalPrice = 0;
    let hasItem = 0;
    const isAuth = Cookies.get('isAuth');

    cartItems.map(item => {
      quantity += item.total;
    })

    if (quantity >= 100) {
      toast.warn('Bạn chỉ được mua với số lượng từ 100 sản phẩm', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (product.inventory <= 0) {
      toast.warn('Sản phẩm đã hết hàng', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (cartItems) {
        cartItems.map((item, index) => {
          if (item.product.id === product.id) {
            hasItem = 1;
            if (item.total < 5 && item.total < product.inventory) {
              item.total += total;
              cartItems[index] = item;
              toast.info('Đã thêm một sản phẩm vào giỏ hàng', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              if (isAuth) {
                cartApi.updateCarts({ productId: product.id, total: 1 })
                  .then(res => console.log(res.data.resultObj))
                  .catch(err => console.log(err));
              }
            } else {
              toast.warn('Sản phẩm đã đạt giới hạn được phép mua', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }
        });
        if (hasItem === 0 && product.inventory > 0) {
          if (isAuth) {
            cartApi.addCarts({ productId: product.id, quantity: 1 })
              .then(res => console.log(res.data.resultObj))
              .catch(err => console.log(err));
          }
          cartItems.push({
            product: product,
            total: total
          });
          toast.info('Đã thêm một sản phẩm vào giỏ hàng', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }

        cartItems.map(item => {
          totalPrice += item.product.price * item.total;
        })

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.removeItem('totalPrice');
        localStorage.setItem('totalPrice', totalPrice);
      }
      this.setState({
        cartItems: cartItems,
        totalPrice: totalPrice
      });
    }
  }

  removeFromCart(product, total) {
    let cartItems = this.state.cartItems ? this.state.cartItems : [];
    let totalPrice = 0;
    const isAuth = Cookies.get('isAuth');
    if (cartItems) {
      cartItems.map((item, index) => {
        if (item.product.id === product.id) {
          item.total -= total;
          if (item.total < 1) {
            cartItems.splice(index, 1);
          } else {
            cartItems[index] = item;
          }
          if (isAuth) {
            cartApi.updateCarts({ productId: product.id, total: -1 })
              .then(res => console.log(res.data.resultObj))
              .catch(err => console.log(err));
          }
          toast.warn('Đã xóa một sản phẩm khỏi giỏ hàng', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
      cartItems.map(item => {
        totalPrice += item.product.price * item.total;
      })

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.removeItem('totalPrice');
      localStorage.setItem('totalPrice', totalPrice)
    }
    this.setState({
      cartItems: cartItems,
      totalPrice: totalPrice
    });
  }

  removeItem(product) {
    let cartItems = this.state.cartItems ? this.state.cartItems : [];
    let totalPrice = 0;
    const isAuth = Cookies.get('isAuth');
    if (cartItems) {
      cartItems.map((item, index) => {
        if (item.product.id === product.id) {
          if (isAuth) {
            cartApi.updateCarts({ productId: product.id, total: -item.total })
              .then(res => console.log(res.data.resultObj))
              .catch(err => console.log(err));
          }
          cartItems.splice(index, 1);
          toast.warn('Đã xóa sản phẩm khỏi giỏ hàng', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
      cartItems.map(item => {
        totalPrice += item.product.price * item.total;
      })
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.removeItem('totalPrice');
      localStorage.setItem('totalPrice', totalPrice);
    }

    this.setState({
      cartItems: cartItems,
      totalPrice: totalPrice
    });
  }

  cleanCart() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    if (Cookies.get('isAuth')) {
      cartApi.cleanCarts()
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
    toast.warn('Đã xóa tất cả sản phẩm khỏi giỏ hàng', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.setState({
      cartItems: [],
      totalPrice: 0
    })
  }

  render() {
    return (
      <ContextApi.Provider
        value={{
          cartItems: this.state.cartItems,
          totalPrice: this.state.totalPrice,
          favoriteItems: this.state.favoriteItems,
          products: this.state.products,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          removeItem: this.removeItem,
          cleanCart: this.cleanCart,
          addToFavorite: this.addToFavorite,
          cleanFavorite: this.cleanFavorite
        }}
      >
        {this.props.children}
        <ToastContainer />
      </ContextApi.Provider>
    );
  }
}