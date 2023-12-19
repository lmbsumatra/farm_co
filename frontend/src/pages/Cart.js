// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Ui imports
import "../components/styles.css";

// Components
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

const Cart = () => {
  const [item, setItem] = useState([]);
  const [add_to_cart_id, setAdd_to_cart_id] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart/`);
        setItem(response.data);
        setAdd_to_cart_id(item.add_to_cart_id);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  const handleDelete = async (add_to_cart_id) => {
    try {
      await axios.delete("http://localhost:5000/cart/" + add_to_cart_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <section>
        <h2>Cart</h2>
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
            {item.map((item) => (
              <tr key={item.product_id}>
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
                <td>
                  <button type="button" className="btn btn-success">
                    <Link to={`/edit-item/${item.product_id}`}>Update</Link>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(item.add_to_cart_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
