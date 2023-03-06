import React from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "@noble/secp256k1";
import { Buffer } from "buffer";
import server from "./server";

export default function Metamask(props) {
  //let signature=secp.sign()
  // let [privateKey, setPrivateKey] = React.useState("");
  // let [message, setMessage] = React.useState("");
  function onChange(event) {
    if (event.target.name == "privateKey") {
      props.setPrivateKey(event.target.value);
    } else {
      props.setMessage(event.target.value);
    }
  }
  // let [signature, setSignature] = React.useState("");
  async function handleClick() {
    let hashedmsg = keccak256(utf8ToBytes(props.message));
    let signed = await secp.sign(hashedmsg, props.privateKey, {
      recovered: true,
    });
    const buffer = Buffer.from(signed[0]);
    const hexString = buffer.toString("hex");
    //console.log(hexString);
    props.setSignature(hexString);
  }

  async function sendSignature(evt) {
    evt.preventDefault();
  }

  return (
    <div className="mask">
      <h1>MetaMask</h1>
      <div className="mlabels">
        <p>Private Key</p>
        <p className="msghash">Message to be hashed</p>
      </div>
      <div className="details">
        <input
          type="text"
          value={props.privateKey}
          onChange={onChange}
          name="privateKey"
          placeholder="Enter Private Key"
        />
        <input
          type="text"
          onChange={onChange}
          value={props.message}
          name="message"
          placeholder="Enter message to be encrypted"
        />
        <button onClick={handleClick}>Generate Signature</button>
      </div>
      <h3>Signature: {props.signature.slice(0, 20)}...</h3>
    </div>
  );
}
