// Modules
import React, { useState } from "react";
import axios from "axios";
import { useUserAuth } from "../context/useAuth";
import { useEffect } from "react";

// UI imports
import "../../components/styles.css";

// Components
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const EditProfile = () => {
  const auth = useUserAuth();
  const [userImage, setUserImage] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    customer_name: auth.user.customer_name,
    email: auth.user.email,
    customer_image: auth.user.image,
    address: auth.user.address,
    username: auth.user.username,
    password: auth.user.password,
    customer_id: auth.user.customer_id,
  });
  const [passwordType, setPasswordType] = useState("password");
  const [passwordBtn, setPasswordBtn] = useState("Show");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/customers/${auth.user.customer_id}`
        );

        setCustomerDetails((prevCustomerDetails) => ({
          ...prevCustomerDetails,
          customer_image: response.data[0].customer_image,
        }));
        setUserImage(
          `http://localhost:5000/images/customers/${response.data[0].customer_image}`
        );
        
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [auth.user.customer_id]);

  // Handles input changes and setting value to product variable
  const handleChange = ({ target }) => {
    const { name, value, type, checked, files } = target;

    if (type === "checkbox") {
      setCustomerDetails((prevCustomerDetails) => ({
        ...prevCustomerDetails,
        [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      }));
    } else if (type === "file") {
      setUserImage(URL.createObjectURL(files[0]));

      setCustomerDetails((prevCustomerDetails) => ({
        ...prevCustomerDetails,
        customer_image:
          type === "file" ? files[0] : prevCustomerDetails.customer_image,
      }));
    } else {
      setCustomerDetails((prevCustomerDetails) => ({
        ...prevCustomerDetails,
        [name]: value,
      }));
    }
  };

  // Handles button for updating product
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Getting file(image) information
      const imgInput = document.getElementById("imageUpload");
      const file = imgInput.files[0];

      // Using formdata to pass data to server
      const formData = new FormData();

      if (file) {
        formData.append("image", file);
      } else {
        formData.append("customer_image", customerDetails.customer_image);
      }
      console.log(customerDetails);

      formData.append("customer_name", customerDetails.customer_name);
      formData.append("email", customerDetails.email);
      formData.append("address", customerDetails.address);
      formData.append("username", customerDetails.username);
      formData.append("password", customerDetails.password);
      formData.append("customer_id", customerDetails.customer_id);

      await axios.put(
        `http://localhost:5000/customer/${auth.user.customer_id}`,
        formData
      );

      // Back to the admin panel page
      auth.login(customerDetails);
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handles show and hide password
  const handleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordBtn("Hide");
    } else if (passwordType === "text") {
      setPasswordType("password");
      setPasswordBtn("Show");
    }
  };

  return (
    <>
      <NavBar />
      <section className="form body-bg" key={customerDetails.customer_id}>
        <div>
          <h4 className="section-title">Update Profile</h4>
          <div className=" width-80vw mx-auto bg-white p-3 rounded-2">
            <div className="row py-3">
              <div className="col-md-3">
                <label>Name</label>
                <input
                  type="text"
                  value={customerDetails.customer_name}
                  name="customer_name"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <label>Email</label>
                <input
                  type="text"
                  value={customerDetails.email}
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row py-3">
              <div className="col-md-3">
                <label>Image</label>

                {userImage ? (
                  <img
                    className="card imgprev"
                    src={userImage}
                    alt="Product preview"
                  />
                ) : (
                  <div className="card d-flex justify-content-center align-items-center imgprev">
                    <i className="fa-solid fa-camera"></i>
                  </div>
                )}
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label>Address</label>
                <input
                  type="text"
                  value={customerDetails.address}
                  name="address"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div>
                <div className="col-md-4">
                  <label>Username</label>
                  <input
                    type="text"
                    value={customerDetails.username}
                    name="username"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4">
                  <label>Password</label>
                  <div className="d-flex mx-auto align-items-center">
                    <input
                      type={passwordType}
                      value={customerDetails.password}
                      name="password"
                      onChange={handleChange}
                      className="form-control me-2"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleShowPassword}
                    >
                      {passwordBtn}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={handleClick}
            >
              Update
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EditProfile;
