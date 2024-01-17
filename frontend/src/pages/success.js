import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"; // Import Bootstrap Button

const Success = () => {
  const [checkoutSession, setCheckoutSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const customer_id = sessionStorage.getItem("customer_id");
  const grandTotal = sessionStorage.getItem("grandTotal");
  const customerDetails = JSON.parse(sessionStorage.getItem("customerDetails"));
  const items = JSON.parse(sessionStorage.getItem("items"));
  const buyNow = sessionStorage.getItem("buyNow");
  const selectedPaymentMethod = sessionStorage.getItem("selectedPaymentMethod");
  const sessionId = searchParams.get("session_id");

  const orderCreated = sessionStorage.getItem("orderCreated") === "true";

  useEffect(() => {
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
        sessionStorage.setItem("orderCreated", "true");
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Check if the order hasn't been created before attempting to create it
    if (!orderCreated) {
      createOrder();
    }
  }, [
    orderCreated,
    sessionId,
    customer_id,
    grandTotal,
    items,
    buyNow,
    selectedPaymentMethod,
  ]);

  useEffect(() => {
    if (orderCreated) {
      // Order has been created, navigate to /orders
      navigate("/orders");
    }
  }, [orderCreated, navigate]);

  return (
    <div>
      <h2>Checkout Session Details</h2>
      {checkoutSession ? (
        <p>Session ID: {sessionId}</p>
      ) : loading ? (
        <p>Creating Order...</p>
      ) : (
        <p>Order has been created or click the button to create the order</p>
      )}

      <Button
        variant="primary" // Set the Bootstrap button variant
        onClick={() => createOrder()} // Assuming createOrder is a function that handles the order creation logic
        disabled={loading || orderCreated}
      >
        Create Order
      </Button>
    </div>
  );
};

export default Success;
