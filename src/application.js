import React, { Component } from "react";

import Home from "./components/home";
import About from "./components/about";
import Dashboard from "./components/dashboard";

import Login from "./components/login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthHelperMethods from './components/auth.helper.methods';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: "false"
    }

    this._handleLogout = this._handleLogout.bind(this);
  }
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout();
  }
  
  componentDidMount() {
    
  }

  render() {
    var toggleShow = "";
    if (this.Auth.getToken() === null) {
      console.log("Get Token is Null")
      toggleShow = "none";
    }

    return (
      <Router>
        <div className="app">
          <div className="navLinks">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li style={{ display: toggleShow }}>
                <button onClick={this._handleLogout}>Log Out</button>
              </li>
            </ul>
          </div>

          <hr />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
