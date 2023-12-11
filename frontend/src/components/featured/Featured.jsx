import React from 'react'
import img_1 from '../../assets/images/featured/img_1.jpg'
import img_2 from '../../assets/images/featured/img_2.jpg'
import img_3 from '../../assets/images/featured/img_3.jpg'
import img_4 from '../../assets/images/featured/img_4.jpg'
import '../styles.css';

const Featured = () =>{
  return (
    <section>
        <h4 className="section-title">Products</h4>
        <div className="container-fluid">
                <nav className="nav justify-content-center">
                    <a className="nav-link active" href="#">Featured</a>
                    <a className="nav-link" href="#">New</a>
                    <a className="nav-link" href="#">Vegetables</a>
                    <a className="nav-link disabled" href="#">Fruits</a>
                </nav>

            <div className="row justify-content-evenly">
                <div className="card col-3 p-0 overflow-hidden product-card">
                <img src={img_1} className="img-fluid object-fit-cover" alt="Farmco tomatoes" style={{height: "10rem"}}/>
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div className="card col-3 p-0 overflow-hidden product-card">
                <img src={img_2} className="img-fluid object-fit-cover" alt="Farmco eggs" style={{height: "10rem"}}/>
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div className="card col-3 p-0 overflow-hidden product-card">
                <img src={img_3} className="img-fluid object-fit-cover" alt="Farmco onions" style={{height: "10rem"}}/>
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div className="card col-3 p-0 overflow-hidden product-card">
                <img src={img_4} className="img-fluid object-fit-cover" alt="Farmco bellpeppers" style={{height: "10rem"}}/>
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            

        </div>
    </section>
    
  )
}

export default Featured