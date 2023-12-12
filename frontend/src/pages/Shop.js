import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
import img_1 from '../assets/images/featured/img_1.jpg'
import img_2 from '../assets/images/featured/img_2.jpg'
import img_3 from '../assets/images/featured/img_3.jpg'
import img_4 from '../assets/images/featured/img_4.jpg'
import Product from './Product';

const Shop = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchAllProducts = async() => {
            try {
                const res = await axios.get("http://localhost:5000/products");
                setProducts(res.data)
            }
            catch(err) {
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [])


  return (
    <>
    <NavBar />
      <section>
        <h4 className="section-title">Products</h4>
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <h5>Categories</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Fruit
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Vegetables
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Dairy
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Dairy
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Herbs & Spices
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Meat & Poultry
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Eggs
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Specialty Products
                            </label>
                        </div>
                    <h5>Filter</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Organic
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                On sale
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Seasonal
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Local
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Local
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">
                                Price Range
                            </label>
                        </div>
                    
                </div>

                <div className="col-8">
                  <div className="row justify-content-evenly">
                    {products.map((products) => (
                        <div className="card col-3 p-0 overflow-hidden product-card" key={products.product_id}>
                            <a className="nav-link active" href="/product">
                                {products.image && <img src={products.image} className="img-fluid object-fit-cover" alt="Farmco tomatoes" style={{height: "10rem"}}/>}
                                <div className="card-body">
                                    <p className="card-title">{products.product_name}</p>
                                    <p className="">{products.description}</p>
                                    <p className="">₱ {products.price}</p>
                                    <button type="button" className="btn btn-success">Add to Cart</button>
                                </div>
                            </a>
                        </div>
                     ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer />
    </>
    
  );
}

export default Shop;
