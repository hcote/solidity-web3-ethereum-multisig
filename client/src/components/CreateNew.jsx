import React, { Component } from "react";
import InitNewWallet from "../contracts/InitNewWallet.json";
import getWeb3 from "../utils/getWeb3";
import "../styles/app.css";

// need to deploy to main net and make sure it knows the address

class CreateNew extends Component {
  state = { 
    storageValue: "",
    networkName: "", 
    web3: null, 
    accounts: null, 
    contract: null, 
    newWalAd: "", 
    addr1: "", 
    addr2: "",
    loading: false,
    disabled: true,
    disabledReveal: true,
    qrCode: null,
    confirmations: null,
    txHash: null,
    elapsedTime: 0,
  };

  componentDidMount = async () => {
    try {

      this.handleChange = this.handleChange.bind(this);
      this.handleChang2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId(); 
      
      const deployedNetwork = InitNewWallet.networks[networkId];

      // ISSUE: returns undefined for main net
      // reason - have not deployed contract to main net.
      // console.log(deployedNetwork);
      
      const instance = await new web3.eth.Contract(
        InitNewWallet.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, networkName: networkId });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  copyVal(e) {
    window.getSelection().getRangeAt(0);
    document.execCommand("copy");
  }

  handleChange(e) {
    if (e.target.value.length === 42 && this.state.addr2.length === 42) {
      this.setState({addr1: e.target.value, disabled: false});
    } else {
      this.setState({addr1: e.target.value, disabled: true})
    }
  }

  handleChange2(e) {
    if (e.target.value.length === 42 && this.state.addr1.length === 42) {
      this.setState({addr2: e.target.value, disabled: false});
    } else {
      this.setState({addr2: e.target.value, disabled: true})
    }
  }

  reveal = async () => {
    const { contract } = this.state;
    const newWalAd = await contract.methods.get().call();
    this.setState({newWalAd: newWalAd});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {contract, web3, addr1, addr2 } = this.state;

    // setTimeout(() => {
    //   this.setState({elapsedTime: this.state.elapsedTime++})
    // }, 1000);

    const accounts = await web3.eth.getAccounts();
    contract.methods.initNewWallet(addr1, addr2).send({from: accounts[0]})
      .once('transactionHash', (hash) => {
        this.setState({loading: true, txHash: hash, addr1: "", addr2: "", disabled: true})
      })
      .on('confirmation', (cn, r) => {
        this.setState({loading: false, confirmations: cn, disabledReveal: false});
      })
  }

  render() {
    if (!this.state.web3) {
      return <div className="App">
        <p>Connecting to MetaMask...</p>
        <img className="loading-icon" src="https://media.giphy.com/media/eJWyod5gLxdcY/giphy.gif" />
      </div>;
    }
    return (
      <div className="App">
        <h3 className="header">Create your own multi-sig wallet.</h3>
        <form onSubmit={this.handleSubmit}>
            <input className="form" type="text" name="addr1" placeholder="Address 1..." value={this.state.addr1} onChange={this.handleChange.bind(this)} />
            <br />
            <input className="form" type="text" name="addr2" placeholder="Address 2..." value={this.state.addr2} onChange={this.handleChang2.bind(this)} />
            <br />
          <input className="form btn" type="submit" value="Create" disabled={this.state.disabled} />
        </form>
        <br />
       {this.state.loading ? 
          <div>
            <img className="loading-icon" src="https://media.giphy.com/media/eJWyod5gLxdcY/giphy.gif" />
            <p>Tx is being mined...</p>
            {/* {this.state.elapsedTime !== 0 ? <p>s: {this.state.elapsedTime}</p> : <span></span> } */}
          </div> :
          <div></div>
        }
        {this.state.confirmations ?
                <div className="eth-link-div">Block confirmations: {this.state.confirmations}</div>
           : <span></span>}

        {this.state.txHash ?
         <div className="eth-link-div"><a className="etherscan-link" target="_blank" href={`https://ropsten.etherscan.io/tx/${this.state.txHash}`}>View on Etherscan</a></div>
          : <span></span>
        }
       <input type="submit" value="Reveal New Wallet Address" className="form btn reveal-btn" onClick={this.reveal} disabled={this.state.disabledReveal} />
        <div onDoubleClick={this.copyVal.bind(this)} className="newAddress">{this.state.newWalAd}</div>
        <br />
        {this.state.newWalAd ? <img className="qrcode" src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${this.state.newWalAd}&choe=UTF-8`} alt=""/> : <span></span>}
        <br />
      </div>
    );
  }
}

export default CreateNew;



// show timer
// timeElapsed % 60