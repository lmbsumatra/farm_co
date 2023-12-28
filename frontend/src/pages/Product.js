import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "./context/useAuth";

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${product_id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();

    if (auth.user !== undefined) {
      setAddToCart((prevAddToCart) => ({
        ...prevAddToCart,
        cart_id: auth.user.customer_id,
      }));
    }
  }, [product_id, auth.user]);

  useEffect(() => {
    // Update total when kiloValue changes
    const newTotal = kiloValue * product.price;
    setTotalValue(newTotal);
  }, [kiloValue, product.price]);

  const decreaseKilo = () => {
    setKiloValue((prevValue) => Math.max(1 / 4, prevValue - 1 / 4));
  };

  const increaseKilo = () => {
    setKiloValue((prevValue) => prevValue + 1 / 4);
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
        formData.append("quantity", kiloValue);
        formData.append("total", totalValue.toFixed(2));

        await axios.post("http://localhost:5000/cart", formData);

        navigate(`/cart`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={product.product_id}>
      <NavBar />
      <section id="About-us" className="body-bg">
        <h4 className="section-title">Product</h4>
        <div className="container-fluid">
          <div className="card mx-auto overflow-hidden width-80vw height-30vw">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={`http://localhost:5000/images/products/${product.image}`}
                  className="img-fluid"
                  alt={product.description}
                />
              </div>

              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <h3 className="price">₱ {product.price} per kilo</h3>

                  <div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam et cursus justo. Sed purus eros, consectetur quis
                      erat vitae, consectetur.
                    </p>
                  </div>

                  <div className="card p-1 my-3">
                    <div className="d-flex justify-content-between">
                      <span className="my-4 mx-2">
                        Total {totalValue.toFixed(2)}
                      </span>
                      <div
                        className="card p-1 my-3"
                        style={{ width: "200px"}}
                      >
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
                    <button type="button m-2" className="btn btn-success">
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
