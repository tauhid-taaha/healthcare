import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Healthcare from "../contracts/Healthcare.json"; // ABI

const BlockchainContext = createContext();
export const useBlockchain = () => useContext(BlockchainContext);

const CONTRACT_ADDRESS = "0xYourDeployedContractAddress"; // replace with deployed address

export const BlockchainProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          // Request wallet connection
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);

          // ✅ v5 style
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            Healthcare.abi,
            signer
          );
          setContract(contractInstance);

          // Check owner
          const contractOwner = await contractInstance.getOwner();
          setOwner(contractOwner);
          setIsOwner(contractOwner.toLowerCase() === accounts[0].toLowerCase());
        } catch (error) {
          console.error("Blockchain init failed:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };

    init();
  }, []); // 👈 safe now, no missing dependency warning

  return (
    <BlockchainContext.Provider value={{ account, contract, owner, isOwner }}>
      {children}
    </BlockchainContext.Provider>
  );
};
