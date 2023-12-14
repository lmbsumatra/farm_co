import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles.css";

const Featured = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const featuredProducts = products.filter(
    (products) => products.is_featured === 1
  );

  return (
    <section>
      <h4 className="section-title">Products</h4>
      <div className="container-fluid">
        <nav className="nav justify-content-center">
          <a className="nav-link active" href="#">
            Featured
          </a>
          <a className="nav-link" href="#">
            New
          </a>
          <a className="nav-link" href="#">
            Vegetables
          </a>
          <a className="nav-link disabled" href="#">
            Fruits
          </a>
        </nav>

        <div className="row justify-content-evenly">
          {featuredProducts.map((products) => (
            <div
              className="card col-3 p-0 overflow-hidden product-card"
              key={products.product_id}
            >
              <img
                src={`http://localhost:5000/images/products/${products.image}`}
                className="img-fluid object-fit-cover"
                alt={products.image}
                style={{ height: "10rem" }}
              />
              <div className="card-body">
                <p className="card-title">{products.product_name}</p>
                <p className="">{products.description}</p>
                <p className="">₱ {products.price}</p>
                <button type="button" className="btn btn-success">
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
