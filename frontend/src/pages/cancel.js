import React from "react";
import { useNavigate } from "react-router-dom";

import canceledImg from "../assets/images/others/canceled.jpg";

const Cancel = () => {
  const navigate = useNavigate();
  const handleBackToCart = () => {
    navigate("/cart");
  };
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-white">
      <div className="text-center">
        <h2>Order has been canceled.</h2>
        <img src={canceledImg} alt="Cancel Order Illustration"  style={{height: "30rem", width: "auto"}}/>
        <br />
        <button className="btn btn-success" onClick={handleBackToCart}>
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Cancel;
