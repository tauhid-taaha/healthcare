import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Card, CardContent, Alert, Box, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import contractABI from "../contracts/updated.json";

const contractAddress = "0x9Dd88502B8bDf1a7D57c566250dc8C8795cD56C5";

const Withdrawal = () => {
  const [contractBalance, setContractBalance] = useState("0");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const connectContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask not detected");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return { contract: new ethers.Contract(contractAddress, contractABI, signer), provider };
  };

  const handleFetchBalance = async () => {
    try {
      setLoading(true);
      const { provider } = await connectContract();
      const balance = await provider.getBalance(contractAddress);
      setContractBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to fetch contract balance.");
      setSuccessMsg("");
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      const { contract } = await connectContract();
      const tx = await contract.withdraw();
      await tx.wait();
      setSuccessMsg("✅ Withdrawn all ETH to owner wallet!");
      setErrorMsg("");
      await handleFetchBalance();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to withdraw. Are you the owner?");
      setSuccessMsg("");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchBalance();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
            background: "linear-gradient(135deg, #1976d2 0%, #1dc071 100%)",
            color: "#fff",
            overflow: "hidden",
            p: 4,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
              <AccountBalanceWalletIcon sx={{ fontSize: 80, opacity: 0.15 }} />
            </motion.div>

            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              Contract Withdrawal
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 600,
                textAlign: "center",
                mb: 3,
                lineHeight: 1.6,
                fontSize: "18px",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              Here you can monitor and withdraw ETH collected by BIONET from research access fees. Only the contract owner can withdraw funds. 
              Make sure your wallet is connected to MetaMask.
            </Typography>
          </Box>

          {loading && <LinearProgress sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.3)" }} />}

          <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap" mb={3}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                sx={{
                  background: "rgba(255,255,255,0.85)",
                  color: "#1976d2",
                  fontWeight: "bold",
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                onClick={handleFetchBalance}
              >
                Fetch Balance
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                sx={{
                  background: "#ff4d4d",
                  fontWeight: "bold",
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                onClick={handleWithdraw}
              >
                Withdraw ETH
              </Button>
            </motion.div>
          </Box>

          <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
            <SavingsIcon sx={{ fontSize: 60, opacity: 0.2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
              Contract Balance: {contractBalance} ETH
            </Typography>
          </Box>

          {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </Card>
      </motion.div>
    </Container>
  );
};

export default Withdrawal;
