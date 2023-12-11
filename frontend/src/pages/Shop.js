import React, {  } from 'react';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
import img_1 from '../assets/images/featured/img_1.jpg'
import img_2 from '../assets/images/featured/img_2.jpg'
import img_3 from '../assets/images/featured/img_3.jpg'
import img_4 from '../assets/images/featured/img_4.jpg'
import Product from './Product';

const Shop = () => {

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
                        <a className="nav-link active" href="/product">
                            <div className="card col-3 p-0 overflow-hidden product-card">
                                <img src={img_1} className="img-fluid object-fit-cover" alt="Farmco tomatoes" style={{height: "10rem"}}/>
                                <div className="card-body">
                                    <p className="card-title">Tomatoes</p>
                                    <p className="card-title">180.00 per kilo</p>
                                    <button type="button" className="btn btn-success">Add to Cart</button>
                                </div>
                            </div>
                        </a>

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
