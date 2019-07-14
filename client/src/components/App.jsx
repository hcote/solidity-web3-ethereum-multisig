import React, { Component } from "react";
import CreateNew from "./CreateNew";
import LoadExisting from "./LoadExisting";
import Nav from "./Nav";
import ContractCode from "./ContractCode";
import Home from "./Home";
import QR from "./QR";
import Search from "./Search";
import "../styles/app.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <Router>
      <div className="container">
        <Nav />
        <Switch> 
          <Route path="/" exact={true} component={Home} />
          <Route path="/new" component={CreateNew} />
          <Route path="/load-from-address" component={LoadExisting} />
          <Route path="/qr-code" component={QR} />
          <Route path="/contract-code" component={ContractCode} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
      {/* <Footer /> */}
      </Router>
    );
  }
}

export default App;