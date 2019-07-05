import React, { Component } from "react";
import { Link } from 'react-router-dom';


class Nav extends Component {

  render() {
    return (
      <nav>
        <ul>
          <Link to="/new"><li>Create New</li></Link>
          <Link to="load"><li>Load Existing</li></Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;