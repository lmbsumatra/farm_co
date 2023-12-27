import React, { useState, useEffect } from "react";
import axios from "axios";

import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import "../../components/styles.css";
import { useNavigate } from "react-router-dom";

const AdminPanelOrders = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [orders]);

  const handleClick = async (order_id) => {
    try {
      navigate(`/admin-order-summary/${order_id}`);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <NavBarAdmin />
      <section className="body-bg">
        <h4 className="section-title">Customers Orders</h4>
        <div className="card-deck">
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
    </div>
  );
};

export default AdminPanelOrders;
