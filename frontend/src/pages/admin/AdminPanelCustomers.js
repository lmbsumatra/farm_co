// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

// UI imports
import "../../components/styles.css";

// Components
import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import { useUserAuth } from "../../pages/context/useAuth";
import { useNavigate } from "react-router-dom";

const AdminPanelCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const auth = useUserAuth();
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetching products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }
    };

    fetchData();
  }, []);

  // Handles delete customer
  const handleDelete = async (customer_id) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/customers/" + customer_id
      );

      if (response.status === 200) {
        auth.deleteUser();
        setDeletionSuccess(true);
        window.location.reload();
      } else {
        console.log("Failed to delete customer. Status code:", response.status);
      }
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  // Use a useEffect to trigger logout when deletion is successful
  useEffect(() => {
    if (deletionSuccess) {
      auth.logout();
      
      navigate(`/admin-panel-customers`);
    }
  }, [deletionSuccess, auth, navigate]);

  return (
    <>
      <NavBarAdmin />

      <section className="body-bg">
        <h4 className="section-title">Customers</h4>
        <div className="card mx-auto overflow-hidden width-80vw my-3 overflow-x">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Image</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/images/customers/${customer.customer_image}`}
                        alt={customer.name}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{customer.address}</td>
                    <td>
                      {/* <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(customer.customer_id)}
                      >
                        Delete
                      </button> */}
                      <a
                        style={{
                          color: "#b60c0c",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(customer.customer_id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminPanelCustomers;
