import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './js/history';

import BodyIndex from './components/BodyIndex';
import Signin from './components/authentication/Signin';
import Signup from './components/authentication/Signup';
import Profile from './components/accountCenter/profile';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={BodyIndex}></Route>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/profile" component={Profile}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
