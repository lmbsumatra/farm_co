import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import '../../components/styles.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products: ", error));
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    axios
      .post("http://localhost:5000/products", formData)
      .then((response) => {
        setProducts([
          ...products,
          { id: response.data.id, name, price, image: response.data.image },
        ]);
        setName("");
        setPrice("");
        setImage(null);
      })
      .catch((error) => console.error("Error adding product: ", error));
  };

  return (
    <>
      <NavBar />
      <section>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button onClick={handleAddProduct}>Add Product</button>

        <h2>Products</h2>
        <table className="table table-striped">
          <thead>
            <td>Id</td>
            <td>Name</td>
            <td>Description</td>
            <td>Image</td>
          </thead>
          <tbody>
          {products.map((product) => (
            <>
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
                <td><button type="button" className="btn btn-success"><Link to={`/edit-product/${product.product_id}`}>Update</Link></button></td>
                <td><button type="button" className="btn btn-outline-danger">Delete</button></td>
              </tr>
            </>
          ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );
};

export default App;
