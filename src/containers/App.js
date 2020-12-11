import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Intro from '../components/Intro'
import NavBar from '../components/NavBar.js';
import Home from '../components/Home.js';
import Shop from '../components/Shop.js'
import Login from '../components/Login.js'
import Cart from '../components/Cart.js'

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar location={window.location}/>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/shop" component={Shop}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/cart" component={Cart}/>
        </Switch>
      </div>
    </BrowserRouter>
   );
}

export default App;
