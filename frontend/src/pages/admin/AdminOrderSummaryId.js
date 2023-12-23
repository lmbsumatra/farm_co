import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";

const AdminOrderSummaryId = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const location = useLocation();
  const order_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch status options
        const statusResponse = await axios.get("http://localhost:5000/status");
        setStatus(statusResponse.data);

        // Fetch order items and current status
        const orderResponse = await axios.get(
          `http://localhost:5000/order-items/${order_id}`
        );

        const { orderItems, currentStatus } = orderResponse.data;
        setOrderItems(orderItems);

        // Set the selected status based on the fetched value
        const selectedStatusObject = status.find(
          (status) => status.status_name === currentStatus
        );

        if (selectedStatusObject) {
          setSelectedStatus(selectedStatusObject.status_name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [order_id, status]);

  const handleStatusSelect = (eventKey) => {
    const selectedStatusObject = status.find(
      (status) => status.status_name === eventKey
    );

    if (selectedStatusObject) {
      setSelectedStatus(eventKey);
      // You can perform additional actions if needed

      // Update the status state to reflect the change
      setStatus((prevStatus) =>
        prevStatus.map((stat) =>
          stat.status_name === eventKey
            ? { ...stat, selected: true } // You can add a "selected" property to the status object
            : { ...stat, selected: false }
        )
      );
    }
  };

  return (
    <>
      <NavBar />
      <section>
        <h2>
          Order {order_id} Summary : Status :{" "}
          <Dropdown onSelect={handleStatusSelect}>
            <Dropdown.Toggle variant="success" id="category-dropdown">
              {selectedStatus ? `${selectedStatus}` : "Select a status"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {status.map((stat) => (
                <Dropdown.Item key={stat.status_id} eventKey={stat.status_name}>
                  {stat.status_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </h2>
        <table className="table">
          <thead>
            <tr>
              <td>Image</td>
              <td>Product</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Total</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((orderItem) => (
              <tr key={orderItem.order_item_id}>
                <td>
                  <img
                    src={`http://localhost:5000/images/products/${orderItem.image}`}
                    alt={orderItem.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{orderItem.product_name}</td>
                <td>{orderItem.quantity}</td>
                <td>₱ {orderItem.price}</td>
                <td>₱ {orderItem.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );
};

export default AdminOrderSummaryId;
