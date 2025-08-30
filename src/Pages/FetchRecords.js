import React, { useState } from "react";
import { Card, CardContent, Typography, Box, TextField, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIcon from '@mui/icons-material/Assignment';

const GetPatientRecords = ({ contract }) => {
  const [patientID, setPatientID] = useState('');
  const [patientRecords, setPatientRecords] = useState([]);

  const fetchPatientRecords = async () => {
    try {
      const records = await contract.getPatientRecords(patientID);
      setPatientRecords(records);
    } catch(error) {
      console.error("Error fetching patient records", error);
      alert("Error fetching records. Make sure you're authorized to view these records.");
    }
  }

  return (
    <Card
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      sx={{ mb: 3, borderRadius: 4, boxShadow: 6, backgroundColor: '#f9f9fb' }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <LocalHospitalIcon sx={{ fontSize: 40, color: '#1976d2', mr: 1 }} />
          <Typography variant="h4" fontWeight="600">Patient Records</Typography>
        </Box>

        <Box display="flex" gap={2} alignItems="center" mb={3}>
          <TextField
            label="Enter Patient ID"
            variant="outlined"
            fullWidth
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchPatientRecords}
            sx={{ height: '56px' }}
          >
            Fetch
          </Button>
        </Box>

        {patientRecords.length > 0 ? (
          patientRecords.map((record, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                mb: 2,
                borderRadius: 3,
                borderLeft: '6px solid #1976d2',
                p: 2,
                backgroundColor: '#ffffff'
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <AssignmentIcon sx={{ mr: 1, color: '#1976d2' }} />
                <Typography variant="h6">Record #{record.recordID.toNumber()}</Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Typography><strong>Name:</strong> {record.patientName}</Typography>
              <Typography><strong>Diagnosis:</strong> {record.diagnosis}</Typography>
              <Typography><strong>Treatment:</strong> {record.treatment}</Typography>
              <Typography sx={{ mt: 1, fontSize: '0.875rem', color: 'gray' }}>
                <strong>Date:</strong> {new Date(record.timestamp.toNumber() * 1000).toLocaleString()}
              </Typography>
            </Card>
          ))
        ) : (
          <Typography align="center" color="text.secondary">
            No records found. Enter a Patient ID and click Fetch.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default GetPatientRecords;
