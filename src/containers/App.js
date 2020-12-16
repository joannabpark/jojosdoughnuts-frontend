import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Intro from '../components/Intro'
import NavBar from '../components/NavBar.js';
import Home from '../components/Home.js';
import Shop from '../components/Shop.js'
import Cart from '../components/Cart.js'
import ViewOrder from '../components/ViewOrder.js'
import Signup from '../components/Signup.js'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

const stripePromise = loadStripe('pk_test_51HxJWiENcJehCUjak7wjjRu0nMn0iXFHBm2hWXduBt57uEeefBvLzy2Qi7f1XICqlCxYzs25zQfZkf210dnD4kTp00UNDcPTuj');

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar location={window.location}/>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/shop" component={Shop}/>
          <Route exact path='/order' component={ViewOrder}/>
          <Route exact path='/signup' component={Signup}/>
          <div className="AppWrapper">
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <Route exact path="/cart" component={Cart}/>
           </Elements>
           </div>
        </Switch>
      </div>
    </BrowserRouter>
   );
}

export default App;
