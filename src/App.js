import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyNFT from "./MyNFT.json"; // ABI contract export từ Hardhat

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenURI, setTokenURI] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [tokenId, setTokenId] = useState("");

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  // Kết nối MetaMask
  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const signer = await provider.getSigner();
      const nft = new ethers.Contract(contractAddress, MyNFT.abi, signer);
      setContract(nft);
    } else {
      alert("Vui lòng cài đặt MetaMask!");
    }
  }

  // Mint NFT
  async function mintNFT() {
    if (contract && tokenURI) {
      const tx = await contract.mintNFT(account, tokenURI);
      await tx.wait();
      alert("Mint thành công!");
    }
  }

  // Transfer NFT
  async function transferNFT() {
    if (contract && transferTo && tokenId) {
      const tx = await contract["safeTransferFrom(address,address,uint256)"](account, transferTo, tokenId);
      await tx.wait();
      alert("Chuyển NFT thành công!");
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🌐 MyNFT Web3 App</h2>

      {!account ? (
        <button onClick={connectWallet}>🔗 Kết nối MetaMask</button>
      ) : (
        <p>Đã kết nối: {account}</p>
      )}

      <hr />

      <h3>🖼️ Mint NFT</h3>
      <input
        type="text"
        placeholder="Nhập token URI (IPFS link)"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        style={{ width: "400px" }}
      />
      <button onClick={mintNFT}>Mint</button>

      <hr />

      <h3>🔁 Chuyển NFT</h3>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Địa chỉ người nhận"
        value={transferTo}
        onChange={(e) => setTransferTo(e.target.value)}
        style={{ width: "400px" }}
      />
      <button onClick={transferNFT}>Transfer</button>
    </div>
  );
}

export default App;
