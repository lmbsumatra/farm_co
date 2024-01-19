import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import successImg from "../assets/images/others/success.png"

const Success = () => {
  const [checkoutSession, setCheckoutSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(
    sessionStorage.getItem("orderConfirmed") === "true"
  );
  const effectHasRun = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const customer_id = sessionStorage.getItem("customer_id");
  const grandTotal = sessionStorage.getItem("grandTotal");
  const items = JSON.parse(sessionStorage.getItem("items"));
  const buyNow = sessionStorage.getItem("buyNow");
  const selectedPaymentMethod = sessionStorage.getItem("selectedPaymentMethod");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Check if the order hasn't been created before attempting to create it
    if (!effectHasRun.current && !orderConfirmed) {
      createOrder();
      effectHasRun.current = true;
    }
  }, [
    effectHasRun,
    sessionId,
    customer_id,
    grandTotal,
    items,
    buyNow,
    selectedPaymentMethod,
    orderConfirmed,
  ]);

  const createOrder = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/order-paid/${sessionId}`,
        {
          customer_id,
          grandTotal,
          items,
          buyNow,
          selectedPaymentMethod,
        }
      );

      setCheckoutSession(response.data);
      setOrderConfirmed(true);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Store orderConfirmed in session storage only if the order has been successfully confirmed
    if (orderConfirmed) {
      sessionStorage.setItem("orderConfirmed", "true");
    }
  }, [orderConfirmed]);

  const handleBackToCart = () => {
    // Reset orderConfirmed in session storage when navigating back to cart
    sessionStorage.setItem("orderConfirmed", "false");
    navigate("/cart");
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-white">
      <div className="text-center">
        <h2>Order has been placed.</h2>
        <img src={successImg} alt="Success Order Illustration" />
        <br />
        {/* {checkoutSession ? (
          <p className="lead">Session ID: {sessionId}</p>
        ) : loading ? (
          <p className="lead">Creating Order...</p>
        ) : (
          <>
            <p className="lead">Order has been created automatically.</p>
            <p className="lead">Redirecting back to cart...</p>
          </>
        )} */}
        <button className="btn btn-success" onClick={handleBackToCart}>
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Success;
