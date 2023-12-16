import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../components/styles.css";
import { Dropdown } from "react-bootstrap";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    product_desc: "",
    product_img: "",
    product_price: null,
    product_category: null,
    product_isfeatured: 0,
    product_qty: null,
  });

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (eventKey, event) => {
    const categoryValueMap = {
      Vegetables: 1,
      Fruits: 2,
      Dairy: 3,
      Grains: 4,
    };

    const selectedValue = categoryValueMap[eventKey];

    setSelectedCategory(eventKey);

    setProduct((prev) => ({
      ...prev,
      product_category: selectedValue,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // If it's a checkbox, update the state based on the checked status
      setProduct((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      // For other input types, update the state based on the input value
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", product);
      navigate("/");
      window.location.href = "http://localhost:3000/admin-panel";
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          "http://localhost:5000/images/products/",
          formData
        );
        const { filename } = response.data;

        setProduct((prev) => ({
          ...prev,
          product_img: filename,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  return (
    <div>
      <NavBar />
      <section className="form" key={product.product_id}>
        <h4>Add New Item</h4>
        <div className="row py-3">
          <div className="col-md-3">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              name="product_name"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="product_desc"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-3">
            <label>Image</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              name="product_price"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-3">
            <label>Category</label>
            <Dropdown onSelect={handleCategorySelect}>
              <Dropdown.Toggle variant="success" id="category-dropdown">
                {selectedCategory ? `${selectedCategory}` : "Select a category"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="Vegetables">Vegetables</Dropdown.Item>
                <Dropdown.Item eventKey="Fruits">Fruits</Dropdown.Item>
                <Dropdown.Item eventKey="Dairy">Dairy</Dropdown.Item>
                <Dropdown.Item eventKey="Grains">Grains</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="col-md-3">
            <div className="form-check  py-4">
              <input
                className="form-check-input"
                name="product_isfeatured"
                type="checkbox"
                id="gridCheck"
                onChange={handleChange}
                checked={product.product_isfeatured === 1}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Is featured
              </label>
            </div>
          </div>

          <div className="col-md-3">
            <label>Quantity</label>
            <input
              type="number"
              placeholder="quantity"
              name="product_qty"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Add Item
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default AddProduct;
