const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "047f369c7b4c4096fede0f39724ab03146b7d71dbca409a0a824d709288cf3eb5ac3b2fe828424ffe0c3984d11ddc2dbfb80f2ef197c98e8325016524f93ee28c3": 100,
  "04494c9df9aec17f47fb03e6857e1ed7c0406a295834aa3c41435641f0862cdcc22bf7232d18a94d06d740ecca1f0a1d386efd4a4756b81a118a5fd09934962323": 200,
  "04535e1e5f4e9dd678f7ebc6d58ee2dfbe639bb64c9133829e5a7bf27e93fc0fdccb2a3f9a469f0003b1ecaa35f215bfa3dc84f504cf16f2647196d27c85497ac6": 300,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  console.log(signed);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
