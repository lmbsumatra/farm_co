// Modules
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../context/useAuth";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const auth = useUserAuth();
  const customer_id = auth.user.customer_id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/orders/${customer_id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [customer_id, orders]);

  const handleClick = async (order_id) => {
    try {
      console.log("Checkout successful!", order_id);
      navigate(`/order-summary/${order_id}`)
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <NavBar />
      <section>
        <h2>Orders</h2>
        <div className="card-deck">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="card clickable-card"
            >
              <div className="card-body">
                <h5 className="card-title">Order Id: {order.order_id}</h5>
                <p className="card-text">Total: ₱ {order.grand_total}</p>
                <p className="card-text">Status: {order.status_name}</p>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-success"
                  onClick={() => handleClick(order.order_id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderSummary;
