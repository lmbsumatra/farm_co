// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// UI imports
import "../../components/styles.css";

// Components
import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";

const AdminPanelProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetching products
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products: ", error));
  }, []);

  // Handles delete products
  const handleDelete = async (product_id) => {
    try {
      await axios.delete("http://localhost:5000/products/" + product_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Sets is_featured: 1=yes, 0=no
  const getFeaturedStatus = (isFeatured) => {
    return isFeatured ? "Yes" : "No";
  };

  const handleStockWarning = (stock_qty) => {
    var warningMsg = ''
    if (stock_qty <= 0.24) {
      warningMsg = 'bg-danger'
    }
    else {
      warningMsg = ''
    }
    return warningMsg;
  }

  return (
    <>
      <NavBarAdmin />

      <section className="body-bg">
        <h4 className="section-title">Products</h4>
        <div className="card mx-auto overflow-hidden width-80vw my-3 overflow-x">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Description</td>
                  <td>Image</td>
                  <td>Category</td>
                  <td>Price</td>
                  <td>Stock</td>
                  <td>Featured</td>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
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
                    <td id="stock" className={handleStockWarning(product.stock_quantity)}>
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
