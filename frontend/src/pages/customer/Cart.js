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
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("CashOnDelivery");
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

  useEffect(() => {
    // Calculate the grand total when items change
    const newGrandTotal = items.reduce((total, item) => {
      if (selectedItems[item.cart_item_id]) {
        return total + item.total;
      }
      return total;
    }, 0);
    setGrandTotal(newGrandTotal);
  }, [selectedItems, items]);

  return (
    <>
      <NavBar />
      <section className="body-bg">
        <div>
          <h4 className="section-title">My Cart</h4>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-10 col-sm-12 mx-auto p-0">
                <div className="table-responsive bg-white rounded-2">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan={3}>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
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
                          <td>
                            ₱ {item.price} {item.unit_weight}
                          </td>
                          <td>₱ {item.total}</td>

                          <td>
                            {/* <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(item.cart_item_id)}
                        >
                          Delete
                        </button> */}
                            <a
                              style={{
                                color: "#b60c0c",
                                fontSize: "25px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDelete(item.cart_item_id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white p-3 rounded-2 my-2">
                  <p>
                    Delivery Information: Standard Delivery takes
                    <strong> 2-4 working days</strong>, but you can opt for
                    <strong> Next Day Delivery</strong> during Checkout for
                    quicker delivery (Order before 10 pm). <br />
                    <br />
                    Next Day Delivery is restricted for delivery effieciency.
                    Deliveries are made Monday to Friday, excluding public
                    holidays. <br />
                    <br />
                    Orders placed after 10 pm on Friday or over the weekend will
                    be dispatched on Monday, excluding public holidays. Returns
                    are free, just message us. <br />
                    <br />
                    Note that some large items will be delivered in their
                    original packing, which may display images or details of the
                    contents.
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-10 col-sm-12 bg-white rounded-2 mx-auto h-100 p-3">
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
                    Pay now is available with Gcash.
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
                  disabled={
                    Object.values(selectedItems).filter(Boolean).length === 0
                  }
                >
                  Checkout
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

export default Cart;
