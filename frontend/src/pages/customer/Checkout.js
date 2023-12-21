// Modules
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedItemsParam = searchParams.get("selectedItems");
  const customer_id = searchParams.get("customer_id");

  const selectedItemsArray = selectedItemsParam
    ? selectedItemsParam.split(",")
    : [];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart/${customer_id}`);
        const cartItems = response.data;

        // Filter cart items based on selected item IDs
        const selectedItemsInCart = cartItems.filter((cartItem) =>
          selectedItemsArray.includes(cartItem.cart_item_id.toString())
        );

        setItems(selectedItemsInCart);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [selectedItemsArray, customer_id]);

  const handleCheckout = async () => {
    try {
      // Send a POST request to your backend server to handle checkout
      await axios.post("http://localhost:5000/checkout", { customer_id });

      // Optionally, you can redirect the user to a confirmation page
      // or perform any other actions after a successful checkout.
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
