import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import RegisterPatient from "./Pages/addpatinet_2";
import AddRecord from "./Pages/addrecord_2";
import GetAllRecords from "./Pages/researcher_record";
import Withdrawal from "./Pages/withdraw";

// Components
import Navbar from "./components/Navbar";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
        
        {/* Header full-width on top */}
        <Header />

        {/* Main layout: sidebar + page content */}
        <div style={{ display: "flex", flexGrow: 1 }}>
          <div style={{ flexShrink: 0 }}>
            <Navbar />
          </div>

          <div style={{ flexGrow: 1, padding: "24px" }}>
            <Routes>
              <Route path="/" element={<Navigate to="/register-patient" />} />
              <Route path="/register-patient" element={<RegisterPatient />} />
              <Route path="/add-record" element={<AddRecord />} />
              <Route path="/get-all-records" element={<GetAllRecords />} />
              <Route path="/withdraw" element={<Withdrawal />} />
              <Route
                path="*"
                element={
                  <div style={{ textAlign: "center", color: "red", marginTop: "40px", fontSize: "18px" }}>
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
