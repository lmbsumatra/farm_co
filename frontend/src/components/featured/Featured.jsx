import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../styles.css";

const Featured = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const featuredProducts = product.filter(
    (product) => product.is_featured === 1
  );

  const handleClick = (e) => {
    navigate("/shop");
  };

  return (
    <section>
      <h4 className="section-title">Products</h4>
      <div className="container-fluid">
        <nav className="nav justify-content-center">
          <a className="nav-link active" href="/">
            Featured
          </a>
          <a className="nav-link" href="/">
            New
          </a>
          <a className="nav-link" href="/">
            Vegetables
          </a>
          <a className="nav-link disabled" href="/">
            Fruits
          </a>
        </nav>

        <div className="row justify-content-evenly">
          {featuredProducts.map((product) => (
            <div
              className="card col-3 p-0 overflow-hidden product-card"
              key={product.product_id}
            >
              <Link to={`/product/${product.product_id}`} className="no-decor">
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
                  <p className="price">₱ {product.price}</p>
                </div>
              </Link>
              <div className="p-2">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleClick}
              >
                Add to Cart
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
