import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import StorageIcon from "@mui/icons-material/Storage";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"; // ✅ Icon for Authorize Doctors

// Sidebar navigation links
const navlinks = [
  { name: "Register Patient", link: "/register-patient", icon: <PersonAddIcon fontSize="medium" /> },
  { name: "Add Record", link: "/add-record", icon: <MedicalServicesIcon fontSize="medium" /> },
  { name: "Get All Records", link: "/get-all-records", icon: <StorageIcon fontSize="medium" /> },
  { name: "Withdraw", link: "/withdraw", icon: <AccountBalanceWalletIcon fontSize="medium" /> },
  { name: "Authorize Doctors", link: "/authorize", icon: <VerifiedUserIcon fontSize="medium" /> }, // ✅ New item
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Register Patient");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "sticky",
        top: "10px",
        height: "93vh",
        backgroundColor: "#fff",
        padding: "16px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          fontWeight: "bold",
          letterSpacing: 1,
          color: "#1976d2",
        }}
      >
        Menu
      </Typography>

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        {navlinks.map((link) => (
          <Tooltip key={link.name} title={link.name} placement="right" arrow>
            <Box
              onClick={() => {
                setIsActive(link.name);
                navigate(link.link);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                padding: "10px 14px",
                borderRadius: "14px",
                backgroundColor: isActive === link.name ? "#1dc071" : "#f9f9f9",
                color: isActive === link.name ? "#fff" : "#555",
                boxShadow: isActive === link.name
                  ? "0 4px 12px rgba(0, 220, 113, 0.4)"
                  : "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: isActive === link.name ? "#16a45b" : "#e0f7f7",
                  transform: "translateX(4px)",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                },
              }}
            >
              {link.icon}
              <Typography
                variant="body1"
                sx={{ fontWeight: isActive === link.name ? "bold" : "medium" }}
              >
                {link.name}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;
