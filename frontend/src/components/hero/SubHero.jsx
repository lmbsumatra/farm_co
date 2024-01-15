// Modules
import React from "react";

// UI imports
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SubHero = () => {
  return (
    <section id="SubHero">
      <div className="container-fluid">
        <div className="row justify-content-evenly align-items-center">
          <div className="col-lg-3 col-md-8 col-sm-10 sub-hero-item d-flex border-right">
            <div>
              <i className="fas fa-shipping-fast brand-feature p-2"></i>
            </div>
            <div>
              <h6>Free Delivery</h6>
              <p>
                Some quick example text to build.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-8 col-sm-10 sub-hero-item d-flex border-right">
            <div>
              <i className="fas fa-money-bill-wave brand-feature p-2"></i>
            </div>
            <div>
              <h6>Money Back Guarantee</h6>
              <p>
                Some quick example text to build.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-8 col-sm-10 sub-hero-item d-flex">
            <div>
              <i className="fas fa-phone-volume brand-feature p-2"></i>
            </div>
            <div>
              <h6>24/7 Online Support</h6>
              <p>
                Some quick example text to build.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
