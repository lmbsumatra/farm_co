// Modules
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../context/useAuth";

// Ui imports
import "../../components/styles.css";
import QRCode from "../../assets/images/others/gcash.jpg";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [buyNow, setBuyNow] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("CashOnDelivery");

  const auth = useUserAuth();
  const customer_id = auth.user.customer_id;
  const [customerDetails, setCustomerDetails] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const selectedItemsParam =
    searchParams.get("selectedItems") || searchParams.get("item");

  const selectedItemsArray = selectedItemsParam
    ? selectedItemsParam.split(",")
    : [];

  const parameter = searchParams.has("selectedItems")
    ? "selectedItems"
    : "item";

  const unit = searchParams.get("unit_value");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer = await axios.get(
          `http://localhost:5000/customers/${customer_id}`
        );
        setCustomerDetails(customer.data);

        if (parameter === "item") {
          const response = await axios.get(
            `http://localhost:5000/product/${selectedItemsArray}`
          );
          const productData = response.data;

          const newItemData = {
            cart_id: 0,
            product_id: productData.product_id,
            quantity: unit,
            total: productData.price * unit,
            price: productData.price,
            image: productData.image,
            product_name: productData.product_name,
            unit_weight: productData.unit_weight,
          };

          setItems([newItemData]);
          setBuyNow(true);
        } else if (parameter === "selectedItems") {
          const cartItems = await axios.get(
            `http://localhost:5000/cart/${customer_id}`
          );
          const selectedItemsInCart = cartItems.data.filter((cartItem) =>
            selectedItemsArray.includes(cartItem.cart_item_id.toString())
          );
          setItems(selectedItemsInCart);
        }

        setCustomerDetails(customer.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [selectedItemsArray, customer_id, parameter, unit]);

  useEffect(() => {
    // Calculate the grand total when items change
    const newGrandTotal = items.reduce((total, item) => total + item.total, 0);
    setGrandTotal(newGrandTotal);
  }, [items]);
  
// STRIPE
  const handleCheckout = () => {
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        items: [{ id: 1, quantity: 100, price: 100, name: "kitkat" }],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({url})=>{
        window.location = url
      })
      .catch((e) => {
        console.log(e.error);
      });
  };
  
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <NavBar />
      <section className="body-bg">
        <div>
          <h4 className="section-title">Checkout</h4>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-10 col-sm-12 mx-auto bg-white p-3 rounded-2 my-2">
                <h5>Order Details</h5>
                {customerDetails.length > 0 && (
                  <div className="card">
                    <div className="m-2">
                      <p>Name: {customerDetails[0].customer_name}</p>
                      <p>Address: {customerDetails[0].address}</p>
                      <p>Email: {customerDetails[0].email}</p>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={handleEditProfile}
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                )}

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan={2}>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.cart_item_id}>
                          <td>
                            <img
                              src={`http://localhost:5000/images/products/${item.image}`}
                              alt={item.name}
                              style={{ width: "50px" }}
                            />
                          </td>
                          <td>{item.product_name}</td>
                          <td>{item.quantity}</td>
                          <td>
                            ₱ {item.price} {item.unit_weight}
                          </td>
                          <td>₱ {item.total}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Grand Total:</td>
                        <td>₱ {grandTotal.toFixed(2)}</td>
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
                    />
                    <label className="form-check-label" htmlFor="paynow">
                      Pay Now
                    </label>
                  </div>
                </div>

                {selectedPaymentMethod === "PayNow" ? (
                  <div className="card d-flex justify-content-center align-items-center imgprev">
                    <img src={QRCode} className="imgprev" alt="Gcash QR Code" />
                  </div>
                ) : (
                  <div className="card d-flex justify-content-center align-items-center imgprev">
                    Cash on delivery is available with physical money.
                  </div>
                )}
                <p>Grand Total: {grandTotal}</p>
                <p>Delivery Fee: </p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCheckout}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
