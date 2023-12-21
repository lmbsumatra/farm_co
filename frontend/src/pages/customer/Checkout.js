// Modules
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";


// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const auth = useAuth();
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
        console.log('here',items)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [selectedItemsArray, customer_id]);

  

  useEffect(() => {
    // Calculate the grand total when items change
    const newGrandTotal = items.reduce((total, item) => total + item.total, 0);
    setGrandTotal(newGrandTotal);
  }, [items]);

  const handleCheckout = async () => {
    try {
      // Send a POST request to your backend server to handle checkout
      await axios.post("http://localhost:5000/checkout", { customer_id, grandTotal, selectedItemsArray });

        navigate(`/`);
      console.log("Checkout successful!");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <NavBar />
      <section>
        <h2>Checkout</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Image</td>
              <td>Customer</td>
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
                <td>{item.customer_name}</td>
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
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
