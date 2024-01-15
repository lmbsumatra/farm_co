import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";

const AdminOrderSummaryId = () => {
  const [status, setStatus] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [grandTotal, setGrandTotal] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

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
        setOrderData(response.data);
        setCurrentStatus(response.data[0].status_name);
        setGrandTotal(response.data[0].grand_total);
        setSelectedPaymentMethod(response.data[0].mode_of_payment);

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
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-10 col-sm-12 mx-auto bg-white p-3 rounded-2 my-2">
                {orderData.length > 0 && (
                  <div className="card">
                    <div className="m-2">
                      <p>Name: {orderData[0].orderee_name}</p>
                      <p>Address: {orderData[0].orderee_address}</p>
                      <p>Email: {orderData[0].orderee_email}</p>
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
                      {orderData.map((orderItem) => (
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
              <div className="col-lg-5 col-md-10 col-sm-12 bg-white rounded-2 mx-auto h-100 p-3 my-2">
                <p className="">Mode of Payment</p>
                <div className="d-flex">
                  <div className="form-check bg-gray px-5 py-3 rounded-2 m-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cod"
                      id="cod"
                      checked={selectedPaymentMethod === "CashOnDelivery"}
                      onChange={() =>
                        setSelectedPaymentMethod("CashOnDelivery")
                      }
                      disabled={selectedPaymentMethod === "PayNow"}
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="form-check bg-gray px-5 py-3 rounded-2 m-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paynow"
                      id="paynow"
                      checked={selectedPaymentMethod === "PayNow"}
                      onChange={() => setSelectedPaymentMethod("PayNow")}
                      disabled={selectedPaymentMethod === "CashOnDelivery"}
                    />
                    <label className="form-check-label" htmlFor="paynow">
                      Pay Now
                    </label>
                  </div>
                </div>

                {selectedPaymentMethod === "PayNow" ? (
                  <div className="card d-flex justify-content-center align-items-center imgprev">
                    Receive Payment Method
                  </div>
                ) : (
                  <div className="card d-flex justify-content-center align-items-center imgprev">
                    Receive Payment Method
                  </div>
                )}

                {grandTotal && <p>Grand Total: ₱ {grandTotal}</p>}
                <p>Delivery Fee: </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminOrderSummaryId;
