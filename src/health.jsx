

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Box, AppBar, Toolbar, Typography, Tabs, Tab, Container, Alert } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

// Import modular pages
import GetPatientRecords from "./Pages/FetchRecords";
import AddRecord from "./Pages/AddRecord";
import AuthorizeProvider from "./Pages/AuthorizeProvider";

// Contract details
const contractAddress = "0x92a3826bC4111e32bc8Fb4187a8D680D3513105B";
const contractABI =  [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "patientID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "patientName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "diagnosis",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "treatment",
        "type": "string"
      }
    ],
    "name": "addRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "provider",
        "type": "address"
      }
    ],
    "name": "authorizeProvider",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "patientID",
        "type": "uint256"
      }
    ],
    "name": "getPatientRecords",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "recordID",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "patientName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "diagnosis",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "treatment",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct HealthcareRecords.Record[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const Healthcare = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);

        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contract);

        const ownerAddress = await contract.getOwner();
        setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
      }
    };
    connectWallet();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <LocalHospitalIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Blockchain Healthcare DApp</Typography>
          <Tabs value={currentPage} onChange={(e, val) => setCurrentPage(val)} textColor="inherit">
            <Tab label="Get Patient Records" />
            <Tab label="Add Record" />
            <Tab label="Authorize Provider" />
          </Tabs>
        </Toolbar>
      </AppBar>

      {account && (
        <Alert severity="info" sx={{ mt: 2, mx: 2 }}>
          Connected Account: {account} {isOwner && "(Contract Owner)"}
        </Alert>
      )}

      <Container maxWidth="md" sx={{ mt: 3 }}>
        {currentPage === 0 && <GetPatientRecords contract={contract} />}
        {currentPage === 1 && <AddRecord contract={contract} />}
        {currentPage === 2 && <AuthorizeProvider contract={contract} isOwner={isOwner} />}
      </Container>
    </Box>
  );
};

export default Healthcare;
