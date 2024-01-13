// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

// UI import
import "../styles.css";
import imgNotAvailable from "../../assets/images/others/img-not-available.svg";
import { useMediaQuery } from "react-responsive";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("Featured");
  const [filterProducts, setFilterProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState({
    Featured: "btn btn-secondary",
    Vegetables: "btn btn-outline-secondary",
    Fruits: "btn btn-outline-secondary",
    Dairy: "btn btn-outline-secondary",
    Grains: "btn btn-outline-secondary",
  });
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLargecreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const itemsPerSet = isSmallScreen
    ? 1
    : isMediumScreen
    ? 2
    : isLargecreen
    ? 3
    : 4;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
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
          key === clickedFilter ? "btn btn-secondary" : "btn btn-outline-secondary",
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

  const groupedProducts = filterProducts.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemsPerSet);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    
    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return (
    <section>
      <h4 className="section-title">Products</h4>
      <div className="container-fluid col-10">
        <nav className="nav justify-content-center">
          <button
            type="button"
            className={`ter-btn ${activeFilter.Featured}`}
            onClick={handleProductFilter}
            value="Featured"
          >
            Featured
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
        <Carousel>
          {groupedProducts.map((set, setIndex) => (
            <Carousel.Item key={setIndex} className="">
              <div className="row justify-content-evenly">
                {set.map((product) => (
                  <div
                    key={product.product_id}
                    className="card col-lg-3 col-md-4 col-sm-12 p-0 overflow-hidden product-card"
                  >
                    <Link
                      to={`/product/${product.product_id}`}
                      className="no-decor"
                    >
                      {product.image != null ? (
                        <img
                          src={`http://localhost:5000/images/products/${product.image}`}
                          className="card-img-top img-fluid img-cover"
                          alt={product.product_name}
                          style={{ height: "10rem", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="d-flex justify-content-center align-items-center imgprev"
                          style={{ height: "10rem" }}
                        >
                          <img
                            src={imgNotAvailable}
                            alt={product.product_name}
                            style={{ height: "30px" }}
                          />
                        </div>
                      )}
                      <div className="card-body no-spacing p-2">
                        <h6 className="card-title">{product.product_name}</h6>
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
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Featured;
