import React, { Component } from "react";
import CreateNew from "./CreateNew.js";
import LoadExisting from "./LoadExisting.js";
import "../App.css";

class App extends Component {

  render() {
    return (
      <div>
      <CreateNew />
      <LoadExisting />
      </div>
    );
  }
}

export default App;