import React from "react";
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json"; // download a success.json Lottie file

const SuccessAnimation = ({ message }) => {
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Lottie animationData={successAnimation} loop={false} style={{ height: 150 }} />
      <h3>{message}</h3>
    </div>
  );
};

export default SuccessAnimation;
