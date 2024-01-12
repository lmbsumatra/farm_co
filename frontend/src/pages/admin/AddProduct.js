// Modules
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// UI imports
import "../../components/styles.css";
import { Dropdown } from "react-bootstrap";

// Components
import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    image: "",
    product_category: "",
    product_desc: "",
    product_name: "",
    product_price: "",
    product_qty: "",
    product_isfeatured: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [requireMsg, setRequireMsg] = useState();
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState();

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

  // Handles category selection
  const handleCategorySelect = (eventKey, event) => {
    // Setting category_id, category_name to selectedCategoryObject
    const selectedCategoryObject = categories.find(
      (category) => category.category_name === eventKey
    );

    // If selectedCategoryObject(not null), set product.product_category
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
    } else if (type === "file") {
      setProduct((prev) => ({ ...prev, [name]: value }));
      setImgPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handles button for adding product
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (
        product.image === "" ||
        product.product_category === "" ||
        product.image === "" ||
        product.product_desc === "" ||
        product.name === "" ||
        product.price === "" ||
        product.qty === ""
      ) {
        console.log(product);
        setRequireMsg("Fill out completely");
      } else {
        const imgInput = document.getElementById("imageUpload");
        const file = imgInput.files[0];

        // Using formdata to pass data to backend
        const formData = new FormData();
        formData.append("image", file);

        formData.append("product_name", product.product_name);
        formData.append("product_desc", product.product_desc);
        formData.append("product_price", product.product_price);
        formData.append("product_qty", product.product_qty);
        formData.append("product_category", product.product_category);
        formData.append("product_isfeatured", product.product_isfeatured);

        await axios.post("http://localhost:5000/products", formData);

        // Back to the admin product page
        navigate("/admin-panel-products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBarAdmin />

      <section className="form body-bg" key={product.product_id}>
        <div>
          <h4 className="section-title">Add New Item</h4>
          <div className=" width-80vw mx-auto bg-white p-3 rounded-2">
            <div className="row py-3">
              <p style={{ color: "red" }}>{requireMsg}</p>
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
                {imgPreview ? (
                  <img
                    className="card imgprev"
                    src={imgPreview}
                    alt="Product preview"
                  />
                ) : (
                  <div className="card d-flex justify-content-center align-items-center imgprev">
                    <i className="fa-solid fa-camera"></i>
                  </div>
                )}

                <div className="custom-file">
                  <input
                    name="image"
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
                    {selectedCategory
                      ? `${selectedCategory}`
                      : "Select a category"}
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
                  placeholder="Quantity"
                  name="product_qty"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={handleClick}
            >
              Add Item
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AddProduct;
