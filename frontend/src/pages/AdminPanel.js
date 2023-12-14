import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products: ', error));
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    axios.post('/api/products', formData)
      .then(response => {
        setProducts([...products, { id: response.data.id, name, price, image: response.data.image }]);
        setName('');
        setPrice('');
        setImage(null);
      })
      .catch(error => console.error('Error adding product: ', error));
  };

  return (
    <div>
      <h1>Product CRUD App</h1>

      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div>
        <label>Image:</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button onClick={handleAddProduct}>Add Product</button>

      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={`http://localhost:5000/images/products/${product.image}`} alt={product.name} style={{ width: '50px' }} />
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
