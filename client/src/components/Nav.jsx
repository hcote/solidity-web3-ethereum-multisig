import React, { Component } from "react";
import { Link } from "react-router-dom";
import getWeb3 from "../utils/getWeb3";
import "../styles/nav.css";
import Menu from 'react-burger-menu/lib/menus/slide';

class Nav extends Component {

  state = { 
    networkName: "", 
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      
      var network;
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      if (networkId === 3) {
        network = "Ropsten"
      }
      if (networkId === 1) {
        network = "Main"
      }
      this.setState({ networkName: network });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    return (
      <nav>
        {/* <img src="https://trinity.ethereum.org/images/eth-logo@2x.png" alt="" className="logo"/> */}
        <img src={`https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FSecurity%2Fkey_security1600.png&f=1`} alt="" className="logo"/>
        {this.state.networkName ? <span className="networkName">Network: {this.state.networkName}</span> : <span className="networkName-none">Please connect to Ropsten or Main net.</span>}
        <div className="nav-container">
          <ul className="nav-list">
            <Link to="/" exact><li className="nav-list-item">Home</li></Link>
            <a href="/new"><li className="nav-list-item">Create New</li></a>
            <a href="/load-from-address"><li className="nav-list-item">Load From Address</li></a>
            <Link to="/qr-code"><li className="nav-list-item">QR Code</li></Link>
            {/* <a href="/search"><li className="nav-list-item">Search</li></a> */}
            <Link to="/contract-code"><li className="nav-list-item">Smart Contract</li></Link>
          </ul>
        </div>
        <Menu right   >
        <ul className="nav-list">
            <Link to="/" exact><li className="collapsed-nav-list-item">Home</li></Link>
            <a href="/new"><li className="collapsed-nav-list-item">Create New</li></a>
            <a href="/load-from-address"><li className="collapsed-nav-list-item">Load From Address</li></a>
            <Link to="/qr-code"><li className="collapsed-nav-list-item">QR Code</li></Link>
            {/* <a href="/search"><li className="collapsed-nav-list-item">Search</li></a> */}
            <Link to="/contract-code"><li className="collapsed-nav-list-item">Smart Contract</li></Link>
          </ul>
        </Menu>
      </nav>
    );
  }
}

export default Nav;

