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

  const searchParams = new URLSearchParams(location.search);
  const selectedItemsParam = searchParams.get("selectedItems");

  const selectedItemsArray = selectedItemsParam
    ? selectedItemsParam.split(",")
    : [];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/cart/${customer_id}`
        );
        const cartItems = response.data;

        // Filter cart items based on selected item IDs
        const selectedItemsInCart = cartItems.filter((cartItem) =>
          selectedItemsArray.includes(cartItem.cart_item_id.toString())
        );

        setItems(selectedItemsInCart);
        console.log("here", items);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [selectedItemsArray, customer_id, items]);

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
      console.log("Checkout successful!");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <NavBar />
      <section className="body-bg">
        <div>
          <h2 className="section-title">Checkout</h2>
          <div className=" width-80vw mx-auto bg-white p-3 rounded-2">
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
                  <td colSpan="5" className="text-end">
                    {grandTotal}
                  </td>
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
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
