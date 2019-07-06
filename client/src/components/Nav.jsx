import React, { Component } from "react";
import "../Nav.css"

class Nav extends Component {

  render() {
    return (
      <nav>
        <ul className="nav-list">
          <a href="/"><li className="nav-list-item">Home</li></a>
          <a href="/new"><li className="nav-list-item">Create New</li></a>
          <a href="/load-from-address"><li className="nav-list-item">Load From Address</li></a>
          <a href="/contract-code"><li className="nav-list-item">Smart Contract</li></a>
        </ul>
      </nav>
    );
  }
}

export default Nav;