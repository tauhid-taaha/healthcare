import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import contractABI from "../contracts/updated.json"; // ABI JSON file

const contractAddress = "0x9Dd88502B8bDf1a7D57c566250dc8C8795cD56C5";
const RESEARCH_FEE = "0.1"; // 0.1 ETH

const GetAllRecords = () => {
  const [records, setRecords] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleGetAllRecords = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not detected");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Send ETH
      const tx = await contract.getAllRecords({
        value: ethers.utils.parseEther(RESEARCH_FEE),
      });
      await tx.wait();

      // Fetch results
      const allRecords = await contract.callStatic.getAllRecords({
        value: ethers.utils.parseEther(RESEARCH_FEE),
      });

      setRecords(allRecords);
      setSuccessMsg("✅ Records fetched successfully!");
      setErrorMsg("");
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to fetch records (make sure you sent 0.1 ETH).");
      setSuccessMsg("");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
     <Card sx={{ borderRadius: 4, boxShadow: 4, overflow: "hidden" }}>
  <CardContent>
    {records.length === 0 ? (
      <div
        style={{
          display: "flex",
          flexDirection: "row",  // 🔥 ensures horizontal layout
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* LEFT SIDE - INSTRUCTIONS */}
        <div style={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
          >
            Access Research Data
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            Researchers can securely fetch anonymized medical records by
            contributing <b>0.1 ETH</b>. This ensures transparency,
            incentivizes data sharing, and maintains privacy through blockchain
            technology.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetAllRecords}
            sx={{
              background: "linear-gradient(135deg, #1976d2 0%, #1dc071 100%)",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
            }}
          >
            Get Research Data
          </Button>

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
        </div>

        {/* RIGHT SIDE - ANIMATED IMAGE */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <motion.img
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-medical_516790-2372.jpg"
            alt="Research Illustration"
            style={{ maxWidth: "90%", borderRadius: "16px" }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    ) : (
      // FULL WIDTH TABLE WHEN DATA LOADED
      <Table sx={{ mt: 2 }} size="small">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell><b>Record ID</b></TableCell>
            <TableCell><b>Patient ID</b></TableCell>
            <TableCell><b>Patient Name</b></TableCell>
            <TableCell><b>Doctor</b></TableCell>
            <TableCell><b>Diagnosis</b></TableCell>
            <TableCell><b>Lab Tests</b></TableCell>
            <TableCell><b>Medicines</b></TableCell>
            <TableCell><b>Advice</b></TableCell>
            <TableCell><b>Timestamp</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((rec, idx) => (
            <TableRow
              key={idx}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                "&:hover": { backgroundColor: "#f0f8ff" },
              }}
            >
              <TableCell>{rec.recordID.toString()}</TableCell>
              <TableCell>{rec.patientID.toString()}</TableCell>
              <TableCell>{rec.patientName}</TableCell>
              <TableCell>{rec.doctorName}</TableCell>
              <TableCell>{rec.diagnosis}</TableCell>
              <TableCell>{rec.labTests}</TableCell>
              <TableCell>{rec.medicines}</TableCell>
              <TableCell>{rec.advice}</TableCell>
              <TableCell>
                {new Date(rec.timestamp.toNumber() * 1000).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </CardContent>
</Card>

    </Container>
  );
};

export default GetAllRecords;
