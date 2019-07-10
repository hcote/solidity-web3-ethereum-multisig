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
        <h3 className="home-header">Instructions by Tab</h3>
        <div class="tab">
          <button class="tablinks" value="create" onClick={this.openCity.bind(this)}>Create New</button>
          <button class="tablinks" value="load" onClick={this.openCity.bind(this)}>Load From Address</button>
          <button class="tablinks" value="qr" onClick={this.openCity.bind(this)}>QR Code</button>
        </div>

        <div id="create" class="tabcontent">
        <ol>
            <li className="instructions-item first-item">Enter in the two addresses that will control it and hit "Create".</li>
            <li className="instructions-item">Once the tx is mined, you can get the address it's deployed to by clicking "Reveal new wallet address".</li>
          </ol>
        </div>

        <div id="load" class="tabcontent">
        <ol>
          <li className="instructions-item first-item">Enter in your multisig wallet address and click "Get Instance".</li>
          <li className="instructions-item">Click "Display Interface" to show the contract variables and values.</li>
          <li className="instructions-item">To withdraw, submit a request through the withdraw form.</li>
          </ol>
        <h5 className="center">In order to withdraw funds, both addresses must: </h5>
            <ol>
            <li className="instructions-item">Request a withdraw within 6000 blocks (roughly 1 day) of each other.</li>
            <li className="instructions-item">Request the same address to send the funds to.</li>
            <li className="instructions-item">The amount that will be withdrawn will be the minimum that both addresses requested to take out.</li>
            <ul>
            <li className="instructions-item">For example, if the contract holds 5 ether and address one withdraws 3 ether, but address two requests to withdraw 5 ether, only 3 will be sent (assuming the above conditions are met).</li>
            </ul>
            </ol>
        </div>

        <div id="qr" class="tabcontent">
        <ol>
        {/* <h5 className="first-item center">It's easy to send money to your multisig wallet.</h5> */}
        <li className="instructions-item first-item">Just enter in the address to generate your unique QR code.</li>
        <li className="instructions-item">From there you can deposit money using a mobile wallet app.</li>
        </ol>
      </div>
        </div>
    )
  }
  
}

export default Home;