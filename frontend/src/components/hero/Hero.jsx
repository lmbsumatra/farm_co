import React from 'react';
import '../styles.css';

const Hero = () => {
  return (
    <section id="Hero">
      <div className="container-fluid">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '75vh' }}>
          <p className="text-center h1">
            Your Community's Farm: Bringing Freshness to <br /> Your Doorstep
          </p>
          <div className="mt-3">
            <button type="button" className="btn btn-primary">Buy now!</button>
            <button type="button" className="btn btn-outline-secondary">I want to sell</button>
          </div>
        </div>
      </div>
    </section>
    
  );
}

export default Hero;
