import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Alert } from "@mui/material";
import { ethers } from "ethers";
import contractABI from "../contracts/updated.json"; // ABI JSON file

const contractAddress = "0x9Dd88502B8bDf1a7D57c566250dc8C8795cD56C5";

const Withdrawal = () => {
  const [contractBalance, setContractBalance] = useState("0");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const connectContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask not detected");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return { contract: new ethers.Contract(contractAddress, contractABI, signer), provider };
  };

  // -------------------- Fetch Contract Balance --------------------
  const handleFetchBalance = async () => {
    try {
      const { provider } = await connectContract();
      const balance = await provider.getBalance(contractAddress);
      setContractBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to fetch contract balance.");
      setSuccessMsg("");
    }
  };

  // -------------------- Withdraw ETH --------------------
  const handleWithdraw = async () => {
    try {
      const { contract } = await connectContract();
      const tx = await contract.withdraw();
      await tx.wait();
      setSuccessMsg("✅ Withdrawn all ETH to owner wallet");
      setErrorMsg("");
      handleFetchBalance(); // Update balance after withdrawal
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to withdraw. Are you the owner?");
      setSuccessMsg("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>Contract Withdrawal</Typography>

          <Button variant="contained" sx={{ mr: 2 }} onClick={handleFetchBalance}>
            Fetch Contract Balance
          </Button>
          <Button variant="contained" color="secondary" onClick={handleWithdraw}>
            Withdraw All ETH
          </Button>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Contract Balance: {contractBalance} ETH
          </Typography>

          {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Withdrawal;
