import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

const Product = ( ) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const location = useLocation();
  const product_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${product_id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("An error occurred while fetching the product. Please try again later.");
      }
    };
    
    fetchProduct();
  }, [product_id]);

  if (error) {
    // You can render an error message or handle it in your UI
    return (
      <div>
        <NavBar />
        <p>Error: {error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div key={product.product_id}>
      <NavBar />
      <section id="About-us">
        <h4 className="section-title">About us</h4>
        <div className="container-fluid">
          <div
            className="card mx-auto overflow-hidden"
            style={{ maxWidth: "100%" }}
          >
            <div className="row g-0">
              <div className="col-md-6">
                <img src={`http://localhost:5000/images/products/${product.image}`} className="img-fluid" alt={product.description} />
              </div>
              
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <h5 className="card-title">{product.price} per kilo</h5>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Variants
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Something else here
                        </a>
                      </li>
                    </ul>
                    <button type="button" class="btn btn-outline-success">
                      Add to Cart
                    </button>
                    <button type="button" class="btn btn-success">
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
