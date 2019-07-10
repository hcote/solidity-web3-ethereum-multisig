import React, { Component } from "react";
import "../styles/app.css";


class QR extends Component {
  state = { 
    address: "",
    disabled: true,
    qrCode: false,
  };

  componentDidMount = async () => {
    try {
      this.addressInput = this.addressInput.bind(this);
    } catch (error) {
      console.log(error);
    }
  };

  addressInput = (e) => {
    if (e.target.value.length == 42) {
      this.setState({address: e.target.value, disabled: false});
    } else {
      this.setState({address: e.target.value, disabled: true})
    }
  }

  genQRCode = (e) => {
    e.preventDefault();
    this.setState({qrCode: true});
  }

  render() {
    return (
      <div className="App">
        <h3>Enter Address for QR Code</h3>
        <form onSubmit={this.genQRCode}>
          <input placeholder="Address..." className="form" type="text" value={this.state.address} onChange={this.addressInput.bind(this)} />
          <br/>
          <input className="form btn" type="submit" value="Generate Code" disabled={this.state.disabled}/>
        </form>
        {this.state.qrCode ? <img className="qr-code" src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${this.state.address}&choe=UTF-8`} alt=""/> : <span></span>}
      </div>
    )
  }
}


export default QR;