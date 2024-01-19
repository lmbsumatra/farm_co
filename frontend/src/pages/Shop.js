import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import imgNotAvailable from "../assets/images/others/img-not-available.svg";
import "../components/styles.css"

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [location.key]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    setSearchQuery(query || "");
  }, [location.search]);

  const handleAdd = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!searchQuery ||
        product.product_name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.unit_weight.toLowerCase().includes(searchQuery) ||
        product.category_name.toLowerCase().includes(searchQuery) ||
        String(product.stock_quantity).includes(searchQuery)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (!selectedCategories.length ||
        selectedCategories.includes(product.category_name))
    );
  });

  const visibleProductsArray = filteredProducts.slice(0, visibleProducts);

  return (
    <div>
      <NavBar />
      <section id="Shop" className="body-bg">
        <h4 className="section-title">Products</h4>

        <div className="container-fluid">
          <div className="row justify-content-evenly">
            <div className="d-flex justify-content-center">
              <div className="text-center mx-auto">
                <div className="mb-3">
                  <h6>Filter Categories:</h6>
                  <button
                    className={`m-1 ${
                      selectedCategories.includes("Fruits")
                        ? "btn btn-primary"
                        : "btn btn-outline-secondary"
                    }`}
                    onClick={() => handleCategoryFilter("Fruits")}
                  >
                    Fruits
                  </button>

                  <button
                    className={`m-1
          ${
            selectedCategories.includes("Vegetables")
              ? "btn btn-primary"
              : "btn btn-outline-secondary"
          }`}
                    onClick={() => handleCategoryFilter("Vegetables")}
                  >
                    Vegetables
                  </button>
                  <button
                    className={`m-1
          ${
            selectedCategories.includes("Dairy")
              ? "btn btn-primary"
              : "btn btn-outline-secondary"
          }`}
                    onClick={() => handleCategoryFilter("Dairy")}
                  >
                    Dairy
                  </button>
                  <button
                    className={`m-1
          ${
            selectedCategories.includes("Grains")
              ? "btn btn-primary"
              : "btn btn-outline-secondary"
          }`}
                    onClick={() => handleCategoryFilter("Grains")}
                  >
                    Grains
                  </button>
                </div>

                <div className="price-range-slider">
                  <h6>Price Range</h6>
                  <Slider
                    range
                    min={0}
                    max={200}
                    step={10}
                    defaultValue={priceRange}
                    onChange={handlePriceChange}
                    railStyle={{ backgroundColor: "lightgrey" }}
                    trackStyle={{ backgroundColor: "blue" }}
                  />
                  <div
                    className="d-flex justify-content-between
                    "
                  >
                    <p>₱ {priceRange[0]}</p> <p>₱ {priceRange[1]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-evenly">
            {visibleProductsArray.map((product) => (
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
                    <div className="d-flex justify-content-center align-items-center imgprev">
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

                    <div className="d-flex justify-content-between">
                      <p className="subtitle">{product.category_name}</p>
                      <p className="subtitle">{product.unit_weight}</p>
                    </div>
                    <p className="">{product.description}</p>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleAdd(product.product_id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center">
            {visibleProducts < filteredProducts.length && (
              <button className="btn btn-outline-secondary" onClick={loadMore}>
                Load More...
              </button>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;
