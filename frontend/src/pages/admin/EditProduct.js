// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// UI imports
import "../../components/styles.css";
import { Dropdown } from "react-bootstrap";

// Components
import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";

const EditProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    product_desc: "",
    product_img: "",
    product_price: null,
    product_category: null,
    product_isfeatured: 0,
    product_qty: null,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [stockRangeWarning, setStockRangeWarning] = useState("");
  const navigate = useNavigate();

  // Getting product_id
  const location = useLocation();
  const product_id = location.pathname.split("/")[2];

  // Fetching categories, category_id and category_name
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

  // Fetching product based on product_id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${product_id}`
        );

        const fetchedProduct = response.data;

        // Initializing current product values before user applies changes
        setProduct({
          product_name: fetchedProduct.product_name,
          product_desc: fetchedProduct.description,
          product_img: fetchedProduct.image,
          product_price: fetchedProduct.price,
          product_category: fetchedProduct.category_id,
          product_qty: fetchedProduct.stock_quantity,
          product_isfeatured: fetchedProduct.is_featured === 1,
          ...fetchedProduct,
        });

        // Initializing current product values before user applies changes: for image
        setCurrentImage(fetchedProduct.image);

        // Initializing current product values before user applies changes: for category
        const selectedCategoryObject = categories.find(
          (category) => category.category_id === fetchedProduct.category_id
        );
        if (selectedCategoryObject) {
          setSelectedCategory(selectedCategoryObject.category_name);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id, categories]); // Include all dependencies in the dependency array

  // Handles input changes and setting value to product variable
  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    if (type === "checkbox") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      }));
    } else if (type === "number") {
      if (value <= 0.24) {
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
        setStockRangeWarning("Set stock to 0.25 kilos or higher.");
      } else {
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
        setStockRangeWarning("");
      }
    } else {
      setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    }
  };

  // Handles input changes and setting value to product variable: for category
  const handleCategorySelect = (eventKey) => {
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

  // Handles button for updating product
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Getting file(image) information
      const imgInput = document.getElementById("imageUpload");
      const file = imgInput.files[0];

      // Using formdata to pass data to server
      const formData = new FormData();

      if (file) {
        formData.append("image", file);
      } else {
        formData.append("product_img", product.product_img);
      }

      if (product.product_qty <= 0.24) {
        formData.append("product_qty", 0);
      } else {
        formData.append("product_qty", product.product_qty);
      }

      formData.append("product_name", product.product_name);
      formData.append("product_desc", product.product_desc);
      formData.append("product_price", product.product_price);

      formData.append("product_category", product.product_category);
      formData.append("product_isfeatured", product.product_isfeatured ? 1 : 0);

      await axios.put(`http://localhost:5000/products/${product_id}`, formData);

      // Back to the admin products page
      navigate("/admin-panel-products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <NavBarAdmin />
      <section className="form body-bg" key={product.product_id}>
        <div>
          <h4 className="section-title">Update Item</h4>
          <div className=" width-80vw mx-auto bg-white p-3 rounded-2">
            <div className="row py-3">
              <div className="col-md-3">
                <label>Name</label>
                <input
                  type="text"
                  value={product.product_name}
                  name="product_name"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <label>Description</label>
                <input
                  type="text"
                  value={product.product_desc}
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
                    onChange={handleChange}
                  />
                  <label className="custom-file-label" htmlFor="imageUpload">
                    {currentImage || "Choose image"}
                  </label>
                </div>
              </div>

              <div className="col-md-4">
                <label>Price</label>
                <input
                  type="number"
                  value={product.product_price}
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
                <div className="form-check py-4">
                  <input
                    className="form-check-input"
                    name="product_isfeatured"
                    type="checkbox"
                    id="gridCheck"
                    onChange={handleChange}
                    checked={product.product_isfeatured}
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
                  value={product.product_qty}
                  name="product_qty"
                  onChange={handleChange}
                  className="form-control"
                />
                <p style={{ color: "red" }}>{stockRangeWarning}</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleClick}
            >
              Update Item
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EditProduct;
