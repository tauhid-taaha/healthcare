import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";
import { ethers } from "ethers";
import contractABI from "../contracts/updated.json";

const contractAddress = "0x9Dd88502B8bDf1a7D57c566250dc8C8795cD56C5";

const AuthorizeProvider = () => {
  const [providerAddress, setProviderAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [account, setAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  // Connect and check ownership
  const connectContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask not detected");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    setAccount(userAddress);

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const ownerAddress = await contract.owner();
    setIsOwner(userAddress.toLowerCase() === ownerAddress.toLowerCase());

    return contract;
  };

  const handleAuthorize = async () => {
    try {
      const contract = await connectContract();
      if (!isOwner) {
        setErrorMsg("❌ Only the contract owner can authorize providers.");
        setSuccessMsg("");
        return;
      }

      const tx = await contract.authorizeProvider(providerAddress);
      await tx.wait();
      setSuccessMsg(`✅ Provider ${providerAddress} authorized successfully!`);
      setErrorMsg("");
      setProviderAddress("");
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to authorize provider. Check the address and try again.");
      setSuccessMsg("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ borderRadius: 3, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}>
            Doctor Authorization
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "#555", lineHeight: 1.6 }}>
            This page allows you to request authorization as a Doctor. Only the contract owner can approve your request.
            Enter the Ethereum wallet address below and click "Authorize". Once approved, you will be able to add patient records securely.
          </Typography>

          <TextField
            fullWidth
            label="Ethereum Provider Address"
            placeholder="0xABC123..."
            sx={{ mb: 3 }}
            value={providerAddress}
            onChange={(e) => setProviderAddress(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(to right, #1976d2, #1dc071)",
              color: "#fff",
              borderRadius: 2,
              fontSize: "16px"
            }}
            onClick={handleAuthorize}
          >
            Request Authorization
          </Button>

          {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}

          <Typography variant="caption" sx={{ mt: 2, display: "block", color: "#999", textAlign: "center" }}>
            🔒 All requests are logged on the blockchain for transparency and security.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AuthorizeProvider;
