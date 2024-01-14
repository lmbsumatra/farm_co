// Modules
import React from "react";
import { useNavigate } from "react-router-dom";

// UI imports
import "../styles.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop");
  };

  const handleButton = () => {
    navigate("/not-available");
  };

  return (
    <section id="Hero">
      <div className="container-fluid">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "83vh" }}
        >
          <p className="text-center h1">
            Your Community's Farm: Bringing Freshness to <br /> Your Doorstep
          </p>
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-success m-2"
              onClick={handleShopNow}
            >
              Shop now!
            </button>
            <button
              type="button"
              className="btn btn-outline-success m-2"
              onClick={handleButton}
            >
              I want to sell
            </button>
          </div>
        </div>
      
      </div>
    </section>
  );
};

export default Hero;
