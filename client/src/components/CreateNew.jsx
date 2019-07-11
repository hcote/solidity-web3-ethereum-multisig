import React, { Component } from "react";
import InitNewWallet from "../contracts/InitNewWallet.json";
import getWeb3 from "../utils/getWeb3";
import "../styles/app.css";

class CreateNew extends Component {
  state = { 
    storageValue: "", 
    web3: null, 
    accounts: null, 
    contract: null, 
    newWalAd: "", 
    addr1: "", 
    addr2: "",
    loading: false,
    disabled: true,
    qrCode: null,
    confirmations: null,
    txHash: null,
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
      const instance = await new web3.eth.Contract(
        InitNewWallet.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
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
    // not working...
    const newWalAd = await contract.methods.get().call();
    this.setState({newWalAd: newWalAd});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {contract, web3, addr1, addr2 } = this.state;
    const accounts = await web3.eth.getAccounts();
    this.setState({loading: true});
    contract.methods.initNewWallet(addr1, addr2).send({from: accounts[0]})
      .on('confirmation', (cn, r) => {
        console.log(r);
        this.setState({loading: false, confirmations: cn, txHash: r.transactionHash});
      })
    this.setState({addr1: "", addr2: "", disabled: true});
  }

  render() {
    if (!this.state.web3) {
      return <div className="App">
        <p>Waiting to connect to MetaMask...</p>
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
          </div> :
          <div></div>
        }
        {this.state.confirmations ?
              <div>
                <div>Block confirmations: {this.state.confirmations}</div>
                <div><a className="etherscan-link" target="_blank" href={`https://ropsten.etherscan.io/tx/${this.state.txHash}`}>Etherscan</a></div>
                </div>
           : <span></span>}
       <button className="form btn reveal-btn" onClick={this.reveal}>Reveal New Wallet Address</button>
        <div onDoubleClick={this.copyVal.bind(this)} >{this.state.newWalAd}</div>
        <br />
        {this.state.newWalAd ? <img src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${this.state.newWalAd}&choe=UTF-8`} alt=""/> : <span></span>}
        <br />
      </div>
    );
  }
}

export default CreateNew;


// show loading only after metamask confirms tx
// get to line after await (clear form, loading: false)
// copy to clipboard new wallet address