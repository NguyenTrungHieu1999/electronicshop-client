import React, { Component } from "react";

export const ContextApi = React.createContext();

export class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      totalPrice: 0,
      favoriteItems: []
    };

    this.addToFavorite = this.addToFavorite.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.cleanCart = this.cleanCart.bind(this);
    this.cleanFavorite = this.cleanFavorite.bind(this);
  }

  componentDidMount() {
    this.setState({
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
      favoriteItems: JSON.parse(localStorage.getItem('favoriteItems')) || [],
      totalPrice: localStorage.getItem('totalPrice') || 0
    })
  }

  addToFavorite(product) {
    let favoriteItems = this.state.favoriteItems ? this.state.favoriteItems : [];
    let hasItem = 0;
    if (favoriteItems) {
      favoriteItems.map((item, index) => {
        if (item.id === product.id) {
          hasItem = 1;
          favoriteItems.splice(index, 1);
          alert('Xóa yêu thích thành công.')
        }
      })
      if (hasItem === 0) {
        favoriteItems.push(product);
        alert('Thêm yêu thích thành công.')
      }

      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    }

    this.setState({
      favoriteItems: favoriteItems
    })
  }

  cleanFavorite() {
    localStorage.removeItem('favoriteItems');
    this.setState({
      favoriteItems: []
    })
  }

  addToCart(product, total) {
    let cartItems = this.state.cartItems ? this.state.cartItems : [];
    let totalPrice = 0;
    let hasItem = 0;
    if (cartItems) {
      cartItems.map((item, index) => {
        if (item.product.id === product.id) {
          hasItem = 1;
          item.total += total;
          cartItems[index] = item;
        }
      });
      if (hasItem === 0) {
        cartItems.push({
          product: product,
          total: total
        });
      }

      cartItems.map(item => {
        totalPrice += item.product.price * item.total;
      })
      console.log("Adding to Cart: ", cartItems);
      // Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.removeItem('totalPrice');
      localStorage.setItem('totalPrice', totalPrice);
    }
    this.setState({
      cartItems: cartItems,
      totalPrice: totalPrice
    });
  }

  removeFromCart(product, total) {
    let cartItems = this.state.cartItems ? this.state.cartItems : [];
    let totalPrice = 0;

    if (cartItems) {
      cartItems.map((item, index) => {
        if (item.product.id === product.id) {
          item.total -= total;
          if (item.total < 1) {
            cartItems.splice(index, 1);
          } else {
            cartItems[index] = item;
          }
        }
      });
      cartItems.map(item => {
        totalPrice += item.product.price * item.total;
      })
      console.log("Adding to Cart: ", cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.removeItem('totalPrice');
      localStorage.setItem('totalPrice', totalPrice);
    }
    this.setState({
      cartItems: cartItems,
      totalPrice: totalPrice
    });
  }

  removeItem(product) {
    let cartItems = this.state.cartItems ? this.state.cartItems : [];
    let totalPrice = 0;
    if (cartItems) {
      cartItems.map((item, index) => {
        if (item.product.id === product.id) {
          cartItems.splice(index, 1);
        }
      });
      cartItems.map(item => {
        totalPrice += item.product.price * item.total;
      })
      console.log("Adding to Cart: ", cartItems);
      // Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
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
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          removeItem: this.removeItem,
          cleanCart: this.cleanCart,
          addToFavorite: this.addToFavorite,
          cleanFavorite: this.cleanFavorite
        }}
      >
        {this.props.children}
      </ContextApi.Provider>
    );
  }
}