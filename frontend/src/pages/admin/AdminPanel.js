import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import "../../components/styles.css";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products: ", error));

    return () => {
      console.log("Component unmounted. Cancelling async task.");
    };
  }, []);

  const handleDelete = async (product_id) => {
    try {
      await axios.delete("http://localhost:5000/products/" + product_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <section>
        <h2>Products</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Description</td>
              <td>Image</td>
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
                <td>
                  <button type="button" className="btn btn-success">
                    <Link to={`/edit-product/${product.product_id}`}>
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
                  <Link to={`/add-product/`}>Add</Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  );
};

export default App;
