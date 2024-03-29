import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "./context/useAuth";

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

import imgNotAvailable from "../assets/images/others/img-not-available.svg";
import "../components/styles.css";

const Product = () => {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const product_id = location.pathname.split("/")[2];

  const auth = useUserAuth();

  const customer_id = auth.user;

  const [kiloValue, setKiloValue] = useState(1);
  const [totalValue, setTotalValue] = useState(0);
  const [addToCart, setAddToCart] = useState({
    cart_id: null,
    product_id: product_id,
  });
  const [productQty, setProductQty] = useState(null);
  const [qtyWarningMsg, setQtyWarningMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${product_id}`
        );
        setProduct(response.data);
        setProductQty(product.stock_quantity - kiloValue);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();

    if (auth.user && auth.user.customer_id !== undefined) {
      setAddToCart((prevAddToCart) => ({
        ...prevAddToCart,
        cart_id: auth.user.customer_id,
      }));
    } else {
      console.log("not logged in");
    }
  }, [product_id, auth.user, product.stock_quantity, kiloValue]);

  useEffect(() => {
    // Update total when kiloValue changes
    const newTotal = kiloValue * product.price;

    setTotalValue(newTotal);
  }, [kiloValue, product.price]);

  const decreaseKilo = () => {
    if (kiloValue <= 0.25) {
      setQtyWarningMsg("You have reached the lowest quantity you can buy");
    } else {
      setKiloValue((prevValue) => Math.max(1 / 4, prevValue - 1 / 4));
      setProductQty(productQty + 1 / 4);
      setQtyWarningMsg("");
    }
  };

  const increaseKilo = () => {
    if (productQty <= 0) {
      setQtyWarningMsg("You have reached the highest quantity you can buy");
    } else {
      setKiloValue((prevValue) => prevValue + 1 / 4);
      setProductQty(productQty - 1 / 4);
      setQtyWarningMsg("");
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (customer_id === null) {
        navigate("/log-in");
      } else {
        const formData = new FormData();
        formData.append("cart_id", addToCart.cart_id);
        formData.append("product_id", addToCart.product_id);
        formData.append("quantity", kiloValue.toFixed(2));
        formData.append("total", totalValue.toFixed(2));

        // Convert FormData to a plain object
        const formDataObject = Object.fromEntries(formData);

        console.log(formDataObject);

        await axios.post("http://localhost:5000/cart", formDataObject);

        navigate(`/cart`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuyNow = () => {
    navigate(`/checkout?item=${product_id}&unit_value=${kiloValue.toFixed(2)}`);
  };

  return (
    <div key={product.product_id}>
      <NavBar />
      <section id="Product" className="body-bg">
        <h4 className="section-title">Product</h4>
        <div className="container-fluid">
          <div className="card mx-auto overflow-hidden col-8 height-30vw mb-3">
            <div className="row g-0">
              <div className="col-md-6">
                {product.image != null ? (
                  <div style={{ height: "30vw", position: "relative" }}>
                    <div
                      className="product-card-bg-s"
                      style={{
                        backgroundImage: `url(http://localhost:5000/images/products/${product.image})`,
                      }}
                    ></div>

                    <img
                      src={`http://localhost:5000/images/products/${product.image}`}
                      className="product-card-img"
                      alt={product.product_name}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center product-image">
                    <img
                      src={imgNotAvailable}
                      alt={product.product_name}
                      style={{ height: "30px" }}
                    />
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <h3 className="price">₱ {product.price} {product.unit_weight}</h3>

                  <div>
                    <p>{product.description}</p>
                  </div>

                  <div className="card p-1 my-3">
                    <span style={{ color: "red" }}>{qtyWarningMsg}</span>
                    <div className="d-flex justify-content-between">
                      <span className="my-4 mx-2">
                        Total {totalValue.toFixed(2)}
                      </span>
                      <div className="card p-1 my-3" style={{ width: "200px" }}>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={decreaseKilo}
                          >
                            -
                          </button>
                          <span>{kiloValue} kg</span>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={increaseKilo}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-success my-2"
                      onClick={handleClick}
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button m-2"
                      className="btn btn-success"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Product;
