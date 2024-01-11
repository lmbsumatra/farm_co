// Modules
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../context/useAuth";

// Ui imports
import "../../components/styles.css";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer = await axios.get(
          `http://localhost:5000/customers/${customer_id}`
        );

        if (parameter === "selectedItems") {
          const cartItems = await axios.get(
            `http://localhost:5000/cart/${customer_id}`
          );

          const selectedItemsInCart = cartItems.data.filter((cartItem) =>
            selectedItemsArray.includes(cartItem.cart_item_id.toString())
          );
          setItems(selectedItemsInCart);
        } else if (parameter === "item") {
          const item = await axios.get(
            `http://localhost:5000/product/${selectedItemsArray}`
          );
          const newItemData = [
            { ...item.data, total: item.data.price },
          ];
          setItems(newItemData);
        }

        setCustomerDetails(customer.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [selectedItemsArray, customer_id, parameter, items]); // Include 'items' in the dependency array

  useEffect(() => {
    // Calculate the grand total when items change
    const newGrandTotal = items.reduce((total, item) => total + item.total, 0);
    setGrandTotal(newGrandTotal);
  }, [items]);

  const handleCheckout = async () => {
    try {
      // Send a POST request to your backend server to handle checkout
      await axios.post("http://localhost:5000/checkout", {
        customer_id,
        grandTotal,
        selectedItemsArray,
      });

      navigate(`/orders`);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <NavBar />
      {customer_id}
        {grandTotal}
        {selectedItemsArray}
      <section className="body-bg">
        <div>
          <h2 className="section-title">Checkout</h2>
          <div className=" width-80vw mx-auto bg-white p-3 rounded-2">
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
                    <td>Image</td>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Total</td>
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
                      <td>₱ {item.price}</td>
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
                  <tr>
                    <td colSpan="7">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleCheckout}
                      >
                        Order
                      </button>
                    </td>
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

export default Checkout;
