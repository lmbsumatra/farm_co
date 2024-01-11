// Modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserAuth } from "../context/useAuth";

// Ui imports
import "../../components/styles.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const auth = useUserAuth();
  const customer_id = auth.user.customer_id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/orders/${customer_id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [customer_id]);

  const handleClick = async (order_id) => {
    try {
      console.log("Viewing Order:", order_id);
      navigate(`/order-summary/${order_id}`);
    } catch (error) {
      console.error("Error during viewing order:", error);
    }
  };

  const [selectedTab, setSelectedTab] = useState("All"); // Set a default tab value

  const handleTabSelect = (eventKey) => {
    setSelectedTab(eventKey);
  };

  const formatDateInWords = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  return (
    <>
      <NavBar />
      <section className="body-bg">
        <h4 className="section-title">Orders</h4>
        <div className="container">
          <Tabs
            activeKey={selectedTab}
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={handleTabSelect}
          >
            <Tab eventKey="All" title="All Orders">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="card mx-auto overflow-hidden width-80vw my-3"
                >
                  <div className="row d-flex justify-content-between">
                    <div className="col-md-4">
                      <div className="card-body">
                        <h5 className="card-title">
                          Order Id: {order.order_id}
                        </h5>
                        <p className="card-text">
                          Total: ₱ {order.grand_total}
                        </p>
                        <p className="card-text">Status: {order.status_name}</p>
                        <p className="card-text">
                          Order Date: {formatDateInWords(order.order_date)}
                        </p>
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
            </Tab>

            <Tab eventKey="Pending" title="Pending Orders">
              {orders
                .filter((order) => order.status_name === "Pending")
                .map((order) => (
                  <div
                    key={order.order_id}
                    className="card mx-auto overflow-hidden width-80vw my-3"
                  >
                    <div className="row d-flex justify-content-between">
                      <div className="col-md-4">
                        <div className="card-body">
                          <h5 className="card-title">
                            Order Id: {order.order_id}
                          </h5>
                          <p className="card-text">
                            Total: ₱ {order.grand_total}
                          </p>
                          <p className="card-text">
                            Status: {order.status_name}
                          </p>
                          <p className="card-text">
                            Order Date: {formatDateInWords(order.order_date)}
                          </p>
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
            </Tab>

            <Tab eventKey="Processing" title="Processing Orders">
              {orders
                .filter((order) => order.status_name === "Processing")
                .map((order) => (
                  <div
                    key={order.order_id}
                    className="card mx-auto overflow-hidden width-80vw my-3"
                  >
                    <div className="row d-flex justify-content-between">
                      <div className="col-md-4">
                        <div className="card-body">
                          <h5 className="card-title">
                            Order Id: {order.order_id}
                          </h5>
                          <p className="card-text">
                            Total: ₱ {order.grand_total}
                          </p>
                          <p className="card-text">
                            Status: {order.status_name}
                          </p>
                          <p className="card-text">
                            Order Date: {formatDateInWords(order.order_date)}
                          </p>
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
            </Tab>

            <Tab eventKey="Shipped" title="Shipped Orders">
              {orders
                .filter((order) => order.status_name === "Shipped")
                .map((order) => (
                  <div
                    key={order.order_id}
                    className="card mx-auto overflow-hidden width-80vw my-3"
                  >
                    <div className="row d-flex justify-content-between">
                      <div className="col-md-4">
                        <div className="card-body">
                          <h5 className="card-title">
                            Order Id: {order.order_id}
                          </h5>
                          <p className="card-text">
                            Total: ₱ {order.grand_total}
                          </p>
                          <p className="card-text">
                            Status: {order.status_name}
                          </p>
                          <p className="card-text">
                            Order Date: {formatDateInWords(order.order_date)}
                          </p>
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
            </Tab>
          </Tabs>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderSummary;
