import React from "react";

import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import "../../components/styles.css";

const AdminPanel = () => {
  return (
    <div>
      <NavBarAdmin />
      <section className="body-bg">
        <h4 className="section-title">
          Admin Panel
        </h4>
      </section>
      <Footer />
    </div>
  );
};

export default AdminPanel;
