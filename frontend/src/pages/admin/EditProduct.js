import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import "../../components/styles.css";
import { Dropdown } from "react-bootstrap";

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

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const product_id = location.pathname.split("/")[2];

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
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${product_id}`
        );
        const fetchedProduct = response.data;

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

        setCurrentImage(fetchedProduct.image);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id]);

  useEffect(() => {
    const selectedCategoryObject = categories.find(
      (category) => category.category_id === product.product_category
    );

    if (selectedCategoryObject) {
      setSelectedCategory(selectedCategoryObject.category_name);
    }
  }, [product, categories]);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    if (type === "checkbox") {
      setProduct((prevProduct) => ({ ...prevProduct, [name]: type === "checkbox" ? (checked ? 1 : 0) : value,}));
    } else {
      setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    }
  };

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
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const fileInput = document.getElementById("imageUpload");
      const file = fileInput.files[0];
      console.log("File:", file);

      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      } else {
        formData.append("product_img", product.product_img);
      }

      formData.append("product_name", product.product_name);
      formData.append("product_desc", product.product_desc);
      formData.append("product_price", product.product_price);
      formData.append("product_qty", product.product_qty);
      formData.append("product_category", product.product_category);
      formData.append("product_isfeatured", product.product_isfeatured ? 1 : 0);

      formData.append("product_id", product_id);

      await axios.put(`http://localhost:5000/products/${product_id}`, formData);

      navigate("/admin-panel");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <section className="form" key={product.product_id}>
        <h4>Update Item</h4>
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
          </div>
        </div>
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Update Item
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default EditProduct;
