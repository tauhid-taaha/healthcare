import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import RegisterPatient from "./Pages/addpatinet_2";
import AddRecord from "./Pages/addrecord_2";
import GetAllRecords from "./Pages/researcher_record";
import Withdrawal from "./Pages/withdraw";
import AuthorizeProvider from "./Pages/AuthorizeProvider";

// Components
import Navbar from "./components/Navbar";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        {/* Header full-width on top */}
        <Header />

        {/* Main layout: sidebar + page content */}
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            overflow: "hidden", // prevent scroll issues
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              flexShrink: 0,
              height: "calc(100vh - 150px)", // subtract header height for full viewport
              overflowY: "auto",
            }}
          >
            <Navbar />
          </div>

          {/* Page Content */}
          <div
            style={{
              flexGrow: 1,
              padding: "24px",
              overflowY: "auto",
              backgroundColor: "#f9fafb",
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/register-patient" />} />
              <Route path="/register-patient" element={<RegisterPatient />} />
              <Route path="/add-record" element={<AddRecord />} />
              <Route path="/get-all-records" element={<GetAllRecords />} />
              <Route path="/withdraw" element={<Withdrawal />} />
              <Route path="/authorize" element={<AuthorizeProvider />} />
              <Route
                path="*"
                element={
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      marginTop: "40px",
                      fontSize: "18px",
                    }}
                  >
                    Page Not Found
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
