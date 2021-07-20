import './App.css';
import Home from './components/homes/Home';
import Header from './components/partials/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Account from './components/account/Account';
import Footer from './components/partials/Footer';
import ProductCate from './components/productCategories/ProductCate';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Product from './components/products/Product';
import { ContextProvider } from './contexts/Context';
import ShoppingCart from './components/carts/ShoppingCart';
import Search from './components/products/Search';
import FavoriteProduct from './components/favorites/FavoriteProduct';
import Profile from './components/users/Profile';
import Contact from './components/contact/Contact';
import Orders from './components/orders/Order';
import React from 'react';
function App() {
  return (
    <React.Fragment>
      <ContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/tai-khoan' component={Account} />
            <Route path='/:alias&:id' component={ProductCate} />
            <Route path='/chinh-sua-mat-khau' component={ForgotPassword} />
            <Route path="/tao-moi-mat-khau/:email/:token+" component={ResetPassword} />
            <Route path='/san-pham/:alias&:id' component={Product} />
            <Route path='/gio-hang' component={ShoppingCart} />
            <Route path='/tim-kiem' component={Search} />
            <Route path ='/yeu-thich' component={FavoriteProduct}/>
            <Route path='/thong-tin-tai-khoan' component={Profile}/>
            <Route path='/lien-he' component={Contact} />
            <Route path='/don-mua' component={Orders}/>
          </Switch>
          <Footer />
        </Router>
      </ContextProvider>
    </React.Fragment>
  );
}

export default App;
