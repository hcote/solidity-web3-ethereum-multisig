import React, { Component } from "react";
import getWeb3 from "../utils/getWeb3";
import "../styles/app.css";
import axios from 'axios';

class Search extends Component {

  state = {
    networkId: null,
    mainnetContract: "0x37A6b4343D641B095E839509dBCA664DD647BB4c",
    ropstenContract: "0x37ca6F372A91B794CB2995164F8B19c7372f658e",
    walletAddresses: null,
  }

  componentDidMount = async () => {
    try {
      this.getWallets = this.getWallets.bind(this)
      this.getWalletsRopsten = this.getWalletsRopsten.bind(this)
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      
      var network;
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      if (networkId === 3) {
        this.setState({ networkName: network });
      }
      if (networkId === 1) {
        network = "Main"
      }
      this.setState({ networkId });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    
  }

  getWallets = (e) => {
    e.preventDefault();
    var wallets = [];
    axios.get('https://api.etherscan.io/api?module=account&action=txlistinternal&address=0x37A6b4343D641B095E839509dBCA664DD647BB4c&apikey=J7K9XSP96V257PGTUPV6XJRSYTNMKD5M37')
    .then(json => json.data.result.forEach((adr) => {
      wallets.push(adr.contractAddress)
      this.setState({walletAddresses: wallets})
    }))
  }

  getWalletsRopsten = (e) => {
    e.preventDefault();
    var wallets = [];
    axios.get('https://api-ropsten.etherscan.io/api?module=account&action=txlistinternal&address=0x37ca6F372A91B794CB2995164F8B19c7372f658e&apikey=J7K9XSP96V257PGTUPV6XJRSYTNMKD5M37')
    .then(json => json.data.result.forEach((adr) => {
      wallets.push(adr.contractAddress)
      this.setState({walletAddresses: wallets})
    }))
  }

  // axios.get('https://api.etherscan.io/api?module=account&action=txlist&address=0xb4030d49136f75Dc582bDa4280f210Ba3e72b790&apikey=J7K9XSP96V257PGTUPV6XJRSYTNMKD5M37')
  // .then(json => json.data.result.forEach((adr) => {


  render() {
    return (
      <div className="App">
        <h3>Search All Multisig Wallets</h3>
        {this.state.networkId === 1 ? 
        <form onSubmit={this.getWallets}>
          <input value="Load Addresses" type="submit" className="form btn"/> 
        </form> :
        <form onSubmit={this.getWalletsRopsten}>
          <input value="Load Addresses" type="submit"  className="form btn"/>
        </form>
        }
        
        {this.state.walletAddresses ? <div className="wallet-list">{this.state.walletAddresses.map((adr, i)=> {
            return <li key={i} className="wallet-item">{adr}</li>
          })}</div> : <p></p> }
        
      </div>
    );
  }
}

export default Search;

// enter in address which will call etherscan API to 
// display all multisig wallets created by that account
  // DOES NOT SHOW OWNERS 