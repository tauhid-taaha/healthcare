import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import BlockchainIcon from "@mui/icons-material/AccountTree";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "125px", // ✅ half height
        background: "linear-gradient(135deg, #1976d2 0%, #1dc071 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px 20px",
      }}
    >
      {/* Floating Blockchain Nodes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12 + i * 3,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: `${10 + i * 20}%`,
            left: `${10 + i * 30}%`,
            fontSize: 20 + i * 10,
            opacity: 0.08 + i * 0.05,
            color: "#ffffff",
          }}
        >
          <BlockchainIcon fontSize="inherit" />
        </motion.div>
      ))}

      {/* Circular outlines */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4 + i * 2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 80 + i * 40,
            height: 80 + i * 40,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.15)",
            top: 30 + i * 15,
            left: 30 + i * 20,
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", letterSpacing: 1.5 }}
        >
          BIONET
        </Typography>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "center",
            maxWidth: "600px",
            marginTop: "4px",
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          Revolutionizing medical research, secure EHRs & incentivized healthcare data with blockchain
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Header;