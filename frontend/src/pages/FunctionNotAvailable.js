import React from "react";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

import "../components/styles.css";

const NotAvailable = () => {
  return (
    <div>
      <NavBar />
      <section className="body-bg">
        <div className="container-fluid">
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "75vh" }}
          >
            <p className="text-center">
              This page is currently unavailable.
            </p>
            
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotAvailable;
