import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import "../../components/styles.css";

const EditProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    product_desc: "",
    product_img: "",
    product_price: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const product_id = location.pathname.split("/")[2];


  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Update the product data using a PUT request
      await axios.put(`http://localhost:5000/products/${product_id}`, product);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="form">
        <h1>Update Item</h1>
        <input
          type="text"
          placeholder="name"
          name="product_name"
          value={product.product_name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="desc"
          name="product_desc"
          value={product.product_desc}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="img"
          name="product_img"
          value={product.product_img}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="price"
          name="product_price"
          value={product.product_price}
          onChange={handleChange}
        />

        <button onClick={handleClick}>Update</button>
      </div>
      <Footer />
    </>
  );
};

export default EditProduct;
