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
    axios
      .get("http://localhost:5000/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching products: ", error));
  }, []);

  // Handles delete products
  const handleDelete = async (customer_id) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/customers/" + customer_id
      );

      // Check if the delete request was successful
      if (response.status === 200) {
        setDeletionSuccess(true); // Trigger the useEffect for logout
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
      navigate(`/admin-panel-customers`)
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
                  <td>Id</td>
                  <td>Name</td>
                  <td>Email Address</td>
                  <td>Image</td>
                  <td>Address</td>
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
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(customer.customer_id)}
                      >
                        Delete
                      </button>
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
