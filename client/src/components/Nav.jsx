import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css"

class Nav extends Component {

  render() {
    return (
      <nav>
        <img src="https://trinity.ethereum.org/images/eth-logo@2x.png" alt="" className="logo"/>
        {/* <img src="https://cashforgoldandcoins2.com/wp-content/uploads/2018/10/ethereum-logo-transparent-1.png" alt="" className="logo"/> */}
        <ul className="nav-list">
          <Link to="/" exact><li className="nav-list-item">Home</li></Link>
          <a href="/new"><li className="nav-list-item">Create New</li></a>
          <a href="/load-from-address"><li className="nav-list-item">Load From Address</li></a>
          <Link to="/contract-code"><li className="nav-list-item">Smart Contract</li></Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;