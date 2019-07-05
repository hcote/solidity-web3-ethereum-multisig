import React, { Component } from "react";

class Nav extends Component {

  render() {
    return (
      <nav>
        <ul>
          <a href="/"><li>Home</li></a>
          <a href="/new"><li>Create New</li></a>
          <a href="/load-from-address"><li>Load From Address</li></a>
        </ul>
      </nav>
    );
  }
}

export default Nav;