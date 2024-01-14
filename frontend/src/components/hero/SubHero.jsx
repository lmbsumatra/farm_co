// Modules
import React from "react";
import { useNavigate } from "react-router-dom";

// UI imports
import "../styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const SubHero = () => {
  return (
    <section id="SubHero">
      <div className="container-fluid">
        <div className="row justify-content-evenly align-items-center">
          <div className="col-lg-3 col-md-8 col-sm-10 text-center sub-hero-item">
            <i className="fas fa-shipping-fast brand-feature"></i>
            <h6>Free Delivery</h6>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div className="col-lg-3 col-md-8 col-sm-10 text-center sub-hero-item">
            <i className="fas fa-money-bill-wave brand-feature"></i>
            <h6>Money Back Guarantee</h6>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div className="col-lg-3 col-md-8 col-sm-10 text-center sub-hero-item">
            <i className="fas fa-phone-volume brand-feature"></i>
            <h6>Online Support</h6>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
