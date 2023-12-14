import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authentication";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post("http://localhost:5000/adminLogin", {
        username,
        password,
      });

      // Check if login is successful (you might need to customize this check based on your API response)
      if (response.data.success) {
        login();
        console.log("Login successful");
        // Redirect to another page (e.g., '/adminPanel')
        navigate("/adminPanel");
      } else {
        console.log("Login failed");
        // Handle login failure (show an error message, etc.)
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <h1>Admin Panel</h1>
              <form>
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleLogin}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
