import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

const AddRecord = ({ contract }) => {
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');

  const addRecord = async () => {
    try {
      const tx = await contract.addRecord(patientID, patientName, diagnosis, treatment);
      await tx.wait();
      alert("Record added successfully!");
      setPatientID(""); setPatientName(""); setDiagnosis(""); setTreatment("");
    } catch(error) {
      console.error("Error adding records", error);
      alert("Error adding record. Make sure you're authorized to add records.");
    }
  }

  return (
    <Card component={motion.div} whileHover={{ scale: 1.02 }} sx={{ mb: 3, borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom align="center">Add Patient Record</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Patient ID" variant="outlined" fullWidth value={patientID} onChange={(e) => setPatientID(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Patient Name" variant="outlined" fullWidth value={patientName} onChange={(e) => setPatientName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Diagnosis" variant="outlined" fullWidth multiline rows={3} value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Treatment" variant="outlined" fullWidth multiline rows={3} value={treatment} onChange={(e) => setTreatment(e.target.value)} />
          </Grid>
        </Grid>
        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="secondary" onClick={addRecord}>Add Record</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddRecord;
