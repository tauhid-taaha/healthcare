import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Alert, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
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

      // Call getAllRecords with 0.1 ETH
      const tx = await contract.getAllRecords({
        value: ethers.utils.parseEther(RESEARCH_FEE)
      });
      const result = await tx.wait();

      // The function returns structs; ethers.js does not return them directly in tx.wait()
      // We need to call callStatic to get return value without sending ETH again
      const allRecords = await contract.callStatic.getAllRecords({
        value: ethers.utils.parseEther(RESEARCH_FEE)
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
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>Fetch All Records (0.1 ETH)</Typography>
          <Button variant="contained" onClick={handleGetAllRecords}>Get All Records</Button>

          {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}

          {records.length > 0 && (
            <Table sx={{ mt: 3 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Record ID</TableCell>
                  <TableCell>Patient ID</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Diagnosis</TableCell>
                  <TableCell>Lab Tests</TableCell>
                  <TableCell>Medicines</TableCell>
                  <TableCell>Advice</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((rec, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{rec.recordID.toString()}</TableCell>
                    <TableCell>{rec.patientID.toString()}</TableCell>
                    <TableCell>{rec.patientName}</TableCell>
                    <TableCell>{rec.doctorName}</TableCell>
                    <TableCell>{rec.diagnosis}</TableCell>
                    <TableCell>{rec.labTests}</TableCell>
                    <TableCell>{rec.medicines}</TableCell>
                    <TableCell>{rec.advice}</TableCell>
                    <TableCell>{new Date(rec.timestamp.toNumber() * 1000).toLocaleString()}</TableCell>
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
