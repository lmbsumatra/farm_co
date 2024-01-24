// Modules
import React from "react";

// UI import
import img_1 from "../../assets/images/about/img_1.jpg";
import "../styles.css";

const About = () => {
  return (
    <section id="About-us">
      <h4 className="section-title">About us</h4>
      <div className="container-fluid">
        <div className="card mx-auto overflow-hidden width-80vw">
          <div className="row g-0">
            <div className="col-md-6">
              <img src={img_1} className="img-fluid" alt="Farmco farmland" />
            </div>

            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">Our Story</h5>
                <p className="card-text">
                  "At Farmco, founded by passionate individuals with a love for
                  farming, we've quickly become a thriving hub for fresh,
                  sustainable, and locally grown produce. Our commitment to
                  quality and sustainability has shaped our success,
                  contributing to the well-being of our community." 
                  <br/>
                  <br/>
                  Our Mission
                  <br/>
                  <br/>
                  "At Farmco, our mission is simple: to provide you with the
                  freshest, highest-quality produce while prioritizing
                  sustainable and ethical farming practices. Embracing values
                  such as transparency, community support, and education, we
                  strive to create a healthier, more sustainable future."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
