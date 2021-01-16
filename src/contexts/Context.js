import React, { Component } from "react";

export const ContextApi = React.createContext();

export class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.setState({
      cartItems: JSON.parse(localStorage.getItem('cartItems'))
    })
  }

  addToCart(product, total) {
    debugger
    let cartItems = this.state.cartItems ? this.state.cartItems : [];
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
      console.log("Adding to Cart: ", cartItems);
      // Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    this.setState({
      cartItems: cartItems
    });
  }

  render() {
    return (
      <ContextApi.Provider
        value={{
          cartItems: this.state.cartItems,
          addToCart: this.addToCart
        }}
      >
        {this.props.children}
      </ContextApi.Provider>
    );
  }
}