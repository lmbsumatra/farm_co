// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Ui imports
import "../components/styles.css";

// Components
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();


  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAllProduct();
  }, []);

  const handleAdd = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  return (
    <div>
      <NavBar />
      <section>
        <h4 className="section-title">Products</h4>
        <div className="container-fluid">
          <div className="row justify-content-evenly">
            {product.map((product) => (
              <div
                className="card col-3 p-0 overflow-hidden product-card"
                key={product.product_id}
              >
                <Link
                  to={`/product/${product.product_id}`}
                  className="no-decor"
                >
                  {product.image && (
                    <img
                      src={`http://localhost:5000/images/products/${product.image}`}
                      className="img-fluid object-fit-cover"
                      alt={product.product_name}
                      style={{ height: "10rem" }}
                    />
                  )}
                  <div className="card-body no-spacing p-2">
                    <h6 className="card-title">{product.product_name}</h6>
                    <p className="">{product.description}</p>
                    <p className="price">₱ {product.price} per kilo</p>
                  </div>
                </Link>
                <div className="p-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleAdd(product.product_id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;
