import React, { Component } from "react";
import "../styles/home.css"

class Home extends Component {

  render() {
    return ( 
      <div className="instructions">
        <h3 className="home-header">Instructions</h3>
        <img src="eth_logo.jpg" alt=""/>
        <ol>
          <h5>In tab "Create New"</h5>
          <li>Enter in the two addresses that will control it and hit "Create".</li>
          <li>When the tx is mined, you can get the address it's deployed to by clicking "Reveal new wallet address".</li>
          <h5>In tab "Load From Address"</h5>
          <li>Enter in your multisig wallet address and hit "Get Instance".</li>
          <li>Hit "Load Interface" to show the contract variables statuses.</li>
          <h6>Now, in order to withdraw funds, both addresses must: </h6>
          <li>Request a withdraw within 6000 blocks (roughly 1 day) of each other.</li>
          <li>Request the same address to send the funds to.</li>
          <li>The amount that will be withdrawn will be the minimum that both addresses requested to take out.</li>
          <li>For example, if the contract holds 5 ether and address one requests a withdraw of 3 ether, but address two requests a withdraw of 5 ether, only 3 will be sent (assuming the above conditions are met).</li>
        </ol>
      </div>
    )
  }
  
}

export default Home;