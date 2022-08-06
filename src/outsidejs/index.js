import { ethers } from "../outsidejs/ethers-5.6.esm.min.js";
import { abi, contractAddress } from "../outsidejs/constants";
import * as paillierBigint from "paillier-bigint";
var CryptoJS = require("crypto-js");
export { encrypt, connect, vote };

async function encrypt(arr) {
  const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(10);
  var encryptedArray = [];
  for (let i = 0; i < arr.length; i++) {
    let c = publicKey.encrypt(arr[i]);
    encryptedArray.push(c);
  }
  var hash = CryptoJS.MD5(encryptedArray);
  console.log("encrypted vote is " + encryptedArray);
  console.log("hash is " + hash);
  vote(hash);
  //   const encryptedSum = publicKey.addition(arguments);
  //   console.log(privateKey.decrypt(encryptedSum));
}

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    console.log("Plz install metamask");
  }
}

async function vote(hash) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.vote(hash);
      await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Please install MetaMask");
  }
}
function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations. `
      );
      resolve();
    });
  });
}
