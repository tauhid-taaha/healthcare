import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Box,
} from "@mui/material";
import { motion } from "framer-motion"; // for animations
import { ethers } from "ethers";
import contractABI from "../contracts/updated.json";

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
      setPatientID("");
      setDoctorName("");
      setDiagnosis("");
      setLabTests("");
      setMedicines("");
      setAdvice("");
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
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* ADD RECORD FORM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            mb: 5,
            borderRadius: 4,
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            background:
              "linear-gradient(135deg, rgba(29,192,113,0.08), rgba(25,118,210,0.1))",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "#1dc071",
              }}
            >
              Add New Patient Record 🩺
            </Typography>

            <Typography variant="body2" sx={{ mb: 3, color: "#555" }}>
              Please enter the required details below to register a new medical
              record on the blockchain. Ensure all information is accurate before
              submission — your entry will be stored permanently.
            </Typography>

            <TextField
              fullWidth
              label="Patient ID"
              variant="outlined"
              sx={{ mt: 2 }}
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
            />
            <TextField
              fullWidth
              label="Doctor Name"
              sx={{ mt: 2 }}
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Diagnosis"
              multiline
              rows={2}
              sx={{ mt: 2 }}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
            <TextField
              fullWidth
              label="Lab Tests"
              multiline
              rows={2}
              sx={{ mt: 2 }}
              value={labTests}
              onChange={(e) => setLabTests(e.target.value)}
            />
            <TextField
              fullWidth
              label="Medicines"
              multiline
              rows={2}
              sx={{ mt: 2 }}
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
            />
            <TextField
              fullWidth
              label="Advice"
              multiline
              rows={2}
              sx={{ mt: 2 }}
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
            />

            <Box textAlign="center">
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: "16px",
                  background: "linear-gradient(to right, #1dc071, #1976d2)",
                  boxShadow: "0 5px 15px rgba(25, 118, 210, 0.3)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    background: "linear-gradient(to right, #1976d2, #1dc071)",
                  },
                }}
                onClick={handleAddRecord}
              >
                🚀 Submit Record
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* DOCTOR AUTHORIZATION (unchanged) */}
      <Card
        sx={{ borderRadius: 3, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "#1976d2",
            }}
          >
            Doctor Authorization
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 3, color: "#555", lineHeight: 1.6 }}
          >
            This section allows you to request authorization as a Doctor. Only
            an Admin can approve your request. Enter your Ethereum wallet
            address below and click "Authorize". Once approved, you will be able
            to add patient records securely.
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
              fontSize: "16px",
            }}
            onClick={handleAuthorize}
          >
            Request Authorization
          </Button>

          <Typography
            variant="caption"
            sx={{ mt: 2, display: "block", color: "#999", textAlign: "center" }}
          >
            🔒 All requests are logged on the blockchain for transparency and
            security.
          </Typography>
        </CardContent>
      </Card>

      {successMsg && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMsg}
        </Alert>
      )}
      {errorMsg && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMsg}
        </Alert>
      )}
    </Container>
  );
};

export default AddRecord;
