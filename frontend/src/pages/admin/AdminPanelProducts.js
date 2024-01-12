import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../../components/styles.css";
import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";

const AdminPanelProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
        // Handle other data types (e.g., numbers, booleans)
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

  // ...

  useEffect(() => {
    const handleSearch = () => {
      const query = searchQuery.toLowerCase();
      setSearchQuery(query);

      const filteredProducts = products.filter((product) => {
        return (
          product.product_name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
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

  // ...

  return (
    <>
      <NavBarAdmin />

      <section className="body-bg">
        <h4 className="section-title">Products</h4>
        <form className="col-lg-6 col-md-12 col-sm-10" role="search">
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
                      <div class="icon-container">
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
                      <div class="icon-container">
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
                    <div
                      className="d-flex"
                      onClick={() => handleSort("category_id")}
                    >
                      Category
                      <div class="icon-container">
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
                    <div className="d-flex" onClick={() => handleSort("price")}>
                      Price
                      <div class="icon-container">
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
                      <div class="icon-container">
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
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.product_id}>
                    <td>{product.product_id}</td>
                    <td>{product.product_name}</td>
                    <td>{product.description}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/images/products/${product.image}`}
                        alt={product.name}
                        style={{ width: "50px" }}
                      />
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
                    <td>
                      <button type="button" className="btn btn-success">
                        <Link
                          to={`/edit-product/${product.product_id}`}
                          className="no-decor-white"
                        >
                          Update
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(product.product_id)}
                      >
                        Delete
                      </button>
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
      </section>

      <Footer />
    </>
  );
};

export default AdminPanelProducts;
