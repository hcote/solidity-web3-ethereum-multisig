import React, { Component } from "react";
import CreateNew from "./CreateNew.js";
import LoadExisting from "./LoadExisting.jsx";
import Nav from "./Nav.jsx";
import "../App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <Nav />
        <Switch> 
          <Route path="/" exact component={Home} />
          <Route path="/new" component={CreateNew} />
          <Route path="/load-from-address" component={LoadExisting} />
        </Switch>
      </div>
      </Router>
    );
  }
}

const Home = () => {
  return (<div>
    <h3>Home</h3>
  </div>)
}

export default App;