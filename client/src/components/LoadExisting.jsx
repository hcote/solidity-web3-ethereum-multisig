import React, { Component } from "react";
import MultiSig from "../contracts/MultiSig.json";
import getWeb3 from "../utils/getWeb3";
import "../styles/loadExisting.css";

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    exContractInstance: null,
    exContractAddress: "",
    exContractAddress2: "",
    exWalletBalance: null,
    owner1: null,
    owner1RequestedWithdraw: null,
    owner1RequestedWithdrawAtBlock: null,
    owner1RequestedWithdrawTo: null,
    owner2: null,
    owner2RequestedWithdraw: null,
    owner2RequestedWithdrawAtBlock: null,
    owner2RequestedWithdrawTo: null,
    withdrawAmount: "",
    withdrawTo: "",
    loading: false,
    disabled: true,
    disabledTwo: true,
    disabledW: true,
    qrCode: null,
  };

  componentDidMount = async () => {
    try {

      this.exContractAddressInput = this.exContractAddressInput.bind(this);
      this.withdrawAmountInput = this.withdrawAmountInput.bind(this);
      this.withdrawToInput = this.withdrawToInput.bind(this);

      this.showTabs = this.showTabs.bind(this);

      this.getExContractInstance = this.getExContractInstance.bind(this);
      this.popDataFromExContract = this.popDataFromExContract.bind(this);
      this.submitWithdraw = this.submitWithdraw.bind(this);

      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({ web3, accounts });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  exContractAddressInput(e) {
    if (e.target.value.length === 42) {
      this.setState({exContractAddress: e.target.value, disabled: false});
    } else {
      this.setState({exContractAddress: e.target.value, disabled: true})
    }
  }

  withdrawAmountInput(e) {
    this.setState({withdrawAmount: e.target.value})
  }

  copyVal(e) {
    window.getSelection().getRangeAt(0);
    document.execCommand("copy");
  }

  withdrawToInput(e) {    
    if (e.target.value.length === 42) {
      this.setState({withdrawTo: e.target.value, disabledW: false});
    } else {
      this.setState({withdrawTo: e.target.value, disabledW: true})
    }
  }

  fillAdr = async (e) => {
    e.preventDefault();
    const { web3 } = this.state;
    const accounts = await web3.eth.getAccounts();
    this.setState({withdrawTo: accounts[0], disabledW: false})
  }

  getExContractInstance = async (e) => {
    e.preventDefault();
    const { web3, exContractAddress } = this.state;
    const instance = await new web3.eth.Contract(MultiSig.abi, exContractAddress);
    var cAddr = exContractAddress;
    this.setState({exContractInstance: instance, exContractAddress2: cAddr, exContractAddress: "", disabledTwo: false, disabled: true })
  }

  popDataFromExContract = async () => {
    const { exContractInstance, web3 } = this.state;
    const accounts = await web3.eth.getAccounts();
    let exWalletBalance;
    let owner1, owner1RequestedWithdraw, owner1RequestedWithdrawAtBlock, owner1RequestedWithdrawTo;
    let owner2, owner2RequestedWithdraw, owner2RequestedWithdrawAtBlock, owner2RequestedWithdrawTo;
    await exContractInstance.methods.balance.call({from: accounts[0]}).then(res=> exWalletBalance = web3.utils.fromWei(res.toString(), 'ether'));
    await exContractInstance.methods.owner1.call({from: accounts[0]}).then(res=> owner1 = res);
    await exContractInstance.methods.owner1RequestedWithdraw.call({from: accounts[0]}).then(res=> owner1RequestedWithdraw = res.toString());
    await exContractInstance.methods.owner1RequestedWithdrawAtBlock.call({from: accounts[0]}).then(res=> owner1RequestedWithdrawAtBlock = res.toNumber());
    await exContractInstance.methods.owner1RequestedWithdrawTo.call({from: accounts[0]}).then(res=> owner1RequestedWithdrawTo = res);
    await exContractInstance.methods.owner2.call({from: accounts[0]}).then(res=> owner2 = res);
    await exContractInstance.methods.owner2RequestedWithdraw.call({from: accounts[0]}).then(res=> owner2RequestedWithdraw = res.toString());
    await exContractInstance.methods.owner2RequestedWithdrawAtBlock.call({from: accounts[0]}).then(res=> owner2RequestedWithdrawAtBlock = res.toNumber());
    await exContractInstance.methods.owner2RequestedWithdrawTo.call({from: accounts[0]}).then(res=> owner2RequestedWithdrawTo = res);  
    this.setState({exWalletBalance: exWalletBalance, owner1: owner1, owner1RequestedWithdraw: owner1RequestedWithdraw, owner1RequestedWithdrawAtBlock: owner1RequestedWithdrawAtBlock, owner1RequestedWithdrawTo: owner1RequestedWithdrawTo, owner2: owner2, owner2RequestedWithdraw: owner2RequestedWithdraw, owner2RequestedWithdrawAtBlock: owner2RequestedWithdrawAtBlock, owner2RequestedWithdrawTo: owner2RequestedWithdrawTo})
  }

  submitWithdraw = async (e) => {
    e.preventDefault();
    const {exContractInstance, web3, withdrawAmount, withdrawTo } = this.state;
    const accounts = await web3.eth.getAccounts();
    const inWei = web3.utils.toWei(withdrawAmount, 'ether');
    await exContractInstance.methods.withdraw(inWei, withdrawTo).send({from: accounts[0]});
    this.setState({withdrawAmount: "", withdrawTo: ""})
  }

  showTabs = (e) => {
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
    if (!this.state.web3) {
      return <div className="App">
      <p>Waiting to connect to MetaMask...</p>
      <img className="loading-icon" src="https://media.giphy.com/media/eJWyod5gLxdcY/giphy.gif" />
    </div>;    }
    return (
      <div className="App">
        <h3 className="header">Get existing multi-sig wallet</h3>
        <form onSubmit={this.getExContractInstance}>
          <input placeholder="At Address..." className="form" type="text" name="exContractAddress" value={this.state.exContractAddress} onChange={this.exContractAddressInput.bind(this)} />
          <br/>
          <input className="form btn" type="submit" value="Get Instance" disabled={this.state.disabled} />
        </form>
        {this.state.owner1 ? <input className="form btn" type="submit" value="Refresh Interface" onClick={this.popDataFromExContract}></input> : <input className="form btn" type="submit" value="Display Interface" onClick={this.popDataFromExContract} disabled={this.state.disabledTwo}></input>}
        
        {this.state.owner1 ?
          <div className="table-container">
            
              <h3 className="home-header">Contract Data</h3>
              <div class="tab">
                <button class="tablinks" value="general" onClick={this.showTabs.bind(this)}>General</button>
                <button class="tablinks" value="owner-one" onClick={this.showTabs.bind(this)}>Owner One</button>
                <button class="tablinks" value="owner-two" onClick={this.showTabs.bind(this)}>Owner Two</button>
                <button class="tablinks" value="withdraw" onClick={this.showTabs.bind(this)}>Withdraw</button>
              </div>

              <div id="general" class="tabcontent">
                <table className="general-table">
                  <tbody>
                    <tr>
                      <td className="table-left"> Contract Address</td>
                      <td onDoubleClick={this.copyVal.bind(this)} className="data table-right">{this.state.exContractAddress2}</td>
                    </tr>
                    <tr className="one">
                      <td className="table-left">Balance</td>
                      <td className="data table-right">{this.state.exWalletBalance} ether</td>
                    </tr>
                    </tbody>
                </table>
              </div>
              


        <table>
        <div id="owner-one" class="tabcontent">
        <tbody>
          <tr className="one">
            <td className="table-left">Address</td>
            <td onDoubleClick={this.copyVal.bind(this)} className="data table-right">{this.state.owner1}</td>
          </tr>
          <tr className="">
            <td className="table-left">Has open withdraw</td>
            <td className="data table-right">{this.state.owner1RequestedWithdraw}</td>
          </tr>
          <tr className="one">
            <td className="table-left">Withdraw requested at block</td>
            <td className="data table-right">{this.state.owner1RequestedWithdrawAtBlock}</td>
          </tr>
          <tr className="">
            <td className="table-left">Requested withdraw to</td>
            <td onDoubleClick={this.copyVal.bind(this)} className="data table-right">{this.state.owner1RequestedWithdrawTo}</td>
          </tr>
          </tbody>

        </div>
        </table>
        <table>
        <div id="owner-two" class="tabcontent">
        <tbody>
          <tr className="one">
            <td className="table-left">Address</td>
            <td onDoubleClick={this.copyVal.bind(this)} className="data table-right">{this.state.owner2}</td>
          </tr>
          <tr>
            <td className="table-left">Has open withdraw</td>
            <td className="data table-right">{this.state.owner2RequestedWithdraw}</td>
          </tr>
          <tr className="one">
            <td className="table-left">Withdraw requested at block</td>
            <td className="data table-right">{this.state.owner2RequestedWithdrawAtBlock}</td>
          </tr>
          <tr>
            <td className="table-left">Requested withdraw to</td>
            <td onDoubleClick={this.copyVal.bind(this)} className="data table-right">{this.state.owner2RequestedWithdrawTo}</td>
          </tr>
          </tbody>

      </div>
      </table>



      <div id="withdraw" class="tabcontent">
      <form className="withdraw-form">
                  <input className="w-form-1" type="number" min={0} placeholder="Ether..." value={this.state.withdrawAmount} onChange={this.withdrawAmountInput.bind(this)}/>
                  <br/>
                  <input className="w-form-2" type="text"  placeholder="To..." value={this.state.withdrawTo} onChange={this.withdrawToInput.bind(this)}/>
                  <input className="fillInAddrBtn" type="submit" value="Auto Fill" onClick={this.fillAdr} />
                  <br/>
                  <input className="w-form-1 w-btn" type="submit" value="Request Withdraw" onClick={this.submitWithdraw} disabled={this.state.disabledW} />
                </form>

        </div>


        </div> 
        : <span></span>}
       
        </div>
    );
  }
}

export default App;

