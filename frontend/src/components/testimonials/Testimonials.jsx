// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";

// UI import
import "../styles.css";
import userCircle from "../../assets/images/profile/user-circle.svg";
import quotes from "../../assets/images/others/quote.svg";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/customers");
        console.log(res.data);
        setTestimonials(res.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <section>
      <h4 className="section-title">Testimonials</h4>
      <div className="container-fluid">
        <div className="row justify-content-center">
          {testimonials
            .filter(
              (testimony) =>
                testimony.testimony && testimony.testimony.trim() !== ""
            ) // Add a null check
            .map((testimony) => (
              <div
                className="card col-md-3 card-hw m-2 shadow-sm"
                key={testimony.customer_id}
              >
                <div className="card-body text-center">
                  <div className="">
                    <img
                      src={quotes}
                      alt="Quotation"
                      style={{ height: "50px" }}
                    />
                  </div>
                  <p className="card-text">{testimony.testimony}</p>
                  <div className="">
                    <img
                      src={quotes}
                      alt="Quotation"
                      style={{ height: "50px", transform: "rotate(180deg)" }}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-evenly">
                    <div className="mr-3 bg-gray p-2 rounded-circle">
                      {testimony.customer_image ? (
                        <img
                          src={`http://localhost:5000/images/customers/${testimony.customer_image}`}
                          className="rounded-circle img-profile"
                          alt="Customer profile"
                          style={{ height: "50px" }}
                        />
                      ) : (
                        <img
                          src={userCircle}
                          className="rounded-circle img-profile"
                          alt="Default profile"
                        />
                      )}
                    </div>
                    <div>
                      <div className="d-flex flex-column align-items-center">
                        <p className="font-weight-bold mb-0 col-md-12 text-center">
                          {testimony.customer_name}
                        </p>
                        <div className="d-flex justify-content-center">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
