import React from "react";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

const Product = () => {
  return (
    <div>
      <NavBar />
      <section id="About-us">
        <h4 className="section-title">About us</h4>
        <div className="container-fluid">
          <div
            className="card mx-auto overflow-hidden"
            style={{ maxWidth: "100%" }}
          >
            <div className="row g-0">
              <div className="col-md-6">
                <img src={""} className="img-fluid" alt="Farmco farmland" />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">Tomatoes</h5>
                  <h5 className="card-title">180.00 per kilo</h5>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Variants
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                    <button type="button" class="btn btn-outline-success">
                      Add to Cart
                    </button>
                    <button type="button" class="btn btn-success">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Product;
