import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import "../../components/styles.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [orders]);

  const handleClick = async (order_id) => {
    try {
      navigate(`/admin-order-summary/${order_id}`);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <NavBarAdmin />
      <section>
        <h2>Products</h2>
        <table className="table table-striped">
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
                <td>{product.stock_quantity}</td>
                <td>{getFeaturedStatus(product.is_featured)}</td>
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

        <h2>Orders</h2>
        <div className="card-deck">
          {orders.map((order) => (
            <div key={order.order_id} className="card clickable-card">
              <div className="card-body">
                <h5 className="card-title">Order Id: {order.order_id}</h5>
                <p className="card-text">Total: ₱ {order.grand_total}</p>
                <p className="card-text">Status: {order.status_name}</p>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => handleClick(order.order_id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default App;
