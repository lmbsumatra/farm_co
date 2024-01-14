// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Ui imports
import "../components/styles.css";

// Components
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import imgNotAvailable from "../assets/images/others/img-not-available.svg";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");

        const activeProducts = res.data.filter(
          (product) => !(product.stock_quantity <= 0.24)
        );
        setProducts(activeProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAllProduct();
  }, [products]);

  const handleAdd = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  return (
    <div>
      <NavBar />
      <section id="Shop" className="body-bg">
        <h4 className="section-title">Products</h4>
        <div className="container-fluid">
          <div className="row justify-content-evenly">
            {products.map((product) => (
              <div
                className="card product-card col-3 p-0 overflow-hidden"
                key={product.product_id}
              >
                <Link
                  to={`/product/${product.product_id}`}
                  className="no-decor"
                >
                  {product.image != null ? (
                    <div style={{ height: "10rem", position: "relative" }}>
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
                    <div
                      className="d-flex justify-content-center align-items-center imgprev"
                    >
                      <img
                        src={imgNotAvailable}
                        alt={product.product_name}
                        style={{ height: "30px" }}
                      />
                    </div>
                  )}
                  <div className="card-body elements">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{product.product_name}</h5>
                      <h5 className="price">₱ {product.price}</h5>
                    </div>

                    <p className="subtitle">{product.category_name}</p>
                    <p className="">{product.description}</p>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleAdd}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
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
