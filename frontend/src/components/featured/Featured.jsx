// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// UI import
import "../styles.css";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("Featured");
  const [filterProducts, setFilterProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState({
    Featured: "btn btn-success",
    Vegetables: "btn btn-outline-success",
    Fruits: "btn btn-outline-success",
    Dairy: "btn btn-outline-success",
    Grains: "btn btn-outline-success",
  });
  const navigate = useNavigate();

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

  const handleProductFilter = (e) => {
    const clickedFilter = e.target.value;
    setActiveFilter((prevActiveFilter) => ({
      ...Object.fromEntries(
        Object.entries(prevActiveFilter).map(([key, value]) => [
          key,
          key === clickedFilter ? "btn btn-success" : "btn btn-outline-success",
        ])
      ),
    }));

    setFilter(clickedFilter);
  };

  useEffect(() => {
    if (filter === "Featured") {
      const product = products.filter(
        (product) =>
          product.is_featured === 1 && !(product.stock_quantity <= 0.24)
      );
      setFilterProducts(product);
    } else {
      const product = products.filter(
        (product) =>
          product.category_name === filter && !(product.stock_quantity <= 0.24)
      );
      setFilterProducts(product);
    }
  }, [filter, products]);

  const handleClick = (e) => {
    navigate("/shop");
  };

  return (
    <section>
      <h4 className="section-title">Products</h4>
      <div className="container-fluid">
        <nav className="nav justify-content-center">
          <button
            type="button"
            className={`ter-btn ${activeFilter.Featured}`}
            onClick={handleProductFilter}
            value="Featured"
          >
            Features
          </button>
          <button
            type="button"
            className={`ter-btn ${activeFilter.Vegetables}`}
            onClick={handleProductFilter}
            value="Vegetables"
          >
            Vegetables
          </button>
          <button
            type="button"
            className={`ter-btn ${activeFilter.Fruits}`}
            onClick={handleProductFilter}
            value="Fruits"
          >
            Fruits
          </button>
          <button
            type="button"
            className={`ter-btn ${activeFilter.Grains}`}
            onClick={handleProductFilter}
            value="Grains"
          >
            Grains
          </button>
          <button
            type="button"
            className={`ter-btn ${activeFilter.Dairy}`}
            onClick={handleProductFilter}
            value="Dairy"
          >
            Dairy
          </button>
        </nav>

        <div className="row justify-content-evenly">
          {filterProducts.map((product) => (
            <div
              className="card col-3 p-0 overflow-hidden product-card"
              key={product.product_id}
            >
              <Link to={`/product/${product.product_id}`} className="no-decor">
                {product.image && (
                  <img
                    src={`http://localhost:5000/images/products/${product.image}`}
                    className="card-img-top img-fluid img-cover"
                    alt={product.product_name}
                    style={{ height: "10rem", objectFit: "cover" }}
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
