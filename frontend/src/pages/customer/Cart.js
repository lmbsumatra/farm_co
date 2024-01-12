// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Ui imports
import "../../components/styles.css";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useUserAuth } from "../context/useAuth";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();

  const auth = useUserAuth();
  const customer_id = auth.user.customer_id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/cart/${customer_id}`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [customer_id]);

  const handleDelete = async (cart_item_id) => {
    console.log(cart_item_id);
    try {
      await axios.delete("http://localhost:5000/cart/" + cart_item_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (cart_item_id) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [cart_item_id]: !prevSelectedItems[cart_item_id],
    }));
    console.log(cart_item_id);
  };

  const handleCheckout = () => {
    const selectedItemsArray = Object.keys(selectedItems).filter(
      (itemId) => selectedItems[itemId]
    );
    selectedItemsArray.forEach((itemId) => {
      console.log(`Selected item: ${itemId}`);
    });
    navigate(`/checkout?selectedItems=${selectedItemsArray.join(",")}`);
  };

  return (
    <>
      <NavBar />
      <section className="body-bg">
        <div>
          <h4 className="section-title">My Cart</h4>
          <div className=" width-80vw mx-auto bg-white p-3 rounded-2">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <td>Select</td>
                    <td>Image</td>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Total</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.cart_item_id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(item.cart_item_id)
                          }
                        />
                      </td>
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

                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(item.cart_item_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="7">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleCheckout}
                        disabled={
                          Object.values(selectedItems).filter(Boolean)
                            .length === 0
                        }
                      >
                        Checkout
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

export default Cart;
