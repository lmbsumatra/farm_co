import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  const handleBackToCart = () => {
    navigate("/cart");
  };
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-white">
      <div className="text-center">
        <h2>Checkout Session Details</h2>
        <p className="lead">Order has been canceled</p>
        <p className="lead">Redirecting back to cart...</p>
        <button className="btn btn-success" onClick={handleBackToCart}>
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Cancel;
