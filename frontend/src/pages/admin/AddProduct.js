//Modules
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// UI imports
import "../../components/styles.css";
import { Dropdown } from "react-bootstrap";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  // Handles category selection
  const handleCategorySelect = (eventKey, event) => {
    const selectedCategoryObject = categories.find(
      (category) => category.category_name === eventKey
    );

    if (selectedCategoryObject) {
      setSelectedCategory(eventKey);
      setProduct((prevProduct) => ({
        ...prevProduct,
        product_category: selectedCategoryObject.category_id,
      }));
    }
  };

  // Handles input changes and setting value to product variable
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Checking if input is from checkbox. If so, toggled=1, not=0
    if (type === "checkbox") {
      setProduct((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handles button for adding product
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const fileInput = document.getElementById("imageUpload");
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("image", file);

      formData.append("product_name", product.product_name);
      formData.append("product_desc", product.product_desc);
      formData.append("product_price", product.product_price);
      formData.append("product_qty", product.product_qty);
      formData.append("product_category", product.product_category);
      formData.append("product_isfeatured", product.product_isfeatured);

      await axios.post("http://localhost:5000/products", formData);

      navigate("/admin-panel");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <section className="form" key={product.product_id}>
        <h4>Add New Item</h4>

        <div className="row py-3">
          <div className="col-md-3">
            {/* Name input */}
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
            {/* Description input */}
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
            {/* Image upload */}
            <label>Image</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="imageUpload"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            {/* Price input */}
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
            {/* Categoy dropdown */}
            <label>Category</label>
            <Dropdown onSelect={handleCategorySelect}>
              <Dropdown.Toggle variant="success" id="category-dropdown">
                {selectedCategory ? `${selectedCategory}` : "Select a category"}
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
          </div>

          <div className="col-md-3">
            {/* Is featured checkbox */}
            <div className="form-check  py-4">
              <input
                className="form-check-input"
                name="product_isfeatured"
                type="checkbox"
                id="gridCheck"
                onChange={handleChange}
                // If checked, product_isfeatured = 1
                checked={product.product_isfeatured === 1}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Is featured
              </label>
            </div>
          </div>

          <div className="col-md-3">
            {/* Quantity input */}
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
