import React, { useState } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, Alert } from "@mui/material";
import { ethers } from "ethers";
import contractABI from "../contracts/updated.json";  // ABI JSON file

const contractAddress = "0x9Dd88502B8bDf1a7D57c566250dc8C8795cD56C5";

const AddRecord = () => {
  const [patientID, setPatientID] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [labTests, setLabTests] = useState("");
  const [medicines, setMedicines] = useState("");
  const [advice, setAdvice] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const connectContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask not detected");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  };

  // -------------------- Add Record --------------------
  const handleAddRecord = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.addRecord(
        patientID,
        doctorName,
        diagnosis,
        labTests,
        medicines,
        advice
      );
      await tx.wait();
      setSuccessMsg(`✅ Record added for Patient ID ${patientID}`);
      setErrorMsg("");
      setPatientID(""); setDoctorName(""); setDiagnosis(""); setLabTests(""); setMedicines(""); setAdvice("");
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to add record (are you authorized?)");
      setSuccessMsg("");
    }
  };

  // -------------------- Authorize Provider --------------------
  const handleAuthorize = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.authorizeProvider(providerAddress);
      await tx.wait();
      setSuccessMsg(`✅ Provider ${providerAddress} authorized successfully!`);
      setErrorMsg("");
      setProviderAddress("");
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to authorize provider (are you owner?)");
      setSuccessMsg("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ mb: 5 }}>
        <CardContent>
          <Typography variant="h5">Add Record</Typography>
          <TextField fullWidth label="Patient ID" sx={{ mt: 2 }} value={patientID} onChange={(e) => setPatientID(e.target.value)} />
          <TextField fullWidth label="Doctor Name" sx={{ mt: 2 }} value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
          <TextField fullWidth label="Diagnosis" sx={{ mt: 2 }} value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
          <TextField fullWidth label="Lab Tests" sx={{ mt: 2 }} value={labTests} onChange={(e) => setLabTests(e.target.value)} />
          <TextField fullWidth label="Medicines" sx={{ mt: 2 }} value={medicines} onChange={(e) => setMedicines(e.target.value)} />
          <TextField fullWidth label="Advice" sx={{ mt: 2 }} value={advice} onChange={(e) => setAdvice(e.target.value)} />
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleAddRecord}>Add Record</Button>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
  <CardContent>
    {/* Title */}
    <Typography
      variant="h5"
      sx={{
        fontWeight: "bold",
        mb: 1,
        color: "#1976d2"
      }}
    >
      Doctor Authorization
    </Typography>

    {/* Subtitle / instructions */}
    <Typography
      variant="body2"
      sx={{
        mb: 3,
        color: "#555",
        lineHeight: 1.6
      }}
    >
      This section allows you to request authorization as a Doctor. Only an Admin can approve your request. 
      Enter your Ethereum wallet address below and click "Authorize". Once approved, you will be able to add patient records securely.
    </Typography>

    {/* Input field */}
    <TextField
      fullWidth
      label="Ethereum Provider Address"
      placeholder="0xABC123..."
      sx={{ mb: 3 }}
      value={providerAddress}
      onChange={(e) => setProviderAddress(e.target.value)}
    />

    {/* Action button */}
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
    
    {/* Optional info note */}
    <Typography
      variant="caption"
      sx={{ mt: 2, display: "block", color: "#999", textAlign: "center" }}
    >
      🔒 All requests are logged on the blockchain for transparency and security.
    </Typography>
  </CardContent>
</Card>


      {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
      {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
    </Container>
  );
};

export default AddRecord;
