import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [product, setProduct] = useState({
        product_name:"",
        product_desc:"",
        product_img:"",
        product_price  :null,
        product_category: null,
        product_isfeatured: null,
        product_qty: null  
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct((prev) => ({...prev, [e.target.name]: e.target.value}))
    };
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/products", product);
            navigate("/")
            window.location.href='http://localhost:3000/admin-panel'
        }   
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="form"key={product.product_id}>
            <h1>Add New Item</h1>
            <input type="text" placeholder="name" name="product_name" onChange={handleChange} />
            <input type="text" placeholder="desc" name="product_desc" onChange={handleChange} />
            <input type="text" placeholder="img"  name="product_img" onChange={handleChange} />
            <input type="number" placeholder="price" name="product_price" onChange={handleChange} />
            <input type="number" placeholder="category" name="product_category" onChange={handleChange} />
            <input type="number" placeholder="isfeatured" name="product_isfeatured" onChange={handleChange} />
            <input type="number" placeholder="quantity" name="product_qty" onChange={handleChange} />

            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default AddProduct;