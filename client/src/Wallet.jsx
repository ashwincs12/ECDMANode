import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import React from "react";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  function addAddress() {
    return <p>Address: {address.slice(0, 10)}...</p>;
  }
  async function onChange(evt) {
    //accepting private key instead of address and changing state of Private Key
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    //getting public key from private key. imported components
    const address = toHex(secp.getPublicKey(privateKey));
    console.log(address);

    //setting address using private key
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Enter Private Key"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      {privateKey && addAddress()}
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

/*

Private Key: 79e0c068039b9a6d3741e77ddbc0fe7199be87b5eb58803040ebb60af3845b5e
Public Key: 04430bb2641cf03b0655b16a48ab28e1739b92a723552d17512bf86c020199d09e6ea26873dbb457b3a93d396b6852cd8bc38d8da17801f0c458d899c8e5f3a500

Private Key: a6ccae0e39df1af5bf57537d3a086dc1a56d9628c70d36cbd09d019828cfbff2
Public Key: 04dd480d14e0ebbaeea30ecc0598299d651ed18201d97403ed01542b60bdc0b41374a1f963844dff0cd217a8d3c1bb2aa4c4736fa0e83e61865ffb22353fa931b9

Private Key: 7a259196d50060acf4dac47223f872ceb8965cb3411e5a61952b0d4a69b01509
Public Key: 04c01abe06ba4e1e19849a859b71d60bdcb229e8b7b0d31e0e51696ef8895a308d93f8a2c5e36c0a5aef01870e36f3b3ae5b30cfb7c77fa1a4d9d6b59fab89648d
*/
