import React, { Component } from "react";
import "../styles/home.css"

class Home extends Component {

  state= {};

  componentDidMount = async () => {
    try {
      this.openCity = this.openCity.bind(this);
    } catch (error) {
      console.log(error);
    }
  };

  openCity = (e) => {
    console.log(e.target);
    
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(e.target.value).style.display = "block";    
    e.currentTarget.className += " active";
  }

  render() {
    return ( 
      <div className="instructions">
        <h3 className="home-header">Instructions</h3>
        <div class="tab">
          <button class="tablinks" value="create" onClick={this.openCity.bind(this)}>Create New</button>
          <button class="tablinks" value="load" onClick={this.openCity.bind(this)}>Load From Address</button>
          <button class="tablinks" value="qr" onClick={this.openCity.bind(this)}>QR Code</button>
        </div>

        <div id="create" class="tabcontent">
            <h5>To Create a New Wallet</h5>
            <li className="instructions-item">Enter in the two addresses that will control it and hit "Create".</li>
            <li className="instructions-item">When the tx is mined, you can get the address it's deployed to by clicking "Reveal new wallet address".</li>
        </div>

        <div id="load" class="tabcontent">
          <h5>To Interact With an Existing Wallet</h5>
          <li className="instructions-item">Enter in your multisig wallet address and hit "Get Instance".</li>
          <li className="instructions-item">Hit "Load Interface" to show the contract variables statuses.</li>
        </div>

        <div id="qr" class="tabcontent">
        <h6>Now, in order to withdraw funds, both addresses must: </h6>
            <li className="instructions-item">Request a withdraw within 6000 blocks (roughly 1 day) of each other.</li>
            <li className="instructions-item">Request the same address to send the funds to.</li>
            <li className="instructions-item">The amount that will be withdrawn will be the minimum that both addresses requested to take out.</li>
            <li className="instructions-item">For example, if the contract holds 5 ether and address one requests a withdraw of 3 ether, but address two requests a withdraw of 5 ether, only 3 will be sent (assuming the above conditions are met).</li>
        </div>
      </div>
    )
  }
  
}

export default Home;