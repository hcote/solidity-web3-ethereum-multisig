import React, { Component } from "react";
import CreateNew from "./CreateNew.js";
import LoadExisting from "./LoadExisting.jsx";
import Nav from "./Nav.jsx";
import ContractCode from "./ContractCode.jsx";
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
          <Route path="/contract-code" component={ContractCode} />
        </Switch>
      </div>
      </Router>
    );
  }
}

const Home = () => {
  return ( 
    <div>
      <h3>Welcome</h3>
      <ul>
        <li>Create a new wallet by passing in two addresses that will own it.</li>
        <li>Both addresses must request a withdraw within 6000 blocks (roughly 1 day) in order to release funds.</li>
        <li>Both addresses must also request the same address to send the funds to.</li>
      </ul>
    </div>
  )
}

export default App;