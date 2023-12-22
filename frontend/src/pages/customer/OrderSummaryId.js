// Modules
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useUserAuth } from "../context/useAuth";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const OrderSummaryId = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState([]);
  const location = useLocation();

  // const auth = useUserAuth();
  // const customer_id = auth.user.customer_id;

  // Getting product_id
  const order_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/order-items/${order_id}`
        );
        const { orderItems, status } = response.data;

        setOrderItems(orderItems);
        setStatus(status)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [order_id, orderItems]);

  return (
    <>
      <NavBar />
      <section>
        <h2>
          Order {order_id} Summary : Status : {status}
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

export default OrderSummaryId;
