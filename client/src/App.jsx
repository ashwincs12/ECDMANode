import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Metamask from "./Metamask";
import React from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  let [signature, setSignature] = React.useState("");
  let [message, setMessage] = React.useState("");

  return (
    <div>
      <div className="mm">
        <Metamask
          signature={signature}
          setSignature={setSignature}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          message={message}
          setMessage={setMessage}
        />{" "}
      </div>
      <div className="app">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          address={address}
          setAddress={setAddress}
        />
        <Transfer setBalance={setBalance} address={address} />
      </div>
    </div>
  );
}

export default App;
