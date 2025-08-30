import React, { useState } from "react";
import { Card, CardContent, Typography, Box, TextField, Button, Alert } from "@mui/material";
import { motion } from "framer-motion";

const AuthorizeProvider = ({ contract, isOwner }) => {
  const [providerAddress, setProviderAddress] = useState("");

  const authorizeProvider = async () => {
    if (!isOwner) {
      alert("Only contract owner can authorize providers");
      return;
    }
    try {
      const tx = await contract.authorizeProvider(providerAddress);
      await tx.wait();
      alert(`Provider ${providerAddress} authorized successfully`);
      setProviderAddress("");
    } catch(error) {
      console.error("Error authorizing provider", error);
      alert("Error authorizing provider. Check the address and try again.");
    }
  }

  if (!isOwner) {
    return (
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">Authorize Healthcare Provider</Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>Only the contract owner can authorize providers.</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card component={motion.div} whileHover={{ scale: 1.02 }} sx={{ mb: 3, borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom align="center">Authorize Healthcare Provider</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <TextField label="Provider Address" variant="outlined" fullWidth value={providerAddress} onChange={(e) => setProviderAddress(e.target.value)} />
          <Button variant="contained" color="success" onClick={authorizeProvider}>Authorize</Button>
        </Box>
        <Alert severity="info" sx={{ mt: 2 }}>As the contract owner, you can authorize other healthcare providers to access patient records.</Alert>
      </CardContent>
    </Card>
  );
};

export default AuthorizeProvider;
