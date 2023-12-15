import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("An error occurred while fetching products. Please try again later.");
      }
    };

    fetchAllProduct();
  }, []);

  return (
    <div>
      <NavBar />
      <section>
        <h4 className="section-title">Products</h4>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <h5>Categories</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Fruit
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Vegetables
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Dairy
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Dairy
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Herbs & Spices
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Meat & Poultry
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Eggs
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Specialty Products
                </label>
              </div>
              <h5>Filter</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Organic
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  On sale
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Seasonal
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Local
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Local
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Price Range
                </label>
              </div>
            </div>

            <div className="col-8">
              <div className="row justify-content-evenly">
                {product.map((product) => (
                  <div
                    className="card col-3 p-0 overflow-hidden product-card"
                    key={product.product_id}
                  >
                    <Link to={`/product/${product.product_id}`}>
                      {product.image && (
                        <img
                          src={`http://localhost:5000/images/products/${product.image}`}
                          className="img-fluid object-fit-cover"
                          alt={product.product_name}
                          style={{ height: "10rem" }}
                        />
                      )}
                      <div className="card-body">
                        <p className="card-title">{product.product_name}</p>
                        <p className="">{product.description}</p>
                        <p className="">₱ {product.price}</p>
                        <button type="button" className="btn btn-success">
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;
