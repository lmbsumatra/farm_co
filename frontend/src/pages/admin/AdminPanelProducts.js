import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../../components/styles.css";
import { Dropdown } from "react-bootstrap";
import imgNotAvailable from "../../assets/images/others/img-not-available.svg";

import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";

const AdminPanelProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetching categories: category_id and category_name, for setting product category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Set filteredProducts initially
      })
      .catch((error) => console.error("Error fetching products: ", error));
  }, []);

  const handleDelete = async (product_id) => {
    try {
      await axios.delete("http://localhost:5000/products/" + product_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const getFeaturedStatus = (isFeatured) => {
    return isFeatured ? "Yes" : "No";
  };

  const handleStockWarning = (stock_qty) => {
    return stock_qty <= 0.24 ? "bg-danger" : "";
  };

  const handleSort = (columnName) => {
    const sortedProducts = [...products].sort((a, b) => {
      const valueA = a[columnName];
      const valueB = b[columnName];

      if (typeof valueA === "string" && typeof valueB === "string") {
        if (sortOrder === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else {
        if (sortOrder === "asc") {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      }
    });

    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const handleSearch = () => {
      const query = searchQuery.toLowerCase();
      setSearchQuery(query);

      const filteredProducts = products.filter((product) => {
        return (
          product.product_name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.unit_weight.toLowerCase().includes(query) ||
          product.category_name.toLowerCase().includes(query) ||
          String(product.price).includes(query) ||
          String(product.stock_quantity).includes(query) ||
          getFeaturedStatus(product.is_featured).toLowerCase().includes(query)
        );
      });

      setFilteredProducts(filteredProducts);
    };

    handleSearch(); // Always update the filter when the search query changes
  }, [searchQuery, products]);

  const handleCategorySelect = (eventKey, event) => {
    // Setting category_id, category_name to selectedCategoryObject
    const selectedCategoryObject = categories.find(
      (category) => category.category_name === eventKey
    );

    // If selectedCategoryObject(not null), set product.product_category
    if (selectedCategoryObject) {
      setSelectedCategory(eventKey);
    }

    const filteredProducts = products.filter((product) => {
      return product.category_name === eventKey;
    });

    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      <NavBarAdmin />

      <section className="body-bg">
        <h4 className="section-title">Products</h4>
        <div className="mx-auto overflow-hidden width-80vw">
          <form className="" role="search">
            <input
              className="form-control me-2 d-flex"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchTrigger(true);
              }}
            />
          </form>
          <div className="card mx-auto overflow-hidden width-80vw my-3 overflow-x">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="">
                      <div
                        className="d-flex"
                        onClick={() => handleSort("product_id")}
                      >
                        Id
                        <div className="icon-container">
                          {sortOrder === "asc" && (
                            <i className="fa-solid fa-caret-up"></i>
                          )}
                          {sortOrder === "desc" && (
                            <i className="fa-solid fa-caret-down"></i>
                          )}
                        </div>
                      </div>
                    </th>
                    <th className="">
                      <div
                        className="d-flex"
                        onClick={() => handleSort("product_name")}
                      >
                        Name
                        <div className="icon-container">
                          {sortOrder === "asc" && (
                            <i className="fa-solid fa-caret-up"></i>
                          )}
                          {sortOrder === "desc" && (
                            <i className="fa-solid fa-caret-down"></i>
                          )}
                        </div>
                      </div>
                    </th>
                    <th>Description</th>
                    <th>Image</th>
                    <th className="">
                      <Dropdown onSelect={handleCategorySelect}>
                        <Dropdown.Toggle
                          variant="secondary"
                          id="category-dropdown"
                        >
                          {selectedCategory
                            ? `${selectedCategory}`
                            : "Category"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {categories.map((category) => (
                            <Dropdown.Item
                              key={category.category_id}
                              eventKey={category.category_name}
                            >
                              {category.category_name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </th>
                    <th className="">
                      <div
                        className="d-flex"
                        onClick={() => handleSort("price")}
                      >
                        Price
                        <div className="icon-container">
                          {sortOrder === "asc" && (
                            <i className="fa-solid fa-caret-up"></i>
                          )}
                          {sortOrder === "desc" && (
                            <i className="fa-solid fa-caret-down"></i>
                          )}
                        </div>
                      </div>
                    </th>
                    <th className="">
                      <div
                        className="d-flex"
                        onClick={() => handleSort("stock_quantity")}
                      >
                        Stock
                        <div className="icon-container">
                          {sortOrder === "asc" && (
                            <i className="fa-solid fa-caret-up"></i>
                          )}
                          {sortOrder === "desc" && (
                            <i className="fa-solid fa-caret-down"></i>
                          )}
                        </div>
                      </div>
                    </th>
                    <th>Featured</th>
                    <th>Unit</th>
                    <th colSpan={2}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.product_id}>
                      <td>{product.product_id}</td>
                      <td>{product.product_name}</td>
                      <td>{product.description}</td>
                      <td>
                        {product.image != null ? (
                          <img
                            src={`http://localhost:5000/images/products/${product.image}`}
                            alt={product.name}
                            style={{ width: "50px" }}
                          />
                        ) : (
                          <img
                            src={imgNotAvailable}
                            alt={product.product_name}
                            style={{ height: "30px" }}
                          />
                        )}
                      </td>
                      <td>{product.category_name}</td>
                      <td>{product.price}</td>
                      <td
                        id="stock"
                        className={handleStockWarning(product.stock_quantity)}
                      >
                        {product.stock_quantity}
                      </td>
                      <td>{getFeaturedStatus(product.is_featured)}</td>
                      <td>{product.unit_weight}</td>
                      <td>
                        <a
                          href={`/edit-product/${product.product_id}`}
                          style={{ color: "#0cb656", fontSize: "25px" }}
                        >
                          <i className="fas fa-edit"></i>
                        </a>
                        {/* <Link
                          to={`/edit-product/${product.product_id}`}
                          className="no-decor-white"
                        >
                          Update
                        </Link> */}
                      </td>
                      <td>
                        {/* <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(product.product_id)}
                      >
                        Delete
                      </button> */}

                        <a
                          style={{
                            color: "#b60c0c",
                            fontSize: "25px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(product.product_id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  ))}

                  <tr key="add-product-row">
                    <td colSpan="4">
                      <button type="button" className="btn btn-success">
                        <Link to={`/add-product/`} className="no-decor-white">
                          Add
                        </Link>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminPanelProducts;
