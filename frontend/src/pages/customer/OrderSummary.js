// Modules
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../context/useAuth";

// Ui imports
import "../../components/styles.css";

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
      navigate(`/order-summary/${order_id}`);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <NavBar />
      <section className="body-bg">
        <h4 className="section-title">Orders</h4>
        <div className="container">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="card mx-auto overflow-hidden width-80vw my-3"
            >
              <div className="row d-flex justify-content-between">

                <div className="col-md-4">
                  <div className="card-body">
                    <h5 className="card-title">Order Id: {order.order_id}</h5>
                    <p className="card-text">Total: ₱ {order.grand_total}</p>
                    <p className="card-text">Status: {order.status_name}</p>
                  </div>
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-outline-success m-2"
                    onClick={() => handleClick(order.order_id)}
                  >
                    View
                  </button>
                </div>
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
