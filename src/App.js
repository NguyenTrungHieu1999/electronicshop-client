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
import {ContextProvider} from './contexts/Context';

function App() {
  return (
    <>
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
          </Switch>
          <Footer />
        </Router>
      </ContextProvider>
    </>
    
  );
}

export default App;
