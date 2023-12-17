import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
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
  const [currentImage, setCurrentImage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const product_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${product_id}`);
        const fetchedProduct = response.data;

        setProduct({
          product_name: fetchedProduct.product_name,
          product_desc: fetchedProduct.description,
          product_img: fetchedProduct.image,
          product_price: fetchedProduct.price,
          product_category: fetchedProduct.category_id,
          product_qty: fetchedProduct.category_id,
          ...fetchedProduct, // Update with fetched data
          product_isfeatured: fetchedProduct.is_featured === 1,
        });

        const categoryKeyMap = {
          1: "Vegetables",
          2: "Fruits",
          3: "Dairy",
          4: "Grains",
        };
        const selectedCategory = categoryKeyMap[fetchedProduct.category_id];
        setSelectedCategory(selectedCategory);

        setCurrentImage(fetchedProduct.image);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id]);

  const updateProductState = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
  
    if (type === "checkbox") {
      updateProductState(name, checked ? 1 : 0);
    } else if (type === "file") {
      // Handle file input separately
      updateProductState("product_img", target.files[0]);
    } else {
      updateProductState(name, value);
    }
  };
  

  const handleCategorySelect = (eventKey) => {
    const categoryValueMap = {
      Vegetables: 1,
      Fruits: 2,
      Dairy: 3,
      Grains: 4,
    };

    const selectedValue = categoryValueMap[eventKey];

    setSelectedCategory(eventKey);

    updateProductState("product_category", selectedValue);
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      const fileInput = document.getElementById("imageUpload");
      const file = fileInput.files[0];
  
      if (file) {
        formData.append("image", file);
  
        const imageResponse = await axios.put(`http://localhost:5000/products/1`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const { filename } = imageResponse.data;
        console.log(product_id)
        setCurrentImage(filename);
        updateProductState("product_img", filename);
      }
  
      // Continue with product update logic
      console.log("Product before API call:", product);
      await axios.put(`http://localhost:5000/products/${product_id}`, product);
      console.log("After API call");
      // navigate("/admin-panel");
    } catch (error) {
      console.error("Error uploading image or updating product:", error);
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
              placeholder={product.product_name}
              name="product_name"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label>Description</label>
            <input
              type="text"
              placeholder={product.description}
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
                name="image"
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
              placeholder={product.price}
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
              placeholder={product.stock_quantity}
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
