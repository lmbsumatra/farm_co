// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

// UI import
import "../styles.css";
import imgNotAvailable from "../../assets/images/others/img-not-available.svg";
import { useMediaQuery } from "react-responsive";
import { Nav } from "react-bootstrap";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("Featured");
  const [filterProducts, setFilterProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState({
    Featured: true,
    Vegetables: false,
    Fruits: false,
    Dairy: false,
    Grains: false,
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
    ? 2
    : 3;

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

  const handleProductFilter = (clickedFilter) => {
    // Update filter state
    setFilter(clickedFilter);

    // Update activeFilter state
    const newActiveFilter = {};
    for (const key in activeFilter) {
      newActiveFilter[key] = key === clickedFilter;
    }
    setActiveFilter(newActiveFilter);
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
    <section id="Featured">
      <h4 className="section-title">Products</h4>
      <div className="container-fluid col-12 ">
        <Nav className="nav justify-content-center">
          {Object.keys(activeFilter).map((key) => (
            <Nav.Link
              key={key}
              className={`btn-tertiary ${activeFilter[key] ? "active" : ""}`}
              style={{
                borderBottom: activeFilter[key] ? "2px solid #111111" : "none",
                color: activeFilter[key] ? "rgb(0, 0, 0)" : "rgb(85, 85, 85)",
              }}
              onClick={() => handleProductFilter(key)}
            >
              {key}
            </Nav.Link>
          ))}
        </Nav>

        <Carousel
          className="col-12 justify-content-center"
          style={{ height: "400px" }}
        >
          {groupedProducts.map((set, setIndex) => (
            <Carousel.Item key={setIndex}>
              <div className="col-9 mx-auto">
                <div className="row justify-content-evenly">
                  {set.map((product) => (
                    <div
                      key={product.product_id}
                      className="card product-card col-lg-4 col-md-3 col-sm-12 p-0 overflow-hidden"
                    >
                      <Link
                        to={`/product/${product.product_id}`}
                        className="no-decor"
                      >
                        {product.image != null ? (
                          <div
                            style={{ height: "10rem", position: "relative" }}
                          >
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
                            <h5 className="card-title">
                              {product.product_name}
                            </h5>
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
                            onClick={handleClick}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Featured;
