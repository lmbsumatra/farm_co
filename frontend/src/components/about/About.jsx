import React from "react";
import img_1 from "../../assets/images/about/img_1.jpg";
import "../styles.css";

const About = () => {
  return (
    <section id="About-us">
      <h4 className="section-title">About us</h4>
      <div className="container-fluid">
        <div
          className="card mx-auto overflow-hidden"
          style={{ maxWidth: "100%" }}
        >
          <div className="row g-0">
            <div className="col-md-6">
              <img src={img_1} className="img-fluid" alt="Farmco farmland" />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Our Story <br />
                  "At [Farm Name], our journey began [X years ago/ in a small
                  rural town/ with a family tradition]. Founded by [Founder's
                  Name], our farm has grown into a thriving hub for fresh,
                  sustainable, and locally grown produce."
                  <br />
                  Our Mission <br />
                  "Our mission at [Farm Name] is simple: to provide you with the
                  freshest, highest-quality produce while prioritizing
                  sustainable and ethical farming practices. We believe in [list
                  key beliefs or values], and this commitment shapes everything
                  we do."
                </p>
                <p>
                  <a href="/">Learn More...</a>
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
