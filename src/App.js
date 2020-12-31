import './App.css';
import Home from './components/homes/Home';
import Header from './components/partials/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Account from './components/account/Account';
import Footer from './components/partials/Footer';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/account' component={Account} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
