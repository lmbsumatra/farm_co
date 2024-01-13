// Modules
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const OrderSummaryId = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState([]);
  const [grandTotal, setGrandTotal] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);

  const location = useLocation();

  const order_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/order-items/${order_id}`
        );
        const { orderItems, currentStatus, grandTotal, customerDetails } =
          response.data;
        setOrderItems(orderItems);
        setStatus(currentStatus);
        setGrandTotal(grandTotal);
        setCustomerDetails(customerDetails);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [order_id, orderItems, status, customerDetails]);

  return (
    <>
      <NavBar />
      <section className="body-bg">
        <div>
          <h4 className="section-title-dark">
            Order {order_id} Summary : Status : {status}
          </h4>

          <div className=" width-80vw mx-auto bg-white p-3 rounded-2">
            <h5>Order Details</h5>
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

export default OrderSummaryId;
