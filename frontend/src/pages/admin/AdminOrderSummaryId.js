import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";

const AdminOrderSummaryId = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [grandTotal, setGrandTotal] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);

  const location = useLocation();
  const order_id = location.pathname.split("/")[2];

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch status options
        const statusResponse = await axios.get("http://localhost:5000/status");
        setStatus(statusResponse.data);

        // Fetch order items current status, grand total, customer details
        const response = await axios.get(
          `http://localhost:5000/order-items/${order_id}`
        );

        const { orderItems, currentStatus, grandTotal, customerDetails } =
          response.data;

        setOrderItems(orderItems);
        setCurrentStatus(currentStatus);
        setGrandTotal(grandTotal);
        setCustomerDetails(customerDetails);

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

  // For updating status from admin side that will reflect to customer's side
  const handleStatusSelect = async (eventKey) => {
    const selectedStatusObject = status.find(
      (status) => status.status_name === eventKey
    );

    try {
      if (selectedStatusObject) {
        setSelectedStatus(eventKey);

        const formData = new FormData();
        formData.append("status_id", selectedStatusObject.status_id);
        formData.append("order_id", order_id);

        await axios.put(
          `http://localhost:5000/order-items/${order_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <NavBarAdmin />
      
      <section className="body-bg">
        <div>
          <h4 className="section-title-dark d-flex">
            Order {order_id} Summary : Status :
            <Dropdown onSelect={handleStatusSelect}>
              <Dropdown.Toggle
                variant="success"
                id="category-dropdown"
                className="mx-3"
              >
                {selectedStatus ? `${selectedStatus}` : "Select a status"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {status.map((stat) => (
                  <Dropdown.Item
                    key={stat.status_id}
                    eventKey={stat.status_name}
                  >
                    {stat.status_name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </h4>
          <div className=" width-80vw mx-auto bg-white p-3 rounded-2">
            {customerDetails.length > 0 && (
              <div className="card">
                <div className="m-2">
                  <p>Name: {customerDetails[0].customer_name}</p>
                  <p>Address: {customerDetails[0].address}</p>
                  <p>Email: {customerDetails[0].email}</p>
                </div>
              </div>
            )}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <td>Image</td>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Total</td>
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
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Grand Total:</td>
                    <td>₱ {grandTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminOrderSummaryId;
