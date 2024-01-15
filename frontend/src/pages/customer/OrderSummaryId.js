// Modules
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const OrderSummaryId = () => {
  const [status, setStatus] = useState([]);
  const [grandTotal, setGrandTotal] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const location = useLocation();

  const order_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/order-items/${order_id}`
        );

        setOrderData(response.data);
        setGrandTotal(response.data[0].grand_total);
        setSelectedPaymentMethod(response.data[0].mode_of_payment);
        setStatus(response.data[0].status_name)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [order_id, orderData, grandTotal]);

  return (
    <>
      <NavBar />
      <section className="body-bg">
        <div>
          <h4 className="section-title-dark">
            Order {order_id} Summary : Status : {status}
          </h4>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-10 col-sm-12 mx-auto bg-white p-3 rounded-2 my-2">
                <h5>Order Details</h5>
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
                        <td></td>
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
                    Paid
                  </div>
                ) : (
                  <div className="card d-flex justify-content-center align-items-center imgprev">
                    Please prepare the exact amount.
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

export default OrderSummaryId;
