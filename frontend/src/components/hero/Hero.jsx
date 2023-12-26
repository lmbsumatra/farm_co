import React from "react";
import "../styles.css";

import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/shop")
  }
  return (
    <section id="Hero">
      <div className="container-fluid">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <p className="text-center h1">
            Your Community's Farm: Bringing Freshness to <br /> Your Doorstep
          </p>
          <div className="mt-3">
            <button type="button" className="btn btn-success m-2" onClick={handleBuyNow}>
              Buy now!
            </button>
            <button type="button" className="btn btn-outline-success m-2">
              I want to sell
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
