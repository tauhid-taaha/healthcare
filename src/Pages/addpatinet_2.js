import React, { useState } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, Alert, InputAdornment } from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ethers } from "ethers";
import contractABI from "../contracts/updated.json"; // ABI JSON file

const contractAddress = "0x9Dd88502B8bDf1a7D57c566250dc8C8795cD56C5";

const RegisterPatient = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not detected");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.registerPatient(name, dob, addr, phone, bloodGroup);
      await tx.wait();

      setSuccessMsg(`✅ Patient "${name}" registered successfully!`);
      setErrorMsg("");
      setName(""); setDob(""); setAddr(""); setPhone(""); setBloodGroup("");
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to register patient.");
      setSuccessMsg("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card sx={{ borderRadius: 3, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center", background: "linear-gradient(to right, #1976d2, #1dc071)", WebkitBackgroundClip: "text", color: "transparent" }}>
              Register New Patient
            </Typography>

            <Typography variant="body2" sx={{ mb: 3, color: "#555", textAlign: "center" }}>
              Please fill in the patient details carefully. These details will be stored securely on the blockchain and used for authorized research purposes only.
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              sx={{ mb: 2 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              sx={{ mb: 2 }}
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              sx={{ mb: 2 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Blood Group"
              variant="outlined"
              sx={{ mb: 3 }}
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FavoriteIcon />
                  </InputAdornment>
                ),
              }}
            />

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
                onClick={handleRegister}
              >
                Register Patient
              </Button>
            </motion.div>

            {successMsg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Alert severity="success" sx={{ mt: 2 }}>
                  {successMsg}
                </Alert>
              </motion.div>
            )}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMsg}
                </Alert>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default RegisterPatient;
