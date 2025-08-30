import React, { useState } from "react";
import { Container, Typography, TextField, Button, Card, CardContent } from "@mui/material";
import { useBlockchain } from "../context/BlockchainContext";

const GetRecords = () => {
  const { contract } = useBlockchain();
  const [patientID, setPatientID] = useState("");
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const data = await contract.getPatientRecords(patientID);
      setRecords(data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5">Fetch Patient Records</Typography>
      <TextField
        label="Patient ID"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" onClick={fetchRecords} sx={{ ml: 2, mt: 2 }}>
        Fetch
      </Button>

      {records.map((rec, i) => (
        <Card key={i} sx={{ mt: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography><b>ID:</b> {rec.recordID.toString()}</Typography>
            <Typography><b>Name:</b> {rec.patientName}</Typography>
            <Typography><b>Diagnosis:</b> {rec.diagnosis}</Typography>
            <Typography><b>Treatment:</b> {rec.treatment}</Typography>
            <Typography><b>Time:</b> {new Date(Number(rec.timestamp) * 1000).toLocaleString()}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default GetRecords;
