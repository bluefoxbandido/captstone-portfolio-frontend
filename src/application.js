import React from 'react';
import Home from './pages/home';
import About from './pages/about';
import Dashboard from './pages/dashboard';
import Login from './pages/login'



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




const App = () => {
  return (
    <Router>
      <div className='app'>
        <div className='navLinks'>
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
          </ul>
        </div>

        <hr />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;