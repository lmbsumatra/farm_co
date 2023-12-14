import React from "react";
import "../styles.css";

const Testimonials = () => {
  return (
    <section>
      <h4 className="section-title">Testimonials</h4>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div
            className="card col-3"
            style={{ width: "18rem", height: "15rem" }}
          >
            <div className="card-body d-flex flex-column align-items-center">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="d-flex align-items-center">
                <img
                  src={''}
                  className="col-1 object-fit-cover rounded-circle"
                  alt="Customer profile"
                  style={{ height: "100px", width: "100px" }}
                />
                <div className="ml-2">
                  <p>Angela York</p>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#e1aa14" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card col-3"
            style={{ width: "18rem", height: "15rem" }}
          >
            <div className="card-body d-flex flex-column align-items-center">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="d-flex align-items-center">
                <img
                  src={''}
                  className="col-1 object-fit-cover rounded-circle"
                  alt="Customer profile"
                  style={{ height: "100px", width: "100px" }}
                />
                <div className="ml-2">
                  <p>Angela York</p>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#e1aa14" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card col-3"
            style={{ width: "18rem", height: "15rem" }}
          >
            <div className="card-body d-flex flex-column align-items-center">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="d-flex align-items-center">
                <img
                  src={''}
                  className="col-1 object-fit-cover rounded-circle"
                  alt="Customer profile"
                  style={{ height: "100px", width: "100px" }}
                />
                <div className="ml-2">
                  <p>Angela York</p>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#e1aa14" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
